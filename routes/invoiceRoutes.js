const express = require("express");
const {
  createInvoice,
  getInvoiceById,
  getInvoices,
  expireInvoice,
} = require("../controllers/invoiceController");

const router = express.Router();

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
 */

/**
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
 */
router.post("/create-invoice", createInvoice);

/**
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
 */
router.get("/get-invoice/:invoice_id", getInvoiceById);

/**
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
 */
router.get("/get-invoices", getInvoices);

/**
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
router.post("/expire-invoice/:invoice_id", expireInvoice);

module.exports = router;
