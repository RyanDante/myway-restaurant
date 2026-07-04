"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart3,
  UtensilsCrossed,
  Calendar,
  Settings2,
  Search,
  Plus,
  Edit,
  Trash2,
  Lock,
  LogOut,
  Check,
  X,
  Globe,
  RefreshCw,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  Clock,
  Eye
} from "lucide-react";
import { MenuItem } from "@/lib/constants";

export default function AdminDashboard() {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<"analytics" | "menu" | "reservations" | "settings">("analytics");

  // Menu catalog state
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loadingMenu, setLoadingMenu] = useState(false);
  const [menuSearch, setMenuSearch] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");

  // Reservation requests state
  const [reservations, setReservations] = useState<any[]>([]);
  const [loadingReservations, setLoadingReservations] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<any | null>(null);

  // Add/Edit Modals
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Menu Form Inputs
  const [formId, setFormId] = useState("");
  const [formNameEn, setFormNameEn] = useState("");
  const [formNameFr, setFormNameFr] = useState("");
  const [formDescEn, setFormDescEn] = useState("");
  const [formDescFr, setFormDescFr] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formCategory, setFormCategory] = useState("starters");
  const [formImage, setFormImage] = useState("");
  const [formDietary, setFormDietary] = useState<string[]>([]);
  const [formDietaryInput, setFormDietaryInput] = useState("");
  const [formFeatured, setFormFeatured] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  // General Settings
  const [restaurantStatus, setRestaurantStatus] = useState("open");
  const [supportPhone, setSupportPhone] = useState("+237 6 51 37 18 00");
  const [supportEmail, setSupportEmail] = useState("emperordante123@gmail.com");
  const [sendConfirmationEmail, setSendConfirmationEmail] = useState(true);
  const [settingsMessage, setSettingsMessage] = useState("");

  // Categories list
  const categories = [
    { key: "starters", label: "Starters & Appetizers" },
    { key: "salads", label: "Salads" },
    { key: "burgers", label: "Burgers" },
    { key: "pizzas", label: "Pizzas" },
    { key: "pasta_rice", label: "Pasta & Rice" },
    { key: "chicken", label: "Chicken Dishes" },
    { key: "beef_lamb", label: "Beef, Pork & Lamb" },
    { key: "seafood", label: "Seafood" },
    { key: "local", label: "Local Specialities" },
    { key: "desserts", label: "Desserts" },
    { key: "ice_cream", label: "Ice Cream" },
    { key: "fruit_juice", label: "Fruit Juice" },
    { key: "cocktails_shakes", label: "Cocktails & Shakes" },
    { key: "wines_champagne", label: "Wines & Champagne" },
    { key: "non_alcoholic_beverages", label: "Non-Alcoholic" },
    { key: "beers", label: "Beers" },
    { key: "spirits_liqueurs", label: "Spirits & Liqueurs" }
  ];

  // Load auth state from session
  useEffect(() => {
    const savedToken = localStorage.getItem("admin_token");
    if (savedToken) {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch Menu Items
  const loadMenu = async () => {
    setLoadingMenu(true);
    try {
      const res = await fetch("/api/menu");
      const data = await res.json();
      setMenuItems(data.data || []);
    } catch (err) {
      console.error("Error loading menu:", err);
    } finally {
      setLoadingMenu(false);
    }
  };

  // Fetch Reservations
  const loadReservations = async () => {
    setLoadingReservations(true);
    try {
      const res = await fetch("/api/reservations");
      const data = await res.json();
      setReservations(data.data || []);
    } catch (err) {
      console.error("Error loading reservations:", err);
    } finally {
      setLoadingReservations(false);
    }
  };

  // Fetch resources on authenticate
  useEffect(() => {
    if (isAuthenticated) {
      loadMenu();
      loadReservations();
    }
  }, [isAuthenticated]);

  // Handle Login submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsLoadingAuth(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passkey: passkeyInput }),
      });
      const data = await res.json();

      if (data.success && data.token) {
        localStorage.setItem("admin_token", data.token);
        setIsAuthenticated(true);
      } else {
        setAuthError(data.error || "Incorrect admin credentials.");
      }
    } catch (err) {
      setAuthError("Failed to authenticate with backend.");
    } finally {
      setIsLoadingAuth(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    setPasskeyInput("");
  };

  // Open Add/Edit Menu Item Modal
  const openMenuModal = (item: MenuItem | null = null) => {
    setFormError("");
    if (item) {
      setEditingItem(item);
      setFormId(item.id);
      setFormNameEn(item.nameEn);
      setFormNameFr(item.nameFr);
      setFormDescEn(item.descriptionEn || "");
      setFormDescFr(item.descriptionFr || "");
      setFormPrice(String(item.price));
      setFormCategory(item.category);
      setFormImage(item.image || "");
      setFormDietary(item.dietary || []);
      setFormFeatured(!!item.featured);
    } else {
      setEditingItem(null);
      setFormId("");
      setFormNameEn("");
      setFormNameFr("");
      setFormDescEn("");
      setFormDescFr("");
      setFormPrice("");
      setFormCategory("starters");
      setFormImage("");
      setFormDietary([]);
      setFormFeatured(false);
    }
    setFormDietaryInput("");
    setIsMenuModalOpen(true);
  };

  // Add tag to dietary list
  const addDietaryTag = () => {
    if (formDietaryInput.trim() && !formDietary.includes(formDietaryInput.trim())) {
      setFormDietary([...formDietary, formDietaryInput.trim()]);
      setFormDietaryInput("");
    }
  };

  // Remove tag from dietary list
  const removeDietaryTag = (indexToRemove: number) => {
    setFormDietary(formDietary.filter((_, idx) => idx !== indexToRemove));
  };

  // Save Menu Item (Add or Edit)
  const handleSaveMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setIsSubmittingForm(true);

    if (!formNameEn || !formPrice || !formCategory) {
      setFormError("English Name, Price, and Category are required.");
      setIsSubmittingForm(false);
      return;
    }

    const payload = {
      id: formId || undefined,
      nameEn: formNameEn,
      nameFr: formNameFr || formNameEn,
      descriptionEn: formDescEn,
      descriptionFr: formDescFr,
      price: Number(formPrice),
      category: formCategory,
      image: formImage,
      dietary: formDietary,
      featured: formFeatured,
    };

    const token = localStorage.getItem("admin_token") || "";

    try {
      const url = editingItem ? `/api/menu/${editingItem.id}` : "/api/menu";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsMenuModalOpen(false);
        loadMenu(); // reload list
      } else {
        setFormError(data.error || "An error occurred while saving the item.");
      }
    } catch (err) {
      setFormError("Failed to make request.");
    } finally {
      setIsSubmittingForm(false);
    }
  };

  // Delete Menu Item
  const handleDeleteMenuItem = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this menu item from Firestore?")) return;

    const token = localStorage.getItem("admin_token") || "";
    try {
      const res = await fetch(`/api/menu/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        loadMenu();
      } else {
        alert(data.error || "Failed to delete item.");
      }
    } catch (err) {
      alert("Failed to delete item.");
    }
  };

  // Update Reservation Status
  const handleUpdateReservationStatus = async (id: string, newStatus: string) => {
    const token = localStorage.getItem("admin_token") || "";
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setReservations((prev) =>
          prev.map((resv) => (resv.id === id || resv.$id === id ? { ...resv, status: newStatus } : resv))
        );
        if (selectedReservation && (selectedReservation.id === id || selectedReservation.$id === id)) {
          setSelectedReservation((prev: any) => ({ ...prev, status: newStatus }));
        }
      } else {
        alert(data.error || "Failed to update reservation status.");
      }
    } catch (err) {
      alert("Failed to update reservation status.");
    }
  };

  // Delete Reservation Document Record
  const handleDeleteReservation = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this reservation request?")) return;

    const token = localStorage.getItem("admin_token") || "";
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setReservations((prev) => prev.filter((resv) => resv.id !== id && resv.$id !== id));
      } else {
        alert(data.error || "Failed to delete reservation.");
      }
    } catch (err) {
      alert("Failed to delete reservation.");
    }
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsMessage("Settings saved successfully!");
    setTimeout(() => setSettingsMessage(""), 3000);
  };

  // Filter menu items based on inputs
  const filteredMenuItems = menuItems.filter((item) => {
    const matchesSearch =
      item.nameEn.toLowerCase().includes(menuSearch.toLowerCase()) ||
      item.nameFr.toLowerCase().includes(menuSearch.toLowerCase()) ||
      item.category.toLowerCase().includes(menuSearch.toLowerCase());
    const matchesCategory = selectedCategoryFilter === "all" || item.category === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Calculate stats summary
  const totalItems = menuItems.length;
  const featuredItemsCount = menuItems.filter((i) => i.featured).length;
  const pendingBookings = reservations.filter((r) => r.status === "pending" || !r.status).length;
  const confirmedBookings = reservations.filter((r) => r.status === "confirmed").length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neutral-900/40 rounded-full filter blur-[120px]" />

        <div className="w-full max-w-md bg-neutral-950/80 border border-neutral-900 p-8 rounded-2xl shadow-2xl backdrop-blur-md relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-500 mb-4 animate-pulse">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold uppercase tracking-widest text-white">
              MyWay Admin Panel
            </h1>
            <p className="text-xs text-neutral-400 mt-2 font-light">
              Enter operational credentials to unlock dashboard administration.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                Administrator Passcode
              </label>
              <input
                type="password"
                value={passkeyInput}
                onChange={(e) => setPasskeyInput(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-neutral-900 border border-neutral-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-gold-500 transition-all font-mono"
                required
              />
            </div>

            {authError && (
              <div className="flex items-center gap-2 bg-red-950/20 border border-red-900/50 text-red-500 text-xs py-3 px-4 rounded-xl">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoadingAuth}
              className="w-full bg-gold-500 hover:bg-gold-450 text-black font-bold uppercase tracking-widest py-4 rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-55 disabled:scale-100 cursor-pointer"
            >
              {isLoadingAuth ? "Validating..." : "Unlock Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 lg:p-8">
      {/* Top Header bar */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-neutral-900">
        <div>
          <h1 className="text-3xl font-extrabold uppercase tracking-widest text-white flex items-center gap-2">
            MyWay <span className="text-gold-500">Dashboard</span>
          </h1>
          <p className="text-xs text-neutral-400 font-light mt-1 uppercase tracking-wider">
            Operational Administration Panel • Cloud Database Active
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </header>

      {/* Tabs navigation */}
      <div className="flex flex-wrap gap-2 my-6">
        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
            activeTab === "analytics"
              ? "bg-gold-500 text-black font-black"
              : "bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 text-neutral-400"
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Analytics & Traffic
        </button>
        <button
          onClick={() => setActiveTab("menu")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
            activeTab === "menu"
              ? "bg-gold-500 text-black font-black"
              : "bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 text-neutral-400"
          }`}
        >
          <UtensilsCrossed className="w-4 h-4" />
          Menu Items ({totalItems})
        </button>
        <button
          onClick={() => setActiveTab("reservations")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
            activeTab === "reservations"
              ? "bg-gold-500 text-black font-black"
              : "bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 text-neutral-400"
          }`}
        >
          <Calendar className="w-4 h-4" />
          Reservations ({reservations.length})
          {pendingBookings > 0 && (
            <span className="ml-1 bg-red-600 text-white rounded-full text-[9px] w-4 h-4 flex items-center justify-center animate-pulse">
              {pendingBookings}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
            activeTab === "settings"
              ? "bg-gold-500 text-black font-black"
              : "bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 text-neutral-400"
          }`}
        >
          <Settings2 className="w-4 h-4" />
          Settings
        </button>
      </div>

      {/* Main content display panels */}
      <div className="mt-8">
        {/* ========================================================= */}
        {/* ANALYTICS TAB */}
        {/* ========================================================= */}
        {activeTab === "analytics" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-neutral-950/80 border border-neutral-900 p-6 rounded-2xl shadow-md">
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold flex items-center justify-between">
                  Daily Visitor Traffic
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                </p>
                <p className="text-3xl font-extrabold text-gold-500 mt-2">492</p>
                <p className="text-[10px] text-neutral-500 mt-1 font-light">+12.4% increase from last week</p>
              </div>
              <div className="bg-neutral-950/80 border border-neutral-900 p-6 rounded-2xl shadow-md">
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold flex items-center justify-between">
                  Pending Reservations
                  <Clock className="w-3.5 h-3.5 text-yellow-500 animate-pulse" />
                </p>
                <p className="text-3xl font-extrabold text-white mt-2">{pendingBookings}</p>
                <p className="text-[10px] text-neutral-500 mt-1 font-light">Requires manual operator review</p>
              </div>
              <div className="bg-neutral-950/80 border border-neutral-900 p-6 rounded-2xl shadow-md">
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold flex items-center justify-between">
                  Active Firestore Menu
                  <UtensilsCrossed className="w-3.5 h-3.5 text-gold-500" />
                </p>
                <p className="text-3xl font-extrabold text-gold-500 mt-2">{totalItems}</p>
                <p className="text-[10px] text-neutral-500 mt-1 font-light">{featuredItemsCount} featured chef specials</p>
              </div>
              <div className="bg-neutral-950/80 border border-neutral-900 p-6 rounded-2xl shadow-md">
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold flex items-center justify-between">
                  Avg. Client Bookings / Day
                  <Calendar className="w-3.5 h-3.5 text-blue-500" />
                </p>
                <p className="text-3xl font-extrabold text-white mt-2">8.2</p>
                <p className="text-[10px] text-neutral-500 mt-1 font-light">64% conversion on pre-orders</p>
              </div>
            </div>

            {/* Custom SVG Traffic Graph */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-neutral-950/80 border border-neutral-900 p-6 rounded-2xl shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    Weekly Visitor Traffic Trends (Pageviews)
                  </h3>
                  <span className="text-[10px] bg-neutral-900 text-gold-500 font-bold px-2.5 py-1 rounded-full uppercase">
                    Live Monitor
                  </span>
                </div>
                {/* SVG Graph Drawing */}
                <div className="h-64 w-full relative pt-2">
                  <svg className="w-full h-full" viewBox="0 0 700 220" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <line x1="0" y1="50" x2="700" y2="50" stroke="#1f1f1f" strokeWidth="1" strokeDasharray="5,5" />
                    <line x1="0" y1="110" x2="700" y2="110" stroke="#1f1f1f" strokeWidth="1" strokeDasharray="5,5" />
                    <line x1="0" y1="170" x2="700" y2="170" stroke="#1f1f1f" strokeWidth="1" strokeDasharray="5,5" />

                    {/* Shaded Area under line */}
                    <path
                      d="M 50 170 C 130 140, 180 80, 250 100 C 320 120, 380 40, 450 60 C 520 80, 580 150, 650 120 L 650 200 L 50 200 Z"
                      fill="url(#goldGradient)"
                      opacity="0.15"
                    />

                    {/* Gradient Definition */}
                    <defs>
                      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#d4af37" />
                        <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Trend Line */}
                    <path
                      d="M 50 170 C 130 140, 180 80, 250 100 C 320 120, 380 40, 450 60 C 520 80, 580 150, 650 120"
                      fill="none"
                      stroke="#d4af37"
                      strokeWidth="3.5"
                    />

                    {/* Dots */}
                    <circle cx="50" cy="170" r="5" fill="#000" stroke="#d4af37" strokeWidth="2" />
                    <circle cx="150" cy="120" r="5" fill="#000" stroke="#d4af37" strokeWidth="2" />
                    <circle cx="250" cy="100" r="5" fill="#000" stroke="#d4af37" strokeWidth="2" />
                    <circle cx="350" cy="90" r="5" fill="#000" stroke="#d4af37" strokeWidth="2" />
                    <circle cx="450" cy="60" r="5" fill="#000" stroke="#d4af37" strokeWidth="2" />
                    <circle cx="550" cy="115" r="5" fill="#000" stroke="#d4af37" strokeWidth="2" />
                    <circle cx="650" cy="120" r="5" fill="#000" stroke="#d4af37" strokeWidth="2" />
                  </svg>
                  <div className="flex justify-between text-[10px] text-neutral-500 font-semibold px-4 pt-2">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
              </div>

              {/* Busy Times Heatmap / Popular Dishes */}
              <div className="bg-neutral-950/80 border border-neutral-900 p-6 rounded-2xl shadow-md flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
                    Popular Categories & Activity
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs text-neutral-400 mb-1">
                        <span>Local Cameroonian Specials</span>
                        <span className="text-gold-500 font-bold">38%</span>
                      </div>
                      <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                        <div className="bg-gold-500 h-full rounded-full" style={{ width: "38%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-neutral-400 mb-1">
                        <span>Pizzas & Burgers</span>
                        <span className="text-gold-500 font-bold">28%</span>
                      </div>
                      <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                        <div className="bg-gold-500 h-full rounded-full" style={{ width: "28%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-neutral-400 mb-1">
                        <span>Cocktails & Shakes</span>
                        <span className="text-gold-500 font-bold">22%</span>
                      </div>
                      <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                        <div className="bg-gold-500 h-full rounded-full" style={{ width: "22%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-neutral-400 mb-1">
                        <span>Seafood Dishes</span>
                        <span className="text-gold-500 font-bold">12%</span>
                      </div>
                      <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                        <div className="bg-gold-500 h-full rounded-full" style={{ width: "12%" }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-900 flex justify-between items-center text-[10px] text-neutral-500 mt-4">
                  <span>Client order channel conversion:</span>
                  <span className="text-emerald-500 font-bold flex items-center gap-1">
                    WhatsApp (84%) <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MENU MANAGEMENT TAB */}
        {/* ========================================================= */}
        {activeTab === "menu" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                {/* Search */}
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    value={menuSearch}
                    onChange={(e) => setMenuSearch(e.target.value)}
                    placeholder="Search menu catalog..."
                    className="w-full bg-neutral-950 border border-neutral-900 pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-gold-500 text-white placeholder-neutral-500"
                  />
                </div>

                {/* Category Selector */}
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="bg-neutral-950 border border-neutral-900 text-neutral-300 text-xs px-4 py-2.5 rounded-xl focus:outline-none focus:border-gold-500 outline-none cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.key} value={cat.key}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => openMenuModal(null)}
                className="w-full sm:w-auto bg-gold-500 hover:bg-gold-450 text-black font-bold uppercase tracking-wider text-xs py-3 px-5 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add New Dish
              </button>
            </div>

            {/* Menu Items Grid */}
            <div className="">
              {loadingMenu ? (
                <div className="bg-neutral-950/80 border border-neutral-900 rounded-2xl py-20 text-center flex flex-col items-center gap-3">
                  <RefreshCw className="w-8 h-8 text-gold-500 animate-spin" />
                  <p className="text-sm text-neutral-500 font-light">Loading Firestore menu documents...</p>
                </div>
              ) : filteredMenuItems.length === 0 ? (
                <div className="bg-neutral-950/80 border border-neutral-900 rounded-2xl py-20 text-center text-neutral-500 italic font-light">
                  No catalog items found matching your filters.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredMenuItems.map((item) => {
                    const imageUrl = item.image
                      ? `https://res.cloudinary.com/dplbjvow2/image/upload/c_thumb,w_300,h_200,g_auto/${item.image}`
                      : null;

                    return (
                      <div
                        key={item.id}
                        className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden shadow-lg group hover:border-gold-500/40 transition-all duration-300 flex flex-col justify-between"
                      >
                        {/* Image Preview Block */}
                        <div className="relative h-44 bg-neutral-900 w-full flex items-center justify-center overflow-hidden">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={item.nameEn}
                              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="text-neutral-700 flex flex-col items-center gap-2">
                              <UtensilsCrossed className="w-8 h-8" />
                              <span className="text-[10px] uppercase tracking-wider font-light">No Image Set</span>
                            </div>
                          )}

                          {/* Featured Badge */}
                          {item.featured && (
                            <span className="absolute top-3 left-3 bg-gold-500 text-black text-[9px] font-extrabold uppercase tracking-widest py-1 px-2.5 rounded-full shadow-md">
                              Chef Special
                            </span>
                          )}

                          {/* Category Badge */}
                          <span className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-sm text-neutral-300 text-[9px] font-bold uppercase tracking-wider py-1 px-2.5 rounded-md border border-neutral-800">
                            {categories.find((c) => c.key === item.category)?.label || item.category}
                          </span>
                        </div>

                        {/* Details Block */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <h4 className="font-bold text-white group-hover:text-gold-500 transition-all text-sm leading-snug">
                                {item.nameEn}
                              </h4>
                            </div>
                            {item.nameFr !== item.nameEn && (
                              <h5 className="text-[11px] text-neutral-500 font-light italic mt-0.5">
                                {item.nameFr}
                              </h5>
                            )}

                            {/* Description preview */}
                            {(item.descriptionEn || item.descriptionFr) ? (
                              <p className="text-xs text-neutral-400 font-light line-clamp-2 mt-2 leading-relaxed">
                                {item.descriptionEn || item.descriptionFr}
                              </p>
                            ) : (
                              <p className="text-xs text-neutral-600 font-light italic mt-2">
                                No description configured.
                              </p>
                            )}

                            {/* Dietary Tags */}
                            {item.dietary && item.dietary.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-3">
                                {item.dietary.map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="bg-neutral-900 text-neutral-500 text-[9px] font-semibold py-0.5 px-2 rounded-full border border-neutral-850"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="pt-3 border-t border-neutral-900 flex justify-between items-center">
                            <span className="font-extrabold text-gold-500 text-sm">
                              {item.price.toLocaleString()} FCFA
                            </span>

                            <div className="flex gap-1">
                              <button
                                onClick={() => openMenuModal(item)}
                                className="p-2 bg-neutral-900 hover:bg-gold-500 hover:text-black rounded-xl text-neutral-400 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                                title="Edit Item"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteMenuItem(item.id)}
                                className="p-2 bg-neutral-900 hover:bg-red-600 hover:text-white rounded-xl text-neutral-400 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                                title="Delete Item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* RESERVATIONS PANEL TAB */}
        {/* ========================================================= */}
        {activeTab === "reservations" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Active Table Bookings Requests Log
              </h3>
              <button
                onClick={loadReservations}
                className="flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Sync Log
              </button>
            </div>

            {/* Reservations Grid */}
            <div className="bg-neutral-950/80 border border-neutral-900 rounded-2xl overflow-hidden">
              {loadingReservations ? (
                <div className="py-20 text-center flex flex-col items-center gap-3">
                  <RefreshCw className="w-8 h-8 text-gold-500 animate-spin" />
                  <p className="text-sm text-neutral-500 font-light">Loading database booking records...</p>
                </div>
              ) : reservations.length === 0 ? (
                <div className="py-20 text-center text-neutral-500 italic font-light">
                  No active reservations found in database records.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-neutral-900 bg-neutral-950/50 text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">
                        <th className="py-4 px-6">Client Info</th>
                        <th className="py-4 px-6">Date & Time</th>
                        <th className="py-4 px-6 text-center">Guests</th>
                        <th className="py-4 px-6">Preorder Selection</th>
                        <th className="py-4 px-6">Status</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900/60 text-sm">
                      {reservations.map((resv) => {
                        const guestOrdersParsed = resv.guestOrders
                          ? typeof resv.guestOrders === "string"
                            ? JSON.parse(resv.guestOrders)
                            : resv.guestOrders
                          : null;

                        return (
                          <tr key={resv.$id || resv.id} className="hover:bg-neutral-900/30 transition-all">
                            <td className="py-4 px-6">
                              <div className="font-semibold text-white">{resv.name}</div>
                              <div className="text-xs text-neutral-500 mt-0.5">{resv.phone}</div>
                              {resv.email && <div className="text-xs text-neutral-500 font-light">{resv.email}</div>}
                            </td>
                            <td className="py-4 px-6">
                              <div className="text-white font-medium">{resv.date}</div>
                              <div className="text-xs text-neutral-500 mt-0.5">{resv.time}</div>
                            </td>
                            <td className="py-4 px-6 text-center text-white font-bold">{resv.guests}</td>
                            <td className="py-4 px-6">
                              {resv.preorderedFood ? (
                                <div className="space-y-1">
                                  <div className="text-xs text-gold-500 font-bold uppercase tracking-wider">
                                    {resv.preorderedFood}
                                  </div>
                                  {guestOrdersParsed && (
                                    <button
                                      onClick={() => setSelectedReservation(resv)}
                                      className="text-[10px] bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white px-2 py-1 rounded border border-neutral-850 flex items-center gap-1 transition-all cursor-pointer"
                                    >
                                      <Eye className="w-3 h-3" />
                                      View Choice Matrix
                                    </button>
                                  )}
                                </div>
                              ) : (
                                <span className="text-neutral-600 text-xs italic font-light">None</span>
                              )}
                            </td>
                            <td className="py-4 px-6">
                              <span
                                className={`inline-block text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                                  resv.status === "confirmed"
                                    ? "bg-emerald-950/20 border-emerald-900/50 text-emerald-500"
                                    : resv.status === "cancelled"
                                    ? "bg-red-950/20 border-red-900/50 text-red-500"
                                    : "bg-yellow-950/20 border-yellow-900/50 text-yellow-500 animate-pulse"
                                }`}
                              >
                                {resv.status || "pending"}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-right space-x-2">
                              {resv.status !== "confirmed" && (
                                <button
                                  onClick={() => handleUpdateReservationStatus(resv.id || resv.$id, "confirmed")}
                                  className="inline-flex p-1.5 bg-emerald-950 text-emerald-500 hover:bg-emerald-600 hover:text-black border border-emerald-900/50 rounded-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                                  title="Confirm Reservation"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              )}
                              {resv.status !== "cancelled" && (
                                <button
                                  onClick={() => handleUpdateReservationStatus(resv.id || resv.$id, "cancelled")}
                                  className="inline-flex p-1.5 bg-red-950 text-red-500 hover:bg-red-600 hover:text-white border border-red-900/50 rounded-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                                  title="Cancel Reservation"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteReservation(resv.id || resv.$id)}
                                className="inline-flex p-1.5 bg-neutral-900 text-neutral-400 hover:bg-red-600 hover:text-white border border-neutral-855 rounded-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                                title="Delete Booking"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* SETTINGS PANEL TAB */}
        {/* ========================================================= */}
        {activeTab === "settings" && (
          <div className="max-w-2xl bg-neutral-950/80 border border-neutral-900 p-8 rounded-2xl shadow-md animate-fadeIn">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-6 pb-2 border-b border-neutral-900">
              General System Configurations
            </h3>

            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                    Restaurant Status
                  </label>
                  <select
                    value={restaurantStatus}
                    onChange={(e) => setRestaurantStatus(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-gold-500 outline-none cursor-pointer text-sm"
                  >
                    <option value="open">Open (Accepting Bookings)</option>
                    <option value="closed">Closed (Maintenance Mode)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                    Send Client Email Confirmations (Resend)
                  </label>
                  <div className="flex items-center mt-3">
                    <input
                      type="checkbox"
                      checked={sendConfirmationEmail}
                      onChange={(e) => setSendConfirmationEmail(e.target.checked)}
                      className="w-4 h-4 accent-gold-500 rounded border-neutral-800 text-black cursor-pointer"
                    />
                    <span className="text-xs text-neutral-300 ml-2">Enable automatic transactional emails</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                  WhatsApp Support Phone Number
                </label>
                <input
                  type="text"
                  value={supportPhone}
                  onChange={(e) => setSupportPhone(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-gold-500 text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                  Restaurant Administrator Alert Email
                </label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-gold-500 text-sm font-mono"
                />
              </div>

              {settingsMessage && (
                <div className="flex items-center gap-2 bg-emerald-950/20 border border-emerald-900/50 text-emerald-500 text-xs py-3 px-4 rounded-xl">
                  <Check className="w-4 h-4" />
                  <span>{settingsMessage}</span>
                </div>
              )}

              <div className="pt-4 border-t border-neutral-900">
                <button
                  type="submit"
                  className="bg-gold-500 hover:bg-gold-450 text-black font-bold uppercase tracking-wider text-xs py-3.5 px-6 rounded-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* MENU ITEM DETAIL / CRUD MODAL */}
      {/* ========================================================= */}
      {isMenuModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-neutral-950 border border-neutral-900 w-full max-w-2xl rounded-2xl shadow-2xl p-6 lg:p-8 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsMenuModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white p-1 hover:bg-neutral-900 rounded-lg transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold uppercase tracking-wider text-white mb-6">
              {editingItem ? "Edit Catalog Dish" : "Create New Menu Item"}
            </h2>

            <form onSubmit={handleSaveMenuItem} className="space-y-6">
              {/* Form Error Panel */}
              {formError && (
                <div className="flex items-center gap-2 bg-red-950/20 border border-red-900/50 text-red-500 text-xs py-3 px-4 rounded-xl">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                    Dish ID (Optional / Auto-generated)
                  </label>
                  <input
                    type="text"
                    value={formId}
                    onChange={(e) => setFormId(e.target.value)}
                    placeholder="e.g. ndole-royale"
                    disabled={!!editingItem}
                    className="w-full bg-neutral-900 border border-neutral-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-gold-500 disabled:opacity-50 text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                    Price (FCFA) *
                  </label>
                  <input
                    type="number"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="e.g. 5000"
                    required
                    className="w-full bg-neutral-900 border border-neutral-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-gold-500 text-sm"
                  />
                </div>
              </div>

              {/* Names (EN / FR) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                    English Name *
                  </label>
                  <input
                    type="text"
                    value={formNameEn}
                    onChange={(e) => setFormNameEn(e.target.value)}
                    placeholder="e.g. Grilled Beef Fillet"
                    required
                    className="w-full bg-neutral-900 border border-neutral-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-gold-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                    French Name
                  </label>
                  <input
                    type="text"
                    value={formNameFr}
                    onChange={(e) => setFormNameFr(e.target.value)}
                    placeholder="e.g. Filet de Bœuf Grillé"
                    className="w-full bg-neutral-900 border border-neutral-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-gold-500 text-sm"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                  Category *
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-gold-500 outline-none cursor-pointer text-sm"
                >
                  {categories.map((cat) => (
                    <option key={cat.key} value={cat.key}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Descriptions (EN / FR) */}
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                  English Description
                </label>
                <textarea
                  value={formDescEn}
                  onChange={(e) => setFormDescEn(e.target.value)}
                  placeholder="Provide a detailed English description..."
                  rows={2}
                  className="w-full bg-neutral-900 border border-neutral-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-gold-500 text-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                  French Description
                </label>
                <textarea
                  value={formDescFr}
                  onChange={(e) => setFormDescFr(e.target.value)}
                  placeholder="Provide a detailed French description..."
                  rows={2}
                  className="w-full bg-neutral-900 border border-neutral-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-gold-500 text-sm resize-none"
                />
              </div>

              {/* Image & Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                    Cloudinary Image Public ID
                  </label>
                  <input
                    type="text"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="e.g. fine_plating"
                    className="w-full bg-neutral-900 border border-neutral-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-gold-500 text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                    Special Flags
                  </label>
                  <div className="flex items-center mt-3.5">
                    <input
                      type="checkbox"
                      checked={formFeatured}
                      onChange={(e) => setFormFeatured(e.target.checked)}
                      className="w-4 h-4 accent-gold-500 rounded border-neutral-800 text-black cursor-pointer"
                    />
                    <span className="text-xs text-neutral-300 ml-2 font-medium">Feature in Chef Specials</span>
                  </div>
                </div>
              </div>

              {/* Dietary Tags */}
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                  Dietary Tags (e.g. Vegetarian, Gluten-Free)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formDietaryInput}
                    onChange={(e) => setFormDietaryInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addDietaryTag())}
                    placeholder="Add tag and press Enter"
                    className="flex-1 bg-neutral-900 border border-neutral-800 text-white px-4 py-2.5 rounded-xl focus:outline-none focus:border-gold-500 text-sm"
                  />
                  <button
                    type="button"
                    onClick={addDietaryTag}
                    className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                {formDietary.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {formDietary.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 bg-neutral-900 text-neutral-300 text-xs px-2.5 py-1 rounded-full border border-neutral-850"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeDietaryTag(idx)}
                          className="hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer CTA */}
              <div className="pt-6 border-t border-neutral-900 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsMenuModalOpen(false)}
                  className="bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-400 hover:text-white text-xs font-bold uppercase tracking-wider py-3 px-5 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingForm}
                  className="bg-gold-500 hover:bg-gold-450 text-black font-bold uppercase tracking-wider text-xs py-3 px-6 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-55 disabled:scale-100 cursor-pointer"
                >
                  {isSubmittingForm ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* RESERVATION DETAIL / MATRIX SPREADSHEET MODAL */}
      {/* ========================================================= */}
      {selectedReservation && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-neutral-950 border border-neutral-900 w-full max-w-lg rounded-2xl shadow-2xl p-6 lg:p-8 relative">
            <button
              onClick={() => setSelectedReservation(null)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-white p-1 hover:bg-neutral-900 rounded-lg transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold uppercase tracking-wider text-white mb-2">
              Guest Choice Spreadsheet
            </h2>
            <p className="text-xs text-neutral-400 font-light mb-6 uppercase tracking-wider">
              Selected Choices Matrix for {selectedReservation.name}'s Party ({selectedReservation.guests} Guests)
            </p>

            <div className="border border-neutral-900 rounded-xl overflow-hidden bg-neutral-950">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-neutral-900/50 border-b border-neutral-900 text-neutral-400 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Guest</th>
                    <th className="py-3 px-4">Food Pre-order Choice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900/50">
                  {(() => {
                    const guestOrdersParsed = selectedReservation.guestOrders
                      ? typeof selectedReservation.guestOrders === "string"
                        ? JSON.parse(selectedReservation.guestOrders)
                        : selectedReservation.guestOrders
                      : null;

                    if (!guestOrdersParsed || Object.keys(guestOrdersParsed).length === 0) {
                      return (
                        <tr>
                          <td colSpan={2} className="py-4 px-4 text-center text-neutral-500 italic">
                            No individual guest orders mapped.
                          </td>
                        </tr>
                      );
                    }

                    return Object.entries(guestOrdersParsed).map(([key, val]: any) => (
                      <tr key={key} className="hover:bg-neutral-900/10">
                        <td className="py-3 px-4 text-neutral-300 font-medium">Guest #{Number(key) + 1}</td>
                        <td className="py-3 px-4 text-gold-500 font-semibold">{val}</td>
                      </tr>
                    ));
                  })()}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedReservation(null)}
                className="bg-gold-500 hover:bg-gold-450 text-black font-bold uppercase tracking-wider text-xs py-3 px-6 rounded-xl transition-all cursor-pointer"
              >
                Close Matrix
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
