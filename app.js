// ==========================================
// MAIN APPLICATION CONTROLLER & NAVIGATION
// ==========================================

const NAV_TABS = [
  { id: 'home', label: 'Home / Properties', mobileLabel: 'Home' },
  { id: 'uploads', label: 'Upload Property', mobileLabel: 'Upload Property' },
  { id: 'messages', label: 'My Uploads & Messages', mobileLabel: 'My Uploads & Messages' },
  { id: 'admin', label: 'Contact Admin', mobileLabel: 'Contact Admin' }
];

function switchTab(tabId) {
  AppState.activeTab = tabId;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderApp();
}

function renderNavigation() {
  const desktopNav = document.getElementById('desktop-nav');
  const mobileNav = document.getElementById('mobile-nav');

  if (desktopNav) {
    desktopNav.innerHTML = NAV_TABS.map(tab => `
      <button onclick="switchTab('${tab.id}')" class="px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        AppState.activeTab === tab.id
          ? 'text-amber-400 bg-slate-800/90 shadow-inner font-semibold'
          : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
      }">
        ${tab.label}
      </button>
    `).join('');
  }

  if (mobileNav) {
    mobileNav.innerHTML = NAV_TABS.map(tab => `
      <button onclick="switchTab('${tab.id}')" class="px-3 py-1.5 rounded-md whitespace-nowrap ${
        AppState.activeTab === tab.id
          ? 'bg-amber-500 text-slate-950 font-bold'
          : 'text-slate-300 bg-slate-800'
      }">
        ${tab.mobileLabel}
      </button>
    `).join('');
  }
}

function renderApp() {
  renderNavigation();
  renderAuthHeader();

  const mainContent = document.getElementById('main-content');
  if (!mainContent) return;

  switch (AppState.activeTab) {
    case 'home':
      mainContent.innerHTML = renderHomeView();
      break;
    case 'uploads':
      mainContent.innerHTML = renderUploadView();
      break;
    case 'messages':
      mainContent.innerHTML = renderMessagesView();
      break;
    case 'admin':
      mainContent.innerHTML = renderAdminView();
      break;
    default:
      mainContent.innerHTML = renderHomeView();
  }
}

// Initialize Website on Page Load
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});