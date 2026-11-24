// ==========================================
// AUTHENTICATION (SIGN UP, LOGIN, LOGOUT)
// ==========================================

let authIsSignUp = true;

function renderAuthHeader() {
  const container = document.getElementById('auth-header-controls');
  if (!container) return;

  if (AppState.currentUser) {
    container.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="hidden sm:block text-right">
          <div class="text-xs text-slate-400">Signed in as</div>
          <div class="text-sm font-bold text-amber-400">${AppState.currentUser.name}</div>
        </div>
        <button onclick="logoutUser()" class="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-3 py-2 rounded-lg transition-colors border border-slate-700">
          Log Out
        </button>
      </div>
    `;
  } else {
    container.innerHTML = `
      <button onclick="openAuthModal('Log in to upload properties, view messages, or book meetings.')" class="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl transition-all shadow-md text-xs sm:text-sm flex items-center gap-1.5">
        <i class="fas fa-user"></i>
        <span>Sign In / Sign Up</span>
      </button>
    `;
  }
}

function openAuthModal(intentMessage = 'Please log in or sign up to proceed.') {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return;

  modalRoot.innerHTML = `
    <div class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div class="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200">
        <div class="flex justify-between items-center border-b border-slate-100 pb-3">
          <h3 class="font-serif font-bold text-lg text-slate-900">
            ${authIsSignUp ? 'Create Account / Sign Up' : 'Sign In to Account'}
          </h3>
          <button onclick="closeModal()" class="text-slate-400 hover:text-slate-700">
            <i class="fas fa-times text-lg"></i>
          </button>
        </div>

        <div class="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-900 font-medium flex items-center gap-2">
          <i class="fas fa-lock text-amber-600"></i>
          <span>${intentMessage}</span>
        </div>

        <div id="auth-error-box" class="hidden bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs font-semibold"></div>

        <form onsubmit="handleAuthSubmit(event)" class="space-y-3.5 text-xs">
          ${authIsSignUp ? `
            <div>
              <label class="block font-bold text-slate-700 mb-1">Full Name *</label>
              <input type="text" id="auth-name" required placeholder="e.g. Chidi Nnamdi" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-amber-500" />
            </div>
          ` : ''}

          <div>
            <label class="block font-bold text-slate-700 mb-1">Email Address *</label>
            <input type="email" id="auth-email" required placeholder="user@gmail.com" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-amber-500" />
          </div>

          ${authIsSignUp ? `
            <div>
              <label class="block font-bold text-slate-700 mb-1">Phone Number</label>
              <input type="tel" id="auth-phone" placeholder="+234 800 000 0000" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-amber-500" />
            </div>
          ` : ''}

          <div>
            <label class="block font-bold text-slate-700 mb-1">Password *</label>
            <div class="relative">
              <input type="password" id="auth-password" required placeholder="Min 6 characters" class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3.5 pr-10 py-2.5 text-slate-800 focus:outline-none focus:border-amber-500" />
              <button type="button" onclick="togglePasswordField('auth-password', this)" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <i class="fas fa-eye"></i>
              </button>
            </div>
          </div>

          ${authIsSignUp ? `
            <div>
              <label class="block font-bold text-slate-700 mb-1">Confirm Password *</label>
              <div class="relative">
                <input type="password" id="auth-confirm-password" required placeholder="Re-enter password" class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-3.5 pr-10 py-2.5 text-slate-800 focus:outline-none focus:border-amber-500" />
                <button type="button" onclick="togglePasswordField('auth-confirm-password', this)" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <i class="fas fa-eye"></i>
                </button>
              </div>
            </div>
          ` : ''}

          <button type="submit" class="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 rounded-xl transition-all shadow-md text-xs uppercase tracking-wider mt-2">
            ${authIsSignUp ? 'Sign Up & Continue' : 'Sign In'}
          </button>
        </form>

        <div class="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
          ${authIsSignUp ? `
            Already have an account?
            <button onclick="switchAuthMode(false, '${intentMessage.replace(/'/g, "\\'")}')" class="text-amber-600 font-bold hover:underline ml-1">Log In</button>
          ` : `
            Don't have an account?
            <button onclick="switchAuthMode(true, '${intentMessage.replace(/'/g, "\\'")}')" class="text-amber-600 font-bold hover:underline ml-1">Sign Up</button>
          `}
        </div>
      </div>
    </div>
  `;
}

function switchAuthMode(toSignUp, intentMessage) {
  authIsSignUp = toSignUp;
  openAuthModal(intentMessage);
}

function togglePasswordField(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    btn.innerHTML = '<i class="fas fa-eye-slash"></i>';
  } else {
    input.type = 'password';
    btn.innerHTML = '<i class="fas fa-eye"></i>';
  }
}

function handleAuthSubmit(e) {
  e.preventDefault();
  const errorBox = document.getElementById('auth-error-box');
  const email = (document.getElementById('auth-email')?.value || '').trim().toLowerCase();
  const password = document.getElementById('auth-password')?.value || '';

  const showError = (msg) => {
    if (errorBox) {
      errorBox.textContent = msg;
      errorBox.classList.remove('hidden');
    }
  };

  if (!email || !password) {
    showError('Please fill in all required fields.');
    return;
  }

  if (password.length < 6) {
    showError('Password must be at least 6 characters long.');
    return;
  }

  if (authIsSignUp) {
    const name = (document.getElementById('auth-name')?.value || '').trim();
    const phone = (document.getElementById('auth-phone')?.value || '').trim();
    const confirmPassword = document.getElementById('auth-confirm-password')?.value || '';

    if (password !== confirmPassword) {
      showError('Passwords do not match. Please recheck.');
      return;
    }

    if (AppState.registeredUsers.some(u => u.email === email)) {
      showError('An account with this email already exists. Please log in.');
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name: name || email.split('@')[0],
      email,
      phone: phone || '+234 800 000 0000',
      password
    };

    AppState.registeredUsers.push(newUser);
    AppState.currentUser = newUser;
    closeModal();
    renderApp();
    showToast(`Welcome, ${newUser.name}! Account created successfully.`);
  } else {
    const matched = AppState.registeredUsers.find(u => u.email === email && u.password === password);
    if (matched) {
      AppState.currentUser = matched;
      closeModal();
      renderApp();
      showToast(`Welcome back, ${matched.name}!`);
    } else if (AppState.registeredUsers.some(u => u.email === email)) {
      showError('Incorrect password. Please try again.');
    } else {
      const quickUser = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email,
        phone: '+234 800 000 0000',
        password
      };
      AppState.registeredUsers.push(quickUser);
      AppState.currentUser = quickUser;
      closeModal();
      renderApp();
      showToast(`Welcome back, ${quickUser.name}!`);
    }
  }
}

function logoutUser() {
  AppState.currentUser = null;
  renderApp();
  showToast('You have been logged out.');
}