import express from 'express';

import getUserModel from '../model/usersCollection.js';
import { generateToken } from '../auth/authenticate.js';
import { connectAuthenticationToDatabase, closeDatabaseConnection } from '../database/MongoProvision.js';

const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const connection = await connectAuthenticationToDatabase();
        const User = getUserModel(connection);

        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.status(404).json({ message: "Authentication Failed: User not found." });
        }

        const isMatch = existingUser.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Authentication Failed: Invalid password' })
        }

        const token = generateToken(existingUser);

        return res.status(200).json({ token: 'Bearer ' + token });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    } finally {
        await closeDatabaseConnection('Authentication');
    }
});

authRouter.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        const connection = await connectAuthenticationToDatabase();

        const User = getUserModel(connection);

        await User.create({ username, password });

        return res.status(201).json({ message: "user created successfully." });
    } catch (err) {
        return res.status(500).json({ message: err.message })
    } finally {
        await closeDatabaseConnection('Authentication');
    }
});

export default authRouter;