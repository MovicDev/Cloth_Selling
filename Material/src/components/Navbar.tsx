import React, { useState } from 'react';
import { Search, Menu, X, Coins, Settings, Sparkles, MapPin, Eye } from 'lucide-react';
import { Product } from '../types';

interface NavbarProps {
  currentView: string;
  setView: (view: string) => void;
  selectedCategoryId: string | null;
  setSelectedCategory: (category: string | null) => void;
  currency: 'USD' | 'NGN';
  toggleCurrency: () => void;
  recentlyViewed: Product[];
  onSelectProduct: (product: Product) => void;
  allProducts: Product[];
}

export default function Navbar({
  currentView,
  setView,
  currency,
  toggleCurrency,
  recentlyViewed,
  onSelectProduct,
  allProducts,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRecentOpen, setIsRecentOpen] = useState(false);

  const filteredProducts = searchQuery.trim()
    ? allProducts.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.suitableUses.some(u => u.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const handleLinkClick = (viewName: string) => {
    setView(viewName);
    setIsMobileMenuOpen(false);
  };

  const exchangeRate = 1500; // $1 = ₦1500 for realistic currency conversion

  return (
    <nav className="sticky top-0 z-50 backdrop-glass-light border-b border-gray-100 py-4 px-6 md:px-12 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Name */}
        <button 
          onClick={() => handleLinkClick('home')}
          className="flex flex-col items-start cursor-pointer text-left focus:outline-none focus:ring-1 focus:ring-gold"
          id="nav-logo-button"
        >
          <span className="font-display text-xl md:text-2xl tracking-[0.25em] font-bold text-gray-900 leading-none">
            material
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-gold font-medium mt-1">
            Premium Fabric Showroom
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => handleLinkClick('home')}
            className={`font-mono text-xs uppercase tracking-widest cursor-pointer transition-colors ${currentView === 'home' ? 'text-gold font-semibold' : 'text-gray-600 hover:text-gold'}`}
            id="nav-link-home"
          >
            Home
          </button>
          <button 
            onClick={() => handleLinkClick('materials')}
            className={`font-mono text-xs uppercase tracking-widest cursor-pointer transition-colors ${currentView === 'materials' ? 'text-gold font-semibold' : 'text-gray-600 hover:text-gold'}`}
            id="nav-link-materials"
          >
            Showroom Gallery
          </button>
          <button 
            onClick={() => handleLinkClick('inspiration')}
            className={`font-mono text-xs uppercase tracking-widest cursor-pointer transition-colors ${currentView === 'inspiration' ? 'text-gold font-semibold' : 'text-gray-600 hover:text-gold'}`}
            id="nav-link-inspiration"
          >
            Tailoring Inspiration
          </button>
          <button 
            onClick={() => handleLinkClick('contact')}
            className={`font-mono text-xs uppercase tracking-widest cursor-pointer transition-colors ${currentView === 'contact' ? 'text-gold font-semibold' : 'text-gray-600 hover:text-gold'}`}
            id="nav-link-contact"
          >
            Contact
          </button>
          <button 
            onClick={() => handleLinkClick('admin')}
            className={`font-mono text-xs uppercase tracking-widest flex items-center gap-1 cursor-pointer transition-colors ${currentView === 'admin' ? 'text-gold font-semibold border border-gold px-2 py-0.5 rounded' : 'text-gray-500 hover:text-gold'}`}
            id="nav-link-admin"
          >
            <Settings className="w-3.5 h-3.5" />
            Owner Portal
          </button>
        </div>

        {/* Utilities */}
        <div className="flex items-center space-x-4">
          {/* Currency Switcher */}
          <button
            onClick={toggleCurrency}
            title={`Switch to ${currency === 'USD' ? 'Naira (₦)' : 'USD ($)'}`}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-mono font-medium hover:border-gold hover:text-gold transition-colors focus:ring-1 focus:ring-gold"
            id="nav-currency-toggle"
          >
            <Coins className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{currency === 'USD' ? '$ USD' : '₦ NGN'}</span>
            <span className="sm:hidden">{currency === 'USD' ? '$' : '₦'}</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors focus:ring-1 focus:ring-gold focus:outline-none"
            title="Search Fabrics"
            id="nav-search-toggle"
          >
            <Search className="w-4 h-4 text-gray-700" />
          </button>

          {/* Recently Viewed Panel Trigger */}
          <div className="relative">
            <button
              onClick={() => setIsRecentOpen(!isRecentOpen)}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors relative focus:ring-1 focus:ring-gold focus:outline-none"
              title="Recently Viewed Fabrics"
              id="nav-recent-toggle"
            >
              <Eye className="w-4 h-4 text-gray-700" />
              {recentlyViewed.length > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-gold rounded-full" />
              )}
            </button>

            {/* Recently Viewed Dropdown */}
            {isRecentOpen && (
              <div className="absolute right-0 mt-4 w-72 backdrop-glass-light border border-gray-100 rounded-lg shadow-xl p-4 z-50">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-gray-500 font-bold">Recently Viewed ({recentlyViewed.length})</span>
                  <button onClick={() => setIsRecentOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-3 h-3" />
                  </button>
                </div>
                {recentlyViewed.length === 0 ? (
                  <p className="font-mono text-center py-4 text-xs text-gray-400">No viewed fabrics yet</p>
                ) : (
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {recentlyViewed.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          onSelectProduct(prod);
                          setIsRecentOpen(false);
                        }}
                        className="flex items-center gap-3 cursor-pointer p-1.5 hover:bg-gray-50/70 rounded-md transition-colors"
                      >
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-10 h-10 object-cover rounded border border-gray-100"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-display font-medium text-xs text-gray-900 truncate">{prod.name}</p>
                          <p className="font-mono text-[10px] text-gold mt-0.5">
                            {currency === 'USD' ? `$${prod.pricePerYard}` : `₦${(prod.pricePerYard * exchangeRate).toLocaleString()}`} / yd
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full hover:bg-gray-100 transition-colors focus:ring-1 focus:ring-gold focus:outline-none"
            id="nav-mobile-toggle"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Floating Interactive Search Bar Panel */}
      {isSearchOpen && (
        <div className="absolute left-0 right-0 top-full bg-white border-b border-gray-100 shadow-lg px-6 md:px-12 py-5 z-40 transition-all">
          <div className="max-w-3xl mx-auto relative">
            <div className="flex items-center border-b-2 border-gold py-2">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search luxury Ankara, Senator wool, French laces, soft cashmere..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full font-sans text-base text-gray-800 placeholder-gray-400 focus:outline-none"
                autoFocus
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="p-1 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Instant Search Results */}
            {searchQuery.trim() && (
              <div className="bg-white border border-gray-100 rounded-b-lg shadow-xl mt-1 max-h-72 overflow-y-auto p-2">
                <p className="font-mono text-[10px] uppercase text-gray-400 font-bold px-3 py-1.5 border-b border-gray-50">
                  SEARCH RESULTS ({filteredProducts.length})
                </p>
                {filteredProducts.length === 0 ? (
                  <p className="text-sm font-sans text-gray-500 py-6 text-center">No luxury fabrics found matching "{searchQuery}"</p>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {filteredProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectProduct(p);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center gap-4 p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-12 h-12 object-cover rounded border border-gray-100"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-display font-medium text-sm text-gray-900 leading-tight">{p.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-mono text-gold px-1.5 py-0.5 bg-gold/5 rounded border border-gold/10">
                              {p.category}
                            </span>
                            <span className="text-xs font-mono text-gray-500 font-medium">
                              {currency === 'USD' ? `$${p.pricePerYard}` : `₦${(p.pricePerYard * exchangeRate).toLocaleString()}`} / yd
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            <div className="flex items-center gap-2 mt-2 font-mono text-[10px] text-gray-400">
              <Sparkles className="w-3 h-3 text-gold" />
              <span>Try searching: "Aso-Ebi", "Senator", "Egypt", "Cord Lace", "Camel"</span>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full bg-white border-b border-gray-100 shadow-lg px-6 py-6 z-40 transition-transform">
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => handleLinkClick('home')}
              className={`font-mono text-xs uppercase tracking-widest text-left py-2 border-b border-gray-50 transition-colors ${currentView === 'home' ? 'text-gold font-bold' : 'text-gray-600'}`}
            >
              Home
            </button>
            <button
              onClick={() => handleLinkClick('materials')}
              className={`font-mono text-xs uppercase tracking-widest text-left py-2 border-b border-gray-50 transition-colors ${currentView === 'materials' ? 'text-gold font-bold' : 'text-gray-600'}`}
            >
              Showroom Gallery
            </button>
            <button
              onClick={() => handleLinkClick('inspiration')}
              className={`font-mono text-xs uppercase tracking-widest text-left py-2 border-b border-gray-50 transition-colors ${currentView === 'inspiration' ? 'text-gold font-bold' : 'text-gray-600'}`}
            >
              Tailoring Inspiration
            </button>
            <button
              onClick={() => handleLinkClick('contact')}
              className={`font-mono text-xs uppercase tracking-widest text-left py-2 border-b border-gray-50 transition-colors ${currentView === 'contact' ? 'text-gold font-bold' : 'text-gray-600'}`}
            >
              Contact
            </button>
            <button
              onClick={() => handleLinkClick('admin')}
              className={`font-mono text-xs uppercase tracking-widest text-left py-2 flex items-center gap-2 border-b border-gray-100 transition-colors ${currentView === 'admin' ? 'text-gold font-bold' : 'text-gray-500'}`}
            >
              <Settings className="w-4 h-4" />
              Owner Portal
            </button>
            <div className="flex items-center gap-2 pt-2 text-[11px] font-mono text-gray-400">
              <MapPin className="w-3.5 h-3.5 text-gold" />
              <span>Worldwide Luxury Shipping Available</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
