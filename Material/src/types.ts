/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  pricePerYard: number;
  category: string;
  description: string;
  images: string[];
  videoUrl?: string; // Simulated video preview URL
  colors: string[];
  width: string;
  suitableUses: string[];
  isNewArrival: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
  inStock: boolean;
  viewsCount: number;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  count: number;
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

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  completedOutfitImage?: string;
  fabricUsed?: string;
}

export interface FabricInspiration {
  id: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  fabricUsed: string;
  designer: string;
  description: string;
}
