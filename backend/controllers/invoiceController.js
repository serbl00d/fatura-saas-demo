const Invoice = require("../models/Invoice");

// Fatura Olustur
const createInvoice = async (req, res) => {
  try {
    const { customerName, amount, dueDate } = req.body;

    const newInvoice = await Invoice.create({
      user: req.user.id,
      customerName,
      amount,
      dueDate,
    });
    res.status(201).json(newInvoice);
  } catch (err) {
    res.status(500).json({ message: "Fatura olusturulamadi", err });
  }
};

// Kullanicinin Faturalarini Getir
const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.user.id });
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ message: "Faturalar Alinamadi", err });
  }
};

module.exports = {
  createInvoice,
  getInvoices,
};
