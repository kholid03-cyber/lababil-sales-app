'use client'
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Package, TrendingUp, Users, Plus, Edit, Trash2, Search, DollarSign, Calendar, BarChart3 } from 'lucide-react';

// Simulasi Firebase (gunakan state lokal untuk demo)
const mockData = {
  products: [
    { id: 1, name: 'Website Development', price: 5000000, stock: 10, category: 'Service' },
    { id: 2, name: 'Mobile App Development', price: 8000000, stock: 5, category: 'Service' },
    { id: 3, name: 'UI/UX Design', price: 3000000, stock: 15, category: 'Service' },
    { id: 4, name: 'Digital Marketing', price: 2000000, stock: 20, category: 'Service' }
  ],
  sales: [
    { id: 1, productId: 1, productName: 'Website Development', quantity: 1, total: 5000000, date: '2024-01-15', customer: 'PT ABC' },
    { id: 2, productId: 2, productName: 'Mobile App Development', quantity: 1, total: 8000000, date: '2024-01-14', customer: 'CV XYZ' }
  ]
};

export default function LababilSalesApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState(mockData.products);
  const [sales, setSales] = useState(mockData.sales);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  // Dashboard calculations
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalProducts = products.length;
  const totalSales = sales.length;
  const averageOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0;

  // Handle form submission
  const handleSubmit = () => {
    
    if (modalType === 'product') {
      if (editingItem) {
        setProducts(products.map(p => p.id === editingItem.id ? { ...p, ...formData } : p));
      } else {
        const newProduct = {
          id: Date.now(),
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock)
        };
        setProducts([...products, newProduct]);
      }
    } else if (modalType === 'sale') {
      const product = products.find(p => p.id === parseInt(formData.productId));
      const newSale = {
        id: Date.now(),
        productId: product.id,
        productName: product.name,
        quantity: parseInt(formData.quantity),
        total: product.price * parseInt(formData.quantity),
        date: new Date().toISOString().split('T')[0],
        customer: formData.customer
      };
      setSales([...sales, newSale]);
      
      // Update stock
      setProducts(products.map(p => 
        p.id === product.id ? { ...p, stock: p.stock - parseInt(formData.quantity) } : p
      ));
    }
    
    setShowModal(false);
    setFormData({});
    setEditingItem(null);
  };

  // Handle delete
  const handleDelete = (type, id) => {
    if (type === 'product') {
      setProducts(products.filter(p => p.id !== id));
    } else if (type === 'sale') {
      setSales(sales.filter(s => s.id !== id));
    }
  };

  // Open modal
  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setFormData(item || {});
    setShowModal(true);
  };

  // Filtered data
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSales = sales.filter(sale =>
    sale.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Lababil Solution</h1>
            </div>
            <div className="text-sm text-gray-500">
              Sistem Penjualan Digital
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-8">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'products', label: 'Produk', icon: Package },
            { id: 'sales', label: 'Penjualan', icon: TrendingUp }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="bg-green-500 text-white p-3 rounded-lg">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="bg-blue-500 text-white p-3 rounded-lg">
                    <Package className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Produk</p>
                    <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="bg-purple-500 text-white p-3 rounded-lg">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Penjualan</p>
                    <p className="text-2xl font-bold text-gray-900">{totalSales}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="bg-orange-500 text-white p-3 rounded-lg">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Rata-rata Order</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(averageOrderValue)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Sales */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <h3 className="text-lg font-medium text-gray-900">Penjualan Terbaru</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {sales.slice(0, 5).map(sale => (
                    <div key={sale.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{sale.productName}</p>
                        <p className="text-sm text-gray-600">{sale.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{formatCurrency(sale.total)}</p>
                        <p className="text-sm text-gray-600">{sale.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari produk..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <button
                onClick={() => openModal('product')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah Produk
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produk</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map(product => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(product.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => openModal('product', product)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete('product', product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Sales Tab */}
        {activeTab === 'sales' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari penjualan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <button
                onClick={() => openModal('sale')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Tambah Penjualan
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produk</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSales.map(sale => (
                    <tr key={sale.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {sale.productName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sale.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sale.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(sale.total)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sale.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDelete('sale', sale.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {modalType === 'product' 
                ? (editingItem ? 'Edit Produk' : 'Tambah Produk')
                : 'Tambah Penjualan'
              }
            </h3>
            
            <div className="space-y-4">
              {modalType === 'product' ? (
                <>
                  <input
                    type="text"
                    placeholder="Nama Produk"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Kategori"
                    value={formData.category || ''}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Harga"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Stok"
                    value={formData.stock || ''}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </>
              ) : (
                <>
                  <select
                    value={formData.productId || ''}
                    onChange={(e) => setFormData({...formData, productId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Pilih Produk</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name} - {formatCurrency(product.price)}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Nama Customer"
                    value={formData.customer || ''}
                    onChange={(e) => setFormData({...formData, customer: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Jumlah"
                    min="1"
                    value={formData.quantity || ''}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </>
              )}
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  {editingItem ? 'Update' : 'Simpan'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setFormData({});
                    setEditingItem(null);
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
