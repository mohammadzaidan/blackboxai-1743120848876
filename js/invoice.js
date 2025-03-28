// Invoice module
const InvoiceManager = {
  init() {
    this.setupEventListeners();
    this.loadInvoices();
  },

  setupEventListeners() {
    // Add invoice form submission handler
    const invoiceForm = document.getElementById('invoice-form');
    if (invoiceForm) {
      invoiceForm.addEventListener('submit', this.handleSubmit.bind(this));
    }
  },

  loadInvoices() {
    // Load invoices from data store
    const invoices = dataStore.invoices;
    this.renderInvoiceList(invoices);
  },

  renderInvoiceList(invoices) {
    const tableBody = document.getElementById('invoice-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = invoices.map(invoice => `
      <tr>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm font-medium text-gray-900">${invoice.number}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">${invoice.client}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-500">${formatDate(invoice.date)}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">${formatCurrency(invoice.total)}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="status-badge ${this.getStatusClass(invoice.status)}">
            ${invoice.status}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <a href="#" class="text-blue-600 hover:text-blue-900 mr-3">View</a>
          <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
        </td>
      </tr>
    `).join('');
  },

  getStatusClass(status) {
    switch(status.toLowerCase()) {
      case 'paid':
        return 'status-paid';
      case 'pending':
        return 'status-pending';
      case 'overdue':
        return 'status-overdue';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  },

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const invoiceData = {
      number: formData.get('invoice-number'),
      client: formData.get('client'),
      date: formData.get('date'),
      items: JSON.parse(formData.get('items-json')),
      taxRate: parseFloat(formData.get('tax-rate')),
      status: 'pending',
      total: this.calculateTotal(formData)
    };

    dataStore.invoices.push(invoiceData);
    dataStore.save();
    this.loadInvoices();
    e.target.reset();
  },

  calculateTotal(formData) {
    const items = JSON.parse(formData.get('items-json'));
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const taxRate = parseFloat(formData.get('tax-rate')) / 100;
    return subtotal + (subtotal * taxRate);
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => InvoiceManager.init());