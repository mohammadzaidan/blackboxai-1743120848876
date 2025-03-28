// Vendor management module
const VendorManager = {
  init() {
    this.setupEventListeners();
    this.loadVendors();
  },

  setupEventListeners() {
    // Add vendor form submission handler
    const vendorForm = document.getElementById('vendor-form');
    if (vendorForm) {
      vendorForm.addEventListener('submit', this.handleSubmit.bind(this));
    }

    // Add search functionality
    const searchInput = document.getElementById('vendor-search');
    if (searchInput) {
      searchInput.addEventListener('input', this.handleSearch.bind(this));
    }
  },

  loadVendors() {
    // Load vendors from data store
    const vendors = dataStore.vendors;
    this.renderVendorList(vendors);
  },

  renderVendorList(vendors) {
    const tableBody = document.getElementById('vendor-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = vendors.map(vendor => `
      <tr>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="flex items-center">
            <div class="flex-shrink-0 h-10 w-10">
              <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span class="text-gray-600">${vendor.name.charAt(0).toUpperCase()}</span>
              </div>
            </div>
            <div class="ml-4">
              <div class="text-sm font-medium text-gray-900">${vendor.name}</div>
              <div class="text-sm text-gray-500">${vendor.email}</div>
            </div>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">${vendor.phone}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-500">${vendor.taxId || 'N/A'}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <a href="#" class="text-blue-600 hover:text-blue-900 mr-3">Edit</a>
          <a href="#" class="text-red-600 hover:text-red-900">Delete</a>
        </td>
      </tr>
    `).join('');
  },

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const vendorData = {
      id: Date.now().toString(),
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      taxId: formData.get('tax-id'),
      address: formData.get('address'),
      paymentTerms: formData.get('payment-terms')
    };

    dataStore.vendors.push(vendorData);
    dataStore.save();
    this.loadVendors();
    e.target.reset();
  },

  handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredVendors = dataStore.vendors.filter(vendor => 
      vendor.name.toLowerCase().includes(searchTerm) ||
      vendor.email.toLowerCase().includes(searchTerm) ||
      (vendor.phone && vendor.phone.includes(searchTerm))
    );
    this.renderVendorList(filteredVendors);
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => VendorManager.init());