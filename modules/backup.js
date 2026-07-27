const BackupModule = {
  exportAll() {
    const fullBackup = {
      channels: AdminStorage.get('channels'),
      categories: AdminStorage.get('categories'),
      playlists: AdminStorage.get('playlists'),
      settings: AdminStorage.get('settings'),
      theme: AdminStorage.get('theme'),
      ads: AdminStorage.get('ads'),
      notices: AdminStorage.get('notices'),
      exported_at: new Date().toISOString()
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `gom3u_admin_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    Toast.show('Backup JSON archive exported.');
  }
};
