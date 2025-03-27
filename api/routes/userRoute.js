import express from 'express';
import User from '../models/userModel.js';

const router = express();

router.post("/signin", async (req, res) => {
  const { name, email, user_id } = req.body;

  try {
    let user;

    if (name && email) {
      user = await User.findOne({ email, username: name }).exec();
    };

    if (!user && user_id) {
      user = await User.findOne({ thirdPartyId: user_id }).exec();
    };

    if (!user) {
      user = new User({
        username: name || user_id,
        email: email || '',
        picture: req.body.picture,
        thirdPartyId: user_id,
        userCredits: 1000,
        userFileLimit: 10
      });

      await user.save();
    };
    
    res.status(200).send(user);

  } catch (error) {
    console.error('Error in sign-in:', error);
    res.status(500).send("Error occurred while processing sign-in.");
  };
});

router.post('/saveCredits', async (req, res) => {
  const userId = req.body.userId;
  const creditAmount = req.body.creditAmount;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    };

    user.userCredits += creditAmount;
    user.markModified('userCredits');
    await user.save();
    
    res.status(200).send('Credits added');
  } catch (error) {
    res.status(400).send('There was a problem adding credits.');
  };
});

router.post('/subtractCredits', async (req, res) => {
  const userId = req.body.userId;
  const AIModel = req.body.AIModel;

  try {
    const user = await User.findById({_id: userId});
    if (!user) {
      return res.status(404).send('User not found');
    };

    switch(AIModel){
      case 'ChatGPT 4o':
        user.userCredits -= 1;
      break;
      case 'Claude':
        user.userCredits -= 2;
      break;
      case 'Grok xAI':
        user.userCredits -= 2;
      break;
      case 'Perplexity':
        user.userCredits -= 45;
      break;
      default: user.userCredits -= 1;
    };

    await user.save();
    
    res.status(200).send('Credits removed');
  } catch (error) {
    res.status(400).send('There was a problem adding credits.');
  };
});

router.post('/updateBasicInfo', async(req, res) => {
  const { userId, username, email } = req.body;
  const user = await User.findById(userId);

  if(user){
    user.username = username;
    user.email = email;
    user.save();

    res.status(200).send({ data: 'User Updated '});
  } else {
    res.status(400).send({ data: 'User does not exist'});
  };
});

router.post("/makeAdmin", async(req, res) => {
  const userId = req.body.userId;

  try{

    const user = await User.findById(userId);
      
    if (!user) {
      return res.status(404).send('User not found');
    };

    user.isAdmin = true;

    user.save();

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err.message);
  };
});

router.post("/collaboratorsInfo", async(req, res) => {
  const collaboratorIds = req.body.collaboratorIds;

  try{
    const usersInfoPromises = await collaboratorIds.map( async(userId) => {
      try{
        const user = await User.findById(userId);
          
        return { 
          username: user?.username, 
          picture: user?.picture,
          user_id: userId,
          email: user?.email
        };
      } catch {
        return null;
      };
    });
  
    const usersInfo = await Promise.all(usersInfoPromises);
    const filteredUsersInfo = usersInfo?.filter(info => info !== null);
  
    if (filteredUsersInfo.length > 0) {
      res.status(200).json(filteredUsersInfo);
    } else {
      res.status(400).json({ msg: "Problem finding collaborators" });
    };

  } catch (error){
    console.error('Error during collaborators info retrieval:', error);
    res.status(500).json({ msg: "Internal Server Error" });
  };
});

router.get("/userInfo", async(req, res) => {
  const userId = req.body.user_id;
  const user = await User.findById(userId);

  if(user){
    res.status(200).send(user);
  } else {
    res.status(400).send({msg: "User doesn't exist"});
  };
});

router.get('/subscription-status/:id', async(req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

  if(user){
    const {
      subscriptionStatus,
      subscriptionPriceId,
      subscriptionProductId
    } = user;

    res.status(200).send({ 
      data: { 
        subscriptionStatus, 
        subscriptionPriceId, 
        subscriptionProductId 
      }
    })
  } else {
    res.status(400).send({ error: 'No user found' })
  };
});

router.delete('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const deletedUser = await User.findOneAndDelete({ _id: userId });

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    };

    return res.status(200).json({ message: 'User deleted successfully', deletedUser });
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while deleting the user', error: error.message });
  };
});

export default router;