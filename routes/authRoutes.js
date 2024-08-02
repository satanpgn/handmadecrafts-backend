// // routes/auth.js
// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');

// const MAX_LOGIN_ATTEMPTS = 5;
// const LOCK_TIME = 2 * 60 * 60 * 1000; // 2 hours

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     if (user.isLocked()) {
//       return res.status(423).json({ message: 'Account is locked. Try again later.' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       user.loginAttempts += 1;

//       if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
//         user.lockUntil = Date.now() + LOCK_TIME;
//       }

//       await user.save();
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     user.loginAttempts = 0;
//     user.lockUntil = undefined;
//     await user.save();

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.json({ token, message: 'Login successful' });
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// module.exports = router;
