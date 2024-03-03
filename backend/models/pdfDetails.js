const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
    pdf:String,
    title:String,
},{
    collection:"pdfDetails",
});

const PdfDetail = mongoose.model('PdfDetail',pdfSchema);

module.exports = PdfDetail;