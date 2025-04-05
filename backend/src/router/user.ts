import { Request, Response, Router } from "express";
import { SignupSchema, SigninSchema } from "../types";
import { prismaClient } from "../db";
import { JWT_PASSWORD } from "../config";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware";
import bcrypt from "bcrypt"; // For password hashing

const router = Router();

// Signup route
router.post("/signup", async (req: Request, res: Response): Promise<any> => {
    console.log("signup handler");
    const body = req.body;

    // Validate request body
    const parsedData = SignupSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(411).json({ message: "Invalid input" });
    }

    // Check if user already exists
    const userExist = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.email,
        },
    });

    if (userExist) {
        return res.status(403).json({
            message: "User already exists",
        });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

    // Create the user
    await prismaClient.user.create({
        data: {
            email: parsedData.data.email,
            password: hashedPassword, // Store hashed password
            name: parsedData.data.name,
            phone: parsedData.data.phone, // Add phone field
            location: parsedData.data.location, // Add location field
            isVerified: false, // Default value
        },
    });

    // TODO: Send verification email
    console.log("User created successfully");

    return res.json({
        message: "Please verify your account",
    });
});

// Signin route
router.post("/signin", async (req: Request, res: Response): Promise<any> => {
    console.log("signin handler");
    const body = req.body;

    // Validate request body
    const parsedData = SigninSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(411).json({ message: "Invalid input" });
    }

    // Find the user by email
    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.email,
        },
    });

    if (!user) {
        return res.status(403).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(parsedData.data.password, user.password);
    if (!isPasswordValid) {
        return res.status(403).json({ message: "Incorrect password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id }, JWT_PASSWORD);

    return res.json({ token: token , userId : user.id});
});

// Fetch user details (protected route)
router.get("/", authMiddleware, async (req: Request, res: Response): Promise<any> => {
    console.log("user details handler");
    console.log("user");

    // @ts-expect-error no error
    const id = req.id;


    // Fetch user details excluding sensitive information
    const user = await prismaClient.user.findFirst({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            location: true,
            isVerified: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.json({ user });
});

// Update user details (protected route)
router.put("/", authMiddleware, async (req: Request, res: Response): Promise<any> => {
    console.log("update user handler");
    // @ts-expect-error no error
    const id = req.id;
    const { name, phone, location } = req.body;

    // Validate input
    if (!name && !phone && !location) {
        return res.status(400).json({ message: "No fields to update" });
    }

    // Update user details
    const updatedUser = await prismaClient.user.update({
        where: { id: id },
        data: {
            name: name,
            phone: phone,
            location: location,
        },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            location: true,
            isVerified: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return res.json({ user: updatedUser });
});

// Delete user account (protected route)
router.delete("/", authMiddleware, async (req: Request, res: Response): Promise<any> => {
    console.log("delete user handler");
    // @ts-expect-error no error
    const id = req.id;

    // Delete the user
    await prismaClient.user.delete({
        where: { id: id },
    });

    return res.status(204).send();
});

export const userRouter = router;