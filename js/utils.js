const AdminStorage = {
  // Local persistence simulating live JSON network endpoints
  defaults: {
    channels: [
      { id: "ch-001", name: "Global News 24/7", logo: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=150", group: "News", country: "US", language: "English", stream_url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", stream_type: "hls", epg_id: "epg-news-24", description: "Global news feed.", favorite: false, status: "active" }
    ],
    categories: [
      { id: "cat-news", name: "News", icon: "bi-newspaper" },
      { id: "cat-sports", name: "Sports", icon: "bi-trophy-fill" }
    ],
    playlists: [
      { id: "pl-01", name: "Primary World Streams", description: "Global feeds", version: "1.0.0", last_updated: new Date().toISOString(), channel_source: "/data/channels.json", status: "active" }
    ],
    settings: { maintenance_mode: false, auto_play: true, default_volume: 80, reload_interval_seconds: 30 },
    theme: { app_name: "GoM3U TV", logo_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100", primary_color: "#00E5FF", accent_color: "#7C4DFF" },
    ads: { banner: { enabled: true, image_url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800", target_url: "#" }, popup: { enabled: false } },
    notices: [
      { id: "n-1", type: "ticker", message: "Welcome to GoM3U TV Admin Panel Data Interface.", active: true }
    ]
  },

  async init() {
    for (const key of Object.keys(this.defaults)) {
      if (!localStorage.getItem(`gom3u_data_${key}`)) {
        localStorage.setItem(`gom3u_data_${key}`, JSON.stringify(this.defaults[key]));
      }
    }
  },

  get(key) {
    return JSON.parse(localStorage.getItem(`gom3u_data_${key}`) || '[]');
  },

  set(key, data) {
    localStorage.setItem(`gom3u_data_${key}`, JSON.stringify(data));
  }
};

const Toast = {
  show(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<i class="bi bi-info-circle-fill"></i> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  }
};
