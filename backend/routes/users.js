const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

// Register new user
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router; 