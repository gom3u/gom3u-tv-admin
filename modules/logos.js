const LogosModule = {
  render() {
    const container = document.getElementById('tab-logos');
    if (!container) return;

    const channels = AdminStorage.get('channels');
    const missingLogos = channels.filter(c => !c.logo || c.logo.trim() === '');

    container.innerHTML = `
      <div class="stats-grid" style="margin-bottom: 24px;">
        <div class="stat-card glass">
          <span style="color:var(--text-muted)">Total Indexed Logos</span>
          <div class="val">${channels.length - missingLogos.length}</div>
        </div>
        <div class="stat-card glass">
          <span style="color:var(--text-muted)">Missing Logo Links</span>
          <div class="val" style="color:var(--warning)">${missingLogos.length}</div>
        </div>
      </div>

      <div class="glass" style="padding: 20px;">
        <h3>Batch Logo Audit</h3>
        <table class="admin-table">
          <thead>
            <tr>
              <th>Channel</th>
              <th>Current Logo URL</th>
              <th>Preview</th>
            </tr>
          </thead>
          <tbody>
            ${channels.slice(0, 10).map(ch => `
              <tr>
                <td>${ch.name}</td>
                <td><input type="text" class="form-control" value="${ch.logo || ''}" onchange="LogosModule.update('${ch.id}', this.value)"></td>
                <td><img src="${ch.logo}" style="width:32px; height:32px; object-fit:contain;" onerror="this.src='https://via.placeholder.com/32'"></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  update(id, url) {
    const channels = AdminStorage.get('channels');
    const ch = channels.find(c => c.id === id);
    if (ch) {
      ch.logo = url;
      AdminStorage.set('channels', channels);
      Toast.show('Logo URL updated.');
    }
  }
};
