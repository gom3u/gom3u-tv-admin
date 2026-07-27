const ChannelsModule = {
  render() {
    const container = document.getElementById('tab-channels');
    if (!container) return;

    const channels = AdminStorage.get('channels');

    container.innerHTML = `
      <div class="glass" style="padding: 20px; margin-bottom: 24px;">
        <h3 style="margin-bottom: 16px;"><i class="bi bi-plus-circle-fill"></i> Add Channel</h3>
        <form id="add-channel-form" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
          <input type="text" id="ch-name" placeholder="Channel Name" class="form-control" required>
          <input type="text" id="ch-group" placeholder="Group/Category" class="form-control" required>
          <input type="url" id="ch-logo" placeholder="Logo Image URL" class="form-control">
          <input type="url" id="ch-url" placeholder="Stream URL (.m3u8 / .mp4)" class="form-control" required>
          <button type="submit" class="btn btn-primary"><i class="bi bi-check-circle"></i> Save Channel</button>
        </form>
      </div>

      <div class="glass" style="padding: 20px;">
        <h3>Channel Index (${channels.length})</h3>
        <table class="admin-table">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Name</th>
              <th>Group</th>
              <th>Stream Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${channels.map(ch => `
              <tr>
                <td><img src="${ch.logo}" style="width:36px; height:36px; object-fit:contain;" onerror="this.src='https://via.placeholder.com/36'"></td>
                <td><strong>${ch.name}</strong></td>
                <td>${ch.group || 'General'}</td>
                <td><code>${ch.stream_type || 'hls'}</code></td>
                <td><span style="color:${ch.status === 'active' ? 'var(--success)' : 'var(--danger)'}">${ch.status}</span></td>
                <td>
                  <button class="btn btn-danger" style="padding:4px 8px;" onclick="ChannelsModule.delete('${ch.id}')"><i class="bi bi-trash"></i></button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('add-channel-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const newCh = {
        id: `ch-${Date.now()}`,
        name: document.getElementById('ch-name').value,
        group: document.getElementById('ch-group').value,
        logo: document.getElementById('ch-logo').value,
        stream_url: document.getElementById('ch-url').value,
        stream_type: document.getElementById('ch-url').value.includes('.m3u8') ? 'hls' : 'mp4',
        country: 'US',
        language: 'English',
        favorite: false,
        status: 'active'
      };

      const existing = AdminStorage.get('channels');
      AdminStorage.set('channels', [newCh, ...existing]);
      Toast.show('Channel added successfully!');
      this.render();
      DashboardModule.render();
    });
  },

  delete(id) {
    let channels = AdminStorage.get('channels');
    channels = channels.filter(c => c.id !== id);
    AdminStorage.set('channels', channels);
    Toast.show('Channel removed.');
    this.render();
    DashboardModule.render();
  }
};
