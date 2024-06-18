import express from "express";
import { router } from "./routes";

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
