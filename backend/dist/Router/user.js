"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const types_1 = require("../types");
const db_1 = require("../db");
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("../middleware");
const bcrypt_1 = __importDefault(require("bcrypt")); // For password hashing
const router = (0, express_1.Router)();
// Signup route
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("signup handler");
    const body = req.body;
    // Validate request body
    const parsedData = types_1.SignupSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(411).json({ message: "Invalid input" });
    }
    // Check if user already exists
    const userExist = yield db_1.prismaClient.user.findFirst({
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
    const hashedPassword = yield bcrypt_1.default.hash(parsedData.data.password, 10);
    // Create the user
    yield db_1.prismaClient.user.create({
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
}));
// Signin route
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("signin handler");
    const body = req.body;
    // Validate request body
    const parsedData = types_1.SigninSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(411).json({ message: "Invalid input" });
    }
    // Find the user by email
    const user = yield db_1.prismaClient.user.findFirst({
        where: {
            email: parsedData.data.email,
        },
    });
    if (!user) {
        return res.status(403).json({ message: "User not found" });
    }
    // Compare the provided password with the hashed password
    const isPasswordValid = yield bcrypt_1.default.compare(parsedData.data.password, user.password);
    if (!isPasswordValid) {
        return res.status(403).json({ message: "Incorrect password" });
    }
    // Generate a JWT token
    const token = jsonwebtoken_1.default.sign({ id: user.id }, config_1.JWT_PASSWORD);
    return res.json({ token: token, userId: user.id });
}));
// Fetch user details (protected route)
router.get("/", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("user details handler");
    console.log("user");
    // @ts-expect-error no error
    const id = req.id;
    // Fetch user details excluding sensitive information
    const user = yield db_1.prismaClient.user.findFirst({
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
}));
// Update user details (protected route)
router.put("/", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("update user handler");
    // @ts-expect-error no error
    const id = req.id;
    const { name, phone, location } = req.body;
    // Validate input
    if (!name && !phone && !location) {
        return res.status(400).json({ message: "No fields to update" });
    }
    // Update user details
    const updatedUser = yield db_1.prismaClient.user.update({
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
}));
// Delete user account (protected route)
router.delete("/", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("delete user handler");
    // @ts-expect-error no error
    const id = req.id;
    // Delete the user
    yield db_1.prismaClient.user.delete({
        where: { id: id },
    });
    return res.status(204).send();
}));
exports.userRouter = router;
