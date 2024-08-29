const axios = require("axios");

// Helper function to set Authorization header
const getAuthHeader = () => ({
  headers: {
    Authorization: `Basic ${Buffer.from(process.env.XENDIT_SECRET_KEY + ":").toString("base64")}`,
  },
});

module.exports = {
  axios,
  getAuthHeader,
};
