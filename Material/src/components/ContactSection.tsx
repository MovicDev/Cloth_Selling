
import React from 'react';
import { Mail, Phone, MapPin, Clock, Sparkles, Send } from 'lucide-react';

interface ContactSectionProps {
  brandWhatsApp: string;
}

export default function ContactSection({ brandWhatsApp }: ContactSectionProps) {
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you. Your message has been routed to our concierge ledger. We will reply shortly via email/phone.');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="bg-[#FAF9F6] py-20 px-6 md:px-12 select-none" id="contact-showroom-section">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Contact Header Block */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-gold/10 border border-gold/15 text-gold font-mono text-[9px] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consulting & Logistics Concierge</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Connect With material
          </h2>
          <p className="font-sans text-xs md:text-sm text-gray-500 leading-relaxed">
            Need large volumes of uniform fabrics for family milestones (Aso-Ebi), bespoke tailoring recommendations, or global luxury shipping options? Reach us coordinate.
          </p>
        </div>

        {/* Multi-interactive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left panel: Info & Coordinates (5 Columns) */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <h3 className="font-display font-black text-xl text-gray-900 tracking-wide uppercase border-b border-gray-150 pb-3">
              Direct Channels
            </h3>

            <div className="space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold/10 text-gold border border-gold/10">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-mono text-[9px] uppercase text-gray-400 font-bold block">Call or Chat on WhatsApp</span>
                  <a href={`https://wa.me/${brandWhatsApp}`} className="font-mono text-sm font-bold text-gray-950 hover:text-gold transition-colors block">
                    +{brandWhatsApp}
                  </a>
                  <span className="font-sans text-[11px] text-gray-400 block">Available 24/7 for tailored consulting details.</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold/10 text-gold border border-gold/10">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-mono text-[9px] uppercase text-gray-400 font-bold block">Showroom Support Email</span>
                  <a href="mailto:ibrahimkolawole564@gmail.com" className="font-sans text-sm font-bold text-gray-950 hover:text-gold transition-colors block">
                    ibrahimkolawole564@gmail.com
                  </a>
                  <span className="font-sans text-[11px] text-gray-400 block font-normal">Expect responses within 2 business hours.</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold/10 text-gold border border-gold/10">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-mono text-[9px] uppercase text-gray-400 font-bold block">Physical Showroom Landmark</span>
                  <p className="font-sans text-sm font-bold text-gray-950 block">
                    No 4 shop 5 ibadan gbagi market, Oyo State, Nigeria
                  </p>
                  <span className="font-sans text-[11px] text-gray-400 block">Our boutique features roll hangers and direct ambient lighting.</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-gold/10 text-gold border border-gold/10">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-mono text-[9px] uppercase text-gray-400 font-bold block">Boutique Operating Hours</span>
                  <p className="font-mono text-xs font-bold text-gray-800">
                    Mon - Sat: 09:00 AM - 06:00 PM  
                  </p>
                  <span className="font-sans text-[11px] text-gray-400 block">Sunday closed (Available for pre-booked private lookbook consultations).</span>
                </div>
              </div>

            </div>

            {/* Premium Shipping Highlights badges */}
            {/* <div className="bg-white border border-gray-150 p-6 space-y-4">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-gold font-bold">Standard Delivery Logistics</h4>
              <div className="space-y-3 font-sans text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gold flex-shrink-0" />
                  <span><strong>Express Air cargo:</strong> 2-3 business days nationwide.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-gold flex-shrink-0" />
                  <span><strong>Luxury protective packaging:</strong> Moisture-sealed luxury rolls.</span>
                </div>
              </div>
            </div> */}

          </div>

          {/* Right panel: Direct Contact Form (7 Columns) */}
          <div className="lg:col-span-7 bg-white border border-gray-150 p-8 shadow-sm text-left">
            <h3 className="font-display font-black text-xl text-gray-900 tracking-wide uppercase border-b border-gray-150 pb-3 mb-6">
              Inquire Form
            </h3>

            <form onSubmit={handleContactSubmit} className="space-y-5 font-mono text-xs text-gray-700">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rasaq Ibrahim Kolawole"
                    className="w-full border border-gray-200 px-3.5 py-2.5 rounded-none font-sans text-sm focus:border-gold focus:outline-none bg-[#FAF9F6]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. mail@gmail.com"
                    className="w-full border border-gray-200 px-3.5 py-2.5 rounded-none font-sans text-sm focus:border-gold focus:outline-none bg-[#FAF9F6]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label>Phone Number / Contact *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. +234 812 345 6789"
                  className="w-full border border-gray-200 px-3.5 py-2.5 rounded-none font-sans text-sm focus:border-gold focus:outline-none bg-[#FAF9F6]"
                />
              </div>

              <div className="space-y-1.5">
                <label>Nature of Inquiry</label>
                <select className="w-full border border-gray-200 px-3 py-2.5 text-xs bg-[#FAF9F6] focus:border-gold focus:outline-none">
                  <option>Family Aso-Ebi Uniform Purchase (Bulk discount)</option>
                  <option>Custom Tailoring sizing counselling</option>
                  <option>Verify fabric roll stock</option>
                  <option>International shipping quotes (DHL/FedEx)</option>
                  <option>Other bespoke questions</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label>Your Message / Requirements *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Explain exactly what fabrics and yards you are looking for..."
                  className="w-full border border-gray-200 px-3.5 py-2.5 rounded-none font-sans text-sm focus:border-gold focus:outline-none bg-[#FAF9F6] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-black text-white border border-black hover:bg-transparent hover:text-black font-semibold font-mono text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                id="contact-submit-btn"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry Blueprint</span>
              </button>

            </form>
          </div>

        </div>

        {/* Google Maps Simulated Section */}
        <div className="border border-gray-150 bg-white p-4 shadow-sm text-left space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
            <h4 className="font-display font-bold text-sm text-gray-900 uppercase">Interactive Showroom Map Coordinates</h4>
          </div>
          <div className="relative aspect-[21/9] bg-[#FAF9F6] border border-gray-150 overflow-hidden flex items-center justify-center">
            {/* Elegant Map Simulation Drawing */}
            <div className="absolute inset-0 bg-white opacity-40 mix-blend-multiply" />
            <div className="relative text-center space-y-2 z-10 max-w-sm px-4">
         <div className="w-full h-full overflow-hidden rounded-xl">
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.633622600121!2d3.9519668758802493!3d7.3948859124224855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10399319751c9029%3A0x170119f28f57fbea!2sGbagi%20Market%20Bridge%2C%20Ibadan%2C%20Oyo!5e0!3m2!1sen!2sng!4v1781284837050!5m2!1sen!2sng"
  width={800}
  height={600}
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
  
</div>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="no-referrer" 
                className="inline-block text-[10px] tracking-wider uppercase bg-black text-white border border-black px-3 py-1.5 hover:bg-transparent hover:text-black mt-2 transition-all font-mono"
              >
                Launch Navigation App
              </a>
            </div>
            {/* Artistic map outlines */}
            <div className="absolute -left-20 top-1/2 w-96 h-0.5 bg-gray-150 -rotate-[35deg]" />
            <div className="absolute left-20 -top-10 w-0.5 h-96 bg-gray-150" />
            <div className="absolute right-10 -bottom-10 w-0.5 h-96 bg-gray-150" />
            <div className="absolute -right-10 top-1/4 w-96 h-0.5 bg-gray-150 rotate-[25deg]" />
          </div>
        </div>

      </div>
    </div>
  );
}
