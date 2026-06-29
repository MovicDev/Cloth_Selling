const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://cloth-selling.onrender.com/api';

export interface Product {
  id: string;
  name: string;
  pricePerYard: number;
  category: string;
  description: string;
  images: string[];
  videoUrl?: string;
  colors: string[];
  width: string;
  suitableUses: string[];
  isNewArrival: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
  inStock: boolean;
  viewsCount: number;
}

export interface Order {
  id: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  quantityYards: number;
  productId: string;
  productName: string;
  colorSelected: string;
  additionalNotes?: string;
  createdAt: string;
  status: 'pending' | 'completed' | 'canceled';
}

// Product API
export const productApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      console.log('Failed to create product', await response.text());
    }
    return response.json();
  },

  create: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  },

  update: async (id: string, product: Partial<Product>): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete product');
  },
};

// Order API
export const orderApi = {
  getAll: async (): Promise<Order[]> => {
    const response = await fetch(`${API_BASE_URL}/orders`);
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },

  create: async (order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  },

  update: async (id: string, order: Partial<Order>): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    if (!response.ok) throw new Error('Failed to update order');
    return response.json();
  },
};
