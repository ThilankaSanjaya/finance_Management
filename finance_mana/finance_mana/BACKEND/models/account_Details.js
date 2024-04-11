const mongoose = require('mongoose');
const account_DetailsSchema = new mongoose.Schema({

    acc_Name:{
        type:String,
        required:true
    },

    acc_type:{
        type:String,
        required:true
    },

    BBF:{
        type:String,
        required:true
    },

    newDate:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('account_Details',account_DetailsSchema);

