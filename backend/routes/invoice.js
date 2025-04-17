const express = require("express");
const router = express.Router();
const { generateInvoicePdf } = require("../controllers/pdfController");
const {
  createInvoice,
  getInvoices,
} = require("../controllers/invoiceController");
const authMiddleware = require("../middlewares/authMiddleware");
const { sendInvoiceByEmail } = require("../controllers/emailController");

// Fatura Olustur  (sadece giris yapanlar)
router.post("/", authMiddleware, createInvoice);

// Faturalari Getir (sadece giris yapanlar)
router.get("/", authMiddleware, getInvoices);

router.get("/:id/pdf", authMiddleware, generateInvoicePdf);

// email
router.post("/:id/email", authMiddleware, sendInvoiceByEmail);
module.exports = router;
