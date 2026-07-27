const AuthManager = {
  initLogin() {
    const form = document.getElementById('login-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const u = document.getElementById('username').value;
      const p = document.getElementById('password').value;

      if (u === 'admin' && p === 'admin') {
        sessionStorage.setItem('gom3u_admin_session', 'active');
        window.location.href = './admin.html';
      } else {
        const alert = document.getElementById('login-alert');
        alert.textContent = 'Invalid administrator credentials.';
        alert.style.display = 'block';
      }
    });
  },

  requireAuth() {
    if (!sessionStorage.getItem('gom3u_admin_session')) {
      window.location.href = './login.html';
    }
  },

  logout() {
    sessionStorage.removeItem('gom3u_admin_session');
    window.location.href = './login.html';
  }
};
