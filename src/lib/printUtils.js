// Print utility functions for sales receipts

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(amount);
};

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

export const generateReceiptHTML = (sale, companyInfo = {}) => {
  const {
    companyName = 'Lababil Solution',
    address = 'Jakarta, Indonesia',
    phone = '+62 21-1234-5678',
    email = 'info@lababilsolution.com',
    website = 'www.lababilsolution.com'
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
      <!-- Main vertical bar of B -->
      <path d="M78 55 L78 115 L98 115 L98 55 Z" fill="url(#silverGradPrint)"/>
      
      <!-- Top horizontal section of B -->
      <path d="M78 55 L118 55 Q125 55 125 65 Q125 72 120 75 Q115 77 110 77 L78 77 Z" fill="url(#silverGradPrint)"/>
      
      <!-- Middle divider -->
      <path d="M78 77 L108 77 L108 83 L78 83 Z" fill="url(#silverGradPrint)"/>
      
      <!-- Bottom horizontal section of B -->
      <path d="M78 83 L130 83 Q145 83 145 100 Q145 110 140 115 Q135 115 125 115 L78 115 Z" fill="url(#silverGradPrint)"/>
      
      <!-- Add subtle highlight on B for 3D effect -->
      <path d="M80 57 L80 113 L85 113 L85 57 Z" fill="#e5e7eb" opacity="0.7"/>
      <path d="M80 57 L115 57 Q120 57 120 62 Q120 65 118 67 L80 67 Z" fill="#e5e7eb" opacity="0.5"/>
      <path d="M80 85 L127 85 Q135 85 135 93 Q135 100 130 103 L80 103 Z" fill="#e5e7eb" opacity="0.5"/>
      
      <!-- Camera lens outer circle -->
      <circle cx="115" cy="100" r="10" fill="none" stroke="url(#silverGradPrint)" stroke-width="2"/>
      
      <!-- Camera lens inner circle -->
      <circle cx="115" cy="100" r="6" fill="url(#blueGradPrint)"/>
      
      <!-- Camera lens center -->
      <circle cx="115" cy="100" r="3" fill="#1e40af"/>
      
      <!-- Network elements -->
      <circle cx="95" cy="63" r="2" fill="#3b82f6" opacity="0.8"/>
      <circle cx="102" cy="61" r="1.5" fill="#3b82f6" opacity="0.6"/>
      <circle cx="107" cy="64" r="1.5" fill="#3b82f6" opacity="0.6"/>
      <circle cx="104" cy="69" r="1.5" fill="#3b82f6" opacity="0.6"/>
      
      <!-- Connection lines for network -->
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
            @page {
                size: A4;
                margin: 20mm;
            }
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Arial', sans-serif;
                font-size: 14px;
                line-height: 1.5;
                color: #333;
                background: white;
            }
            
            .receipt-container {
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                border: 2px solid #e5e7eb;
                border-radius: 8px;
            }
            
            .header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid #3b82f6;
            }
            
            .company-logo {
                width: 80px;
                height: 60px;
                margin: 0 auto 15px auto;
                background-image: url('${companyLogo}');
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
            }
            
            .company-name {
                font-size: 28px;
                font-weight: bold;
                color: #1e40af;
                margin-bottom: 10px;
            }
            
            .company-info {
                font-size: 12px;
                color: #6b7280;
                margin-bottom: 5px;
            }
            
            .receipt-title {
                font-size: 24px;
                font-weight: bold;
                margin: 20px 0 10px 0;
                color: #1f2937;
            }
            
            .receipt-number {
                font-size: 14px;
                color: #6b7280;
                margin-bottom: 20px;
            }
            
            .info-section {
                display: flex;
                justify-content: space-between;
                margin-bottom: 30px;
                padding: 20px;
                background-color: #f9fafb;
                border-radius: 6px;
            }
            
            .customer-info, .transaction-info {
                flex: 1;
            }
            
            .customer-info {
                margin-right: 40px;
            }
            
            .info-title {
                font-weight: bold;
                margin-bottom: 10px;
                color: #374151;
                font-size: 16px;
            }
            
            .info-item {
                margin-bottom: 8px;
                display: flex;
            }
            
            .info-label {
                font-weight: 600;
                width: 120px;
                color: #6b7280;
            }
            
            .info-value {
                color: #1f2937;
            }
            
            .items-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 30px;
                border: 1px solid #e5e7eb;
                border-radius: 6px;
                overflow: hidden;
            }
            
            .items-table th {
                background-color: #3b82f6;
                color: white;
                padding: 15px;
                text-align: left;
                font-weight: 600;
            }
            
            .items-table td {
                padding: 15px;
                border-bottom: 1px solid #e5e7eb;
            }
            
            .items-table tr:last-child td {
                border-bottom: none;
            }
            
            .items-table tr:nth-child(even) {
                background-color: #f8fafc;
            }
            
            .text-right {
                text-align: right;
            }
            
            .text-center {
                text-align: center;
            }
            
            .total-section {
                margin-top: 30px;
                padding: 20px;
                background-color: #f0f9ff;
                border: 2px solid #3b82f6;
                border-radius: 8px;
            }
            
            .total-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                font-size: 16px;
            }
            
            .total-final {
                font-size: 20px;
                font-weight: bold;
                color: #1e40af;
                padding-top: 10px;
                border-top: 2px solid #3b82f6;
                margin-top: 15px;
            }
            
            .footer {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                text-align: center;
            }
            
            .footer-logo {
                width: 60px;
                height: 45px;
                margin: 10px auto;
                background-image: url('${companyLogo}');
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
                opacity: 0.7;
            }
            
            .thank-you {
                font-size: 18px;
                font-weight: bold;
                color: #1e40af;
                margin-bottom: 10px;
            }
            
            .footer-note {
                font-size: 12px;
                color: #6b7280;
                margin-bottom: 20px;
            }
            
            .print-info {
                font-size: 10px;
                color: #9ca3af;
                margin-top: 20px;
            }
            
            @media print {
                .receipt-container {
                    border: none;
                    box-shadow: none;
                }
                
                .print-info {
                    display: none;
                }
            }
        </style>
    </head>
    <body>
        <div class="receipt-container">
            <!-- Header -->
            <div class="header">
                <div class="company-logo"></div>
                <div class="company-name">${companyName}</div>
                <div class="company-info">${address}</div>
                <div class="company-info">Telp: ${phone} | Email: ${email}</div>
                <div class="company-info">Website: ${website}</div>
                
                <div class="receipt-title">INVOICE</div>
                <div class="receipt-number">No. Receipt: #${sale.id}</div>
            </div>
            
            <!-- Customer and Transaction Info -->
            <div class="info-section">
                <div class="customer-info">
                    <div class="info-title">Informasi Customer:</div>
                    <div class="info-item">
                        <span class="info-label">Nama:</span>
                        <span class="info-value">${sale.customer}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Email:</span>
                        <span class="info-value">${sale.customerEmail || '-'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Telepon:</span>
                        <span class="info-value">${sale.customerPhone || '-'}</span>
                    </div>
                </div>
                
                <div class="transaction-info">
                    <div class="info-title">Informasi Transaksi:</div>
                    <div class="info-item">
                        <span class="info-label">Tanggal:</span>
                        <span class="info-value">${formatDate(sale.date)}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Waktu Print:</span>
                        <span class="info-value">${formatTime()}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Status:</span>
                        <span class="info-value">${sale.status || 'Completed'}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Payment:</span>
                        <span class="info-value">${sale.paymentMethod || 'Bank Transfer'}</span>
                    </div>
                </div>
            </div>
            
            <!-- Items Table -->
            <table class="items-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Deskripsi Layanan/Produk</th>
                        <th class="text-center">Qty</th>
                        <th class="text-right">Harga Satuan</th>
                        <th class="text-right">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-center">1</td>
                        <td>
                            <strong>${sale.productName}</strong>
                            ${sale.notes ? `<br><small style="color: #6b7280;">${sale.notes}</small>` : ''}
                        </td>
                        <td class="text-center">${sale.quantity}</td>
                        <td class="text-right">${formatCurrency(sale.total / sale.quantity)}</td>
                        <td class="text-right"><strong>${formatCurrency(sale.total)}</strong></td>
                    </tr>
                </tbody>
            </table>
            
            <!-- Total Section -->
            <div class="total-section">
                <div class="total-row">
                    <span>Subtotal:</span>
                    <span>${formatCurrency(sale.total)}</span>
                </div>
                <div class="total-row">
                    <span>PPN (11%):</span>
                    <span>${formatCurrency(sale.total * 0.11)}</span>
                </div>
                <div class="total-row total-final">
                    <span>TOTAL PEMBAYARAN:</span>
                    <span>${formatCurrency(sale.total * 1.11)}</span>
                </div>
            </div>
            
            <!-- Footer -->
            <div class="footer">
                <div class="footer-logo"></div>
                <div class="thank-you">Terima Kasih atas Kepercayaan Anda!</div>
                <div class="footer-note">
                    Untuk pertanyaan lebih lanjut mengenai layanan ini, silakan hubungi kami.<br>
                    Semua layanan dilindungi garansi sesuai dengan ketentuan yang berlaku.
                </div>
                
                <div class="print-info">
                    Dokumen ini dicetak secara otomatis pada ${new Date().toLocaleString('id-ID')}<br>
                    Powered by Lababil Solution Sales System
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
};

export const printReceipt = (sale, companyInfo) => {
  const receiptHTML = generateReceiptHTML(sale, companyInfo);
  
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  
  if (printWindow) {
    printWindow.document.write(receiptHTML);
    printWindow.document.close();
    
    // Wait for content to load then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        // Close window after printing
        printWindow.onafterprint = () => {
          printWindow.close();
        };
      }, 500);
    };
  } else {
    // Fallback if popup blocked
    alert('Pop-up diblokir! Silakan aktifkan pop-up untuk fitur print.');
  }
};

export const downloadReceiptPDF = async (sale, companyInfo) => {
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
