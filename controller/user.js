const users = require('../model/users');


const signup = async() => {
    try{
    const{user_name,user_email,user_password} = req.body;
    const user = await new users({
        user_name,
        user_email,
        user_password
    });
    res.json({ success: true, data: user });

} catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error });
  }
}

const login = async(req , res) => {
    const{user_email,user_password} = req.body;
    const user = await users.findOne({user_email:user_email});
    if(user){
        if(user.user_password === user_password || user.admin.true){
            res.json({success:true , data:user});
            }else{
                res.json({success:false , message:"Invalid password"});
                }
                }else{  
                    res.json({success:false , message:"User not found"});
                    }
                    
}

module.exports={
    signup,
    login
}