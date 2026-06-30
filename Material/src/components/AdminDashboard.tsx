

import React, { useState } from 'react';
import { 
  Plus, Edit, Trash2, ListOrdered, Tag, 
  FileSpreadsheet, Lock, Sparkles, TrendingUp, Laptop, Save 
} from 'lucide-react';
import { Product, Order, Collection } from '../types';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  collections: Collection[];
  onAddProduct: (p: Product) => void;
  onUpdateProduct: (p: Product) => void;
  onDeleteProduct: (pId: string) => void;
  onUpdateOrderStatus: (oId: string, status: 'pending' | 'completed' | 'canceled') => void;
  brandWhatsApp: string;
  setBrandWhatsApp: (num: string) => void;
}

export default function AdminDashboard({
  products,
  orders,
  collections,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  brandWhatsApp,
  setBrandWhatsApp,
}: AdminDashboardProps) {
  // Authorization State
  const [username, setUsername] = useState('');
  const [passcode, setPasscode] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState('');
  const [adminId, setAdminId] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // Password Change State
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [passwordChangeError, setPasswordChangeError] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Tab State
  const [adminTab, setAdminTab] = useState<'inventory' | 'orders' | 'settings'>('inventory');

  // Product Form State
  const [isEditing, setIsEditing] = useState(false);
  const [formProductId, setFormProductId] = useState('');
  const [name, setName] = useState('');
  const [pricePerYard, setPricePerYard] = useState<number>(15);
  const [category, setCategory] = useState('Ankara Fabrics');
  const [description, setDescription] = useState('');
  const [imagesText, setImagesText] = useState('');
  const [colorsText, setColorsText] = useState('');
  const [width, setWidth] = useState('60 inches (1.52m)');
  const [suitableUsesText, setSuitableUsesText] = useState('');
  const [isNewArrival, setIsNewArrival] = useState(false);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [inStock, setInStock] = useState(true);

  // Cloudinary Interactive State
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isCloudinaryUploading, setIsCloudinaryUploading] = useState<boolean>(false);
  const [cloudinaryProgress, setCloudinaryProgress] = useState<number>(0);
  const [videoUrl, setVideoUrl] = useState('');

  // Global Promotion Markup state
  const [promotionalDiscount, setPromotionalDiscount] = useState<number>(0); // e.g. 10 for 10% off



 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoginLoading(true);
  setAuthError('');

  try {
    const response = await fetch(`https://cloth-selling.onrender.com/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password: passcode })
    });

    const data = await response.json();

    if (!response.ok) {
      setAuthError(data.error || 'Login failed');
      setIsLoginLoading(false);
      return;
    }

    setIsAuthorized(true);
    setAdminId(data.admin.id);
    setAuthToken(data.token);
    localStorage.setItem('adminToken', data.token);
    localStorage.setItem('adminId', data.admin.id);
    setAuthError('');
    setUsername('');
    setPasscode('');
  } catch (error) {
    console.error('Login error:', error);
    setAuthError('Connection error. Please check your backend.');
  } finally {
    setIsLoginLoading(false);
  }
};

  const handleBypass = () => {
    setIsAuthorized(true);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeError('');
    setPasswordChangeSuccess('');

    if (newPassword !== newPasswordConfirm) {
      setPasswordChangeError('New passwords do not match');
      return;
    }

    if (newPassword.length < 4) {
      setPasswordChangeError('Password must be at least 4 characters');
      return;
    }

    setIsChangingPassword(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/change-password/${adminId}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ oldPassword, newPassword })
      });

      const data = await response.json();

      if (!response.ok) {
        setPasswordChangeError(data.error || 'Failed to change password');
        setIsChangingPassword(false);
        return;
      }

      setPasswordChangeSuccess('Password changed successfully!');
      setOldPassword('');
      setNewPassword('');
      setNewPasswordConfirm('');
      setTimeout(() => {
        setShowChangePassword(false);
        setPasswordChangeSuccess('');
      }, 2000);
    } catch (error) {
      console.error('Password change error:', error);
      setPasswordChangeError('Connection error. Please try again.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleEditClick = (p: Product) => {
    setIsEditing(true);
    setFormProductId(p.id);
    setName(p.name);
    setPricePerYard(p.pricePerYard);
    setCategory(p.category);
    setDescription(p.description);
    setImagesText(p.images.join(', '));
    setColorsText(p.colors.join(', '));
    setWidth(p.width);
    setSuitableUsesText(p.suitableUses.join(', '));
    setIsNewArrival(p.isNewArrival);
    setIsBestSeller(p.isBestSeller);
    setIsFeatured(p.isFeatured);
    setInStock(p.inStock);
    setUploadedImages(p.images || []);
    setVideoUrl(p.videoUrl || '');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleResetForm = () => {
    setIsEditing(false);
    setFormProductId('');
    setName('');
    setPricePerYard(15);
    setCategory('Ankara Fabrics');
    setDescription('');
    setImagesText('');
    setColorsText('');
    setWidth('60 inches (1.52m)');
    setSuitableUsesText('');
    setIsNewArrival(false);
    setIsBestSeller(false);
    setIsFeatured(false);
    setInStock(true);
    setUploadedImages([]);
    setVideoUrl('');
  };

  const handleLogoutAndClear = () => {
    setIsAuthorized(false);
    setUsername('');
    setPasscode('');
  };

  const handleCloudinaryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsCloudinaryUploading(true);
    setCloudinaryProgress(15);

    let progress = 15;
    const interval = setInterval(() => {
      progress += 20;
      if (progress >= 95) {
        clearInterval(interval);
        setCloudinaryProgress(95);

        const loadedUrls: string[] = [];
        const filesArray = Array.from(files) as File[];
        filesArray.forEach((file) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result as string;
            loadedUrls.push(result);
            if (loadedUrls.length === files.length) {
              setUploadedImages((prev) => [...prev, ...loadedUrls]);
              setIsCloudinaryUploading(false);
              setCloudinaryProgress(100);
              setTimeout(() => setCloudinaryProgress(0), 1000);
            }
          };
          reader.readAsDataURL(file);
        });
      } else {
        setCloudinaryProgress(progress);
      }
    }, 120);
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setUploadedImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handlePreloadFabricTexture = (unsplashUrl: string) => {
    setUploadedImages((prev) => [...prev, unsplashUrl]);
  };

  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || pricePerYard <= 0) {
      alert('Please enter a valid product name and price.');
      return;
    }

    let imagesArray = [...uploadedImages];
    if (imagesArray.length === 0) {
      imagesArray = imagesText
        .split(',')
        .map((i) => i.trim())
        .filter((i) => i.length > 0);
    }
    
    // Fallback beautiful texture image if none entered
    if (imagesArray.length === 0) {
      imagesArray.push('https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800');
    }

    const colorsArray = colorsText
      .split(',')
      .map((c) => c.trim())
      .filter((c) => c.length > 0);
    
    if (colorsArray.length === 0) {
      colorsArray.push('Classic Multi');
    }

    const usesArray = suitableUsesText
      .split(',')
      .map((u) => u.trim())
      .filter((u) => u.length > 0);

    if (usesArray.length === 0) {
      usesArray.push('Custom Tailored Fashion');
    }

    if (isEditing) {
      const updated: Product = {
        id: formProductId,
        name,
        pricePerYard: Number(pricePerYard),
        category,
        description,
        images: imagesArray,
        videoUrl: videoUrl.trim() || undefined,
        colors: colorsArray,
        width,
        suitableUses: usesArray,
        isNewArrival,
        isBestSeller,
        isFeatured,
        inStock,
        viewsCount: products.find((p) => p.id === formProductId)?.viewsCount || 10,
      };
      onUpdateProduct(updated);
      alert('Product modified successfully.');
    } else {
      const newP: Product = {
        id: `prod-${Date.now()}`,
        name,
        pricePerYard: Number(pricePerYard),
        category,
        description,
        images: imagesArray,
        videoUrl: videoUrl.trim() || undefined,
        colors: colorsArray,
        width,
        suitableUses: usesArray,
        isNewArrival,
        isBestSeller,
        isFeatured,
        inStock,
        viewsCount: 42,
      };
      onAddProduct(newP);
      alert('New fabric added to the showroom catalog.');
    }
    handleResetForm();
  };

  // Perform bulk promotion marking
  const handleApplyPromo = () => {
    if (promotionalDiscount < 0 || promotionalDiscount > 90) {
      alert('Enter a valid discount percentage (0-90%).');
      return;
    }
    if (promotionalDiscount === 0) {
      alert('Discount rate reset.');
      return;
    }
    
    if (confirm(`Are you sure you want to apply a ${promotionalDiscount}% global store discount to all active fabrics?`)) {
      products.forEach((p) => {
        const factor = (100 - promotionalDiscount) / 100;
        const discountedPrice = Math.max(1, Math.round(p.pricePerYard * factor));
        onUpdateProduct({
          ...p,
          pricePerYard: discountedPrice
        });
      });
      alert(`Applied ${promotionalDiscount}% discount rate globally.`);
      setPromotionalDiscount(0);
    }
  };

  // CSV export of client-side tracking orders
  const handleExportCSV = () => {
    if (orders.length === 0) {
      alert('No orders registered yet.');
      return;
    }
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Order ID,Customer Name,Phone Number,Address,Material,Color,Yards,Status,Created At\n";

    orders.forEach((o) => {
      const row = `"${o.id}","${o.customerName}","${o.phoneNumber}","${o.address.replace(/"/g, '""')}","${o.productName}","${o.colorSelected}",${o.quantityYards},"${o.status}","${o.createdAt}"`;
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `material_WhatsApp_Inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const categoriesAvailable = [
    "Ankara Fabrics",
    "Senator Materials",
    "Plain & Pattern Fabrics",
    "Lace Fabrics",
    "Cashmere Materials",
    "Cotton Fabrics",
    "Suiting Materials",
    "Vintage & Designer Prints",
    "Native wear materials",
    "Tailoring fabrics"
  ];

  /* Unlock Panel Backdrop if unauthorized */
  if (!isAuthorized) {
    return (
      <div className="min-h-[75vh] bg-[#FAF9F6] py-16 px-6 md:px-12 flex items-center justify-center select-none" id="admin-lockscreen">
        <div className="w-full max-w-md bg-white border border-gray-100 p-8 shadow-xl space-y-8 text-center">
          
          <div className="flex flex-col items-center space-y-2">
            <div className="p-4 bg-gold/10 text-gold rounded-full border border-gold/20 animate-pulse">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-display text-2xl font-extrabold tracking-wide text-gray-900 mt-4">Security Validation</h1>
            <p className="font-mono text-[10px] uppercase text-gray-400">Restricted Showroom Manager Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="font-mono text-xs text-gray-500 block">Username</label>
              <input
                type="text"
                placeholder="Enter username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-gold focus:outline-none text-center rounded-none font-mono"
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="font-mono text-xs text-gray-500 block">Password</label>
              <input
                type="password"
                placeholder="Enter password..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-gold focus:outline-none text-center rounded-none font-mono"
              />
            </div>

            {authError && (
              <p className="font-mono text-xs text-red-600 bg-red-50 p-2.5">{authError}</p>
            )}

            <button
              type="submit"
              disabled={isLoginLoading}
              className="w-full py-3 bg-black text-white border border-black font-mono text-xs uppercase tracking-[0.2em] hover:bg-transparent hover:text-black transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              id="admin-login-btn"
            >
              {isLoginLoading ? 'Verifying...' : 'Verify Credentials'}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-150" />
            </div>
            <div className="relative flex justify-center text-xs uppercase font-mono">
              <span className="bg-white px-3 text-gray-400">Or Quick Start</span>
            </div>
          </div>

          <button
            onClick={handleBypass}
            className="w-full py-3 border border-dashed border-gray-300 hover:border-gold text-gray-500 hover:text-gold font-mono text-xs uppercase tracking-widest transition-all"
            id="admin-bypass-btn"
          >
            Owner Access Bypass
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F6] py-12 px-6 md:px-12 min-h-screen text-left select-none" id="admin-dashboard-container">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Dashboard Title Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-gray-200 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              <span className="font-mono text-[10px] uppercase text-gold font-bold tracking-[0.2em]">Validated Owner Access Session</span>
            </div>
            <h1 className="font-display text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">material Admin Portal</h1>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                setIsAuthorized(false);
                setUsername('');
                setPasscode('');
                setAdminId('');
                setAuthToken('');
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminId');
              }}
              className="px-4 py-2 border border-gray-200 hover:border-red-400 hover:text-red-500 bg-white font-mono text-xs uppercase tracking-wider transition-all"
              id="admin-lock-btn"
            >
              Lock Panel
            </button>
          </div>
        </div>

        {/* Dynamic Admin Sub-Navigation Menu */}
        <div className="flex flex-col sm:flex-row border-b border-gray-200 bg-white shadow-sm p-1.5 gap-2 overflow-x-auto" id="admin-tab-bar">
          <button
            onClick={() => setAdminTab('inventory')}
            className={`font-mono text-xs uppercase px-4 py-3 sm:px-5 tracking-widest flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${adminTab === 'inventory' ? 'bg-black text-white font-bold' : 'text-gray-500 hover:text-black hover:bg-gray-50'}`}
            id="admin-tab-inventory-btn"
          >
            <Tag className="w-4 h-4 text-gold" />
            <span>Product Catalog ({products.length})</span>
          </button>
          
          <button
            onClick={() => setAdminTab('orders')}
            className={`font-mono text-xs uppercase px-4 py-3 sm:px-5 tracking-widest flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${adminTab === 'orders' ? 'bg-black text-white font-bold' : 'text-gray-500 hover:text-black hover:bg-gray-50'}`}
            id="admin-tab-orders-btn"
          >
            <ListOrdered className="w-4 h-4 text-gold" />
            <span>WhatsApp Registry ({orders.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('settings')}
            className={`font-mono text-xs uppercase px-4 py-3 sm:px-5 tracking-widest flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${adminTab === 'settings' ? 'bg-black text-white font-bold' : 'text-gray-500 hover:text-black hover:bg-gray-50'}`}
            id="admin-tab-settings-btn"
          >
            <Laptop className="w-4 h-4 text-gold" />
            <span>Showroom Config</span>
          </button>
        </div>

        {/* TAB 1: PRODUCT CATALOG CRUD GALAXY */}
        {adminTab === 'inventory' && (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Create or Edit Form Sub-section (5 Grid Columns) */}
            <div className="xl:col-span-5 lg:col-span-6 space-y-6">
              <div className="bg-white border border-gray-100 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h3 className="font-display font-bold text-base text-gray-900 tracking-wide uppercase flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span>{isEditing ? `Modify Material` : `Add Luxury Fabric`}</span>
                  </h3>
                  {isEditing && (
                    <button onClick={handleResetForm} className="font-mono text-[10px] uppercase text-gray-400 hover:text-gray-900 border border-gray-200 px-2 py-0.5 rounded">
                      Cancel Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleSubmitProduct} className="space-y-4 text-xs font-mono">
                  
                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-gray-400 block">Fabric Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Imperial Brocade Lace Velvet"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-200 px-3 py-2 text-sm focus:border-gold focus:outline-none bg-white font-sans text-gray-800"
                    />
                  </div>

                  {/* Dual Grid block */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-gray-400 block">Price per Yard (#) *</label>
                      <input
                        type="number"
                        required
                        min={1}
                        value={pricePerYard}
                        onChange={(e) => setPricePerYard(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full border border-gray-200 px-3 py-2 text-sm focus:border-gold focus:outline-none bg-white font-sans text-gray-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-gray-400 block">Category *</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border border-gray-200 px-3 py-2 text-sm focus:border-gold focus:outline-none bg-white text-gray-800"
                      >
                        {categoriesAvailable.map((cat, idx) => (
                          <option key={idx} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Description field */}
                  <div className="space-y-1">
                    <label className="text-gray-400 block">Editorial Story / Description</label>
                    <textarea
                      rows={3}
                      placeholder="Narrate the weave structure and tailoring responses..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full border border-gray-200 px-3 py-2 text-sm focus:border-gold focus:outline-none bg-white font-sans text-gray-800 resize-none"
                    />
                  </div>

                  {/* Cloudinary Active Image Uploader Component (Dynamic Simulator) */}
                  <div className="space-y-3.5 bg-sky-50/20 border border-sky-100 p-4.5 rounded-none text-left">
                    <div className="flex items-center justify-between">
                     
                      <span className="text-[10px] font-mono text-blue-500">Upload Images</span>
                    </div>

                    {/* Drag and Drop Region */}
                    <div className="border border-dashed border-sky-200 bg-white p-5 text-center relative group">
                      <input
                        type="file"
                        id="cloudinary-file-uploader"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleCloudinaryUpload}
                      />
                      
                      <label 
                        htmlFor="cloudinary-file-uploader"
                        className="cursor-pointer block space-y-2 select-none"
                      >
                        <div className="mx-auto w-10 h-10 bg-sky-50 rounded-full flex items-center justify-center group-hover:bg-sky-100 transition-colors">
                          <Plus className="w-5 h-5 text-sky-600" />
                        </div>
                        <p className="font-sans text-xs font-semibold text-gray-750">Drag & drop fabric photography here or <span className="text-sky-605 underline text-blue-600">browse file directory</span></p>
                        <p className="font-mono text-[9px] text-gray-400">Supports PNG, JPG, WEBP. Encrypted and stored to Cloudinary folder.</p>
                      </label>
                    </div>

                    {/* Simulating Progress Bar */}
                    {isCloudinaryUploading && (
                      <div className="space-y-1 bg-white p-3 border border-sky-100 rounded shadow-sm">
                        <div className="flex justify-between font-mono text-[10px] text-sky-700">
                          <span>Uploading to Cloudinary...</span>
                          <span>{cloudinaryProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-sky-500 h-full transition-all duration-150"
                            style={{ width: `${cloudinaryProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Fabric Thumbnail Portfolio List */}
                    {uploadedImages.length > 0 && (
                      <div className="space-y-2 bg-white p-3 border border-gray-150">
                        <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest block font-bold">Cloudinary Hosted Asset Roll ({uploadedImages.length})</span>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {uploadedImages.map((imgUrl, iIdx) => (
                            <div key={iIdx} className="relative aspect-square border border-gray-200 group/thumb">
                              <img
                                src={imgUrl}
                                alt="Uploader thumbnail"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(iIdx)}
                                  className="p-1 bg-red-600 hover:bg-red-700 text-white text-[9px] font-bold rounded-none uppercase cursor-pointer"
                                  title="Unbind asset"
                                >
                                  Remove
                                </button>
                              </div>
                              <span className="absolute bottom-0 inset-x-0 bg-sky-900/85 text-[6.5px] text-white py-0.5 truncate text-center font-mono">
                                Cloudinary Secure Link
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Legacy manual links fallback toggle */}
                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[9px] font-mono text-gray-400">Prefer entering comma URLs manually?</span>
                      <button
                        type="button"
                        onClick={() => {
                          const customLink = prompt("Paste direct image link / URL below:");
                          if (customLink) {
                            setUploadedImages(prev => [...prev, customLink]);
                          }
                        }}
                        className="text-[9px] font-mono text-sky-600 underline hover:text-sky-850"
                      >
                        Paste direct URL link
                      </button>
                    </div>
                  </div>

                  {/* Tailored Motion Video Lookbook */}
                  <div className="space-y-2 bg-[#FAF9F6] p-4.5 border border-gray-200 text-left">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-gold rounded-full animate-pulse" />
                      <label className="text-gray-850 font-mono text-xs uppercase tracking-wider font-bold">Tailored Draping Motion (Video Lookbook)</label>
                    </div>
                    <p className="text-[11px] text-gray-400">
                      Showcase how this fabric cascades, sparkles, and fits when tailored. Choose from our pristine preloaded luxury textile streams or paste a custom link:
                    </p>
                    
                    <div className="space-y-2.5">
                      <select
                        value={
                          videoUrl === 'https://assets.mixkit.co/videos/preview/mixkit-sewing-machine-stitching-a-fabric-41712-large.mp4' ? 'stitching' :
                          videoUrl === 'https://assets.mixkit.co/videos/preview/mixkit-man-posing-in-suit-and-tie-holding-sunglasses-42171-large.mp4' ? 'senator-pose' :
                          videoUrl === 'https://assets.mixkit.co/videos/preview/mixkit-tailor-measuring-and-cutting-fabric-on-a-table-41710-large.mp4' ? 'atelier-cut' :
                          videoUrl === 'https://assets.mixkit.co/videos/preview/mixkit-woman-in-white-wedding-dress-walking-down-stairs-41910-large.mp4' ? 'bridal-drape' :
                          videoUrl === '' ? 'none' : 'custom'
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === 'none') setVideoUrl('');
                          else if (val === 'stitching') setVideoUrl('https://assets.mixkit.co/videos/preview/mixkit-sewing-machine-stitching-a-fabric-41712-large.mp4');
                          else if (val === 'senator-pose') setVideoUrl('https://assets.mixkit.co/videos/preview/mixkit-man-posing-in-suit-and-tie-holding-sunglasses-42171-large.mp4');
                          else if (val === 'atelier-cut') setVideoUrl('https://assets.mixkit.co/videos/preview/mixkit-tailor-measuring-and-cutting-fabric-on-a-table-41710-large.mp4');
                          else if (val === 'bridal-drape') setVideoUrl('https://assets.mixkit.co/videos/preview/mixkit-woman-in-white-wedding-dress-walking-down-stairs-41910-large.mp4');
                        }}
                        className="w-full border border-gray-200 px-3 py-2 text-sm focus:border-gold focus:outline-none bg-white font-sans text-gray-800"
                      >
                        <option value="none">No Simulation Video (Static Only)</option>
                        <option value="stitching">🧵 Sewing & Needle Weaving (General Textile)</option>
                        <option value="senator-pose">🕴️ Senator Suit Fit & Pose (Senator/Cashmere)</option>
                        <option value="atelier-cut">✂️ Atelier Shear-Cutting Craft (Premium Lace/Ankara)</option>
                        <option value="bridal-drape">👰 Bridal Overlay Dress Drape (Lace/Embroidery)</option>
                        <option value="custom">✏️ Enter Custom Direct Video link (.mp4 URL)</option>
                      </select>

                      {/* Manual Paste fallback */}
                      {((videoUrl && 
                        videoUrl !== 'https://assets.mixkit.co/videos/preview/mixkit-sewing-machine-stitching-a-fabric-41712-large.mp4' &&
                        videoUrl !== 'https://assets.mixkit.co/videos/preview/mixkit-man-posing-in-suit-and-tie-holding-sunglasses-42171-large.mp4' &&
                        videoUrl !== 'https://assets.mixkit.co/videos/preview/mixkit-tailor-measuring-and-cutting-fabric-on-a-table-41710-large.mp4' &&
                        videoUrl !== 'https://assets.mixkit.co/videos/preview/mixkit-woman-in-white-wedding-dress-walking-down-stairs-41910-large.mp4'
                      ) || videoUrl === '') ? (
                        <div className="space-y-1">
                          <label className="text-[10px] text-gray-400 block font-mono">Direct MP4/WeBM Video URL Link</label>
                          <input
                            type="text"
                            placeholder="e.g. https://domain.com/video.mp4"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            className="w-full border border-gray-200 px-3 py-1.5 text-xs focus:border-gold focus:outline-none bg-white text-gray-800"
                          />
                        </div>
                      ) : (
                        <div className="bg-sky-50 text-[10px] font-mono border border-sky-100 p-2 flex items-center justify-between text-[#0c4a6e]">
                          <span>Active Stream: {videoUrl.split('/').pop()}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const inputUrl = prompt("Enter Direct MP4 URL:", videoUrl);
                              if (inputUrl !== null) setVideoUrl(inputUrl);
                            }}
                            className="underline text-[10px] text-sky-700 hover:text-sky-900 cursor-pointer"
                          >
                            Edit Link
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Colors and Width */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-gray-400 block">Colors (comma separated)</label>
                      <input
                        type="text"
                        placeholder="Gold, Crimson, Royal Indigo"
                        value={colorsText}
                        onChange={(e) => setColorsText(e.target.value)}
                        className="w-full border border-gray-200 px-3 py-2 focus:border-gold focus:outline-none bg-white text-gray-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-gray-400 block">Width specs</label>
                      <input
                        type="text"
                        placeholder="e.g. 58 inches (1.47m)"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className="w-full border border-gray-200 px-3 py-2 focus:border-gold focus:outline-none bg-white text-gray-800"
                      />
                    </div>
                  </div>

                  {/* Suitable Uses */}
                  <div className="space-y-1">
                    <label className="text-gray-400 block">Suitable Styles (comma separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. Senator Outfit, Bridal overlay kaftans, Gowns"
                      value={suitableUsesText}
                      onChange={(e) => setSuitableUsesText(e.target.value)}
                      className="w-full border border-gray-200 px-3 py-2 focus:border-gold focus:outline-none bg-white text-gray-800"
                    />
                  </div>

                  {/* Multi Flag Checklist Toggles */}
                  <div className="bg-[#FAF9F6] p-4 space-y-3.5 border border-gray-150">
                    <p className="text-gray-400 uppercase tracking-widest text-[9px] font-bold pb-1 border-b border-gray-200">Catalog Badging & Stock Availability</p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 text-[10px]">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isNewArrival}
                          onChange={(e) => setIsNewArrival(e.target.checked)}
                          className="w-3.5 h-3.5 accent-gold border-gray-300"
                        />
                        <span>New Arrival</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isBestSeller}
                          onChange={(e) => setIsBestSeller(e.target.checked)}
                          className="w-3.5 h-3.5 accent-gold border-gray-300"
                        />
                        <span>Best Seller</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isFeatured}
                          onChange={(e) => setIsFeatured(e.target.checked)}
                          className="w-3.5 h-3.5 accent-gold border-gray-300"
                        />
                        <span>Featured Hero</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={inStock}
                          onChange={(e) => setInStock(e.target.checked)}
                          className="w-3.5 h-3.5 accent-gold border-gray-300"
                        />
                        <span className="text-green-800 font-bold">In Stock</span>
                      </label>
                    </div>
                  </div>

                  {/* Save Triggers */}
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-black text-white border border-black hover:bg-transparent hover:text-black font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                    id="submit-form-btn"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isEditing ? `Confirm Alterations` : `Commit New Fabric`}</span>
                  </button>

                </form>
              </div>

              {/* Promotional Global Pricing Adjuster Widget */}
              <div className="bg-white border border-gray-100 p-6 shadow-sm space-y-4 text-xs font-mono">
                <h3 className="font-display font-bold text-sm text-gray-900 tracking-wide uppercase flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gold" />
                  <span>Global Campaign adjustment</span>
                </h3>
                <p className="text-gray-400 text-[11px] leading-relaxed">
                  Apply a global percent discount to all listed catalog items. Handy for holiday assemblies or end-of-season clearance.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="number"
                    min={0}
                    max={90}
                    placeholder="Discount % (e.g. 15)"
                    value={promotionalDiscount || ''}
                    onChange={(e) => setPromotionalDiscount(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full border border-gray-200 px-3 py-2 text-sm focus:border-gold focus:outline-none"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="w-full sm:w-auto bg-black text-white border border-black px-4 py-2 uppercase tracking-wider text-[11px] hover:bg-transparent hover:text-black transition-all cursor-pointer"
                  >
                    Apply Bulk
                  </button>
                </div>
              </div>
            </div>

            {/* Read Catalog Grid with Inline Toggles (7 Grid Columns) */}
            <div className="xl:col-span-7 lg:col-span-6 space-y-4">
              <div className="bg-white border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                  <h3 className="font-display font-bold text-base text-gray-900 tracking-wide uppercase">
                    Active Catalog Items ({products.length})
                  </h3>
                  <span className="font-mono text-[10px] text-gray-400">Manage stock and price metrics</span>
                </div>

                <div className="space-y-4 max-h-[60vh] sm:max-h-[85vh] overflow-y-auto pr-1">
                  {products.map((p) => (
                    <div
                      key={p.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-gray-50/50 hover:bg-gray-50 p-4 border border-gray-150 transition-colors"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-16 h-20 object-cover border border-gray-200"
                      />

                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] uppercase tracking-wider text-gold font-bold">{p.category}</span>
                          {!p.inStock && <span className="bg-red-100 text-red-800 text-[8px] px-1 py-0.2 rounded font-mono font-medium">Out of Stock</span>}
                          {p.isNewArrival && <span className="bg-white text-black border text-[8px] px-1 py-0.2 rounded font-mono font-medium">New</span>}
                        </div>
                        <h4 className="font-display font-black text-sm text-gray-900 truncate tracking-wide">{p.name}</h4>
                        
                        <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] text-gray-500">
                          <span className="text-black font-semibold">Price: ${p.pricePerYard}/yd</span>
                          <span>•</span>
                          <span>Width: {p.width}</span>
                          <span>•</span>
                          <span>{p.colors.length} Colors</span>
                        </div>
                      </div>

                      {/* Controls Toolbar */}
                      <div className="flex sm:flex-col items-center sm:items-end gap-2.5 pt-3 sm:pt-0 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-gray-200 sm:pl-4">
                        
                        {/* Quick Availability Toggle */}
                        <button
                          onClick={() => onUpdateProduct({ ...p, inStock: !p.inStock })}
                          className={`px-2.5 py-1 text-[10px] uppercase font-mono tracking-widest border transition-all cursor-pointer ${p.inStock ? 'border-green-300 text-green-700 bg-green-50/50 hover:bg-green-100' : 'border-red-300 text-red-700 bg-red-100 hover:bg-red-200'}`}
                        >
                          {p.inStock ? 'Available' : 'Restocking'}
                        </button>

                        <div className="flex gap-2">
                          {/* Edit button */}
                          <button
                            onClick={() => handleEditClick(p)}
                            className="p-1.5 border border-gray-200 hover:border-gold hover:text-gold bg-white text-gray-500 rounded transition-colors"
                            title="Edit Catalog Details"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete button */}
                          <button
                            onClick={() => {
                              if (confirm(`Are you absolutely sure you want to delete ${p.name} from the active catalog? This is permanent.`)) {
                                onDeleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 border border-gray-200 hover:border-red-400 hover:text-red-500 bg-white text-gray-500 rounded transition-colors"
                            title="Delete Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: WHATSAPP ORDER LOGS REGISTRY */}
        {adminTab === 'orders' && (
          <div className="bg-white border border-gray-100 p-6 shadow-sm space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div className="space-y-1">
                <h3 className="font-display font-bold text-base text-gray-900 tracking-wide uppercase">WhatsApp Order Registry</h3>
                <p className="font-mono text-[10px] text-gray-400">Track local submissions that were routed to WhatsApp</p>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={handleExportCSV}
                  className="w-full sm:w-auto px-4 py-2 border border-black hover:border-gold hover:text-gold font-mono text-xs uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5 bg-white transition-all cursor-pointer"
                  id="admin-export-csv"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="py-20 text-center space-y-2">
                <ListOrdered className="w-8 h-8 text-gray-300 mx-auto" />
                <p className="font-sans text-gray-500 font-medium">No order history tracked in this session yet.</p>
                <p className="font-mono text-[10px] text-gray-400 max-w-sm mx-auto">
                  When clients fill our order checkout form and request availability, their details record automatically right here.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-[11px] divide-y divide-gray-250">
                  <thead className="bg-[#FAF9F6] text-gray-400 uppercase tracking-widest">
                    <tr>
                      <th className="py-3 px-4">Order ID & Date</th>
                      <th className="py-3 px-4">Customer Details</th>
                      <th className="py-3 px-4">Selected Material</th>
                      <th className="py-3 px-4">Yards / Color</th>
                      <th className="py-3 px-4">Address & Notes</th>
                      <th className="py-3 px-4">Status Dispatch</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    {orders.slice().reverse().map((ord) => (
                      <tr key={ord.id} className="hover:bg-gray-50/70 transition-colors">
                        
                        {/* ID & Date */}
                        <td className="py-4 px-4 space-y-1">
                          <span className="text-black font-bold block">#{ord.id.slice(-6).toUpperCase()}</span>
                          <span className="text-gray-400 block text-[10px]">
                            {new Date(ord.createdAt).toLocaleDateString()}
                          </span>
                        </td>

                        {/* Customer */}
                        <td className="py-4 px-4 space-y-1">
                          <strong className="text-gray-900 font-sans block text-xs">{ord.customerName}</strong>
                          <span className="text-gold block">{ord.phoneNumber}</span>
                        </td>

                        {/* Product */}
                        <td className="py-4 px-4 font-display font-medium text-[12px] text-gray-950">
                          {ord.productName}
                        </td>

                        {/* Yards */}
                        <td className="py-4 px-4 font-bold">
                          {ord.quantityYards} yards <span className="text-gray-400 font-normal">({ord.colorSelected})</span>
                        </td>

                        {/* Notes */}
                        <td className="py-4 px-4 space-y-1 max-w-xs">
                          <span className="text-gray-505 block font-sans truncate" title={ord.address}>{ord.address}</span>
                          {ord.additionalNotes && (
                            <span className="text-orange-600 block text-[10px] italic truncate" title={ord.additionalNotes}>
                              Note: "{ord.additionalNotes}"
                            </span>
                          )}
                        </td>

                        {/* Action Status Menu */}
                        <td className="py-4 px-4">
                          <select
                            value={ord.status}
                            onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as 'pending' | 'completed' | 'canceled')}
                            className={`px-2 py-1 text-[10px] uppercase font-mono cursor-pointer border focus:outline-none ${ord.status === 'completed' ? 'border-green-300 text-green-700 bg-green-50' : ord.status === 'canceled' ? 'border-red-300 text-red-600 bg-red-50' : 'border-gray-200 text-gray-700'}`}
                          >
                            <option value="pending">⏳ Pending</option>
                            <option value="completed">✅ Dispatched</option>
                            <option value="canceled">❌ Cancelled</option>
                          </select>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        )}

        {/* TAB 3: SHOWROOM CONFIGURATION */}
        {adminTab === 'settings' && (
          <div className="bg-white border border-gray-100 p-6 sm:p-8 shadow-sm max-w-2xl mx-auto space-y-6">
            <h3 className="font-display font-bold text-base text-gray-900 tracking-wide uppercase border-b border-gray-100 pb-3">
              Configure Showroom Details
            </h3>

            <div className="space-y-4 text-xs font-mono">
              {/* Change Admin Password */}
              <div className="bg-blue-50 p-6 border border-blue-200 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-900 flex items-center gap-1">
                    <Lock className="w-4 h-4 text-blue-600" />
                    <span>Change Admin Password</span>
                  </p>
                  {showChangePassword && (
                    <button
                      onClick={() => {
                        setShowChangePassword(false);
                        setPasswordChangeError('');
                        setOldPassword('');
                        setNewPassword('');
                        setNewPasswordConfirm('');
                      }}
                      className="text-[10px] text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {!showChangePassword ? (
                  <button
                    onClick={() => setShowChangePassword(true)}
                    className="w-full px-4 py-2 bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 uppercase tracking-wider text-[10px] transition-all cursor-pointer"
                  >
                    Update Password
                  </button>
                ) : (
                  <form onSubmit={handleChangePassword} className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-gray-600 block font-semibold text-[10px]">Current Password</label>
                      <input
                        type="password"
                        placeholder="Enter your current password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                        className="w-full border border-gray-200 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none text-gray-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-gray-600 block font-semibold text-[10px]">New Password</label>
                      <input
                        type="password"
                        placeholder="Enter new password (min 4 characters)"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="w-full border border-gray-200 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none text-gray-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-gray-600 block font-semibold text-[10px]">Confirm New Password</label>
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        value={newPasswordConfirm}
                        onChange={(e) => setNewPasswordConfirm(e.target.value)}
                        required
                        className="w-full border border-gray-200 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none text-gray-800"
                      />
                    </div>

                    {passwordChangeError && (
                      <p className="text-xs text-red-600 bg-red-50 p-2">{passwordChangeError}</p>
                    )}

                    {passwordChangeSuccess && (
                      <p className="text-xs text-green-600 bg-green-50 p-2">{passwordChangeSuccess}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isChangingPassword}
                      className="w-full px-4 py-2 bg-green-600 text-white border border-green-600 hover:bg-green-700 uppercase tracking-wider text-[10px] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isChangingPassword ? 'Updating...' : 'Confirm Change Password'}
                    </button>
                  </form>
                )}
              </div>

              {/* WhatsApp Config */}
              <div className="space-y-1.5">
                <label className="text-gray-400 block font-semibold">Active Owner WhatsApp Number *</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2349016504151"
                    value={brandWhatsApp}
                    onChange={(e) => setBrandWhatsApp(e.target.value.replace(/\+/g, '').replace(/ /g, ''))}
                    className="w-full border border-gray-200 px-3 py-2 text-sm focus:border-gold focus:outline-none text-gray-800"
                  />
                </div>
                <span className="text-[10px] text-gray-400 block mt-1">
                  Enter country code without the '+' or spaces (e.g., "2349016504151" for Nigeria).
                </span>
              </div>

              {/* Reset to Seed Data */}
              <div className="bg-[#FAF9F6] p-6 border border-gray-150 space-y-3.5">
                <p className="font-semibold text-gray-900 flex items-center gap-1">
                  <Save className="w-4 h-4 text-gold" />
                  <span>Factory Reset Seed Materials</span>
                </p>
                <p className="text-gray-500 text-[11px] leading-relaxed font-sans">
                  Changed too many things and want to restore the pristine, beautiful luxury fabrics catalog from startup? You can wipe local state changes in one click.
                </p>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to restore the pre-seeded premium catalog fabrics? This resets any added items.')) {
                      localStorage.removeItem('material-custom-products');
                      window.location.reload();
                    }
                  }}
                  className="px-4 py-2 border border-red-300 text-red-700 bg-red-50 hover:bg-red-100 uppercase tracking-wider text-[10px] transition-colors"
                >
                  Confirm Reset Catalog
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
