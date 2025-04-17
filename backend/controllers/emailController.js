const Invoice = require("../models/Invoice");
const PDFDocument = require("pdfkit");
const sendEmailWithAttachment = require("../utils/sendEmail");
const path = require("path");

const sendInvoiceByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const invoiceId = req.params.id;

    const invoice = await Invoice.findOne({
      _id: invoiceId,
      user: req.user.id,
    });
    if (!invoice) {
      return res.status(404).json({ message: "Fatura bulunamadı." });
    }

    // PDF oluştur, buffer içine yaz
    const doc = new PDFDocument();
    doc.registerFont(
      "Roboto",
      path.join(__dirname, "../fonts/Roboto-Regular.ttf")
    );
    doc.font("Roboto");
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", async () => {
      const pdfData = Buffer.concat(buffers);

      await sendEmailWithAttachment(
        email,
        "Faturanız hazır!",
        "Merhaba, faturanız ektedir.",
        pdfData,
        `fatura-${invoiceId}.pdf`
      );

      res.json({ message: "Fatura başarıyla e-posta ile gönderildi." });
    });

    // PDF içeriği
    doc.fontSize(20).text("FATURA", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`Müşteri: ${invoice.customerName}`);
    doc.text(`Tutar: ${invoice.amount} ₺`);
    doc.text(`Son Tarih: ${invoice.dueDate.toDateString()}`);
    doc.text(`Durum: ${invoice.status.toUpperCase()}`);
    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "E-posta gönderilemedi.", error });
  }
};

module.exports = {
  sendInvoiceByEmail,
};
