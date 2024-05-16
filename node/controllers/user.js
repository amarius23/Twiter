const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exists and password is correct
        if (!user || !await user.isValidPassword(password)) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });

        // Return JWT token in response
        res.status(200).json({ token });
    } catch (error) {
        // Handle errors
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;

        // Check if user with email exists
        if (await User.findOne({ email })) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Create new user
        const newUser = new User({ email, username });
        await newUser.setPassword(password);
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
};

module.exports.get = async (req, res, next) => {
    try {
        // Retrieve all users from the database
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
};
