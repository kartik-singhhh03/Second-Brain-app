import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { connectDB, ContentModel, UserModel } from './db.js'; // adjust path to your db.ts file
import { JWT_PASSWORD } from './config.js'; // adjust path to your config file
// Import or define userMiddleware
import { userMiddleware } from './middleware.js'; // adjust path as needed
import { LinkModel } from './db.js';
import { random } from "./utils.js";
const app = express();
app.use(cors());
app.use(express.json());
// Signup route
app.post("/api/v1/signup", async (req, res) => {
    const { username, password } = req.body;
    // Basic checks (optional but useful)
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    try {
        // check if user already exists
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // create new user
        const newUser = new UserModel({ username, password });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
app.post(('/api/v1/signin'), async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await UserModel.findOne({ username, password });
    if (existingUser) {
        const token = jwt.sign({ id: existingUser._id }, JWT_PASSWORD, { expiresIn: '1h' });
        res.json({ token });
    }
    else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});
app.post('/api/v1/content', userMiddleware, async (req, res) => {
    const link = req.body.link;
    const title = req.body.title;
    const type = req.body.type || 'link';
    await ContentModel.create({
        title: title,
        link: link,
        type: type,
        //@ts-ignore
        userId: req.userId,
        tags: []
    }).then((content) => {
        res.json({ message: 'Content created successfully', content });
    }).catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Internal server error' });
        }
    });
});
app.get('/api/v1/content', userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({ userId }).populate('userId', 'username');
    res.json({ content });
});
app.delete('/api/v1/content', userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;
    await ContentModel.deleteMany({ contentId,
        //@ts-ignore
        userId: req.userId,
    });
    console.log(contentId);
    res.json({ message: 'Content deleted successfully' });
});
app.post('/api/v1/brain/share', userMiddleware, async (req, res) => {
    const share = req.body.share;
    const hash = random(16);
    if (share) {
        const existingLink = await LinkModel.findOne({
            //@ts-ignore
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash,
                message: 'Share link already exists, updating...'
            });
            return;
        }
        await LinkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash
        });
        res.json({ message: "/share" + hash });
    }
    else {
        await LinkModel.deleteOne({
            //@ts-ignore    userId: req.userId
            userId: req.userId
        });
        res.json({ message: 'Share link deleted successfully' });
    }
    res.json({ message: 'Share link updated successfully' });
});
app.get('/api/v1/brain/:shareLink', async (req, res) => {
    try {
        const hash = req.params.shareLink;
        // Find the link
        const link = await LinkModel.findOne({ hash });
        if (!link) {
            return res.status(404).json({ message: 'Share link not found' });
        }
        // Fetch content by userId
        const content = await ContentModel.find({ userId: link.userId })
            .populate('userId', 'username');
        // Fetch user separately if needed
        const user = await UserModel.findById(link.userId);
        // Send combined response
        return res.json({ content, user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
const PORT = process.env.PORT || 3000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
});
//# sourceMappingURL=index.js.map