require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const { Xendit, Invoice: InvoiceClient } = require("xendit-node");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Xendit client
const xenditClient = new Xendit({ secretKey: process.env.XENDIT_SECRET_KEY });
const { Invoice } = xenditClient;

// Middleware to parse JSON
app.use(express.json());

// Swagger setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Xendit Invoice API Documentation",
      version: "1.0.0",
      description:
        "API documentation for Xendit Invoice integration with Express and Node.js",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./index.js"], // files containing annotations for Swagger documentation
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * components:
 *   schemas:
 *     Invoice:
 *       type: object
 *       required:
 *         - external_id
 *         - amount
 *         - description
 *         - customer
 *       properties:
 *         external_id:
 *           type: string
 *           description: Unique identifier for the invoice
 *         amount:
 *           type: number
 *           description: Amount for the invoice
 *         description:
 *           type: string
 *           description: Description of the invoice
 *         customer:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             given_names:
 *               type: string
 *             surname:
 *               type: string
 *             mobile_number:
 *               type: string
 *             addresses:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   country:
 *                     type: string
 *                   street_line1:
 *                     type: string
 *                   street_line2:
 *                     type: string
 *                   city:
 *                     type: string
 *                   province:
 *                     type: string
 *                   postal_code:
 *                     type: string
 *       example:
 *         external_id: invoice-123
 *         amount: 1000000
 *         description: Invoice for purchase #123
 *         customer:
 *           email: customer@example.com
 *           given_names: Customer
 *           surname: Example
 *           mobile_number: "+6281234567890"
 *           addresses:
 *             - country: ID
 *               street_line1: Jalan Example
 *               street_line2: Kompleks Example
 *               city: Jakarta
 *               province: DKI Jakarta
 *               postal_code: "12345"
 *
 * @swagger
 * /create-invoice:
 *   post:
 *     summary: Create an invoice
 *     tags: [Invoice]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invoice'
 *     responses:
 *       200:
 *         description: Invoice created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       500:
 *         description: Server error
 *
 * @swagger
 * /get-invoice/{invoice_id}:
 *   get:
 *     summary: Get invoice by ID
 *     tags: [Invoice]
 *     parameters:
 *       - in: path
 *         name: invoice_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The invoice ID
 *     responses:
 *       200:
 *         description: The invoice description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       404:
 *         description: Invoice not found
 *       500:
 *         description: Server error
 *
 * @swagger
 * /get-invoices:
 *   get:
 *     summary: Get all invoices
 *     tags: [Invoice]
 *     responses:
 *       200:
 *         description: A list of invoices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Invoice'
 *       500:
 *         description: Server error
 *
 * @swagger
 * /expire-invoice/{invoice_id}:
 *   post:
 *     summary: Expire an invoice
 *     tags: [Invoice]
 *     parameters:
 *       - in: path
 *         name: invoice_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The invoice ID
 *     responses:
 *       200:
 *         description: The expired invoice description
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       404:
 *         description: Invoice not found
 *       500:
 *         description: Server error
 */

// Endpoint to create an Invoice
app.post("/create-invoice", async (req, res) => {
  try {
    const response = await Invoice.createInvoice({ data: req.body });
    res.json(response);
  } catch (error) {
    res.status(error.http_code || 500).json(error);
  }
});

// Endpoint to get an Invoice by ID
app.get("/get-invoice/:invoice_id", async (req, res) => {
  try {
    const response = await Invoice.getInvoiceById({
      invoiceId: req.params.invoice_id,
    });
    res.json(response);
  } catch (error) {
    res.status(error.http_code || 500).json(error);
  }
});

// Endpoint to get all Invoices
app.get("/get-invoices", async (req, res) => {
  try {
    const response = await Invoice.getInvoices({});
    res.json(response);
  } catch (error) {
    res.status(error.http_code || 500).json(error);
  }
});

// Endpoint to expire an Invoice
app.post("/expire-invoice/:invoice_id", async (req, res) => {
  try {
    const response = await Invoice.expireInvoice({
      invoiceId: req.params.invoice_id,
    });
    res.json(response);
  } catch (error) {
    res.status(error.http_code || 500).json(error);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
