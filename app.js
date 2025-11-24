import express from "express";
import path from "path";
import mysql2 from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const PORT = 3003;

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.post("/contact", async (req, res) => {
    console.log("=== POST /contact started ===");
    console.log("Form data:", req.body);
    try {
        const { fname, lname, jTitle, company, linkedin, email, meet, other, mailingList } = req.body;
        const message = req.body['message-textarea'];
        const emailFormat = req.body['email-format'];
        
        const sql = `INSERT INTO contacts (firstName, lastName, jobTitle, company, linkedin, email, howWeMet, message, mailingList, emailFormat)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const selectedEmailFormat = emailFormat || 'html';
        const [result] = await pool.query(sql, [
            fname || null,
            lname || null,
            jTitle || null,
            company || null,
            linkedin || null,
            email || null,
            meet || null,
            message || null,
            mailingList === 'on',
            selectedEmailFormat
        ]);
        console.log("✓ Insert successful! ID:", result.insertId);
        const contact = {
            id: result.insertId,
            firstName: fname,
            lastName: lname,
            jobTitle: jTitle,
            company: company,
            linkedin: linkedin,
            email: email,
            howWeMet: meet,
            other: other,
            message: message,
            mailingList: mailingList === 'on',
            emailFormat: selectedEmailFormat,
            timestamp: new Date()
        };
        res.render("confirmation", { contact });
    } catch (err) {
        console.error("✗ Database error:");
        console.error("  Message:", err.message);
        console.error("  Code:", err.code);
        console.error("  Stack:", err.stack);
        res.status(500).send(`Error: ${err.message}`);
    }
});

app.get("/confirmation", (req, res) => {
    res.render("confirmation");
});

app.get("/admin", async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM contacts ORDER BY timestamp DESC');
        res.render("admin", { contact: rows });
    } catch (err) {
        console.log("Database error: " + err);
        res.status(500).send("Error loading contacts");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
