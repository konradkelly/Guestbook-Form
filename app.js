import express from "express";
import path from "path";

const app = express();

// Enable static file serving (use absolute path)
app.use(express.static(path.join(`${import.meta.dirname}/public`)));

const PORT = 3003;

app.get("/", (req, res) => {
	res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
