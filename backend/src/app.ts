import express from "express";
import { router } from "./routes";
import cors from "cors";
import { catchError } from "./utils/middleware";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(router);
app.use(catchError);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
