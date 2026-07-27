const CategoriesModule = {
  render() {
    const container = document.getElementById('tab-categories');
    if (!container) return;

    const categories = AdminStorage.get('categories');

    container.innerHTML = `
      <div class="glass" style="padding:20px; margin-bottom: 24px;">
        <h3>Add Category</h3>
        <form id="add-cat-form" style="display:flex; gap: 12px; margin-top: 12px;">
          <input type="text" id="cat-name" placeholder="Category Name" class="form-control" required>
          <input type="text" id="cat-icon" placeholder="Bootstrap Icon Class (e.g., bi-film)" class="form-control" required>
          <button type="submit" class="btn btn-primary">Create</button>
        </form>
      </div>

      <div class="glass" style="padding:20px;">
        <h3>Active Categories</h3>
        <table class="admin-table">
          <thead>
            <tr>
              <th>Icon</th>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${categories.map(cat => `
              <tr>
                <td><i class="bi ${cat.icon}"></i></td>
                <td>${cat.id}</td>
                <td><strong>${cat.name}</strong></td>
                <td>
                  <button class="btn btn-danger" style="padding:4px 8px;" onclick="CategoriesModule.delete('${cat.id}')">Delete</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    document.getElementById('add-cat-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cat-name').value;
      const icon = document.getElementById('cat-icon').value;
      const newCat = { id: `cat-${Date.now()}`, name, icon };

      const existing = AdminStorage.get('categories');
      AdminStorage.set('categories', [...existing, newCat]);
      Toast.show('Category created.');
      this.render();
      DashboardModule.render();
    });
  },

  delete(id) {
    let categories = AdminStorage.get('categories');
    categories = categories.filter(c => c.id !== id);
    AdminStorage.set('categories', categories);
    Toast.show('Category removed.');
    this.render();
    DashboardModule.render();
  }
};
