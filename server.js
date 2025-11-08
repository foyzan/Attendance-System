import dotenv from 'dotenv'
import mongoose from "mongoose";

import app from "./app.js";

// Load environment variables before using them
dotenv.config();

main().catch(err => console.log(err))

async function main() {
  const uri = process.env.DATABASE_URL;
  if (!uri) {
    throw new Error('DATABASE_URL environment variable is not set. Check your .env file.');
  }

  await mongoose.connect(uri);

  const port = process.env.PORT || 3000;
  app.listen(port, function () {
    console.log("server is running on " + port);
  });
}


