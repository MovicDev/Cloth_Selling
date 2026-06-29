import React, { useState, useEffect } from 'react';
import { X, MessageCircle, ShieldCheck, Mail, Map, ClipboardList } from 'lucide-react';
import { Product, Order } from '../types';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  initialColor: string;
  initialYardage: number;
  brandWhatsApp: string;
  onSubmitOrder: (order: Order) => void;
}

export default function OrderModal({
  isOpen,
  onClose,
  product,
  initialColor,
  initialYardage,
  brandWhatsApp,
  onSubmitOrder,
}: OrderModalProps) {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [quantity, setQuantity] = useState(initialYardage);
  const [color, setColor] = useState(initialColor);
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Sync state when product loads or modal opens
  useEffect(() => {
    if (product) {
      setQuantity(initialYardage);
      setColor(initialColor);
    }
  }, [product, initialYardage, initialColor]);

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phoneNumber.trim() || !deliveryAddress.trim() || quantity <= 0) {
      alert('Please fill in all required customer details.');
      return;
    }

    // Build unique tracking order object
    const newOrder: Order = {
      id: `ord-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      customerName: fullName,
      phoneNumber: phoneNumber,
      address: deliveryAddress,
      quantityYards: quantity,
      productId: product.id,
      productName: product.name,
      colorSelected: color,
      additionalNotes: additionalNotes,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    // Save locally via trigger
    onSubmitOrder(newOrder);

    // Format the specific WhatsApp text exactly as user requested in specs
    const waText = `Hello,

I would like to order the following fabric:

Material: ${product.name} (${color})
Quantity: ${quantity} Yards

Customer Name: ${fullName}
Phone Number: ${phoneNumber}
Address: ${deliveryAddress}

Additional Notes:
${additionalNotes ? additionalNotes : 'Please confirm availability.'}

Thank you.`;

    const encodedText = encodeURIComponent(waText);
    const whatsappUrl = `https://wa.me/${brandWhatsApp}?text=${encodedText}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-100 backdrop-blur-sm select-none" id="order-modal-backdrop">
      <div 
        className="bg-white w-full max-w-lg shadow-2xl relative flex flex-col max-h-[90vh]" 
        onClick={(e) => e.stopPropagation()}
        id="order-modal-card"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-6 bg-black text-white">
          <div className="space-y-1 text-left">
            <span className="font-mono text-[9px] text-gold uppercase tracking-widest font-semibold block">material Direct Pipeline</span>
            <h3 className="font-display text-lg font-bold tracking-wide">Generate WhatsApp Order</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white transition-all cursor-pointer focus:outline-none"
            id="modal-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5 text-left flex-1" id="order-modal-form">
          
          {/* Item Quick View Container */}
          <div className="flex bg-[#FAF9F6] border border-gray-100 p-4 gap-4">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-16 h-20 object-cover border border-gray-200"
            />
            <div className="min-w-0 flex-1 flex flex-col justify-center">
              <span className="font-mono text-[9px] uppercase tracking-wider text-gold">{product.category}</span>
              <p className="font-display text-sm font-bold text-gray-900 truncate leading-tight mt-0.5">{product.name}</p>
              
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-gray-200/50 font-mono text-[10px] text-gray-500">
                <div>
                  <span className="text-gray-400">Color:</span>
                  <p className="text-gray-800 font-medium">{color}</p>
                </div>
                <div>
                  <span className="text-gray-400">Total Yards:</span>
                  <p className="text-gray-800 font-semibold">{quantity} yds</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-100 pb-2">
            <p className="font-mono text-[10px] uppercase text-gray-400 font-bold flex items-center gap-1.5">
              <ClipboardList className="w-3.5 h-3.5 text-gold" />
              <span>Customer Identification & Shipping Path</span>
            </p>
          </div>

          {/* Full Name Input */}
          <div className="space-y-1.5">
            <label className="font-mono text-xs text-gray-500 block font-semibold">Full Name <span className="text-red-700">*</span></label>
            <input
              type="text"
              required
              placeholder="e.g. John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-200 px-3.5 py-2.5 text-sm rounded-none focus:border-gold focus:outline-none bg-white placeholder-gray-300"
            />
          </div>

          {/* Phone Number Input */}
          <div className="space-y-1.5">
            <label className="font-mono text-xs text-gray-500 block font-semibold">Phone Number / WhatsApp Contact <span className="text-red-700">*</span></label>
            <input
              type="tel"
              required
              placeholder="e.g. +234 803 123 4567"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border border-gray-200 px-3.5 py-2.5 text-sm rounded-none focus:border-gold focus:outline-none bg-white placeholder-gray-300"
            />
          </div>

          {/* Delivery Address Input */}
          <div className="space-y-1.5">
            <label className="font-mono text-xs text-gray-500 block font-semibold">Precise Delivery Address <span className="text-red-700">*</span></label>
            <textarea
              required
              rows={2}
              placeholder="e.g. 15 Admiralty Way, Lekki Phase 1, Lagos, Nigeria"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full border border-gray-200 px-3.5 py-2.5 text-sm rounded-none focus:border-gold focus:outline-none bg-white placeholder-gray-300 resize-none"
            />
          </div>

          {/* Advanced Yard & Color Fine Tuning (Inside Modal Checkout) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-mono text-xs text-gray-500 block font-semibold">Fine Tune Color</label>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full border border-gray-200 px-3 py-2 text-xs bg-white focus:border-gold focus:outline-none"
              >
                {product.colors.map((c, idx) => (
                  <option key={idx} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-xs text-gray-500 block font-semibold">Fine Tune Yards</label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full border border-gray-200 px-3 py-2 text-xs bg-white text-center focus:border-gold focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Custom Notes Input */}
          <div className="space-y-1.5">
            <label className="font-mono text-xs text-gray-500 block font-semibold">Custom Notes / Availability Request (Optional)</label>
            <textarea
              rows={2}
              placeholder="e.g. Please confirm if there's matching plain cashmere weave. I need this delivered before next Friday."
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="w-full border border-gray-200 px-3.5 py-2.5 text-sm rounded-none focus:border-gold focus:outline-none bg-white placeholder-gray-300 resize-none"
            />
          </div>

          <div className="bg-[#FAF9F6] p-4 border border-gray-100 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <p className="text-[11px] text-gray-500 leading-normal">
              <strong>Security Protocol:</strong> Submitting compiles these details into a pre-structured luxury invoice, stores it in browser cache for tracking, and safely forwards you to WhatsApp. Your privacy is fully respected.
            </p>
          </div>

          {/* CTA Action Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gold hover:bg-[#b59556] text-black font-semibold font-mono text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-gold/10"
            id="order-submit-btn"
          >
            <MessageCircle className="w-4 h-4 text-black animate-pulse" />
            <span>Formulate & Open WhatsApp</span>
          </button>

        </form>
      </div>
    </div>
  );
}
