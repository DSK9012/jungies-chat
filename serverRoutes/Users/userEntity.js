const mongoose=require('mongoose');

const userEntity=mongoose.Schema({
    userName:{
        type: String,
        default: '',
        require: true
    },
    userMail:{
        type: String,
        default: '',
        require: true,
        unique: true
    },
    userInstitute:{
        type: String,
        default: ''
    },
    userStandard:{
        type: String,
        default: ''
    },
    userImgName:{
        type: String,
        default: ''
    }
});

module.exports=mongoose.model('users', userEntity);