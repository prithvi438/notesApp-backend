//importing the packages
const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

//importing models
const User = require('../models/user');

//importing middleware
const fetchuser = require('../middleware/fetchUser');

//declaration of the secret key
const secretKey = 'your-secret-key';
//creation of the routes


//ROUTE :1 - Route for user Sign up...    No login required.
// endpoint "/api/auth", for creating a new user.

router.post('/signup', [
  // Validate username
  body('name').notEmpty().withMessage('Username is required'),
  // Validata email
  body('email').notEmpty().withMessage('Email cannot be empty').isEmail().withMessage('enter a correct Email'),
  // Validate password
  body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  // Validate phone number
  body('phone').notEmpty().withMessage('Phone number cannot be blank').isLength({ min: 10, max: 10 }).withMessage('Phone number should to 10 digits only')
], async(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // There are validation errors, handle them
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const {name, email, password, phone} = req.body;
    
    const userExist = await User.findOne({email})
    console.log(userExist)
    if(userExist){
      return res.json({error: 'Email Already exist'})
    }
    //hashing of password.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await new User({name, email, password:hashedPassword, phone});
    //const user = User(req.body)
    await newUser.save()
    
    const user = {
      id: newUser._id
    };

    // Generate a JWT token
    const token = jwt.sign(user, secretKey, { expiresIn: '24h' });
    

    res.json({ token });

  } catch (error) {
      console.log(error)
      res.send({error: 'Internal server error'})
  }

})

// **********************************************************************************************************




//ROUTE :2 - Route for user Sign up...    No login required.
// endpoint "/api/login", for creating a new user.
router.post('/login', [
  // Validate email
  body('email').notEmpty().withMessage('Email cannot be empty').isEmail().withMessage('enter a correct Email'),
  // Validate password
  body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], async(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // There are validation errors, handle them
    return res.status(400).json({ errors: errors.array() });
  }
  const {email, password} = req.body;

  try{
  const userData = await User.findOne({email})
    if(!userData){
     return res.status(401).json({"error": 'please login using correct credentials.'})
    }
    const passwordCompare = await bcrypt.compare(password, userData.password)

    if(!passwordCompare){
     return res.status(401).json({error: 'please login using correct credentials.'})
    }
    const user = {
      id: userData._id
    };

    // Generate a JWT token
    const token = jwt.sign(user, secretKey, { expiresIn: '1h' });

    res.json({ token });
  }catch(error){
    console.log(error)
    res.send("internal server error.")
  }

  
})

// **********************************************************************************************************

//ROUTE :3 - getting user data using POST request: Login required
router.get('/getuser', fetchuser, async(req, res)=>{
  const userData = await User.findById(req.user.id).select("-password")
res.send(userData)
})


//exporting of the router
module.exports = router;
