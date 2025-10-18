import express from "express";

const app = express();

// Enable static file serving (use absolute path)
app.use(express.static(path.join(__dirname, "public")));

const PORT = 3003;

app.get("/", (req, res) => {
	res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
