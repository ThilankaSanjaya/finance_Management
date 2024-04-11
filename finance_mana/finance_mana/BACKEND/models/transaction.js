const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({

    transaction_id:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    amount:{
        type:String,
        required:true
    },

    newDate:{
        type:String,
        required:true
    },
    debit:{
        type:String,
        required:true
    },
    credit:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('transaction',transactionSchema);

