
import React, { useState, useEffect } from 'react';
import { 
  Filter, Info, MessageCircle 
} from 'lucide-react';

// Core Sub-components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import ProductCard from './components/ProductCard';
import ProductDetails from './components/ProductDetails';
import OrderModal from './components/OrderModal';
import AdminDashboard from './components/AdminDashboard';
import InspirationSection from './components/InspirationSection';
import ContactSection from './components/ContactSection';

// Types & Pre-seeds
import { Product, Order, Collection } from './types';
import { initialProducts, initialCollections } from './data/initialProducts';
import { productApi, orderApi } from './services/api';

export default function App() {
  // Views Routing State: 'home' | 'materials' | 'inspiration' | 'contact' | 'admin' | 'detail'
  const [currentView, setView] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Currency State: 'USD' | 'NGN' (standard 1:1500 conversion)
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('NGN');

  // Custom persistent registries in local storage
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [brandWhatsApp, setBrandWhatsApp] = useState<string>('2349016504151'); // Configurable owner route

  // Showroom Filter variables
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterColor, setFilterColor] = useState<string>('All Colors');
  const [filterPriceRange, setFilterPriceRange] = useState<number>(50); // Maximum price
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'best'>('all');
  const [sortOrder, setSortOrder] = useState<'views' | 'priceAsc' | 'priceDesc'>('views');

  // Recently Viewed Fabrics
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Order modal triggers
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderModalProduct, setOrderModalProduct] = useState<Product | null>(null);
  const [orderModalColor, setOrderModalColor] = useState<string>('');
  const [orderModalYardage, setOrderModalYardage] = useState<number>(4);

  // Initialize and Seed Storage Data
  useEffect(() => {
    // 1. Load Products from API
    const loadProducts = async () => {
      try {
        const fetchedProducts = await productApi.getAll();
        if (fetchedProducts.length > 0) {
          setProducts(fetchedProducts);
        } else {
          // Seed initial products if database is empty
          for (const product of initialProducts) {
            await productApi.create(product);
          }
          setProducts(initialProducts);
        }
      } catch (error) {
        console.error('Failed to load products, using local data:', error);
        setProducts(initialProducts);
      }
    };

    // 2. Load Orders from API
    const loadOrders = async () => {
      try {
        const fetchedOrders = await orderApi.getAll();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Failed to load orders:', error);
        setOrders([]);
      }
    };

    // 3. Initial Collections
    setCollections(initialCollections);

    // 4. Custom Active WhatsApp Config
    const cachedWhatsApp = localStorage.getItem('material-custom-whatsapp');
    if (cachedWhatsApp) {
      setBrandWhatsApp(cachedWhatsApp);
    }

    loadProducts();
    loadOrders();
  }, []);

  // Sync state helpers to update API and trigger instant redraw
  const handleAddProduct = async (newP: Product) => {
    try {
      const created = await productApi.create(newP);
      const updated = [...products, created];
      setProducts(updated);
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };

  const handleUpdateProduct = async (updatedP: Product) => {
    try {
      const updated = await productApi.update(updatedP.id, updatedP);
      setProducts(products.map((p) => (p.id === updatedP.id ? updated : p)));
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  const handleDeleteProduct = async (pId: string) => {
    try {
      await productApi.delete(pId);
      const updated = products.filter((p) => p.id !== pId);
      setProducts(updated);
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleUpdateOrderStatus = async (oId: string, status: 'pending' | 'completed' | 'canceled') => {
    try {
      const order = orders.find((o) => o.id === oId);
      if (order) {
        const updated = await orderApi.update(oId, { ...order, status });
        setOrders(orders.map((o) => (o.id === oId ? updated : o)));
      }
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const handleAddOrder = async (newOrder: Order) => {
    try {
      const created = await orderApi.create(newOrder);
      const updated = [...orders, created];
      setOrders(updated);
    } catch (error) {
      console.error('Failed to add order:', error);
    }
  };

  // Safe WhatsApp config mutator
  const handleUpdateWhatsApp = (newNum: string) => {
    setBrandWhatsApp(newNum);
    localStorage.setItem('material-custom-whatsapp', newNum);
  };

  // Switch active viewed fabric, log to Recently Viewed state
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setView('detail');

    // Register recently viewed list (max 5 items, prevent duplicates)
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 5);
    });
    window.scrollTo(0, 0);
  };

  const handleSelectProductById = (productId: string) => {
    const p = products.find((prod) => prod.id === productId);
    if (p) {
      handleSelectProduct(p);
    }
  };

  // Quick Order button wrapper
  const handleOpenQuickOrder = (product: Product) => {
    setOrderModalProduct(product);
    setOrderModalColor(product.colors[0] || 'Default Color');
    setOrderModalYardage(4); // standard 4 yards
    setIsOrderModalOpen(true);
  };

  // Full Details Page checkout trigger
  const handleOpenDetailsOrder = (product: Product, colorSelected: string, yardageSelected: number) => {
    setOrderModalProduct(product);
    setOrderModalColor(colorSelected);
    setOrderModalYardage(yardageSelected);
    setIsOrderModalOpen(true);
  };

  // Quick Category Explore Shortcuts from Hero UI
  const handleHeroExplore = (categoryName: string | null) => {
    setFilterCategory(categoryName);
    setView('materials');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Extract all distinct colors from listings to build intelligent filter badges
  const distinctColors = ['All Colors', ...new Set(products.flatMap((p) => p.colors))];

  // Pipeline execution for filtered showroom
  const filteredShowroomProducts = products.filter((product) => {
    // 1. Category search
    if (filterCategory && product.category !== filterCategory) return false;
    
    // 2. Color filter check
    if (filterColor !== 'All Colors' && !product.colors.some((colName) => colName.toLowerCase().includes(filterColor.toLowerCase()))) {
      return false;
    }

    // 3. Maximum Pricing Slider scale
    if (product.pricePerYard > filterPriceRange) return false;

    // 4. Status Toggles
    if (filterStatus === 'new' && !product.isNewArrival) return false;
    if (filterStatus === 'best' && !product.isBestSeller) return false;

    return true;
  });

  // Sort logic execution
  const sortedProducts = [...filteredShowroomProducts].sort((a, b) => {
    if (sortOrder === 'views') {
      return (b.viewsCount || 0) - (a.viewsCount || 0); // Popularity Sorting
    }
    if (sortOrder === 'priceAsc') {
      return a.pricePerYard - b.pricePerYard;
    }
    if (sortOrder === 'priceDesc') {
      return b.pricePerYard - a.pricePerYard;
    }
    return 0;
  });

  return (
    <div className="bg-[#FAF9F6] text-gray-900 min-h-screen flex flex-col justify-between" id="applet-viewport">
      
      {/* Brand Sticky Header */}
      <Navbar
        currentView={currentView}
        setView={setView}
        selectedCategoryId={filterCategory}
        setSelectedCategory={setFilterCategory}
        currency={currency}
        toggleCurrency={() => setCurrency(currency === 'USD' ? 'NGN' : 'USD')}
        recentlyViewed={recentlyViewed}
        onSelectProduct={handleSelectProduct}
        allProducts={products}
      />

      {/* CORE ACTIVE APPLET ROUTE VIEWPORT */}
      <main className="flex-1">

        {currentView === 'home' && (
          <div className="space-y-1" id="home-view-canvas">
            
            {/* 1. Cinematic Luxury Hero */}
            <HeroSection
              collections={collections}
              onExplore={handleHeroExplore}
              brandWhatsApp={brandWhatsApp}
            />

            {/* 2. New Arrivals Trending Ribbon (Aesthetic Product grid) */}
            <section className="py-24 px-6 md:px-12 select-none" id="home-arrivals-ribbon">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between border-b border-gray-100 pb-8 gap-4">
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-gold font-bold">Loom Releases</span>
                    <h2 className="font-display text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">New Arrivals & Trends</h2>
                  </div>
                  <button
                    onClick={() => { setFilterCategory(null); setView('materials'); }}
                    className="font-mono text-xs uppercase tracking-widest text-gold hover:text-black transition-colors"
                  >
                    View Entire Showroom →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {products.slice(0, 4).map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      currency={currency}
                      onSelect={handleSelectProduct}
                      onQuickOrder={handleOpenQuickOrder}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 3. Luxury Lookbook preview row */}
            <section className="bg-white py-20 px-6 md:px-12 select-none border-t border-gray-100" id="lookbook-brief">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <div className="lg:col-span-5 space-y-6 text-left">
                  <div className="p-1 px-3.5 bg-gold/10 text-gold font-mono text-[9px] uppercase tracking-widest w-max">
                    Tailored Visual Masterclass
                  </div>
                  <h2 className="font-display text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                    Visualize Fabrics Before Custom Cutting
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Not sure how an Ankara wax print or cashmere Senator looks when styled? Enter our tailoring simulation room containing high-society runway drapes, bridal receptions, and design layouts.
                  </p>
                  <button
                    onClick={() => setView('inspiration')}
                    className="px-6 py-3 bg-black text-white border border-black hover:bg-transparent hover:text-black font-mono text-[10px] uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer"
                    id="lookbook-enter-btn"
                  >
                    Watch Visual Lookbooks
                  </button>
                </div>

                <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                  <div className="relative aspect-3/4 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=500"
                      alt="Senator wear fit"
                      className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute bottom-4 left-4 font-mono text-[10px] text-white bg-black/75 px-3 py-1">
                      Menswear Custom Senator
                    </div>
                  </div>

                  <div className="relative aspect-3/4 mt-8 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1582236940843-ef7213ee44e1?q=80&w=500"
                      alt="Ankara native dress"
                      className="w-full h-full object-cover opacity-95"
                    />
                    <div className="absolute bottom-4 left-4 font-mono text-[10px] text-white bg-black/75 px-3 py-1">
                      Bespoke Royal Ankara
                    </div>
                  </div>
                </div>

              </div>
            </section>

          </div>
        )}

        {/* VIEW 2: MATERIALS SHOWROOM GALLERY (FILTERABLE CATALOGUE) */}
        {currentView === 'materials' && (
          <div className="py-12 px-6 md:px-12 select-none" id="showroom-gallery-view">
            <div className="max-w-7xl mx-auto space-y-12">
              
              {/* Header Titles */}
              <div className="text-left space-y-2 border-b border-gray-150 pb-6">
                <span className="font-mono text-[10px] uppercase tracking-widest text-gold font-bold">material Textile Boutique</span>
                <h1 className="font-display text-2xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Showroom Gallery</h1>
                <p className="font-sans text-xs md:text-sm text-gray-500 max-w-2xl leading-relaxed">
                  Refine our catalogs by textile weave type, pricing bands, and dynamic colors. Switch currency toggles above to preview prices in your native parameters.
                </p>
              </div>

              {/* Advanced Multi-Filter Selector Panel (Interactive & Sleek) */}
              <div className="bg-white border border-gray-100 p-6 md:p-8 shadow-sm text-left grid grid-cols-1 md:grid-cols-12 gap-8 items-end" id="filters-container">
                
                {/* 1. Category filter (4 Columns) */}
                <div className="md:col-span-4 space-y-2">
                  <label className="font-mono text-xs text-gray-500 font-semibold block uppercase">Textile Category</label>
                  <select
                    value={filterCategory || 'All Fabrics'}
                    onChange={(e) => setFilterCategory(e.target.value === 'All Fabrics' ? null : e.target.value)}
                    className="w-full border border-gray-200 px-3 py-3 text-xs uppercase font-mono tracking-wider bg-[#FAF9F6] focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  >
                    <option value="All Fabrics">All Fabrics & Weaves</option>
                    <option value="Ankara Fabrics">Ankara Fabrics</option>
                    <option value="Senator Materials">Senator Materials</option>
                    <option value="Lace Fabrics">Lace Fabrics</option>
                    <option value="Cashmere Materials">Cashmere Materials</option>
                    <option value="Cotton Fabrics">Cotton Fabrics</option>
                    <option value="Suiting Materials">Suiting Materials</option>
                    <option value="Plain & Pattern Fabrics">Plain & Pattern Fabrics</option>
                    <option value="Vintage & Designer Prints">Vintage & Designer Prints</option>
                    <option value="Native wear materials">Native Wear Materials</option>
                    <option value="Tailoring fabrics">Tailoring Fabrics</option>
                  </select>
                </div>

                {/* 2. Color Selection (3 Columns) */}
                <div className="md:col-span-3 space-y-2">
                  <label className="font-mono text-xs text-gray-500 font-semibold block uppercase">Color Spectrum</label>
                  <select
                    value={filterColor}
                    onChange={(e) => setFilterColor(e.target.value)}
                    className="w-full border border-gray-200 px-3 py-3 text-xs bg-[#FAF9F6] focus:border-gold focus:outline-none"
                  >
                    <option value="All Colors">All Color Options</option>
                    {distinctColors.filter(c => c !== 'All Colors').map((c, idx) => (
                      <option key={idx} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* 3. Price Limit Slider Filter (3 Columns) */}
                <div className="md:col-span-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-mono text-xs text-gray-500 font-semibold uppercase">Max Price / Yd</label>
                    <span className="font-mono text-xs font-bold text-gold">${filterPriceRange} / yd</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="65"
                    step="1"
                    value={filterPriceRange}
                    onChange={(e) => setFilterPriceRange(Number(e.target.value))}
                    className="w-full accent-gold bg-gray-200"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-gray-300">
                    <span>$10</span>
                    <span>$65</span>
                  </div>
                </div>

                {/* 4. Controls Reset (2 Columns) */}
                <div className="md:col-span-2">
                  <button
                    onClick={() => {
                      setFilterCategory(null);
                      setFilterColor('All Colors');
                      setFilterPriceRange(55);
                      setFilterStatus('all');
                    }}
                    className="w-full py-3 border border-gray-200 hover:border-gold hover:text-gold text-gray-500 font-mono text-xs uppercase tracking-wider text-center transition-colors"
                    id="reset-all-filters-btn"
                  >
                    Reset Grid
                  </button>
                </div>

                {/* Secondary Ribbon Filters */}
                <div className="md:col-span-12 border-t border-gray-100 pt-5 flex flex-wrap items-center justify-between gap-4">
                  
                  {/* Status checklist options */}
                  <div className="flex items-center space-x-4 text-xs font-mono">
                    <span className="text-gray-400">Quick Filter:</span>
                    {['all', 'new', 'best'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setFilterStatus(status as 'all' | 'new' | 'best')}
                        className={`px-3 py-1.5 border transition-all ${filterStatus === status ? 'border-gold text-gold bg-gold/5 font-semibold' : 'border-gray-200 text-gray-500 hover:border-gold'}`}
                      >
                        {status === 'all' && 'All Textures'}
                        {status === 'new' && 'New Designs'}
                        {status === 'best' && 'Sought-After'}
                      </button>
                    ))}
                  </div>

                  {/* Ordering dropdown */}
                  <div className="flex items-center space-x-2 text-xs font-mono">
                    <span className="text-gray-400">Arrange By:</span>
                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value as 'views' | 'priceAsc' | 'priceDesc')}
                      className="border border-gray-200 px-2.5 py-1.5 focus:border-gold focus:outline-none"
                    >
                      <option value="views">👁 Popularity Score</option>
                      <option value="priceAsc">📈 Price: Low to High</option>
                      <option value="priceDesc">📉 Price: High to Low</option>
                    </select>
                  </div>

                </div>

              </div>

              {/* Dynamic Filtered Gallery Display Grid */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-gray-450 text-left">
                  <Filter className="w-4 h-4 text-gold" />
                  <span>Found {sortedProducts.length} premium fabrics matching filters schema</span>
                </div>

                {sortedProducts.length === 0 ? (
                  <div className="bg-white border border-gray-100 py-24 text-center space-y-4">
                    <Info className="w-8 h-8 text-gold mx-auto" />
                    <p className="font-display font-medium text-lg text-gray-900">No matching luxury weaves found</p>
                    <p className="font-mono text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                      We current operate tailored custom rolls. Reset filters to explore our core caches of fine Cashmere or Emperor wax patterns.
                    </p>
                    <button
                      onClick={() => {
                        setFilterCategory(null);
                        setFilterColor('All Colors');
                        setFilterPriceRange(55);
                        setFilterStatus('all');
                      }}
                      className="px-6 py-2.5 bg-black text-white hover:bg-gold hover:text-black font-mono text-xs uppercase tracking-wider scale-95"
                    >
                      Restore All Fabrics
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {sortedProducts.map((p) => (
                      <ProductCard
                        key={p.id}
                        product={p}
                        currency={currency}
                        onSelect={handleSelectProduct}
                        onQuickOrder={handleOpenQuickOrder}
                      />
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* VIEW 3: PRODUCT DETAILS GALAXY (SELECTED MATERIAL PANEL) */}
        {currentView === 'detail' && selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            currency={currency}
            relatedProducts={products.filter((p) => p.category === selectedProduct.category && p.id !== selectedProduct.id)}
            onSelectProduct={handleSelectProduct}
            brandWhatsApp={brandWhatsApp}
            onOpenOrderForm={handleOpenDetailsOrder}
            onBack={() => setView('materials')}
          />
        )}

        {/* VIEW 4: TAILORING INSPECTION LABS */}
        {currentView === 'inspiration' && (
          <InspirationSection
            onSelectProductById={handleSelectProductById}
            allProducts={products}
            brandWhatsApp={brandWhatsApp}
          />
        )}

        {/* VIEW 5: BRANDS CONTACT OFFICE */}
        {currentView === 'contact' && (
          <ContactSection
            brandWhatsApp={brandWhatsApp}
          />
        )}

        {/* VIEW 6: OWNER OPERATIONS COMPARTMENT */}
        {currentView === 'admin' && (
          <AdminDashboard
            products={products}
            orders={orders}
            collections={collections}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            brandWhatsApp={brandWhatsApp}
            setBrandWhatsApp={handleUpdateWhatsApp}
          />
        )}

      </main>

      {/* Brand Luxury Multi-column Footer */}
      <Footer setView={setView} brandWhatsApp={brandWhatsApp} />

      {/* Floating Instant Consultation Button (WhatsApp Bubble) */}
      <a
        href={`https://wa.me/${brandWhatsApp}?text=Hello%20material%20Textiles,%20I%20would%20like%20to%20consult%20regarding%20Aso-Ebi%20or%20private%2520materials%20rolls.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 z-40 group/chat border-4 border-white"
        title="Consult with our Showroom Director"
        id="floating-whatsapp-trigger"
      >
        <MessageCircle className="w-7 h-7 fill-current group-hover/chat:rotate-12 transition-transform" />
        <span className="absolute right-[110%] top-1/2 -translate-y-1/2 bg-black text-white text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 rounded opacity-0 group-hover/chat:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md">
          WhatsApp Concierge
        </span>
      </a>

      {/* Order formulation Dialog checkout drawer */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        product={orderModalProduct}
        initialColor={orderModalColor}
        initialYardage={orderModalYardage}
        brandWhatsApp={brandWhatsApp}
        onSubmitOrder={handleAddOrder}
      />

    </div>
  );
}
