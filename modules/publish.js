const PublishModule = {
  publishAll() {
    // Generate valid JSON files to trigger synchronization with the Web Player
    const targets = ['channels', 'categories', 'playlists', 'settings', 'theme', 'ads', 'notices'];
    
    targets.forEach(key => {
      const content = AdminStorage.get(key);
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
      
      // Auto download target files to replace static JSON directory structure
      const anchor = document.createElement('a');
      anchor.setAttribute("href", dataStr);
      anchor.setAttribute("download", `${key}.json`);
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
    });

    Toast.show('All JSON data published! Web player will sync within 30s.', 'success');
  }
};
