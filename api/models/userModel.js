import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username              : { type: String,  required: false  },
  email                 : { type: String,  required: false  }, 
  picture               : { type: String,  required: false  },
  assistantVectorId     : { type: String,  required: false  },
  personalAssistantId   : { type: String,  required: false  },
  assistantThreadId     : { type: String,  required: false  },
  thirdPartyId          : { type: String,  required: false  },
  userCredits           : { type: Number,  required: false  },
  isAdmin               : { type: Boolean, required: false  },
  stripeCustomerId      : { type: String,  required: false  },
  stripeSubscriptionId  : { type: String,  required: false  },
  subscriptionStatus    : { type: String,  required: false  },
  lastCreditRenewal     : { type: Date,    required: false, default: null },  
  lastPlan              : { type: String,  required: false, default: null },
  hasPaidAccess         : { type: Boolean, required: false  },
  gptMessages           : { type: Array,   required: false  }, // Array of message IDs
  gptMessageIds         : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }], // Array of message IDs
  sharedMessages        : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  sharedFolders         : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Folder'  }],
  userFileLimit         : { type: Number,  required: false  },
});

const User = mongoose.model("User", userSchema);

export default User;