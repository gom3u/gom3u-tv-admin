const ThemeModule = {
  render() {
    const container = document.getElementById('tab-theme');
    if (!container) return;

    const theme = AdminStorage.get('theme');

    container.innerHTML = `
      <div class="glass" style="padding:20px;">
        <h3>Web Player Theme Config</h3>
        <div class="form-group" style="margin-top:12px;">
          <label>App Name</label>
          <input type="text" id="theme-app-name" class="form-control" value="${theme.app_name || 'GoM3U TV'}">
        </div>
        <div class="form-group">
          <label>Primary Brand Accent Color</label>
          <input type="color" id="theme-primary" value="${theme.primary_color || '#00E5FF'}">
        </div>
        <button class="btn btn-primary" onclick="ThemeModule.save()">Apply Theme Modifications</button>
      </div>
    `;
  },

  save() {
    const theme = AdminStorage.get('theme');
    theme.app_name = document.getElementById('theme-app-name').value;
    theme.primary_color = document.getElementById('theme-primary').value;
    AdminStorage.set('theme', theme);
    Toast.show('Theme settings updated.');
  }
};
