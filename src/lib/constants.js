// User Roles dan Permissions
export const USER_ROLES = {
  ADMIN: 'admin',
  KASIR: 'kasir'
};

export const PERMISSIONS = {
  // Product permissions
  CREATE_PRODUCT: 'create_product',
  READ_PRODUCT: 'read_product',
  UPDATE_PRODUCT: 'update_product',
  DELETE_PRODUCT: 'delete_product',
  
  // Sales permissions
  CREATE_SALE: 'create_sale',
  READ_SALE: 'read_sale',
  UPDATE_SALE: 'update_sale',
  DELETE_SALE: 'delete_sale',
  
  // User management permissions
  CREATE_USER: 'create_user',
  READ_USER: 'read_user',
  UPDATE_USER: 'update_user',
  DELETE_USER: 'delete_user',
  
  // Settings access
  ACCESS_SETTINGS: 'access_settings',
  
  // Print permissions
  PRINT_RECEIPT: 'print_receipt',
  DOWNLOAD_RECEIPT: 'download_receipt',
};

// Role-based permissions mapping
export const ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: [
    // Full access to all permissions
    PERMISSIONS.CREATE_PRODUCT,
    PERMISSIONS.READ_PRODUCT,
    PERMISSIONS.UPDATE_PRODUCT,
    PERMISSIONS.DELETE_PRODUCT,
    PERMISSIONS.CREATE_SALE,
    PERMISSIONS.READ_SALE,
    PERMISSIONS.UPDATE_SALE,
    PERMISSIONS.DELETE_SALE,
    PERMISSIONS.CREATE_USER,
    PERMISSIONS.READ_USER,
    PERMISSIONS.UPDATE_USER,
    PERMISSIONS.DELETE_USER,
    PERMISSIONS.ACCESS_SETTINGS,
    PERMISSIONS.PRINT_RECEIPT,
    PERMISSIONS.DOWNLOAD_RECEIPT,
  ],
  [USER_ROLES.KASIR]: [
    // Limited access - no delete sales, no user management, no settings
    PERMISSIONS.READ_PRODUCT,
    PERMISSIONS.CREATE_SALE,
    PERMISSIONS.READ_SALE,
    PERMISSIONS.PRINT_RECEIPT,
    PERMISSIONS.DOWNLOAD_RECEIPT,
  ]
};

// Helper function to check if user has permission
export const hasPermission = (userRole, permission) => {
  const rolePermissions = ROLE_PERMISSIONS[userRole] || [];
  return rolePermissions.indexOf(permission) !== -1;
};

// Default users - akan dipindah ke database/localStorage nanti
export const DEFAULT_USERS = [
  {
    id: '1',
    username: 'admin',
    password: 'F@ruq2021',
    name: 'Administrator',
    role: USER_ROLES.ADMIN,
    email: 'admin@lababilsolution.com',
    createdAt: '2024-01-01',
    isActive: true
  },
  {
    id: '2',
    username: 'kasir',
    password: 'kasir123',
    name: 'Cashier',
    role: USER_ROLES.KASIR,
    email: 'kasir@lababilsolution.com',
    createdAt: '2024-01-01',
    isActive: true
  }
];

// Company information
export const COMPANY_INFO = {
  companyName: 'Lababil Solution',
  address: 'Jakarta, Indonesia',
  phone: '+62 21-1234-5678',
  email: 'info@lababilsolution.com',
  website: 'www.lababilsolution.com',
  logo: '/logo.png',
  bankAccount: 'BCA 7870598488 a/n A KHOLID'
};

// UI Theme constants
export const UI_THEME = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe', 
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a'
    },
    success: {
      50: '#f0fdf4',
      500: '#22c55e',
      600: '#16a34a'
    },
    warning: {
      50: '#fffbeb',
      500: '#f59e0b',
      600: '#d97706'
    },
    error: {
      50: '#fef2f2',
      500: '#ef4444',
      600: '#dc2626'
    }
  },
  gradients: {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700',
    primaryHover: 'hover:from-blue-700 hover:to-blue-800',
    card: 'bg-gradient-to-br from-white to-blue-50',
    header: 'bg-gradient-to-r from-blue-50 via-white to-blue-50'
  }
};

