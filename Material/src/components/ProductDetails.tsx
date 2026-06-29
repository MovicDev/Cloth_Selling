import React, { useState, useEffect } from 'react';
import { Sparkles, MessageCircle, Ruler, Scissors, Share2, Check, ExternalLink, ArrowLeft, RefreshCw, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailsProps {
  product: Product;
  currency: 'USD' | 'NGN';
  relatedProducts: Product[];
  onSelectProduct: (product: Product) => void;
  brandWhatsApp: string;
  onOpenOrderForm: (product: Product, selectedColor: string, yardage: number) => void;
  onBack: () => void;
}

export default function ProductDetails({
  product,
  currency,
  relatedProducts,
  onSelectProduct,
  brandWhatsApp,
  onOpenOrderForm,
  onBack,
}: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [yardage, setYardage] = useState(4); // Default to standard 4 yards for Senator/Ankara styles
  const [isCopied, setIsCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'tailoring' | 'shipping'>('details');

  useEffect(() => {
    setSelectedImage(product.images[0]);
    setSelectedColor(product.colors[0]);
    setYardage(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const exchangeRate = 1500;
  const priceDisplay = currency === 'USD' 
    ? `$${product.pricePerYard}` 
    : `₦${(product.pricePerYard * exchangeRate).toLocaleString()}`;
  
  const totalPriceDisplay = currency === 'USD'
    ? `$${product.pricePerYard * yardage}`
    : `₦${(product.pricePerYard * exchangeRate * yardage).toLocaleString()}`;

  const handleShare = () => {
    const text = `Take a look at "${product.name}" in material Premium Fabric Showroom: ${window.location.href}`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Dedicated yardage calculator and tailor outfit suggestions
  const getYardageAdvice = (yards: number) => {
    if (yards <= 2) {
      return "Prefect for designer caps, pocket squares, kids outfits, or waistcoats.";
    } else if (yards > 2 && yards <= 4) {
      return "Ideal for standard short-sleeve clothing styles: Senator tunics with trousers, short-gowns, or tailored shirts.";
    } else if (yards > 4 && yards <= 5) {
      return "Best for standard long-sleeve Senator wear, tailored women's dresses, or smart casual pantsuits.";
    } else if (yards > 5 && yards <= 7) {
      return "Recommended for glamorous flowing Ankara maxi gowns, Agbada innerwear matching pairs, or traditional Kaftans.";
    } else {
      return "Prone for grand VIP complete 3-Piece Agbada, heavy bridal overlays, or uniform matching pairs (Aso-Ebi for couples).";
    }
  };

  return (
    <div className="bg-[#FAF9F6] py-12 px-6 md:px-12" id="fabric-detail-container">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Editorial Back Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-gray-500 hover:text-gold transition-colors cursor-pointer"
            id="detail-back-button"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retreat to Showroom</span>
          </button>
          
          <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
            <span>Showroom ID: #{product.id.slice(0, 8).toUpperCase()}</span>
            <span className="hidden sm:inline">●</span>
            <span className="hidden sm:inline text-gold">Premium Authentic Grade</span>
          </div>
        </div>

        {/* Magazine-style 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Column 1: Gallery Showcase (5 Columns) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/5] overflow-hidden bg-white border border-gray-100 shadow-sm">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-550 hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-black/85 backdrop-blur-md border border-gold/30 text-gold font-mono text-[9px] uppercase tracking-wider px-3 py-1">
                  100% Authentic Fabric Texture
                </span>
              </div>
            </div>

            {/* Micro Multi-thumbnail preview gallery */}
            <div className="grid grid-cols-3 gap-3">
              {product.images.map((imgUrl, mIdx) => (
                <button
                  key={mIdx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`aspect-[4/5] overflow-hidden border transition-all ${selectedImage === imgUrl ? 'border-gold ring-1 ring-gold/20' : 'border-gray-200 hover:border-gold/50'}`}
                  id={`thumbnail-preview-${mIdx}`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} detail ${mIdx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Video Preview Section if available */}
            {product.videoUrl && (
              <div className="bg-[#121212] p-6 text-left space-y-3 border border-gold/20">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-ping" />
                  <p className="font-mono text-[10px] uppercase text-gold tracking-widest font-semibold">Active Tailored Simulation Video</p>
                </div>
                <p className="text-gray-400 text-xs">
                  Inspect the physical movement, texture drapes, and fall of this material under bespoke tailoring:
                </p>
                <div className="relative aspect-video bg-black/50 overflow-hidden border border-gray-800">
                  <video
                    controls
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    src={product.videoUrl}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Column 2: Details & Interactive Yard Calculator (6 Columns) */}
          <div className="lg:col-span-6 text-left space-y-8 flex flex-col justify-start">
            
            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold font-semibold">
                {product.category}
              </span>
              
              <h1 className="font-display text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4">
                <div className="bg-white border border-gray-100 px-4 py-2 font-mono">
                  <span className="text-[9px] uppercase tracking-wider text-gray-400 block font-normal">Per Yard Price</span>
                  <span className="text-xl font-bold text-gray-900">{priceDisplay}</span>
                </div>
                
                <div className="font-mono text-xs text-gray-400 space-y-1">
                  <p>Standard Width: <span className="text-gray-900 font-medium">{product.width}</span></p>
                  <p>Inventory: <span className={product.inStock ? "text-green-700 font-semibold" : "text-red-600 font-semibold"}>
                    {product.inStock ? "Available Now" : "Awaiting Fresh Mill rolls"}
                  </span></p>
                </div>
              </div>
            </div>

            {/* Editorial Tab Interfaces */}
            <div className="border-b border-gray-200">
              <div className="flex space-x-6">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`font-mono text-xs uppercase pb-3 tracking-widest border-b-2 transition-all ${activeTab === 'details' ? 'border-gold text-gold font-bold' : 'border-transparent text-gray-400'}`}
                  id="tab-details"
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('tailoring')}
                  className={`font-mono text-xs uppercase pb-3 tracking-widest border-b-2 transition-all ${activeTab === 'tailoring' ? 'border-gold text-gold font-bold' : 'border-transparent text-gray-400'}`}
                  id="tab-tailoring"
                >
                  Suitable Uses
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`font-mono text-xs uppercase pb-3 tracking-widest border-b-2 transition-all ${activeTab === 'shipping' ? 'border-gold text-gold font-bold' : 'border-transparent text-gray-400'}`}
                  id="tab-shipping"
                >
                  Shipping & Policies
                </button>
              </div>
            </div>

            {/* Tab Contents */}
            <div className="min-h-24 text-gray-600 text-sm leading-relaxed font-sans">
              {activeTab === 'details' && (
                <div className="space-y-3">
                  <p>{product.description}</p>
                  <div className="flex gap-2 items-center bg-gold/5 p-3 rounded-none border border-gold/10">
                    <Sparkles className="w-4 h-4 text-gold flex-shrink-0" />
                    <p className="font-mono text-[11px] text-gold font-medium">Bespoke Guarantee: Color does not run. Woven with double-twisted fiber counts.</p>
                  </div>
                </div>
              )}
              {activeTab === 'tailoring' && (
                <div className="space-y-3">
                  <p className="font-semibold text-gray-900">Custom recommended styles for this fabric texture:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {product.suitableUses.map((useItem, uIdx) => (
                      <div key={uIdx} className="flex items-center gap-2 border border-gray-100 p-2 bg-white font-mono text-[11px] text-gray-700">
                        <Scissors className="w-3.5 h-3.5 text-gold" />
                        <span>{useItem}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === 'shipping' && (
                <div className="space-y-2 text-xs">
                  <p className="font-semibold text-gray-900">Standard Delivery Rates & Dispatch Timelines:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong className="text-gray-800">Lagos Metro (VI, Ikoyi, Lekki, Mainland):</strong> Same-day secure dispatch via dispatch riders.</li>
                    <li><strong className="text-gray-800">Nationwide (Abuja, Port-Harcourt, Enugu, Kano):</strong> 2 - 3 business days via luxury bus freighting or cargo plane cargo.</li>
                    <li><strong className="text-gray-800">Worldwide (UK, US, Canada):</strong> 5 - 7 business days via secure DHL/FedEx Express tracing.</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Selection Options and Calculator */}
            <div className="space-y-6 pt-6 border-t border-gray-100">
              
              {/* Color Selector */}
              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-gray-400 block font-semibold">Select Color Option</span>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((colorName, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => setSelectedColor(colorName)}
                      className={`font-mono text-xs px-3 py-1.5 border transition-all ${selectedColor === colorName ? 'border-gold bg-gold/5 text-gold font-semibold' : 'border-gray-200 bg-white text-gray-500 hover:border-gold/30'}`}
                      id={`color-option-${cIdx}`}
                    >
                      {colorName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Advanced interactive yard calculator */}
              <div className="space-y-4 bg-white p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-gray-400 block font-semibold">Interactive Yardage Calculator</span>
                  <div className="flex items-center gap-1 font-mono text-[11px] text-gold">
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Width: {product.width}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Preset Buttons */}
                  {[4, 6, 7, 8, 12].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setYardage(preset)}
                      className={`w-11 h-11 font-mono text-xs border flex items-center justify-center transition-all ${yardage === preset ? 'border-gold bg-black text-white font-bold' : 'border-gray-200 hover:border-gold text-gray-600'}`}
                      id={`yard-preset-${preset}`}
                    >
                      {preset}y
                    </button>
                  ))}

                  {/* Manual Numeric input */}
                  <div className="flex-1 flex items-center border border-gray-200 px-3 py-2 bg-[#FAF9F6]">
                    <input
                      type="number"
                      min={1}
                      max={120}
                      value={yardage}
                      onChange={(e) => setYardage(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-transparent font-mono text-sm text-gray-800 text-center focus:outline-none"
                    />
                    <span className="font-mono text-[11px] text-gray-400 ml-2">Yards</span>
                  </div>
                </div>

                {/* Outfit Selector helper hint details */}
                <div className="font-sans text-xs text-gray-500 bg-[#FAF9F6] p-3 border-l-2 border-gold flex items-start gap-2 leading-relaxed">
                  <Scissors className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-gray-850">Outfit Recommendation: </span>
                    <span>{getYardageAdvice(yardage)}</span>
                  </div>
                </div>

                {/* Total pricing calculation summary */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase text-gray-400">Calculated Total</p>
                    <p className="font-mono text-2xl font-black text-gray-900 tracking-tight mt-0.5">
                      {totalPriceDisplay}
                      <span className="font-normal text-xs text-gray-400 ml-1.5 font-mono">({yardage} Yards @ {priceDisplay})</span>
                    </p>
                  </div>

                  <button
                    onClick={handleShare}
                    className="p-2.5 border border-gray-200 hover:border-gold hover:text-gold text-gray-500 bg-white flex items-center justify-center transition-all"
                    title="Copy Fabric Showcase Link"
                    id="share-product-link"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Primary Call To Actions */}
              {product.inStock ? (
                <button
                  onClick={() => onOpenOrderForm(product, selectedColor, yardage)}
                  className="w-full py-4.5 bg-black text-white border border-black hover:bg-transparent hover:text-black font-semibold font-mono text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/5 cursor-pointer"
                  id={`detail-order-btn-${product.id}`}
                >
                  <MessageCircle className="w-4 h-4 text-green-400" />
                  <span>Secure Order via WhatsApp</span>
                </button>
              ) : (
                <div className="w-full py-4 bg-red-50 border border-red-200 text-red-700 font-mono text-center text-xs uppercase tracking-widest font-semibold">
                  Awaiting Fresh Weave Mill Reels
                </div>
              )}

              <div className="flex justify-center items-center gap-2 pt-1 font-mono text-[10px] text-gray-400">
                <Ruler className="w-3.5 h-3.5 text-gold" />
                <span>Need tailored measurements counsel? Ask us via WhatsApp.</span>
              </div>

            </div>

          </div>

        </div>

        {/* Dynamic Related Fabrics recommendation gallery (3 Columns spacing) */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-200 pt-16 space-y-8 select-none" id="related-fabrics-panel">
            <div className="text-left space-y-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-gold font-bold">Similar Weave Standards</span>
              <h3 className="font-display text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">Recommended Fabrics</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.slice(0, 4).map((relProduct) => {
                const relPrice = currency === 'USD' 
                  ? `$${relProduct.pricePerYard}` 
                  : `₦${(relProduct.pricePerYard * exchangeRate).toLocaleString()}`;
                return (
                  <div
                    key={relProduct.id}
                    onClick={() => onSelectProduct(relProduct)}
                    className="group border border-gray-100 hover:shadow-lg transition-all cursor-pointer bg-white"
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-gray-55 relative">
                      <img
                        src={relProduct.images[0]}
                        alt={relProduct.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 font-mono text-[8px] text-gold uppercase">
                        {relProduct.category}
                      </div>
                    </div>
                    <div className="p-4 text-left space-y-1">
                      <h4 className="font-display font-medium text-xs text-gray-900 truncate tracking-wide">{relProduct.name}</h4>
                      <p className="font-mono text-[11px] text-gold font-bold">{relPrice} / yd</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
