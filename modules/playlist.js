const PlaylistModule = {
  render() {
    const container = document.getElementById('tab-playlists');
    if (!container) return;

    const playlists = AdminStorage.get('playlists');

    container.innerHTML = `
      <div class="glass" style="padding: 20px; margin-bottom: 24px;">
        <h3 style="margin-bottom: 16px;"><i class="bi bi-file-earmark-arrow-up-fill"></i> Import External M3U File</h3>
        <div style="display:flex; gap: 12px;">
          <input type="file" id="m3u-file-input" accept=".m3u,.m3u8" class="form-control" style="width: auto;">
          <button class="btn btn-primary" onclick="PlaylistModule.importM3U()"><i class="bi bi-upload"></i> Process & Append Channels</button>
        </div>
      </div>

      <div class="glass" style="padding: 20px;">
        <h3 style="margin-bottom: 16px;">Managed Playlists</h3>
        <table class="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Version</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${playlists.map(p => `
              <tr>
                <td>${p.id}</td>
                <td><strong>${p.name}</strong></td>
                <td>${p.version}</td>
                <td><span style="color:${p.status === 'active' ? 'var(--success)' : 'var(--danger)'}">${p.status.toUpperCase()}</span></td>
                <td>
                  <button class="btn btn-outline" style="padding:4px 8px;" onclick="PlaylistModule.toggleStatus('${p.id}')">Toggle Status</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  importM3U() {
    const fileInput = document.getElementById('m3u-file-input');
    if (!fileInput.files.length) {
      Toast.show('Please select a local .m3u file first.', 'warning');
      return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split('\n');
      const parsedChannels = [];
      let currentChannel = {};

      lines.forEach(line => {
        line = line.trim();
        if (line.startsWith('#EXTINF:')) {
          const nameMatch = line.match(/,(.+)$/);
          const logoMatch = line.match(/tvg-logo="([^"]+)"/);
          const groupMatch = line.match(/group-title="([^"]+)"/);

          currentChannel = {
            id: `ch-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            name: nameMatch ? nameMatch[1].trim() : 'Imported Channel',
            logo: logoMatch ? logoMatch[1] : '',
            group: groupMatch ? groupMatch[1] : 'General',
            country: 'INT',
            language: 'English',
            favorite: false,
            status: 'active'
          };
        } else if (line.length > 0 && !line.startsWith('#')) {
          currentChannel.stream_url = line;
          currentChannel.stream_type = line.includes('.m3u8') ? 'hls' : 'mp4';
          if (currentChannel.stream_url) {
            parsedChannels.push({ ...currentChannel });
            currentChannel = {};
          }
        }
      });

      if (parsedChannels.length > 0) {
        const existing = AdminStorage.get('channels');
        AdminStorage.set('channels', [...existing, ...parsedChannels]);
        Toast.show(`Successfully imported ${parsedChannels.length} channels from M3U!`);
        ChannelsModule.render();
        DashboardModule.render();
      } else {
        Toast.show('No valid channel streams identified in file.', 'danger');
      }
    };

    reader.readAsText(file);
  },

  toggleStatus(id) {
    const playlists = AdminStorage.get('playlists');
    const pl = playlists.find(p => p.id === id);
    if (pl) {
      pl.status = pl.status === 'active' ? 'inactive' : 'active';
      AdminStorage.set('playlists', playlists);
      this.render();
      DashboardModule.render();
    }
  }
};
