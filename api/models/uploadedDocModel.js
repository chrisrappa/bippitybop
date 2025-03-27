import mongoose from 'mongoose';

const uploadedDocSchema = new mongoose.Schema({
  ownerId               : { type: String,                    required: false  },
  content               : { type: String,                    required: false  }, 
  filename              : { type: String,                    required: false  },
  folderId              : { type: mongoose.Types.ObjectId,   required: false  },
  gptFileId             : { type: String,                    required: false  },
  collabChats           : { type: Array,                     required: false  },
  created_at            : { type: String,                    required: false  },
  fileType              : { type: String,                    required: false  },
  fileSize              : { type: Number,                    required: false  }
});

const DocUpload = mongoose.model("DocUpload", uploadedDocSchema);

export default DocUpload;