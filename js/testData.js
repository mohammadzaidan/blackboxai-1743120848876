// Test data initialization
const TestData = {
  init() {
    if (dataStore.invoices.length === 0 && 
        dataStore.vendors.length === 0 && 
        dataStore.customers.length === 0) {
      this.loadSampleData();
    }
  },

  loadSampleData() {
    // Sample vendors
    dataStore.vendors = [
      {
        id: '1',
        name: 'Acme Supplies',
        email: 'contact@acme.com',
        phone: '555-123-4567',
        taxId: 'TAX-12345',
        address: '123 Business Rd, Cityville',
        paymentTerms: 'Net 30'
      },
      {
        id: '2',
        name: 'Tech Components Inc',
        email: 'sales@techcomp.com',
        phone: '555-987-6543',
        taxId: 'TAX-67890',
        address: '456 Tech Park, Techville',
        paymentTerms: 'Net 15'
      }
    ];

    // Sample customers
    dataStore.customers = [
      {
        id: '1',
        name: 'Global Solutions',
        email: 'accounting@globalsol.com',
        phone: '555-111-2222',
        taxId: 'CUST-123',
        address: '789 Corporate Blvd, Metropolis'
      }
    ];

    // Sample invoices
    dataStore.invoices = [
      {
        number: 'INV-2023-001',
        client: 'Global Solutions',
        date: '2023-05-15',
        items: [
          { description: 'Web Development', quantity: 10, price: 75.00 },
          { description: 'Consulting', quantity: 5, price: 100.00 }
        ],
        taxRate: 7.5,
        status: 'paid',
        total: 1331.25
      },
      {
        number: 'INV-2023-002',
        client: 'Global Solutions',
        date: '2023-06-20',
        items: [
          { description: 'Maintenance', quantity: 8, price: 50.00 }
        ],
        taxRate: 7.5,
        status: 'pending',
        total: 430.00
      }
    ];

    dataStore.save();
  }
};

// Initialize test data when DOM is loaded
document.addEventListener('DOMContentLoaded', () => TestData.init());