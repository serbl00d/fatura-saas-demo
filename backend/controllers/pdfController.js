const PDFDocument = require("pdfkit");
const Invoice = require("../models/Invoice");
const path = require("path");

const generateInvoicePdf = async (req, res) => {
  try {
    const invoiceId = req.params.id;

    const invoice = await Invoice.findOne({
      _id: invoiceId,
      user: req.user.id,
    });

    if (!invoice) {
      return res.status(404).json({ message: "Fatura Bulunamadi" });
    }

    // PDF Olustur
    const doc = new PDFDocument();
    doc.registerFont(
      "Roboto",
      path.join(__dirname, "../fonts/Roboto-Regular.ttf")
    );
    doc.font("Roboto");
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=fatura-${invoiceId}.pdf`
    );

    doc.pipe(res); // pdf ciktisini response a bagla

    doc.fontSize(20).text("FATURA", { align: "center" });
    doc.moveDown();

    doc.fontSize(14).text(`Müşteri: ${invoice.customerName}`);
    doc.text(`Tutar: ${invoice.amount}`);
    doc.text(`Son Tarih: ${invoice.dueDate.toDateString()}`);
    doc.text(`Durum: ${invoice.status.toUpperCase()}`);

    doc.end();
  } catch (err) {
    res.status(500).json({ message: "PDF Olusturulamadi.", err });
  }
};

module.exports = {
  generateInvoicePdf,
};
