const functions = require("firebase-functions");
const app = require("../app"); // your existing Express app
const connectDB = require("../config/database");

// Connect to the database
connectDB();

// Export as Firebase Function
exports.api = functions.https.onRequest(app);
