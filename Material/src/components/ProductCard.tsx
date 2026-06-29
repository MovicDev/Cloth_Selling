import React, { useState } from 'react';
import { Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  currency: 'USD' | 'NGN';
  onSelect: (product: Product) => void;
  onQuickOrder: (product: Product) => void;
}

export default function ProductCard({ product, currency, onSelect, onQuickOrder }: ProductCardProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const exchangeRate = 1500; // $1 = ₦1500 standard conversion

  const renderedPrice = currency === 'USD'
    ? `$${product.pricePerYard}`
    : `₦${(product.pricePerYard * exchangeRate).toLocaleString()}`;

  return (
    <div
      className="group relative bg-[#FAF9F6] border border-gray-100 rounded-none overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
      style={{ contentVisibility: 'auto' }}
    >
      {/* Visual Image Showcase Container */}
      <div className="relative aspect-3/4 overflow-hidden bg-gray-100 cursor-pointer" onClick={() => onSelect(product)}>
        
        {/* Fabric Fold Images Layer (Cycles on hover of chips or direct hover) */}
        <img
          src={product.images[activeImageIndex] || product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          loading="lazy"
        />

        {/* Shadow overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/10 opacity-70 group-hover:opacity-85 transition-opacity duration-300" />

        {/* Tag Status Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 font-mono text-[9px] uppercase tracking-wider">
          {product.isNewArrival && (
            <span className="px-2.5 py-1 bg-white text-black font-semibold border border-gray-100 shadow-sm">
              New Design
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2.5 py-1 bg-gold text-white font-bold tracking-widest shadow-sm">
              Sought-After
            </span>
          )}
          {!product.inStock && (
            <span className="px-2.5 py-1 bg-red-800 text-white font-medium">
              Awaiting Stock Restock
            </span>
          )}
        </div>

        {/* View Count Metrics */}
        <div className="absolute top-4 right-4 flex items-center gap-1 font-mono text-[10px] text-white/95 bg-black/45 backdrop-blur-sm px-2 py-1 rounded" id={`views-panel-${product.id}`}>
          <Eye className="w-3.5 h-3.5 text-gold" />
          <span>{product.viewsCount || 42} views</span>
        </div>

        {/* Luxury Micro-Interactive Image Bullet Triggers on Mobile and Desktop */}
        {product.images.length > 1 && (
          <div className="absolute bottom-4 left-4 flex gap-1 z-20">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onMouseEnter={() => setActiveImageIndex(idx)}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex(idx);
                }}
                className={`w-2.5 h-2.5 rounded-full border transition-all ${activeImageIndex === idx ? 'bg-gold border-gold scale-125' : 'bg-white/50 border-white/20'}`}
                title={`View texture detail ${idx + 1}`}
                id={`img-bullet-${product.id}-${idx}`}
              />
            ))}
          </div>
        )}

        {/* Instant Loom-View overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="px-4 py-2 bg-white/95 text-black font-mono text-[10px] tracking-[0.2em] uppercase font-bold shadow-2xl flex items-center gap-1.5 animate-pulse">
            <Eye className="w-3.5 h-3.5 text-gold" />
            <span>Examine Texture</span>
          </span>
        </div>

      </div>

      {/* Material Details Footer Card */}
      <div className="p-5 flex-1 flex flex-col justify-between text-left relative bg-white border-t border-gray-50">
        
        <div className="space-y-2">
          <span className="font-mono text-[9px] text-gold uppercase tracking-[0.2em] hover:text-gray-900 transition-colors">
            {product.category}
          </span>
          
          <h3 
            className="font-display text-base font-bold text-gray-900 tracking-wide line-clamp-1 leading-snug cursor-pointer hover:text-gold transition-colors"
            onClick={() => onSelect(product)}
          >
            {product.name}
          </h3>

          <div className="flex items-center gap-1.5 font-mono text-[11px] text-gray-400">
            <span>Width:</span>
            <span className="text-gray-600 font-medium">{product.width}</span>
          </div>

          {/* Sizable Color Chips Tracker */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {product.colors.map((colorName, cIdx) => (
                <span 
                  key={cIdx} 
                  className="font-mono text-[9px] text-gray-500 bg-gray-50 border border-gray-100 px-1.5 py-0.5 rounded"
                  title={colorName}
                >
                  {colorName}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-gray-400">Showroom Price</p>
            <p className="font-mono text-base font-bold text-gray-900 mt-0.5">
              {renderedPrice} <span className="font-mono text-[10px] text-gray-400 font-normal">/ yd</span>
            </p>
          </div>

          {product.inStock ? (
            <button
              onClick={() => onQuickOrder(product)}
              className="p-2.5 bg-black text-white border border-black hover:bg-transparent hover:text-black rounded-none transition-all flex items-center justify-center relative group/btn"
              title="Secure Checkout order via WhatsApp"
              id={`quick-order-btn-${product.id}`}
            >
              <ShoppingBag className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
            </button>
          ) : (
            <span className="font-mono text-[9px] uppercase tracking-wider text-red-500 font-semibold px-2 py-1 bg-red-50">
              Unavailable
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
