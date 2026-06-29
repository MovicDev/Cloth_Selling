import React, { useState } from 'react';
import { Play, Sparkles, Scissors,  Eye, X, MessageCircle } from 'lucide-react';
import { initialInspirations } from '../data/initialProducts';
import { Product } from '../types';

interface InspirationSectionProps {
  onSelectProductById: (productId: string) => void;
  allProducts: Product[];
  brandWhatsApp: string;
}

export default function InspirationSection({ onSelectProductById, allProducts, brandWhatsApp }: InspirationSectionProps) {
  const [activeVideo, setActiveVideo] = useState<{
    videoUrl: string;
    title: string;
    fabricUsed: string;
  } | null>(null);

  const getExactProduct = (fabricName: string) => {
    return allProducts.find((p) => p.name.toLowerCase().includes(fabricName.toLowerCase().slice(0, 10)));
  };

  return (
    <div className="bg-[#FAF9F6] py-20 px-6 md:px-12 select-none" id="inspiration-showroom">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Gallery Title Block */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/15 border border-gold/15 text-gold font-mono text-[9px] uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Luxury Lookbook & Styling</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Tailoring Inspiration
          </h2>
          <p className="font-sans text-xs md:text-sm text-gray-500 leading-relaxed">
            See how our premium Ankara wax prints, French cord laces, and Egyptian Giza cottons look when tailored by expert designers into kaftans, Senator wear, and gowns.
          </p>
        </div>

        {/* Video Inspiration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {initialInspirations.map((ins) => {
            const correspondingProduct = getExactProduct(ins.fabricUsed);
            return (
              <div
                key={ins.id}
                className="group bg-white border border-gray-150 overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300"
              >
                {/* Visual Thumbnail Frame */}
                <div className="relative aspect-video overflow-hidden bg-black/60">
                  <img
                    src={ins.thumbnailUrl}
                    alt={ins.title}
                    className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                  {/* Play circle trigger button */}
                  <button
                    onClick={() => setActiveVideo({
                      videoUrl: ins.videoUrl,
                      title: ins.title,
                      fabricUsed: ins.fabricUsed
                    })}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    id={`play-inspiration-${ins.id}`}
                  >
                    <span className="w-14 h-14 rounded-full bg-white/95 text-black hover:bg-gold hover:text-white flex items-center justify-center shadow-xl hover:scale-110 transition-all z-20">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </span>
                  </button>

                  <div className="absolute top-3 left-3 bg-[#FAF9F6]/95 text-black font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 flex items-center gap-1">
                    <Scissors className="w-3 h-3 text-gold" />
                    <span>Cut: {ins.designer}</span>
                  </div>
                </div>

                {/* Inspiration Card Details */}
                <div className="p-5 flex-1 flex flex-col justify-between text-left space-y-3">
                  <div className="space-y-1.5">
                    <h3 className="font-display font-extrabold text-base text-gray-900 leading-snug">
                      {ins.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {ins.description}
                    </p>
                  </div>

                  <div className="border-t border-gray-100 pt-4 mt-2 space-y-3.5">
                    <div className="flex items-center justify-between font-mono text-[11px] text-gray-400">
                      <span>Fabric:</span>
                      <strong className="text-gray-800 font-bold">{ins.fabricUsed}</strong>
                    </div>

                    <div className="flex gap-2.5">
                      {correspondingProduct ? (
                        <button
                          onClick={() => onSelectProductById(correspondingProduct.id)}
                          className="flex-1 py-2 bg-black text-white border border-black hover:bg-transparent hover:text-black font-mono text-[10px] uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer"
                          id={`examine-fabric-btn-${ins.id}`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Filter Source Fabric</span>
                        </button>
                      ) : (
                        <a
                          href={`https://wa.me/${brandWhatsApp}?text=Hello%20material,%20I%2520am%2520interested%252520in%2520buying%2520fabric%2520for%2520the%2520"${ins.title}"%2520tailor%2520style`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 border border-gray-200 hover:border-gold hover:bg-gold/5 text-gray-700 font-mono text-[10px] uppercase tracking-wider text-center transition-colors"
                        >
                          Inquire Availability
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cinematic Testimonials Panel */}
        <div className="border-t border-gray-200 pt-20 text-left space-y-12">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-gold font-bold">Showroom Praise</span>
              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Trusted by Custom Tailors</h3>
            </div>
            <p className="text-gray-500 text-xs max-w-sm">
              Discover real, unsolicited feedback from VIP style designers and global clients who shop our fabric rolls monthly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-150 p-6 space-y-4">
              <p className="text-gray-600 text-xs leading-relaxed italic">
                "The cord lace and senator materials from this showroom are genuinely unrivaled. The drape is consistent, and the gold embroideries on the cord lace hold up magnificently. My wedding clients have been thrilled."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-9 h-9 rounded-full bg-gold/15 text-gold flex items-center justify-center font-display font-medium text-xs">AA</div>
                <div>
                  <h4 className="font-display font-bold text-xs text-gray-900 leading-none">Adeola Alade</h4>
                  <span className="font-mono text-[10px] text-gray-400">Owner, Adeola Alade Bridal</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-150 p-6 space-y-4">
              <p className="text-gray-600 text-xs leading-relaxed italic">
                "When tailoring luxury Kaftans, you absolutely need material that doesn't crease after three hours of wear. The Cashmere Senator has been a game changer for my presidential clients. Highly recommended!"
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-9 h-9 rounded-full bg-gold/15 text-gold flex items-center justify-center font-display font-medium text-xs">AY</div>
                <div>
                  <h4 className="font-display font-bold text-xs text-gray-900 leading-none">Alaba Yusuf</h4>
                  <span className="font-mono text-[10px] text-gray-400">Creative Director, Yusuf Bespoke</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-150 p-6 space-y-4">
              <p className="text-gray-600 text-xs leading-relaxed italic">
                "We ordered 80 yards of the Emperor Ankara for a VIP Aso-Ebi event in Abuja. Every yard was consistently flawless, and the metallic golden outline shimmered under the ballroom lights perfectly."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-9 h-9 rounded-full bg-gold/15 text-gold flex items-center justify-center font-display font-medium text-xs">CO</div>
                <div>
                  <h4 className="font-display font-bold text-xs text-gray-900 leading-none">Chioma Okereke</h4>
                  <span className="font-mono text-[10px] text-gray-400">Abuja High-Society Stylist</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Video Overlay Dialog */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-[100] backdrop-blur-md">
          <div className="bg-black border border-gray-800 w-full max-w-2xl relative">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-3 right-3 p-1 text-white hover:text-gold bg-black/50 z-30"
              id="close-look-video"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video bg-black relative">
              <video
                src={activeVideo.videoUrl}
                autoPlay
                controls
                loop
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 text-left text-white bg-[#121212]">
              <h4 className="font-display font-bold text-lg tracking-wide">{activeVideo.title}</h4>
              <p className="font-mono text-xs text-gold mt-1.5">Fabric highlighted: {activeVideo.fabricUsed}</p>
              <div className="flex gap-2 pt-4">
                <a
                  href={`https://wa.me/${brandWhatsApp}?text=Hello%20material,%20I%2520am%2520interested%252520in%2520details%2520regarding%2520the%2520"${activeVideo.title}"%2520wear.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 bg-gold hover:bg-[#b59556] text-black text-center font-mono text-[11px] uppercase tracking-wider font-semibold"
                >
                  Request Fabric Custom Cut via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
