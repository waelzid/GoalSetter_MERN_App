const mongoose = require('mongoose');

const goalschema = mongoose.Schema({
    text:{
        type:String,
        required:[true,'Please add a text value'],
    }
},{
    timestaps:true,
})

module.exports = mongoose.model('Goal',goalschema)