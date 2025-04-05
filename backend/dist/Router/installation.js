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
Object.defineProperty(exports, "__esModule", { value: true });
exports.installationRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
const types_1 = require("../types");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
// Request an installation
router.post("/", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.id;
    // const id = "98cf3e79-8557-456c-a0f8-0e25f722c1f7"
    const body = req.body;
    const parsedData = types_1.RequestInstallationSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(400).json({ message: "Invalid input", errors: parsedData.error.errors });
    }
    try {
        const installation = yield db_1.prismaClient.installation.create({
            data: Object.assign(Object.assign({}, parsedData.data), { userId }),
        });
        return res.status(201).json(installation);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
// Fetch all installations for the authenticated user
router.get("/", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-expect-error no error
    const userId = req.id;
    try {
        const installations = yield db_1.prismaClient.installation.findMany({
            where: { userId },
        });
        return res.json(installations);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
// Fetch a single installation by ID for the authenticated user
router.get("/:id", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-expect-error no error
    const userId = req.id;
    const { id } = req.params;
    try {
        const installation = yield db_1.prismaClient.installation.findFirst({
            where: { id, userId },
        });
        if (!installation) {
            return res.status(404).json({ message: "Installation not found" });
        }
        return res.json(installation);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
// Update an installation for the authenticated user
router.put("/:id", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-expect-error no error
    const userId = req.id;
    const { id } = req.params;
    const body = req.body;
    const parsedData = types_1.RequestInstallationSchema.partial().safeParse(body);
    if (!parsedData.success) {
        return res.status(400).json({ message: "Invalid input", errors: parsedData.error.errors });
    }
    try {
        const updatedInstallation = yield db_1.prismaClient.installation.update({
            where: { id, userId },
            data: parsedData.data,
        });
        return res.json(updatedInstallation);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
// Delete an installation for the authenticated user
router.delete("/:id", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-expect-error no error
    const userId = req.id;
    const { id } = req.params;
    try {
        yield db_1.prismaClient.installation.delete({
            where: { id, userId },
        });
        return res.status(204).send();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
exports.installationRouter = router;
