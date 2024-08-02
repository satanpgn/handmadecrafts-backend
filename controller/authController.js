// const User = require('../models/User');
// const bcrypt = require('bcryptjs');

// exports.register = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password } = req.body;

//     // Check if email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already exists' });
//     }

//     // Create new user
//     const newUser = new User({ firstName, lastName, email, password });

//     // Validate password history
//     for (const oldPasswordHash of newUser.passwordHistory) {
//       if (bcrypt.compareSync(password, oldPasswordHash)) {
//         return res.status(400).json({ message: 'Cannot reuse recent passwords' });
//       }
//     }

//     // Save user
//     await newUser.save();

//     res.status(201).json({ success: true, message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };
