//importing the packages
const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');

//importing models
const Notes = require('../models/notes')

//importing middleware
const fetchuser = require('../middleware/fetchUser');

//declaration of the secret key
const secretKey = 'your-secret-key';

//creation of the routes

//ROUTE 1 : for creating a new note using POST: '/createnote' LOGIN REQUIRED

router.post('/createnote', fetchuser, async(req, res)=>{

    try {
        // Create a new note using the Note model
        const {title, description} = req.body;
        const user = req.user.id;
        console.log(title, description)
         const note = new Notes({ user, title, description });
        const savedNote = await note.save();
        res.send(savedNote)
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      }
    
})

//ROUTE 2 : for fetching notes of the user using GET: '/fetchnote' LOGIN REQUIRED
router.get('/fetchnote',fetchuser, async(req, res)=>{
  try {
    //fetch all notes of the user.
    const user_id = req.user.id;
    const userNotes = await Notes.find( {user: req.user.id})
    res.send(userNotes)
    console.log(req.user);

  } catch (error) {
    console.error(err);
        res.status(500).json({ error: 'Server error' });
  }
} )


//exporting of the router
module.exports = router;