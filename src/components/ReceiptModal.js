import React from 'react';
import { X, Printer, Download } from 'lucide-react';
import { printReceipt, downloadReceiptPDF, formatCurrency, formatDate } from '../lib/printUtils';

export default function ReceiptModal({ 
  isOpen, 
  onClose, 
  sale, 
  companyInfo 
}) {
  if (!isOpen || !sale) return null;

  const handlePrint = () => {
    printReceipt(sale, companyInfo);
  };

  const handleDownload = () => {
    downloadReceiptPDF(sale, companyInfo);
  };

  const totalWithTax = sale.total * 1.11;
  const tax = sale.total * 0.11;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Preview Receipt</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Receipt Content */}
        <div className="p-6">
          {/* Company Header */}
          <div className="text-center mb-8 pb-6 border-b-2 border-blue-600">
            {/* Company Logo */}
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" className="text-white">
                {/* L Shape */}
                <rect x="3" y="6" width="4" height="16" fill="currentColor"/>
                <rect x="3" y="18" width="8" height="4" fill="currentColor"/>
                {/* B Shape with camera lens */}
                <rect x="14" y="6" width="4" height="16" fill="currentColor"/>
                <rect x="14" y="6" width="8" height="4" fill="currentColor"/>
                <rect x="14" y="12" width="6" height="3" fill="currentColor"/>
                <rect x="14" y="18" width="8" height="4" fill="currentColor"/>
                {/* Camera lens circle */}
                <circle cx="26" cy="14" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
                <circle cx="26" cy="14" r="1.5" fill="currentColor"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-blue-600 mb-2">
              {companyInfo.companyName}
            </h1>
            <p className="text-sm text-gray-600">{companyInfo.address}</p>
            <p className="text-sm text-gray-600">
              Telp: {companyInfo.phone} | Email: {companyInfo.email}
            </p>
            <p className="text-sm text-gray-600">Website: {companyInfo.website}</p>
            
            <h2 className="text-xl font-bold mt-4 text-gray-900">RECEIPT / KWITANSI</h2>
            <p className="text-sm text-gray-600">No. Receipt: #{sale.id}</p>
          </div>

          {/* Customer & Transaction Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold mb-3 text-gray-900">Informasi Customer:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="w-20 font-medium text-gray-600">Nama:</span>
                  <span className="text-gray-900">{sale.customer}</span>
                </div>
                <div className="flex">
                  <span className="w-20 font-medium text-gray-600">Email:</span>
                  <span className="text-gray-900">{sale.customerEmail || '-'}</span>
                </div>
                <div className="flex">
                  <span className="w-20 font-medium text-gray-600">Telepon:</span>
                  <span className="text-gray-900">{sale.customerPhone || '-'}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 text-gray-900">Informasi Transaksi:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="w-20 font-medium text-gray-600">Tanggal:</span>
                  <span className="text-gray-900">{formatDate(sale.date)}</span>
                </div>
                <div className="flex">
                  <span className="w-20 font-medium text-gray-600">Status:</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    {sale.status || 'Completed'}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-20 font-medium text-gray-600">Payment:</span>
                  <span className="text-gray-900">{sale.paymentMethod || 'Bank Transfer'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">No</th>
                  <th className="px-4 py-3 text-left">Deskripsi Layanan/Produk</th>
                  <th className="px-4 py-3 text-center">Qty</th>
                  <th className="px-4 py-3 text-right">Harga Satuan</th>
                  <th className="px-4 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3 text-center">1</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{sale.productName}</div>
                    {sale.notes && (
                      <div className="text-sm text-gray-600 mt-1">{sale.notes}</div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">{sale.quantity}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(sale.total / sale.quantity)}</td>
                  <td className="px-4 py-3 text-right font-semibold">{formatCurrency(sale.total)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Total Section */}
          <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>{formatCurrency(sale.total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>PPN (11%):</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="border-t-2 border-blue-600 pt-2 mt-3">
                <div className="flex justify-between text-lg font-bold text-blue-900">
                  <span>TOTAL PEMBAYARAN:</span>
                  <span>{formatCurrency(totalWithTax)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-lg font-semibold text-blue-600 mb-2">
              Terima Kasih atas Kepercayaan Anda!
            </p>
            <p className="text-sm text-gray-600">
              Untuk pertanyaan lebih lanjut mengenai layanan ini, silakan hubungi kami.<br />
              Semua layanan dilindungi garansi sesuai dengan ketentuan yang berlaku.
            </p>
          </div>
        </div>

        {/* Modal Footer - Action Buttons */}
        <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Tutup
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 text-green-700 bg-green-100 border border-green-300 rounded-lg hover:bg-green-200 flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Download HTML
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
