const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const cors = require('cors');

// const imagesRoutes=require('../backend/models/Images');

// Application configuration
const app = express();
app.use(express.json()); // JSON body parsing
app.use(cors());

const { 
  API_BASE_URL, 
  JWT_SECRET, 
  MONGO_URL, 
  EMAIL_USER, 
  EMAIL_PASS 
} = require('./config/config.js');

// Example usage in backend
console.log('MongoDB URL:', MONGO_URL);
console.log('JWT Secret:', JWT_SECRET);

// Use in your Express app
app.use((req, res, next) => {
  console.log('API Base URL:', API_BASE_URL);
  next();
});

// MongoDB Connection
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    });

// User Schema
const UserDetailSchema = mongoose.Schema({
    Name: String,
    Username: String,
    Email: { type: String, unique: true },
    Password: String,
    otp: String,
    resetToken: String,
    resetTokenExpiration: Date,
}, {
    collection: "Userinfo"
});
const User = mongoose.model('Userinfo', UserDetailSchema);

// Default Route
app.get("/", (req, res) => {
    res.send({ status: "Started" });
});

// User Registration
app.post("/register", async (req, res) => {
    const { Name, Username, Email, Password } = req.body;

    try {
        const oldUser = await User.findOne({ Email });
        if (oldUser) {
            return res.status(400).send({ status: "error", message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        const newUser = new User({
            Name,
            Username,
            Email,
            Password: hashedPassword,
        });

        await newUser.save();
        res.send({ status: "success", message: "User registered successfully",userId: newUser._id });
    } catch (error) {
        console.error('Error in registration:', error);
        res.status(500).send({ status: "error", message: "Internal server error" });
        console.log("User data received:", req.body); // Log the user data received
    }
});

// Add this route after your existing routes
app.get("/get-user/:userId", async (req, res) => {
    try {
        // Validate the userId parameter
        if (!req.params.userId || !mongoose.Types.ObjectId.isValid(req.params.userId)) {
            return res.status(400).json({ 
                status: "error", 
                message: "Invalid user ID format" 
            });
        }

        // Find the user by ID, excluding sensitive information
        const user = await User.findById(req.params.userId)
            .select('-Password -otp -resetToken -resetTokenExpiration');

        if (!user) {
            return res.status(404).json({ 
                status: "error", 
                message: "User not found" 
            });
        }

        // Return the user data
        res.json({ 
            status: "success", 
            data: {
                _id: user._id,
                Name: user.Name,
                Username: user.Username,
                Email: user.Email
                // Add other non-sensitive fields if needed
            }
        });

    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ 
            status: "error", 
            message: "Internal server error" 
        });
    }
});

// User Login
app.post("/login-user", async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const oldUser = await User.findOne({ Email });
    if (!oldUser) {
      return res
        .status(404)
        .send({ status: "error", message: "User does not exist" });
    }

    if (await bcrypt.compare(Password, oldUser.Password)) {
      const token = jwt.sign({ Email: oldUser.Email }, JWT_SECRET, {
        expiresIn: "1h",
      });

      // ✅ Save login history
      await LoginHistory.create({
        userId: oldUser._id,
        email: oldUser.Email,
        ip: req.ip, // Express provides IP
        userAgent: req.headers["user-agent"], // device/browser info
        success: true,
      });

      return res.status(200).send({
        status: "ok",
        data: token,
        userId: oldUser._id,
      });
    } else {
      return res
        .status(400)
        .send({ status: "error", message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res
      .status(500)
      .send({ status: "error", message: "Internal server error" });
  }
});



const LoginHistory = require("./models/LoginHistory"); // make sure model is imported


//send otp for email verification 
app.post('/send-otp', async (req, res) => {
  const { Email } = req.body;
  console.log('Received email:', Email);

  try {
      // Check if user already exists
      const user = await User.findOne({ Email });
      if (user) {
          return res.status(400).send({ status: 'error', message: 'Email already registered!' });
      }

      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      otpStore[Email] = otp; // Save OTP temporarily

      // Send OTP email
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'vibecare67@gmail.com',
              pass: 'dmuo xfwq mxhl nzpq',
          },
      });

      const mailOptions = {
          from: 'vibecare67@gmail.com',
          to: Email,
          subject: 'Email Verification - VibeCare',
          text: `Your OTP is: ${otp}\n\nVerify your email to get your mental health well-being journey started.`,
      };

      transporter.sendMail(mailOptions, (error) => {
          if (error) {
              console.error('Error sending OTP email:', error);
              return res.status(500).send({ status: 'error', message: 'Failed to send OTP email' });
          }
          res.send({ status: 'success', message: 'OTP sent successfully' });
      });

  } catch (error) {
      console.error('Error in send-otp route:', error);
      res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
});
app.post('/send-reset-otp', async (req, res) => {
  const { Email } = req.body;
  console.log('Received reset password request for email:', Email);

  try {
      // ⚠️ Do NOT check whether user exists here
      // Just send OTP regardless

      // Generate OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      otpStore[Email] = otp; // Save OTP temporarily in memory

      // Send OTP email
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'vibecare67@gmail.com',
              pass: 'dmuo xfwq mxhl nzpq',
          },
      });

      const mailOptions = {
          from: 'vibecare67@gmail.com',
          to: Email,
          subject: 'Password Reset - VibeCare',
          text: `Your OTP for password reset is: ${otp}\n\nEnter this OTP in the app to proceed with resetting your password.`,
      };

      transporter.sendMail(mailOptions, (error) => {
          if (error) {
              console.error('Error sending reset OTP email:', error);
              return res.status(500).send({ status: 'error', message: 'Failed to send OTP email' });
          }
          res.send({ status: 'success', message: 'Reset OTP sent successfully' });
      });

  } catch (error) {
      console.error('Error in send-reset-otp route:', error);
      res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
});


app.post('/verify-otp', (req, res) => {
  const { Email, otp } = req.body;

  if (otpStore[Email] === otp) {
    delete otpStore[Email]; // Remove used OTP
    return res.send({ status: 'success', message: 'OTP verified successfully' });
  } else {
    return res.status(400).send({ status: 'error', message: 'Invalid or expired OTP' });
  }
});

// Forgot Password - Generate OTP and Send via Email
app.post('/forgot-password', async (req, res) => {
    const { Email } = req.body;

    try {
        const user = await User.findOne({ Email });
        if (!user) {
            return res.status(404).send({ status: 'error', message: 'Email not registered!' });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // ✅ Hash OTP before saving
        const hashedOtp = await bcrypt.hash(otp, 10);

        user.otp = hashedOtp;
        user.resetTokenExpiration = new Date(Date.now() + 15 * 60 * 1000); // 15 min
        await user.save();

        // Send plain OTP to email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'vibecare67@gmail.com',
              pass: 'dmuo xfwq mxhl nzpq',
            },
        });

        const mailOptions = {
            from: 'vibecare67@gmail.com',
            to: Email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}`,
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).send({ status: 'error', message: 'Error sending OTP email' });
            }
            res.send({ status: 'success', message: 'OTP sent to your email' });
        });
    } catch (error) {
        console.error('Error in forgot-password route:', error);
        res.status(500).send({ status: 'error', message: 'Internal server error' });
    }
});

app.post("/verifyOtp", async (req, res) => {
  try {
    const { Email, otp } = req.body;
    console.log("🔹 Incoming verifyOtp request:", { Email, otp });

    const user = await User.findOne({ Email: Email.toLowerCase() });
    if (!user) {
      console.log("❌ No user found with email:", Email);
      return res.status(400).json({ status: "error", message: "User not found" });
    }

    console.log("✅ User found. Stored OTP hash:", user.otp);

    const isMatch = await bcrypt.compare(otp.toString(), user.otp);
    console.log("🔍 bcrypt compare result:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ status: "error", message: "Invalid otp" });
    }

    // check expiration if you set one
    if (user.resetTokenExpiration && user.resetTokenExpiration < Date.now()) {
      console.log("⏰ OTP expired");
      return res.status(400).json({ status: "error", message: "OTP expired" });
    }

    res.json({ status: "success", message: "OTP verified" });
  } catch (err) {
    console.error("❌ Error in verifyOtp:", err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});




// Reset Password
app.post('/reset-password', async (req, res) => {
    const { Email, newPassword } = req.body;

    console.log("🔐 [RESET PASSWORD] Request received:");
    console.log("👉 Email:", Email);
    console.log("👉 New Password:", newPassword);

    try {
        const user = await User.findOne({ Email });
        if (!user) {
            console.warn("⚠️ [RESET PASSWORD] No user found with Email:", Email);
            return res.status(404).send({ status: 'error', message: 'User not found' });
        }

        console.log("✅ [RESET PASSWORD] User found:", user.Email);

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        console.log("🔑 [RESET PASSWORD] Password hashed successfully");

        user.Password = hashedPassword;
        user.otp = null;
        user.resetToken = null;
        user.resetTokenExpiration = null;

        await user.save();
        console.log("💾 [RESET PASSWORD] User password and OTP fields updated and saved");

        res.send({ status: 'success', message: 'Password reset successfully' });
    } catch (error) {
        console.error("❌ [RESET PASSWORD] Internal server error:", error);
        res.status(500).send({ status: 'error', message: 'Internal server error' });
    }
});

const UserPreferencesSchema = new mongoose.Schema({
    userId: String,
    gender: String,
    ageGroup: String,
    relationshipStatus: String,
    livingSituation: String
});

const UserPreferences = mongoose.model("UserPreferences", UserPreferencesSchema);

// API Endpoint to Save Preferences
app.post("/save-preferences", async (req, res) => {
    const { userId, gender, ageGroup, relationshipStatus, livingSituation } = req.body;

    try {
        const preferences = new UserPreferences({
            userId,
            gender,
            ageGroup,
            relationshipStatus,
            livingSituation
        });

        await preferences.save();
        res.send({ status: "success", message: "Preferences saved successfully" });
    } catch (error) {
        console.error("Error saving preferences:", error);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
});

// Add this to your server code (Node.js)
app.get("/get-user-preferences", async (req, res) => {
    const { userId } = req.query;

    try {
        const preferences = await UserPreferences.findOne({ userId });
        if (!preferences) {
            return res.send({ 
                status: "success", 
                preferences: {
                    ageGroup: "",
                    gender: "",
                    relationshipStatus: "",
                    livingSituation: ""
                }
            });
        }
        res.send({ status: "success", preferences });
    } catch (error) {
        console.error("Error fetching preferences:", error);
        res.status(500).send({ status: "error", message: "Internal server error" });
    }
});


const axios = require("axios");

app.post("/predict", async (req, res) => {
    try {
        const { features } = req.body;

        // Send data to Flask API
        const response = await axios.post(`${API_BASE_URL.replace('3000', '5000')}/predict`,{
            features: features
        });
        
        res.send(response.data); // Send prediction result back to client
    } catch (error) {
        console.error("Error calling Flask API:", error);
        res.status(500).send({ status: "error", message: "Failed to get prediction" });
    }
});
// Edit Profile API
app.get("/user-profile", async (req, res) => {
    const { userId } = req.query;
  
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ status: "error", message: "Invalid user ID" });
    }
  
    try {
      const user = await User.findById(userId).select("-Password");
      if (!user) {
        return res.status(404).send({ status: "error", message: "User not found" });
      }
      res.send(user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).send({ status: "error", message: "Internal server error" });
    }
  });
  const Image = require('./models/Images'); // Ensure correct path if placed elsewhere

// API to get 5 random images
app.get('/random-images', async (req, res) => {
  try {
    const randomImages = await Image.aggregate([
      { $sample: { size: 5 } } // Pick 5 random documents
    ]);
    
    // Remove the duplicate response and use the correct variable name
    res.status(200).json({ 
      status: 'success', 
      data: randomImages 
    });
  } catch (error) {
    console.error("Error fetching random images:", error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Internal server error' 
    });
  }
});

app.get('/image-details/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }
    res.json({ success: true, data: image });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});
  


// Start Server
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Node.js server started on port ${PORT}`);
});