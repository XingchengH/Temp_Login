import app from "./index.js";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";

dotenv.config(); // Load environment variables from .env file
const PORT =  process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB(); // if having database
});
