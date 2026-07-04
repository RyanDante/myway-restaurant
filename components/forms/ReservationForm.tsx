"use client";

import React, { useState, useEffect } from "react";
import {
  RESERVATION_SLOTS,
  FALLBACK_MENU,
  type MenuItem,
} from "@/lib/constants";
import { reservationSchema, type ReservationInput } from "@/lib/validations";
import { useSearchParams } from "next/navigation";
import {
  Utensils,
  GlassWater,
  Receipt,
  ChevronDown,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GuestOrder {
  foodId: string;
  drinkId: string;
}

export function ReservationForm() {
  const searchParams = useSearchParams();
  const preorderParam = searchParams.get("preorder");

  const [formData, setFormData] = useState<ReservationInput>({
    name: "",
    email: "",
    phone: "",
    guests: 2,
    date: "",
    time: RESERVATION_SLOTS[0],
    specialRequests: "",
    preorderedFood: "",
    preorderType: "none", // 'none' | 'same' | 'different'
    guestOrders: "", // Stringified JSON mapping
  });

  const [guestOrders, setGuestOrders] = useState<Record<number, GuestOrder>>(
    {},
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof ReservationInput, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Categorize menu items for dropdown lists
  const foodItems = FALLBACK_MENU.filter((item) => item.category !== "drinks");
  const drinkItems = FALLBACK_MENU.filter((item) => item.category === "drinks");

  // Sync state preorder ID from menu click
  useEffect(() => {
    if (preorderParam) {
      const match = FALLBACK_MENU.find((item) => item.id === preorderParam);
      if (match) {
        setFormData((prev) => ({
          ...prev,
          preorderType: "same",
          preorderedFood: match.id,
        }));
      }
    }
  }, [preorderParam]);

  // Adjust guestOrders mapping size dynamically based on guests count
  useEffect(() => {
    setGuestOrders((prev) => {
      const updated = { ...prev };
      // Build index keys from 1 up to guests count
      for (let i = 1; i <= formData.guests; i++) {
        if (!updated[i]) {
          updated[i] = { foodId: "", drinkId: "" };
        }
      }
      // Remove index keys that exceed guests count
      Object.keys(updated).forEach((key) => {
        const idx = parseInt(key, 10);
        if (idx > formData.guests) {
          delete updated[idx];
        }
      });
      return updated;
    });
  }, [formData.guests]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guests" ? parseInt(value, 10) || 1 : value,
    }));
    if (errors[name as keyof ReservationInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePreorderTypeChange = (type: "none" | "same" | "different") => {
    setFormData((prev) => ({
      ...prev,
      preorderType: type,
      preorderedFood:
        type === "same" ? prev.preorderedFood || FALLBACK_MENU[0].id : "",
    }));
  };

  const handleGuestOrderChange = (
    guestIndex: number,
    field: keyof GuestOrder,
    itemId: string,
  ) => {
    setGuestOrders((prev) => ({
      ...prev,
      [guestIndex]: {
        ...prev[guestIndex],
        [field]: itemId,
      },
    }));
  };

  // Calculate pricing
  const calculateTotal = () => {
    if (formData.preorderType === "none") return 0;

    if (formData.preorderType === "same") {
      const selectedItem = FALLBACK_MENU.find(
        (item) => item.id === formData.preorderedFood,
      );
      if (!selectedItem) return 0;
      return selectedItem.price * formData.guests;
    }

    // Different orders sum
    let total = 0;
    Object.values(guestOrders).forEach((order) => {
      if (order.foodId) {
        const food = FALLBACK_MENU.find((item) => item.id === order.foodId);
        if (food) total += food.price;
      }
      if (order.drinkId) {
        const drink = FALLBACK_MENU.find((item) => item.id === order.drinkId);
        if (drink) total += drink.price;
      }
    });
    return total;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrors({});

    // Attach stringified guest orders and prepend Cameroon country code (+237)
    const payload = {
      ...formData,
      phone: `+237 ${formData.phone}`.trim(),
      guestOrders:
        formData.preorderType === "different"
          ? JSON.stringify(guestOrders)
          : "",
    };

    const result = reservationSchema.safeParse(payload);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ReservationInput, string>> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ReservationInput] = err.message;
        }
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to submit reservation");
      }

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        guests: 2,
        date: "",
        time: RESERVATION_SLOTS[0],
        specialRequests: "",
        preorderedFood: "",
        preorderType: "none",
        guestOrders: "",
      });
      setGuestOrders({});
      
      // Clear preorder param from browser URL after successful booking
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", "/reservations");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setSubmitStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalCost = calculateTotal();

  return (
    <div className="max-w-2xl mx-auto bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-2xl relative">
      <h3 className="text-xl font-bold tracking-wider text-center text-gold-500 mb-8 uppercase font-serif">
        Table Reservation & Pre-ordering
      </h3>

      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 rounded-xl text-sm text-center">
          Thank you! Your reservation request has been submitted successfully.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-rose-950/50 border border-rose-500/30 text-rose-300 rounded-xl text-sm text-center">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1.5"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-black/50 border border-neutral-800 focus:border-gold-500/50 text-white rounded-lg px-4 py-2.5 outline-none transition-colors text-sm"
            placeholder="John Doe"
            required
          />
          {errors.name && (
            <p className="text-xs text-rose-400 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1.5"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-black/50 border border-neutral-800 focus:border-gold-500/50 text-white rounded-lg px-4 py-2.5 outline-none transition-colors text-sm"
              placeholder="johndoe@example.com"
              required
            />
            {errors.email && (
              <p className="text-xs text-rose-400 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1.5"
            >
              Phone Number
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-sm font-semibold text-neutral-400 select-none border-r border-neutral-800 pr-3 mr-2">
                +237
              </span>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-full bg-black/50 border border-neutral-800 focus:border-gold-500/50 text-white rounded-lg pl-18 pr-4 py-2.5 outline-none transition-colors text-sm"
                placeholder="6 12 34 56 78"
                required
              />
            </div>
            {errors.phone && (
              <p className="text-xs text-rose-400 mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Guests, Date & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="guests"
              className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1.5"
            >
              Guests Count
            </label>
            <input
              type="number"
              id="guests"
              name="guests"
              min="1"
              max="20"
              value={formData.guests}
              onChange={handleChange}
              className="w-full bg-black/50 border border-neutral-800 focus:border-gold-500/50 text-white rounded-lg px-4 py-2.5 outline-none transition-colors text-sm"
              required
            />
            {errors.guests && (
              <p className="text-xs text-rose-400 mt-1">{errors.guests}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1.5"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-black/50 border border-neutral-800 focus:border-gold-500/50 text-white rounded-lg px-4 py-2.5 outline-none transition-colors text-sm"
              required
            />
            {errors.date && (
              <p className="text-xs text-rose-400 mt-1">{errors.date}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="time"
              className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1.5"
            >
              Time Slot
            </label>
            <div className="relative">
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full bg-black/50 border border-neutral-800 focus:border-gold-500/50 text-white rounded-lg px-4 py-2.5 outline-none transition-colors text-sm appearance-none cursor-pointer"
                required
              >
                {RESERVATION_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3.5 top-3.5 w-4 h-4 text-neutral-600 pointer-events-none" />
            </div>
            {errors.time && (
              <p className="text-xs text-rose-400 mt-1">{errors.time}</p>
            )}
          </div>
        </div>

        {/* Pre-order selection toggle buttons */}
        <div className="border-t border-neutral-800/80 pt-6">
          <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-3">
            Pre-order Options
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(["none", "same", "different"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handlePreorderTypeChange(type)}
                className={`py-3 rounded-xl border text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  formData.preorderType === type
                    ? "bg-gold-500 border-gold-500 text-black shadow-lg"
                    : "bg-black/50 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white"
                }`}
              >
                {type === "none" && "No Pre-order"}
                {type === "same" && "Same for all"}
                {type === "different" && "Custom Choices"}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Fields Section */}
        <AnimatePresence mode="wait">
          {formData.preorderType === "same" && (
            <motion.div
              key="same-preorder"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden space-y-2.5"
            >
              <label
                htmlFor="preorderedFood"
                className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1"
              >
                Select Food / Drink item
              </label>
              <div className="relative">
                <select
                  id="preorderedFood"
                  name="preorderedFood"
                  value={formData.preorderedFood || ""}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-neutral-800 focus:border-gold-500/50 text-white rounded-lg px-4 py-2.5 outline-none transition-colors text-sm appearance-none cursor-pointer"
                  required
                >
                  {FALLBACK_MENU.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nameEn} ({item.price.toLocaleString()} XOF)
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-3.5 w-4 h-4 text-neutral-600 pointer-events-none" />
              </div>
            </motion.div>
          )}

          {formData.preorderType === "different" && (
            <motion.div
              key="different-preorder"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden space-y-4"
            >
              <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1.5">
                Customize Guest Selections
              </label>

              {/* Dynamic spreadsheet-like table grid */}
              <div className="border border-neutral-800 rounded-xl overflow-hidden bg-black/30">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-black/80 border-b border-neutral-800 text-neutral-500 font-bold uppercase tracking-wider text-[10px]">
                      <th className="p-4 w-1/4">Guest</th>
                      <th className="p-4 w-3/8 flex items-center gap-1.5">
                        <Utensils className="w-3.5 h-3.5" /> Food
                      </th>
                      <th className="p-4 w-3/8 flex items-center gap-1.5">
                        <GlassWater className="w-3.5 h-3.5" /> Drink
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: formData.guests }).map((_, idx) => {
                      const guestIdx = idx + 1;
                      const order = guestOrders[guestIdx] || {
                        foodId: "",
                        drinkId: "",
                      };
                      return (
                        <tr
                          key={guestIdx}
                          className="border-b border-neutral-800/60 hover:bg-neutral-900/10 transition-colors"
                        >
                          <td className="p-4 font-bold text-neutral-300">
                            Guest {guestIdx}
                          </td>
                          <td className="p-4">
                            <div className="relative">
                              <select
                                value={order.foodId}
                                onChange={(e) =>
                                  handleGuestOrderChange(
                                    guestIdx,
                                    "foodId",
                                    e.target.value,
                                  )
                                }
                                className="w-full bg-neutral-950/80 border border-neutral-850 text-neutral-200 rounded px-2.5 py-1.5 outline-none text-xs appearance-none cursor-pointer"
                              >
                                <option value="">-- Select Food --</option>
                                {foodItems.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.nameEn} ({item.price.toLocaleString()}{" "}
                                    XOF)
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-2 top-2.5 w-3.5 h-3.5 text-neutral-600 pointer-events-none" />
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="relative">
                              <select
                                value={order.drinkId}
                                onChange={(e) =>
                                  handleGuestOrderChange(
                                    guestIdx,
                                    "drinkId",
                                    e.target.value,
                                  )
                                }
                                className="w-full bg-neutral-950/80 border border-neutral-850 text-neutral-200 rounded px-2.5 py-1.5 outline-none text-xs appearance-none cursor-pointer"
                              >
                                <option value="">-- Select Drink --</option>
                                {drinkItems.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.nameEn} ({item.price.toLocaleString()}{" "}
                                    XOF)
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-2 top-2.5 w-3.5 h-3.5 text-neutral-600 pointer-events-none" />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pricing Summary Sheet */}
        <AnimatePresence>
          {formData.preorderType !== "none" && totalCost > 0 && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-black/50 border border-gold-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden font-serif"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gold-500/20" />

              {/* Receipt title */}
              <div className="flex items-center justify-between text-neutral-500 uppercase tracking-widest text-[10px] border-b border-neutral-800 pb-3 mb-4 font-sans font-bold">
                <span className="flex items-center gap-1.5">
                  <Receipt className="w-4 h-4 text-gold-500" /> Pre-order
                  Receipt
                </span>
                <span>MyWay Restaurant</span>
              </div>

              {/* Items list */}
              <div className="space-y-2.5 text-sm font-sans">
                {formData.preorderType === "same"
                  ? (() => {
                      const match = FALLBACK_MENU.find(
                        (item) => item.id === formData.preorderedFood,
                      );
                      return match ? (
                        <div className="flex justify-between items-baseline gap-4">
                          <span className="text-neutral-350">
                            {match.nameEn} (x{formData.guests})
                          </span>
                          <div className="border-b border-dotted border-neutral-850 flex-grow h-[1px]" />
                          <span className="text-white font-mono">
                            {(match.price * formData.guests).toLocaleString()}{" "}
                            XOF
                          </span>
                        </div>
                      ) : null;
                    })()
                  : Object.entries(guestOrders).map(([guestKey, order]) => {
                      const food = FALLBACK_MENU.find(
                        (item) => item.id === order.foodId,
                      );
                      const drink = FALLBACK_MENU.find(
                        (item) => item.id === order.drinkId,
                      );
                      if (!food && !drink) return null;

                      return (
                        <div key={guestKey} className="space-y-1">
                          <div className="text-[10px] text-gold-500 font-bold uppercase tracking-wider">
                            Guest {guestKey}
                          </div>
                          {food && (
                            <div className="flex justify-between items-baseline gap-4 pl-3">
                              <span className="text-neutral-300 text-xs">
                                {food.nameEn}
                              </span>
                              <div className="border-b border-dotted border-neutral-850 flex-grow h-[1px]" />
                              <span className="text-neutral-400 font-mono text-xs">
                                {food.price.toLocaleString()} XOF
                              </span>
                            </div>
                          )}
                          {drink && (
                            <div className="flex justify-between items-baseline gap-4 pl-3">
                              <span className="text-neutral-300 text-xs">
                                {drink.nameEn}
                              </span>
                              <div className="border-b border-dotted border-neutral-850 flex-grow h-[1px]" />
                              <span className="text-neutral-400 font-mono text-xs">
                                {drink.price.toLocaleString()} XOF
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
              </div>

              {/* Grand Total */}
              <div className="border-t border-double border-gold-500/30 mt-6 pt-4 flex justify-between items-center">
                <span className="font-serif italic text-neutral-300 text-base">
                  Grand Total
                </span>
                <span className="text-gold-500 text-xl font-bold font-mono tracking-wide">
                  {totalCost.toLocaleString()} XOF
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Special Requests */}
        <div>
          <label
            htmlFor="specialRequests"
            className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1.5"
          >
            Special Requests (Optional)
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            rows={3}
            value={formData.specialRequests}
            onChange={handleChange}
            className="w-full bg-black/50 border border-neutral-800 focus:border-gold-500/50 text-white rounded-lg px-4 py-2.5 outline-none transition-colors text-sm resize-none"
            placeholder="E.g., vegetarian diet, window table, anniversary celebrations..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gold-500 hover:bg-gold-600 disabled:bg-neutral-800 text-black py-3.5 rounded-xl font-bold text-xs tracking-widest uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg"
        >
          {isSubmitting ? "Submitting..." : "Confirm Reservation"}
        </button>
      </form>
    </div>
  );
}
export default ReservationForm;
