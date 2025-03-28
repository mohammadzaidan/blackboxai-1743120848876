// Dashboard module
const Dashboard = {
  init() {
    this.renderStatsCards();
    this.setupEventListeners();
  },

  renderStatsCards() {
    const statsContainer = document.querySelector('.grid');
    if (!statsContainer) return;

    const stats = [
      { 
        title: 'Total Revenue', 
        value: 12540.00,
        change: 12.5,
        icon: 'dollar-sign',
        color: 'bg-blue-100 text-blue-600'
      },
      {
        title: 'Outstanding Invoices',
        value: 8,
        change: -2.3,
        icon: 'file-invoice',
        color: 'bg-orange-100 text-orange-600'
      },
      {
        title: 'Expenses',
        value: 7840.00,
        change: 5.7,
        icon: 'receipt',
        color: 'bg-purple-100 text-purple-600'
      },
      {
        title: 'Active Customers',
        value: 24,
        change: 8.1,
        icon: 'users',
        color: 'bg-green-100 text-green-600'
      }
    ];

    statsContainer.innerHTML = stats.map(stat => `
      <div class="dashboard-card">
        <div class="flex items-center justify-between mb-4">
          <div class="${stat.color} p-3 rounded-lg">
            <i class="fas fa-${stat.icon}"></i>
          </div>
          <span class="text-sm ${stat.change >= 0 ? 'text-green-500' : 'text-red-500'}">
            ${stat.change >= 0 ? '+' : ''}${stat.change}%
          </span>
        </div>
        <h3 class="dashboard-card-title">${stat.title}</h3>
        <p class="dashboard-card-value">${stat.title.includes('Revenue') || stat.title.includes('Expenses') 
          ? formatCurrency(stat.value) 
          : stat.value}</p>
      </div>
    `).join('');
  },

  setupEventListeners() {
    // Add any dashboard-specific event listeners here
  }
};

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => Dashboard.init());