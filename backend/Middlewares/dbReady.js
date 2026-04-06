const mongoose = require("mongoose");

/** Block auth if MongoDB never connected (avoids opaque 500s). */
function requireDb(req, res, next) {
  if (mongoose.connection.readyState === 1) {
    return next();
  }
  return res.status(503).json({
    success: false,
    message:
      "Database is not connected. In backend/.env set MONGO_URI to a working string, e.g. mongodb://127.0.0.1:27017/crm_portal for local MongoDB. Atlas mongodb+srv:// needs working DNS.",
  });
}

module.exports = { requireDb };
