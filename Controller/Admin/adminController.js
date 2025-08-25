const Admin = require("../../Model/Admin/Admin");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Admin Registration
exports.registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let adminExists = await Admin.findOne({ email });
        if (adminExists) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const admin = await Admin.create({ name, email, password });
        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id),
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Admin Login
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await admin.matchPassword(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        res.json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id),
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
