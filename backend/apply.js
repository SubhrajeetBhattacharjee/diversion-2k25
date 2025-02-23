require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const path = require('path');
const multer = require('multer'); // For handling file uploads
const fs = require('fs'); // For file system operations

const app = express();
const port = process.env.PORT || 6565; // Use PORT from .env or default to 6565

// MongoDB connection string
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Database and collection names
const dbName = 'diversion'; // Your database
const loginCollection = 'login'; // Collection for user login details
const lostAndFoundCollection = 'lostandfound'; // Collection for lost and found items
const dashboardCollection = 'dashboard'; // Collection for dashboard stats

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Parse JSON data

// Serve static files from the 'public' directory (optional)
app.use(express.static('public'));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save uploaded files in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    },
});
const upload = multer({ storage });

// Connect to MongoDB
async function connectToDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        // Initialize dashboard stats if they don't exist
        const db = client.db(dbName);
        const dashboard = db.collection(dashboardCollection);
        const stats = await dashboard.findOne({});
        if (!stats) {
            await dashboard.insertOne({ totalItemsFound: 0, totalAdsPosted: 0 });
        }
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}
connectToDB();

// Create the 'uploads' directory if it doesn't exist
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Routes

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Lost and Found App!!!!');
});

// Register a new user
app.post('/register', async (req, res) => {
    const { username, email, phone, password } = req.body;

    console.log('Registration Request Body:', req.body); // Debug: Log request body

    if (!username || !email || !phone || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const db = client.db(dbName);
        const collection = db.collection(loginCollection);

        // Check if the username or email already exists
        const existingUser = await collection.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user
        await collection.insertOne({ username, email, phone, password: hashedPassword });
        console.log('User registered successfully:', { username, email, phone }); // Debug: Log success
        res.status(200).json({ message: 'User registered successfully.' });
    } catch (err) {
        console.error('Error registering user:', err); // Debug: Log error
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Login a user
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const db = client.db(dbName);
        const collection = db.collection(loginCollection);

        // Find the user
        const user = await collection.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }

        // Login successful
        res.status(200).json({ message: 'Login successful.' });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Add a lost and found item
app.post('/add-item', upload.single('image'), async (req, res) => {
    const { itemName, description, location, bounty, contact } = req.body;
    const imagePath = req.file ? req.file.path : null; // Path of the uploaded image

    if (!itemName || !description || !location || !bounty || !contact) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const db = client.db(dbName);
        const collection = db.collection(lostAndFoundCollection);

        // Insert the lost and found item
        await collection.insertOne({
            itemName,
            description,
            location,
            bounty: parseFloat(bounty), // Convert bounty to a number
            contact,
            image: imagePath, // Store the image path
        });

        // Update dashboard stats (increment totalAdsPosted)
        const dashboard = db.collection(dashboardCollection);
        await dashboard.updateOne({}, { $inc: { totalAdsPosted: 1 } });

        res.status(200).json({ message: 'Item added successfully.' });
    } catch (err) {
        console.error('Error adding item:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Mark an item as found
app.post('/mark-found', async (req, res) => {
    const { itemId } = req.body;

    if (!itemId) {
        return res.status(400).json({ message: 'Item ID is required.' });
    }

    try {
        const db = client.db(dbName);
        const collection = db.collection(lostAndFoundCollection);

        // Mark the item as found
        await collection.updateOne({ _id: itemId }, { $set: { found: true } });

        // Update dashboard stats (increment totalItemsFound)
        const dashboard = db.collection(dashboardCollection);
        await dashboard.updateOne({}, { $inc: { totalItemsFound: 1 } });

        res.status(200).json({ message: 'Item marked as found.' });
    } catch (err) {
        console.error('Error marking item as found:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get dashboard stats
app.get('/dashboard-stats', async (req, res) => {
    try {
        const db = client.db(dbName);
        const dashboard = db.collection(dashboardCollection);
        const stats = await dashboard.findOne({});

        res.status(200).json(stats);
    } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});