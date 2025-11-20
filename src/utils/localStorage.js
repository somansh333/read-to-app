// Mock categories
export const CATEGORIES = [
  { id: '1', name: 'Electronics', description: 'Electronic items and gadgets' },
  { id: '2', name: 'Books', description: 'Textbooks and novels' },
  { id: '3', name: 'Furniture', description: 'Room furniture and fixtures' },
  { id: '4', name: 'Clothing', description: 'Clothes and accessories' },
  { id: '5', name: 'Sports', description: 'Sports equipment and gear' },
];

// Initialize categories in localStorage if not exists
if (!localStorage.getItem('categories')) {
  localStorage.setItem('categories', JSON.stringify(CATEGORIES));
}

// Products management
export const getProducts = () => {
  return JSON.parse(localStorage.getItem('products') || '[]');
};

export const getProductsByUser = (userId) => {
  const products = getProducts();
  return products.filter(p => p.user_id === userId);
};

export const addProduct = (product) => {
  const products = getProducts();
  const newProduct = {
    ...product,
    id: Date.now().toString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    status: 'available',
  };
  products.push(newProduct);
  localStorage.setItem('products', JSON.stringify(products));
  return newProduct;
};

export const updateProduct = (productId, updates) => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === productId);
  if (index !== -1) {
    products[index] = {
      ...products[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };
    localStorage.setItem('products', JSON.stringify(products));
    return products[index];
  }
  return null;
};

export const deleteProduct = (productId) => {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== productId);
  localStorage.setItem('products', JSON.stringify(filtered));
};

export const getCategories = () => {
  return JSON.parse(localStorage.getItem('categories') || '[]');
};

// Get user info by id
export const getUserById = (userId) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.id === userId);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
};
