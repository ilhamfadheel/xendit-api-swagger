require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const specs = require("./swaggerConfig");
const invoiceRoutes = require("./routes/invoiceRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Use the invoice routes
app.use("/api", invoiceRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
