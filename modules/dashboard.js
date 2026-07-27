const DashboardModule = {
  render() {
    const container = document.getElementById('tab-dashboard');
    if (!container) return;

    const channels = AdminStorage.get('channels');
    const categories = AdminStorage.get('categories');
    const playlists = AdminStorage.get('playlists');

    container.innerHTML = `
      <div class="stats-grid">
        <div class="stat-card glass">
          <span style="color:var(--text-muted)"><i class="bi bi-tv"></i> Total Channels</span>
          <div class="val">${channels.length}</div>
        </div>
        <div class="stat-card glass">
          <span style="color:var(--text-muted)"><i class="bi bi-tags"></i> Categories</span>
          <div class="val">${categories.length}</div>
        </div>
        <div class="stat-card glass">
          <span style="color:var(--text-muted)"><i class="bi bi-collection-play"></i> Active Playlists</span>
          <div class="val">${playlists.filter(p => p.status === 'active').length}</div>
        </div>
        <div class="stat-card glass">
          <span style="color:var(--text-muted)"><i class="bi bi-cloud-check"></i> System Status</span>
          <div class="val" style="color:var(--success); font-size: 1.2rem;">Ready to Sync</div>
        </div>
      </div>

      <div class="glass" style="padding: 24px;">
        <h3 style="margin-bottom: 16px;"><i class="bi bi-activity"></i> Admin System Logs & Sync Readiness</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem;">
          Modifications made in this panel directly alter local storage models, which generate updated target JSON files upon selecting <strong>Sync & Publish</strong>. The Phase 1 Web Player polls these endpoints automatically every 30 seconds.
        </p>
      </div>
    `;
  }
};
