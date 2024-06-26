const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ecommerce');
const userSchema = new mongoose.Schema({
    user_name:{
        type:String
    },
    user_email:{
        type:String
    },
    user_password:{
        type:String
    },
    admin:{
        type:Boolean,
        default:false
    }
});

const Users = mongoose.model('users',userSchema);

module.exports = Users;