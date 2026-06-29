import React from 'react';
import { Phone, MapPin, ArrowUp, Instagram, Facebook, Clock, ShieldCheck } from 'lucide-react';

interface FooterProps {
  setView: (view: string) => void;
  brandWhatsApp: string;
}

export default function Footer({ setView, brandWhatsApp }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#121212] text-gray-400 font-sans border-t border-gold/10 pt-16 pb-8 px-6 md:px-12 relative overflow-hidden" id="footer-section">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 blur-3xl rounded-full translate-x-24 -translate-y-24 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        
        {/* Brand Concept */}
        <div className="space-y-4">
          <button 
            onClick={() => { setView('home'); window.scrollTo(0,0); }}
            className="flex flex-col items-start cursor-pointer text-left focus:outline-none"
            id="footer-logo-button"
          >
            <span className="font-display text-xl tracking-[0.25em] font-extrabold text-white">
              material
            </span>
            <span className="font-mono text-[8px] uppercase tracking-[0.35em] text-gold mt-1">
              Bespoke Showroom
            </span>
          </button>
          
          <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
            Curating rare and exquisite fabrics for high-society attire, presidential senators, opulent wedding lace collections, and customized luxury tailoring worldwide.
          </p>

          <div className="flex items-center space-x-3 pt-2">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-gray-800 hover:border-gold hover:text-white transition-colors flex items-center justify-center text-gray-400"
              title="material on Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-gray-800 hover:border-gold hover:text-white transition-colors flex items-center justify-center text-gray-400"
              title="material on Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a 
              href={`https://wa.me/${brandWhatsApp}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-gray-800 hover:border-gold hover:text-white transition-colors flex items-center justify-center text-gray-400"
              title="Direct WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Collections Navigation */}
        <div className="space-y-4">
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-white font-semibold">Exquisite Fabrics</h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button 
                onClick={() => { setView('materials'); window.scrollTo(0, 0); }} 
                className="hover:text-gold transition-colors"
              >
                Ankara & Wax Prints
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setView('materials'); window.scrollTo(0, 0); }} 
                className="hover:text-gold transition-colors"
              >
                Sovereign Cashmere Senator
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setView('materials'); window.scrollTo(0, 0); }} 
                className="hover:text-gold transition-colors"
              >
                Bridal & Sequin French Lace
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setView('materials'); window.scrollTo(0, 0); }} 
                className="hover:text-gold transition-colors"
              >
                Fine Suiting & Wool Fabrics
              </button>
            </li>
            <li>
              <button 
                onClick={() => { setView('materials'); window.scrollTo(0, 0); }} 
                className="hover:text-gold transition-colors"
              >
                Plain & Pattern Matching Duos
              </button>
            </li>
          </ul>
        </div>

        {/* Studio Info / Contact Details */}
        <div className="space-y-4">
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-white font-semibold">Showroom Hours</h4>
          <div className="space-y-3 text-xs leading-relaxed">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white">Monday - Saturday</p>
                <p className="text-gray-500 font-mono text-[10px]">09:00 AM - 07:00 PM (GMT+1)</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              <p>42 materiall Avenue, Victoria Island, Lagos, Nigeria</p>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
              <p className="text-gold font-mono text-[11px]">Trusted by Custom Tailors Globally</p>
            </div>
          </div>
        </div>

        {/* Subscriptions / Direct Help */}
        <div className="space-y-4">
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-white font-semibold">Bespoke Inquiries</h4>
          <p className="text-gray-400 text-xs leading-relaxed">
            Are you a custom tailor or purchasing Aso-Ebi in large quantities? Connect with our personal shopper tool.
          </p>
          <div className="pt-2">
            <a
              href={`https://wa.me/${brandWhatsApp}?text=Hello%20material,%20I%20am%20interested%20in%20arranging%20a%20tailor%20Aso-Ebi%20partnership.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-center w-full py-2 bg-gold hover:bg-[#b59556] text-black font-mono text-[11px] uppercase tracking-wider transition-colors font-semibold"
            >
              Ask Designer Support
            </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-[10px] text-gray-500">
          © {new Date().getFullYear()} material Premium Textiles. Crafted with cinematic visual precision. All Rights Reserved.
        </p>
        
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-white hover:text-gold transition-all"
          title="Scroll to Top"
          id="scroll-to-top-button"
        >
          <span>Return To Apex</span>
          <ArrowUp className="w-4.5 h-4.5 animate-bounce" />
        </button>
      </div>
    </footer>
  );
}
