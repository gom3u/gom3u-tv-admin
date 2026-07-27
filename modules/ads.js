const AdsModule = {
  render() {
    const container = document.getElementById('tab-ads');
    if (!container) return;

    const ads = AdminStorage.get('ads');

    container.innerHTML = `
      <div class="glass" style="padding:20px;">
        <h3>Banner Advertisement Config</h3>
        <div class="form-group" style="margin-top:12px;">
          <label>Banner Image URL</label>
          <input type="url" id="ad-banner-url" class="form-control" value="${ads.banner?.image_url || ''}">
        </div>
        <div class="form-group">
          <label>Click Target URL</label>
          <input type="url" id="ad-target-url" class="form-control" value="${ads.banner?.target_url || ''}">
        </div>
        <button class="btn btn-primary" onclick="AdsModule.save()">Save Ad Settings</button>
      </div>
    `;
  },

  save() {
    const ads = AdminStorage.get('ads');
    ads.banner = {
      enabled: true,
      image_url: document.getElementById('ad-banner-url').value,
      target_url: document.getElementById('ad-target-url').value
    };
    AdminStorage.set('ads', ads);
    Toast.show('Ad configurations saved.');
  }
};
