const NoticesModule = {
  render() {
    const container = document.getElementById('tab-notices');
    if (!container) return;

    const notices = AdminStorage.get('notices');

    container.innerHTML = `
      <div class="glass" style="padding:20px; margin-bottom:24px;">
        <h3>Broadcast Alert / Notice</h3>
        <form id="add-notice-form" style="display:flex; flex-direction:column; gap:12px; margin-top:12px;">
          <select id="notice-type" class="form-control">
            <option value="ticker">Scrolling Header Ticker</option>
            <option value="popup">Modal Popup Notification</option>
          </select>
          <input type="text" id="notice-msg" placeholder="Notice text message..." class="form-control" required>
          <button type="submit" class="btn btn-primary" style="width:fit-content;">Publish Alert</button>
        </form>
      </div>

      <div class="glass" style="padding:20px;">
        <h3>Active Alerts</h3>
        <table class="admin-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${notices.map(n => `
              <tr>
                <td><code>${n.type}</code></td>
                <td>${n.message}</td>
                <td><span style="color:${n.active ? 'var(--success)' : 'var(--danger)'}">${n.active ? 'ACTIVE' : 'DISABLED'}</span></td>
                <td>
                  <button class="btn btn-outline" style="padding:4px 8px;" onclick="NoticesModule.toggle('${n.id}')">Toggle</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('add-notice-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const type = document.getElementById('notice-type').value;
      const message = document.getElementById('notice-msg').value;

      const newNotice = { id: `n-${Date.now()}`, type, message, active: true };
      const existing = AdminStorage.get('notices');
      AdminStorage.set('notices', [...existing, newNotice]);
      Toast.show('Notice created.');
      this.render();
    });
  },

  toggle(id) {
    const notices = AdminStorage.get('notices');
    const n = notices.find(item => item.id === id);
    if (n) {
      n.active = !n.active;
      AdminStorage.set('notices', notices);
      this.render();
    }
  }
};
