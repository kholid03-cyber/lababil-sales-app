import { formatCurrency, formatDate } from './printUtils';

export const generateSalesReportHTML = (sales, dateRange, companyInfo) => {
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalTransactions = sales.length;
  const averageTransaction = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Laporan Penjualan - ${companyInfo.companyName}</title>
        <style>
            @page {
                size: A4 landscape;
                margin: 15mm;
            }
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Arial', sans-serif;
                font-size: 12px;
                line-height: 1.4;
                color: #333;
                background: white;
            }
            
            .report-container {
                max-width: 100%;
                margin: 0 auto;
                padding: 20px;
            }
            
            .header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid #3b82f6;
            }
            
            .company-name {
                font-size: 24px;
                font-weight: bold;
                color: #1e40af;
                margin-bottom: 8px;
            }
            
            .company-info {
                font-size: 11px;
                color: #6b7280;
                margin-bottom: 3px;
            }
            
            .report-title {
                font-size: 20px;
                font-weight: bold;
                margin: 15px 0 8px 0;
                color: #1f2937;
            }
            
            .report-period {
                font-size: 12px;
                color: #6b7280;
                margin-bottom: 20px;
            }
            
            .summary-section {
                display: flex;
                justify-content: space-between;
                margin-bottom: 30px;
                gap: 20px;
            }
            
            .summary-card {
                flex: 1;
                padding: 15px;
                background-color: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 6px;
                text-align: center;
            }
            
            .summary-title {
                font-size: 11px;
                color: #64748b;
                margin-bottom: 8px;
                text-transform: uppercase;
                font-weight: 600;
            }
            
            .summary-value {
                font-size: 18px;
                font-weight: bold;
                color: #1e40af;
            }
            
            .sales-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 30px;
                border: 1px solid #e5e7eb;
                border-radius: 6px;
                overflow: hidden;
            }
            
            .sales-table th {
                background-color: #3b82f6;
                color: white;
                padding: 12px 8px;
                text-align: left;
                font-weight: 600;
                font-size: 11px;
            }
            
            .sales-table td {
                padding: 10px 8px;
                border-bottom: 1px solid #e5e7eb;
                font-size: 11px;
            }
            
            .sales-table tr:last-child td {
                border-bottom: none;
            }
            
            .sales-table tr:nth-child(even) {
                background-color: #f8fafc;
            }
            
            .text-right {
                text-align: right;
            }
            
            .text-center {
                text-align: center;
            }
            
            .total-row {
                background-color: #eff6ff !important;
                font-weight: bold;
                border-top: 2px solid #3b82f6;
            }
            
            .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                text-align: center;
                font-size: 10px;
                color: #6b7280;
            }
            
            .print-info {
                margin-top: 20px;
                font-size: 9px;
                color: #9ca3af;
            }
            
            @media print {
                .report-container {
                    padding: 10px;
                }
                
                .print-info {
                    display: none;
                }
            }
        </style>
    </head>
    <body>
        <div class="report-container">
            <!-- Header -->
            <div class="header">
                <div class="company-name">${companyInfo.companyName}</div>
                <div class="company-info">${companyInfo.address}</div>
                <div class="company-info">Telp: ${companyInfo.phone} | Email: ${companyInfo.email}</div>
                <div class="company-info">Website: ${companyInfo.website}</div>
                
                <div class="report-title">LAPORAN PENJUALAN</div>
                <div class="report-period">${dateRange || 'Semua Periode'}</div>
            </div>
            
            <!-- Summary Section -->
            <div class="summary-section">
                <div class="summary-card">
                    <div class="summary-title">Total Revenue</div>
                    <div class="summary-value">${formatCurrency(totalRevenue)}</div>
                </div>
                <div class="summary-card">
                    <div class="summary-title">Total Transaksi</div>
                    <div class="summary-value">${totalTransactions}</div>
                </div>
                <div class="summary-card">
                    <div class="summary-title">Rata-rata Transaksi</div>
                    <div class="summary-value">${formatCurrency(averageTransaction)}</div>
                </div>
                <div class="summary-card">
                    <div class="summary-title">Tanggal Cetak</div>
                    <div class="summary-value" style="font-size: 14px;">${formatDate(new Date().toISOString().split('T')[0])}</div>
                </div>
            </div>
            
            <!-- Sales Table -->
            <table class="sales-table">
                <thead>
                    <tr>
                        <th style="width: 5%;">No</th>
                        <th style="width: 15%;">Tanggal</th>
                        <th style="width: 25%;">Customer</th>
                        <th style="width: 25%;">Produk/Layanan</th>
                        <th style="width: 8%;">Qty</th>
                        <th style="width: 12%;">Harga Satuan</th>
                        <th style="width: 12%;">Total</th>
                        <th style="width: 8%;">Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${sales.map((sale, index) => `
                        <tr>
                            <td class="text-center">${index + 1}</td>
                            <td>${formatDate(sale.date)}</td>
                            <td>
                                <strong>${sale.customer}</strong>
                                ${sale.customerEmail ? `<br><small>${sale.customerEmail}</small>` : ''}
                            </td>
                            <td>
                                <strong>${sale.productName}</strong>
                                ${sale.notes ? `<br><small style="color: #6b7280;">${sale.notes}</small>` : ''}
                            </td>
                            <td class="text-center">${sale.quantity}</td>
                            <td class="text-right">${formatCurrency(sale.total / sale.quantity)}</td>
                            <td class="text-right"><strong>${formatCurrency(sale.total)}</strong></td>
                            <td class="text-center">
                                <span style="background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 10px; font-size: 9px;">
                                    ${sale.status || 'Completed'}
                                </span>
                            </td>
                        </tr>
                    `).join('')}
                    
                    <!-- Total Row -->
                    <tr class="total-row">
                        <td colspan="6" class="text-right"><strong>TOTAL KESELURUHAN:</strong></td>
                        <td class="text-right"><strong>${formatCurrency(totalRevenue)}</strong></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            
            <!-- Product Summary -->
            <div style="margin-bottom: 30px;">
                <h3 style="font-size: 14px; margin-bottom: 15px; color: #1f2937;">Ringkasan Produk/Layanan:</h3>
                <table class="sales-table">
                    <thead>
                        <tr>
                            <th>Produk/Layanan</th>
                            <th class="text-center">Jumlah Terjual</th>
                            <th class="text-right">Total Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${Object.entries(
                            sales.reduce((acc, sale) => {
                                if (!acc[sale.productName]) {
                                    acc[sale.productName] = { quantity: 0, total: 0 };
                                }
                                acc[sale.productName].quantity += sale.quantity;
                                acc[sale.productName].total += sale.total;
                                return acc;
                            }, {})
                        ).map(([product, data]) => `
                            <tr>
                                <td><strong>${product}</strong></td>
                                <td class="text-center">${data.quantity}</td>
                                <td class="text-right"><strong>${formatCurrency(data.total)}</strong></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <!-- Footer -->
            <div class="footer">
                <p><strong>${companyInfo.companyName}</strong></p>
                <p>Laporan ini dibuat secara otomatis oleh sistem penjualan digital</p>
                
                <div class="print-info">
                    Dicetak pada: ${new Date().toLocaleString('id-ID')}<br>
                    Powered by Lababil Solution Sales System
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
};

export const printSalesReport = (sales, dateRange, companyInfo) => {
  const reportHTML = generateSalesReportHTML(sales, dateRange, companyInfo);
  
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  
  if (printWindow) {
    printWindow.document.write(reportHTML);
    printWindow.document.close();
    
    // Wait for content to load then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        // Close window after printing
        printWindow.onafterprint = () => {
          printWindow.close();
        };
      }, 1000);
    };
  } else {
    // Fallback if popup blocked
    alert('Pop-up diblokir! Silakan aktifkan pop-up untuk fitur print laporan.');
  }
};

export const downloadSalesReport = (sales, dateRange, companyInfo) => {
  const reportHTML = generateSalesReportHTML(sales, dateRange, companyInfo);
  
  try {
    // Create blob from HTML
    const blob = new Blob([reportHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const link = document.createElement('a');
    link.href = url;
    const fileName = `laporan-penjualan-${new Date().toISOString().split('T')[0]}.html`;
    link.download = fileName;
    link.click();
    
    // Cleanup
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading sales report:', error);
    alert('Gagal download laporan. Silakan coba lagi.');
  }
};
