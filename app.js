import express from "express";
import path from "path";

const app = express();

const guestbookEntries = [];

// Enable static file serving (use absolute path)
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const PORT = 3003;

app.get("/", (req, res) => {
	res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.post("/submit", (req, res) => {
	const entry = {
		id: guestbookEntries.length + 1,
		firstName: req.body.fname,
		lastName: req.body.lname,
		jobTitle: req.body.jTitle,
		company: req.body.company,
		linkedIn: req.body.linkedin,
		email: req.body.email,
		howWeMet: req.body.meet,
		other: req.body.other || "",
		message: req.body["message-textarea"] || "",
		mailingList: req.body.mailingList === "on",
		emailFormat: req.body["email-format"] || "none",
		timestamp: new Date().toISOString(),
	};

	guestbookEntries.push(entry);

	console.log(entry);

	res.redirect("/confirmation");
});

app.get("/confirmation", (req, res) => {
	res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

app.get("/admin", (req, res) => {
	res.send(guestbookEntries);
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
