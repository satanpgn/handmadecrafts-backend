const Users = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const createUser = async (req, res) => {
    //step - 1 : Check if data is coming or not
    console.log(req.body);

    //step - 2 : Destructure the data
    const { firstName, lastName, email, password } = req.body;

    //step - 3 : Validate the incoming data
    if (!firstName || !lastName || !email || !password) {
        return res.json({
            success: false,
            message: 'Please enter all the fields.'
        })
    }

    //step - 4 : making try catch block
    try {
        //step - 5 : check existing user 
        const existingUser = await Users.findOne({ email: email })
        if (existingUser) {
            return res.json({
                success: false,
                message: 'User already exists.'
            })
        }

        //Encrypting password
        const randomSalt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, randomSalt)

        //step - 6 : Create new user
        const newUser = new Users({
            //fieldname : incomming data name 
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: encryptedPassword,
        })

        //step 7 : Save user and response 
        await newUser.save();
        res.status(200).json({
            success: true,
            message: 'User Created Successfully.'
        })

    } catch (error) {
        res.status(500).json("Server Error")
    }


}
const loginUser = async(req, res) => {
    //step 1 check incoming data
    // res.send("Welcome to LOGIN USER API.")
    console.log(req.body);

    // destructing
    const {email, password} = req.body;

    // validation
    if(!email || !password){
        return res.json({

            success: false,
            message: "please enter all fields."
        })
    }
    // try catch block
    try {
        // finding user
        const user = await Users.findOne({email: email})
        if(!user){
           return res.json({
                success: false,
                message: "User does not exist."
            })
        }
        // user exists

        // comparing passsword
        const databasepassword = user.password;
        const isMatched = await bcrypt.compare(password,databasepassword);
        if(!isMatched){
            return res.json({
                 success: false,
                 message: "invalid Credentials."
             })
         }
        // create token
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET
            
        )

        // response
        res.status(200).json({
            success:true,
            message: "User logged in sucessfully",
            token : token,
            userData : user
        })
        
    } catch (error) {
        res.json({
            success: false,
            message: "Server Error",
            error: error
        })
        
    }
    
}

module.exports = {
    createUser, loginUser
}