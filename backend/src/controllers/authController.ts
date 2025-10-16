import { Request, Response } from "express";
import { User } from "../models/user";
import { generateToken } from "../middleware/auth";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are required!" });
        }

        if (password.length < 6) {
            return res.status(400).json({ msg: "Password must be at least 6 characters!" });
        }

        // Create new user
        const user = new User({ email, password, name });
        await user.save();

        // Generate token
        const token = generateToken({ userId: user._id.toString() });

        res.status(201).json({
            msg: "User registered successfully!",
            token,
            user: {
                id: user._id
            }
        });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ msg: "Registration failed!" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are required!" });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: "Invalid credentials!" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials!" });
        }

        // Generate token
        const token = generateToken({ userId: user._id.toString() });

        res.status(200).json({
            msg: "Login successful!",
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ msg: "Login failed!" });
    }
};

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId;
        const user = await User.findById(userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ msg: "User not found!" });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ msg: "Failed to fetch profile!" });
    }
};