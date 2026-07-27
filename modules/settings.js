const SettingsModule = {
  render() {
    const container = document.getElementById('tab-settings');
    if (!container) return;

    const settings = AdminStorage.get('settings');

    container.innerHTML = `
      <div class="glass" style="padding:20px;">
        <h3>Global System Preferences</h3>
        <div class="form-group" style="margin-top:12px;">
          <label class="checkbox-label" style="display:flex; gap:8px;">
            <input type="checkbox" id="set-maint" ${settings.maintenance_mode ? 'checked' : ''}>
            <span>Enable System Maintenance Mode</span>
          </label>
        </div>
        <button class="btn btn-primary" onclick="SettingsModule.save()">Save Preferences</button>
      </div>
    `;
  },

  save() {
    const settings = AdminStorage.get('settings');
    settings.maintenance_mode = document.getElementById('set-maint').checked;
    AdminStorage.set('settings', settings);
    Toast.show('Global preferences updated.');
  }
};
