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

// Add logo to PDF
const addLogoToPDF = (doc, x, y, width, height) => {
  // Since jsPDF doesn't handle complex SVG well, we'll create a simple representation
  // Blue gradient rectangle for L
  doc.setFillColor(30, 64, 175); // Blue
  doc.rect(x, y, width * 0.6, height, 'F'); // L vertical part
  doc.rect(x, y + height * 0.7, width * 0.8, height * 0.3, 'F'); // L horizontal part
  
  // Silver/gray elements for B inside L
  doc.setFillColor(107, 114, 128); // Gray
  const bX = x + width * 0.15;
  const bY = y + height * 0.1;
  const bWidth = width * 0.4;
  const bHeight = height * 0.6;
  
  // B vertical bar
  doc.rect(bX, bY, bWidth * 0.25, bHeight, 'F');
  // B top horizontal
  doc.rect(bX, bY, bWidth * 0.7, bHeight * 0.25, 'F');
  // B middle horizontal
  doc.rect(bX, bY + bHeight * 0.4, bWidth * 0.6, bHeight * 0.2, 'F');
  // B bottom horizontal
  doc.rect(bX, bY + bHeight * 0.75, bWidth * 0.7, bHeight * 0.25, 'F');
  
  // Camera lens (circle)
  doc.setFillColor(59, 130, 246); // Light blue
  doc.circle(bX + bWidth * 0.6, bY + bHeight * 0.7, width * 0.05, 'F');
};

// Generate PDF receipt
export const generateReceiptPDF = (sale, companyInfo = COMPANY_INFO) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPosition = 30;

  // Set font
  doc.setFont('helvetica');

  // Add Logo
  addLogoToPDF(doc, pageWidth / 2 - 15, yPosition - 10, 30, 20);
  
  yPosition += 25;

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
  doc.text('Terima Kasih atas Kepercayaan Anda!', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 8;
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Untuk pertanyaan lebih lanjut mengenai layanan ini, silakan hubungi kami.', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 6;
  doc.text('Semua layanan dilindungi garansi sesuai dengan ketentuan yang berlaku.', pageWidth / 2, yPosition, { align: 'center' });

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

// Keep existing functions for compatibility
export const printReceipt = (sale, companyInfo) => {
  return printReceiptPDF(sale, companyInfo);
};

export const downloadReceiptHTML = async (sale, companyInfo) => {
  const receiptHTML = generateReceiptHTML(sale, companyInfo);
  
  try {
    const blob = new Blob([receiptHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt-${sale.id}-${sale.date}.html`;
    link.click();
    
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading receipt:', error);
    alert('Gagal download receipt. Silakan coba lagi.');
  }
};

// Generate HTML receipt with logo
const generateReceiptHTML = (sale, companyInfo = {}) => {
  const {
    companyName = 'Lababil Solution',
    address = 'Jambi, Indonesia',
    phone = '+62 823-1223-5675, +62 899-7499-994',
    email = 'lababil2307@gmail.com',
    website = 'www.lababil.biz.id',
    bankAccount = 'BCA 7870598488 a/n A KHOLID'
  } = companyInfo;

  // Updated Lababil Solution logo - L containing B design
  const companyLogo = `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="blueGradPrint" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1e40af;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#3b82f6;stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0.6" />
        </linearGradient>
        
        <linearGradient id="silverGradPrint" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#6b7280;stop-opacity:0.9" />
          <stop offset="50%" style="stop-color:#9ca3af;stop-opacity:0.7" />
          <stop offset="100%" style="stop-color:#9ca3af;stop-opacity:0.5" />
        </linearGradient>
      </defs>
      
      <!-- Letter L (3D Blue) - Outer structure -->
      <path d="M50 50 L50 150 L150 150 L150 130 L70 130 L70 50 Z" fill="url(#blueGradPrint)" stroke="#1e40af" stroke-width="1"/>
      
      <!-- Letter B (3D Silver) - Inside the L -->
      <path d="M78 55 L78 115 L98 115 L98 55 Z" fill="url(#silverGradPrint)"/>
      <path d="M78 55 L118 55 Q125 55 125 65 Q125 72 120 75 Q115 77 110 77 L78 77 Z" fill="url(#silverGradPrint)"/>
      <path d="M78 77 L108 77 L108 83 L78 83 Z" fill="url(#silverGradPrint)"/>
      <path d="M78 83 L130 83 Q145 83 145 100 Q145 110 140 115 Q135 115 125 115 L78 115 Z" fill="url(#silverGradPrint)"/>
      <path d="M80 57 L80 113 L85 113 L85 57 Z" fill="#e5e7eb" opacity="0.7"/>
      <path d="M80 57 L115 57 Q120 57 120 62 Q120 65 118 67 L80 67 Z" fill="#e5e7eb" opacity="0.5"/>
      <path d="M80 85 L127 85 Q135 85 135 93 Q135 100 130 103 L80 103 Z" fill="#e5e7eb" opacity="0.5"/>
      
      <!-- Camera lens -->
      <circle cx="115" cy="100" r="10" fill="none" stroke="url(#silverGradPrint)" stroke-width="2"/>
      <circle cx="115" cy="100" r="6" fill="url(#blueGradPrint)"/>
      <circle cx="115" cy="100" r="3" fill="#1e40af"/>
      
      <!-- Network elements -->
      <circle cx="95" cy="63" r="2" fill="#3b82f6" opacity="0.8"/>
      <circle cx="102" cy="61" r="1.5" fill="#3b82f6" opacity="0.6"/>
      <circle cx="107" cy="64" r="1.5" fill="#3b82f6" opacity="0.6"/>
      <circle cx="104" cy="69" r="1.5" fill="#3b82f6" opacity="0.6"/>
      <line x1="95" y1="63" x2="102" y2="61" stroke="#3b82f6" stroke-width="1" opacity="0.6"/>
      <line x1="102" y1="61" x2="107" y2="64" stroke="#3b82f6" stroke-width="1" opacity="0.6"/>
      <line x1="107" y1="64" x2="104" y2="69" stroke="#3b82f6" stroke-width="1" opacity="0.6"/>
      <line x1="104" y1="69" x2="95" y2="63" stroke="#3b82f6" stroke-width="1" opacity="0.6"/>
      
      <!-- Text -->
      <text x="50" y="200" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#1e40af">LABABIL</text>
      <text x="50" y="225" font-family="Arial, sans-serif" font-size="18" font-weight="normal" fill="#6b7280">solution</text>
    </svg>
  `)}`;

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
            .company-logo { width: 80px; height: 60px; margin: 0 auto 15px auto; background-image: url('${companyLogo}'); background-repeat: no-repeat; background-size: contain; background-position: center; }
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
                <div class="company-logo"></div>
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
                <p><strong>Terima Kasih atas Kepercayaan Anda!</strong></p>
                <p>Untuk pertanyaan lebih lanjut mengenai layanan ini, silakan hubungi kami.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};
