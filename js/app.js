// Main application initialization
document.addEventListener('DOMContentLoaded', function() {
  console.log('Invoice Management System initialized');
  
  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Sidebar navigation active state
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentPath === linkPath) {
      link.classList.add('bg-blue-50', 'text-blue-600');
      link.classList.remove('text-gray-700', 'hover:bg-gray-100');
    }
  });
});

// Utility functions
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Data store (will be replaced with proper backend later)
const dataStore = {
  invoices: [],
  vendors: [],
  customers: [],
  
  init() {
    // Load from localStorage if available
    const savedData = localStorage.getItem('invoiceAppData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      this.invoices = parsedData.invoices || [];
      this.vendors = parsedData.vendors || [];
      this.customers = parsedData.customers || [];
    }
  },
  
  save() {
    localStorage.setItem('invoiceAppData', JSON.stringify({
      invoices: this.invoices,
      vendors: this.vendors,
      customers: this.customers
    }));
  }
};

// Initialize data store
dataStore.init();