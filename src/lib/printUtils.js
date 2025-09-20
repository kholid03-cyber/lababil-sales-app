import jsPDF from 'jspdf';
import { COMPANY_INFO } from './constants';

// Format currency helper
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(amount);
};

// Format date helper
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = () => {
  return new Date().toLocaleTimeString('id-ID');
};

// Generate PDF receipt
export const generateReceiptPDF = (sale, companyInfo = COMPANY_INFO) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = 30;

  // Set font
  doc.setFont('helvetica');

  // Header - Company Info
  doc.setFontSize(20);
  doc.setTextColor(30, 64, 175); // Blue color
  doc.text(companyInfo.companyName, pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 10;
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(companyInfo.address, pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 8;
  doc.text(`Telp: ${companyInfo.phone} | Email: ${companyInfo.email}`, pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 8;
  doc.text(`Website: ${companyInfo.website}`, pageWidth / 2, yPosition, { align: 'center' });

  yPosition += 8;
  doc.text(`Rekening: ${companyInfo.bankAccount}`, pageWidth / 2, yPosition, { align: 'center' });

  // Receipt title
  yPosition += 20;
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('INVOICE / KWITANSI', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 10;
  doc.setFontSize(12);
  doc.text(`No. Receipt: #${sale.id}`, pageWidth / 2, yPosition, { align: 'center' });

  // Line separator
  yPosition += 15;
  doc.setDrawColor(59, 130, 246);
  doc.setLineWidth(1);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);

  // Customer Info
  yPosition += 15;
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Customer Information:', margin, yPosition);
  
  yPosition += 10;
  doc.setFontSize(12);
  doc.text(`Name: ${sale.customer}`, margin, yPosition);
  
  yPosition += 8;
  doc.text(`Email: ${sale.customerEmail || '-'}`, margin, yPosition);
  
  yPosition += 8;
  doc.text(`Phone: ${sale.customerPhone || '-'}`, margin, yPosition);

  // Transaction Info
  yPosition += 15;
  doc.setFontSize(14);
  doc.text('Transaction Information:', margin, yPosition);
  
  yPosition += 10;
  doc.setFontSize(12);
  doc.text(`Date: ${formatDate(sale.date)}`, margin, yPosition);
  
  yPosition += 8;
  doc.text(`Status: ${sale.status || 'Completed'}`, margin, yPosition);
  
  yPosition += 8;
  doc.text(`Payment Method: ${sale.paymentMethod || 'Bank Transfer'}`, margin, yPosition);
  
  yPosition += 8;
  doc.text(`Print Time: ${new Date().toLocaleString('id-ID')}`, margin, yPosition);

  // Line separator
  yPosition += 15;
  doc.line(margin, yPosition, pageWidth - margin, yPosition);

  // Items table header
  yPosition += 15;
  doc.setFontSize(12);
  doc.setFillColor(59, 130, 246);
  doc.setTextColor(255, 255, 255);
  doc.rect(margin, yPosition - 8, pageWidth - 2 * margin, 15, 'F');
  
  // Table headers
  doc.text('No', margin + 5, yPosition);
  doc.text('Description', margin + 25, yPosition);
  doc.text('Qty', pageWidth - 80, yPosition);
  doc.text('Unit Price', pageWidth - 60, yPosition);
  doc.text('Total', pageWidth - 25, yPosition, { align: 'right' });

  // Items
  yPosition += 15;
  doc.setTextColor(0, 0, 0);
  doc.setFillColor(249, 250, 251);
  doc.rect(margin, yPosition - 8, pageWidth - 2 * margin, 15, 'F');
  
  doc.text('1', margin + 5, yPosition);
  
  // Handle long product names
  const productName = sale.productName;
  if (productName.length > 30) {
    const lines = doc.splitTextToSize(productName, 80);
    doc.text(lines, margin + 25, yPosition - 3);
    yPosition += (lines.length - 1) * 5;
  } else {
    doc.text(productName, margin + 25, yPosition);
  }
  
  doc.text(sale.quantity.toString(), pageWidth - 80, yPosition);
  doc.text(formatCurrency(sale.total / sale.quantity), pageWidth - 60, yPosition);
  doc.text(formatCurrency(sale.total), pageWidth - 25, yPosition, { align: 'right' });

  // Line separator
  yPosition += 20;
  doc.line(margin, yPosition, pageWidth - margin, yPosition);

  // Totals section
  const subtotal = sale.total;
  const tax = subtotal * 0.11; // 11% tax
  const total = subtotal + tax;

  yPosition += 15;
  doc.setFillColor(240, 249, 255);
  doc.rect(margin, yPosition - 10, pageWidth - 2 * margin, 40, 'F');
  
  // Subtotal
  yPosition += 5;
  doc.text('Subtotal:', pageWidth - 80, yPosition);
  doc.text(formatCurrency(subtotal), pageWidth - 25, yPosition, { align: 'right' });

  // Tax
  yPosition += 8;
  doc.text('Tax (11%):', pageWidth - 80, yPosition);
  doc.text(formatCurrency(tax), pageWidth - 25, yPosition, { align: 'right' });

  // Total
  yPosition += 12;
  doc.setFontSize(14);
  doc.setTextColor(30, 64, 175);
  doc.text('TOTAL:', pageWidth - 80, yPosition);
  doc.text(formatCurrency(total), pageWidth - 25, yPosition, { align: 'right' });

  // Footer
  yPosition += 30;
  doc.setFontSize(12);
  doc.setTextColor(59, 130, 246);
  doc.text('Thank You for Your Trust!', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 8;
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('For further questions about this service, please contact us.', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 6;
  doc.text('All services are protected by warranty according to applicable terms.', pageWidth / 2, yPosition, { align: 'center' });

  return doc;
};

// Download PDF receipt
export const downloadReceiptPDF = (sale, companyInfo = COMPANY_INFO) => {
  try {
    const doc = generateReceiptPDF(sale, companyInfo);
    const filename = `receipt-${sale.id}-${sale.date}.pdf`;
    doc.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
    return false;
  }
};

// Print PDF receipt
export const printReceiptPDF = (sale, companyInfo = COMPANY_INFO) => {
  try {
    const doc = generateReceiptPDF(sale, companyInfo);
    
    // Open PDF in new window for printing
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    
    const printWindow = window.open(pdfUrl, '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          printWindow.onafterprint = () => {
            printWindow.close();
            URL.revokeObjectURL(pdfUrl);
          };
        }, 500);
      };
    } else {
      alert('Pop-up blocked! Please enable pop-ups for print functionality.');
    }
    return true;
  } catch (error) {
    console.error('Error printing PDF:', error);
    alert('Error printing PDF. Please try again.');
    return false;
  }
};

// Keep existing HTML receipt function for backup/alternative printing
export const printReceipt = (sale, companyInfo) => {
  // Use PDF print as primary method
  return printReceiptPDF(sale, companyInfo);
};

// Keep HTML download as backup option  
export const downloadReceiptHTML = async (sale, companyInfo) => {
  const receiptHTML = generateReceiptHTML(sale, companyInfo);
  
  try {
    // Create blob from HTML
    const blob = new Blob([receiptHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt-${sale.id}-${sale.date}.html`;
    link.click();
    
    // Cleanup
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading receipt:', error);
    alert('Gagal download receipt. Silakan coba lagi.');
  }
};

// Generate HTML receipt (for preview/backup)
const generateReceiptHTML = (sale, companyInfo = {}) => {
  const {
    companyName = 'Lababil Solution',
    address = 'Jakarta, Indonesia',
    phone = '+62 21-1234-5678',
    email = 'info@lababilsolution.com',
    website = 'www.lababilsolution.com',
    bankAccount = 'BCA 7870598488 a/n A KHOLID'
  } = companyInfo;

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Receipt - ${sale.id}</title>
        <style>
            @page { size: A4; margin: 20mm; }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5; color: #333; }
            .receipt-container { max-width: 800px; margin: 0 auto; padding: 20px; border: 2px solid #e5e7eb; }
            .header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #3b82f6; }
            .company-name { font-size: 28px; font-weight: bold; color: #1e40af; margin-bottom: 10px; }
            .receipt-title { font-size: 24px; font-weight: bold; margin: 20px 0 10px 0; }
            .total-section { margin-top: 30px; padding: 20px; background-color: #f0f9ff; border: 2px solid #3b82f6; }
            .total-final { font-size: 20px; font-weight: bold; color: #1e40af; padding-top: 10px; border-top: 2px solid #3b82f6; margin-top: 15px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { padding: 12px; text-align: left; border: 1px solid #ddd; }
            th { background-color: #3b82f6; color: white; }
            .text-right { text-align: right; }
            .text-center { text-align: center; }
        </style>
    </head>
    <body>
        <div class="receipt-container">
            <div class="header">
                <div class="company-name">${companyName}</div>
                <div>${address}</div>
                <div>Telp: ${phone} | Email: ${email}</div>
                <div>Website: ${website}</div>
                <div>Rekening: ${bankAccount}</div>
                <div class="receipt-title">INVOICE</div>
                <div>No. Receipt: #${sale.id}</div>
            </div>
            
            <div style="margin-bottom: 30px;">
                <div><strong>Customer:</strong> ${sale.customer}</div>
                <div><strong>Email:</strong> ${sale.customerEmail || '-'}</div>
                <div><strong>Phone:</strong> ${sale.customerPhone || '-'}</div>
                <div><strong>Date:</strong> ${formatDate(sale.date)}</div>
                <div><strong>Print Time:</strong> ${formatTime()}</div>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Description</th>
                        <th class="text-center">Qty</th>
                        <th class="text-right">Unit Price</th>
                        <th class="text-right">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-center">1</td>
                        <td><strong>${sale.productName}</strong></td>
                        <td class="text-center">${sale.quantity}</td>
                        <td class="text-right">${formatCurrency(sale.total / sale.quantity)}</td>
                        <td class="text-right"><strong>${formatCurrency(sale.total)}</strong></td>
                    </tr>
                </tbody>
            </table>
            
            <div class="total-section">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span>Subtotal:</span>
                    <span>${formatCurrency(sale.total)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span>Tax (11%):</span>
                    <span>${formatCurrency(sale.total * 0.11)}</span>
                </div>
                <div class="total-final" style="display: flex; justify-content: space-between;">
                    <span>TOTAL:</span>
                    <span>${formatCurrency(sale.total * 1.11)}</span>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 40px;">
                <p><strong>Thank You for Your Business!</strong></p>
                <p>For questions about this service, please contact us.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};