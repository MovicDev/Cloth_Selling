
import React from 'react';
import { ArrowRight, MessageCircle, Sparkles, Scissors, Landmark, Truck } from 'lucide-react';
import { Collection } from '../types';

interface HeroSectionProps {
  collections: Collection[];
  onExplore: (category: string | null) => void;
  brandWhatsApp: string;
}

export default function HeroSection({ collections, onExplore, brandWhatsApp }: HeroSectionProps) {
  return (
    <div className="relative w-full flex flex-col" id="hero-showroom-wrapper">
      
      {/* Cinematic Main Hero Canvas */}
      <section className="relative w-full min-h-[92vh] flex items-center justify-center px-6 md:px-12 py-20 bg-black overflow-hidden select-none">
        
        {/* Soft Gold Ambient Light Orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-beige/15 rounded-full blur-[120px] pointer-events-none" />

        {/* Cinematic Backdrop Video Layer */}
        <video
          autoPlay
          loop
          muted
          playsInline
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-screen scale-105 transition-transform duration-[10000ms] ease-out hover:scale-100"
          poster="https://i.pinimg.com/1200x/18/8c/6e/188c6e3468cde49ba1ce41f6c662e6e0.jpg  "
        >
          {/* Loop showing tailoring and texture detail */}
            <source 
              src="https://assets.mixkit.co/videos/preview/mixkit-young-man-wearing-silk-outfit-walking-in-studio-34201-large.mp4" 
              type="video/mp4" 
            />
          </video>

        {/* Elegant overlay gradient to ensure contrast and modern high-end look */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/80" />

        {/* Hero Interactive Content */}
        <div className="max-w-5xl mx-auto text-center relative z-20 space-y-8 flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-glass-dark border border-gold/20 text-gold font-mono text-[10px] uppercase tracking-[0.25em] animate-fade-in">
            <Sparkles className="w-3 h-3 text-gold animate-pulse" />
            <span>The Fine Art of Tailoring Textiles</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-extrabold text-[#FAF9F6] tracking-tight leading-[1.1] max-w-4xl">
            Premium Fabrics <br className="hidden md:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-beige to-white">
              for Timeless Fashion
            </span>
          </h1>

          <p className="font-sans text-sm md:text-lg text-gray-300 max-w-2xl leading-relaxed">
            Discover unmatched fabric weight, majestic weaves, and elite texture folders for luxury native senator styles, royal lace wear, khaftans, and corporate suit tailoring.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
            <button
              onClick={() => onExplore(null)}
              className="group relative px-8 py-4 bg-gold hover:bg-[#b59556] text-black font-semibold font-mono text-xs uppercase tracking-[0.2em] rounded-none flex items-center justify-center gap-2 transition-all w-full sm:w-auto shadow-lg shadow-gold/10"
              id="hero-explore-showroom-btn"
            >
              <span>Explore Showroom</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href={`https://wa.me/${brandWhatsApp}?text=Hello%20material%20Showroom,%20I%20am%20looking%20for%20premium%20materials%20for%20an%20upcoming%20luxury%20outfit.%20Could%20you%20guide%20me?`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-white/20 hover:border-gold/50 hover:bg-white/5 text-white font-semibold font-mono text-xs uppercase tracking-[0.2em] rounded-none flex items-center justify-center gap-2 transition-all w-full sm:w-auto"
              id="hero-whatsapp-consult-btn"
            >
              <MessageCircle className="w-4 h-4 text-green-400" />
              <span>Order via WhatsApp</span>
            </a>
          </div>

        </div>

      </section>

      {/* Featured Collections Gallery Cards */}
      <section className="bg-[#FAF9F6] py-24 px-6 md:px-12 select-none" id="featured-collections-wrapper">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-gray-100 pb-8">
            <div className="space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold font-bold">Curated Showrooms</span>
              <h2 className="font-display text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Featured Collections
              </h2>
            </div>
            <p className="text-gray-500 text-xs md:text-sm max-w-md">
              Tap into our bespoke categories below to quickly filter our current stock of fine cashmere, wax prints, and structured linens.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((col) => (
              <div
                key={col.id}
                onClick={() => onExplore(col.name)}
                className="group relative h-96 cursor-pointer overflow-hidden border border-gray-100 shadow-sm transition-all hover:shadow-xl hover:border-gold/20"
              >
                {/* Background image zoom effect */}
                <img
                  src={col.image}
                  alt={col.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                />
                
                {/* Visual shade overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

                <div className="absolute inset-0 p-6 flex flex-col justify-end text-left space-y-2 relative z-10">
                  <span className="font-bold text-[9px] uppercase tracking-widest text-gold bg-gold/15 border border-gold/10 px-2 py-0.5 rounded-full w-max">
                    {col.count}+ Available
                  </span>
                  
                  <h3 className="font-display text-xl md:text-2xl font-bold text-white tracking-wide group-hover:text-gold transition-colors">
                    {col.name}
                  </h3>
                  
                  <p className="text-gray-300 text-xs line-clamp-2 leading-relaxed transition-colors group-hover:text-white">
                    {col.description}
                  </p>

                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-white/50 group-hover:text-gold pt-2 transition-colors">
                    <span>Enter Showroom Gallery</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Brand Value Strengths / Why Choose Us */}
      <section className="bg-white py-16 px-6 md:px-12 border-y border-gray-100 select-none">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="flex items-start gap-4 p-4 hover:bg-[#FAF9F6] transition-colors duration-300">
            <div className="p-3 bg-gold/10 border border-gold/10 rounded-none text-gold">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-gray-900 tracking-wide uppercase">Premium Draft Quality</h4>
              <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">
                Every weave draft meets elite tension parameters. Crease-resistant and tailor-approved standard weights.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 hover:bg-[#FAF9F6] transition-colors duration-300">
            <div className="p-3 bg-gold/10 border border-gold/10 rounded-none text-gold">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-gray-900 tracking-wide uppercase">Bespoke Heritage</h4>
              <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">
                Direct connections to premier African wax designers, French lace weavers, and Yorkshire wool mills.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 hover:bg-[#FAF9F6] transition-colors duration-300">
            <div className="p-3 bg-gold/10 border border-gold/10 rounded-none text-gold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-gray-900 tracking-wide uppercase">Elite Shipping Logistics</h4>
              <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">
                Swift dispatch lines nationwide across Nigeria and premium global freighting with secure tracking numbers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 hover:bg-[#FAF9F6] transition-colors duration-300">
            <div className="p-3 bg-gold/10 border border-gold/10 rounded-none text-gold">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-gray-900 tracking-wide uppercase">WhatsApp Concierge</h4>
              <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">
                Instant checkout pipelines configured directly to WhatsApp to establish yards details and custom notes instantly.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
