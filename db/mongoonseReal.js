const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");




mongoose.connect(
  "mongodb+srv://IOTProject:g7fGHthZqV2cz8E@cluster0.wzs74.mongodb.net/IOTProjectDB?retryWrites=true&w=majority",
  { useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true}
);


const userSchema = new mongoose.Schema({
    username: {
        type:String, 
        trim: true
    }, 
    email:{
        type:String, 
        required:true,
        unique:true,  // Ensures that the emails created are unique
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("This is not an email")
            }

        }
    },
    password:{
        type:String, 
        required:true,
        minlength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){

                throw new Error ("Cannot include password")
            }

        }

    },

    tokens:[
        {
            token:{
                type:String, 
                required: true
            }
        }
    ] 


})


// Login credentials verification 
userSchema.statics.verifyLogin = async function(email,password){
    const user = await UserDataReal.findOne({email})
    if(!user){
        throw new Error( "Wrong Login credentials ")
    }
    const passMatch = await bcrypt.compare(password,user.password)
    if(!passMatch){   
        throw new Error("Wrong Login credentials")
    }
    return user
}



userSchema.method.generateToken = async function(){
    const user = this; 
    const token = jwt.sing({user:user._id.toString}, 'iotproject')

    return token 
}


// Befofe the user is saved, Hash the password
userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
   }
);



const UserDataReal = mongoose.model('UserDataReal', userSchema) // Make sure this line is in this location 


module.exports = UserDataReal


