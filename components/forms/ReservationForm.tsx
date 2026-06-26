"use client";

import React, { useState } from "react";
import { RESERVATION_SLOTS } from "@/lib/constants";
import { reservationSchema, type ReservationInput } from "@/lib/validations";

export function ReservationForm() {
  const [formData, setFormData] = useState<ReservationInput>({
    name: "",
    email: "",
    phone: "",
    guests: 2,
    date: "",
    time: RESERVATION_SLOTS[0],
    specialRequests: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ReservationInput, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

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
    // Clear errors as user edits
    if (errors[name as keyof ReservationInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrors({});

    // Validate using Zod schema
    const result = reservationSchema.safeParse(formData);
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
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        guests: 2,
        date: "",
        time: RESERVATION_SLOTS[0],
        specialRequests: "",
      });
    } catch (err: any) {
      setSubmitStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-neutral-900 border border-neutral-800 p-8 rounded-lg">
      <h3 className="text-xl font-semibold tracking-wider text-center text-gold-500 mb-6 uppercase">
        Table Reservation
      </h3>

      {submitStatus === "success" && (
        <div className="mb-6 p-4 bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 rounded text-sm text-center">
          Thank you! Your reservation request has been submitted successfully.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-rose-950/50 border border-rose-500/30 text-rose-300 rounded text-sm text-center">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-black/50 border border-neutral-800 focus:border-gold-500 text-white rounded px-4 py-2.5 outline-none transition-colors text-sm"
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
              className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-black/50 border border-neutral-800 focus:border-gold-500 text-white rounded px-4 py-2.5 outline-none transition-colors text-sm"
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
              className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-black/50 border border-neutral-800 focus:border-gold-500 text-white rounded px-4 py-2.5 outline-none transition-colors text-sm"
              placeholder="+237 6 12 34 56 78"
              required
            />
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
              className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1"
            >
              Guests
            </label>
            <input
              type="number"
              id="guests"
              name="guests"
              min="1"
              max="20"
              value={formData.guests}
              onChange={handleChange}
              className="w-full bg-black/50 border border-neutral-800 focus:border-gold-500 text-white rounded px-4 py-2.5 outline-none transition-colors text-sm"
              required
            />
            {errors.guests && (
              <p className="text-xs text-rose-400 mt-1">{errors.guests}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-black/50 border border-neutral-800 focus:border-gold-500 text-white rounded px-4 py-2.5 outline-none transition-colors text-sm"
              required
            />
            {errors.date && (
              <p className="text-xs text-rose-400 mt-1">{errors.date}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="time"
              className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1"
            >
              Time
            </label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full bg-black/50 border border-neutral-800 focus:border-gold-500 text-white rounded px-4 py-2.5 outline-none transition-colors text-sm appearance-none"
              required
            >
              {RESERVATION_SLOTS.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            {errors.time && (
              <p className="text-xs text-rose-400 mt-1">{errors.time}</p>
            )}
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label
            htmlFor="specialRequests"
            className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1"
          >
            Special Requests (Optional)
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            rows={3}
            value={formData.specialRequests}
            onChange={handleChange}
            className="w-full bg-black/50 border border-neutral-800 focus:border-gold-500 text-white rounded px-4 py-2.5 outline-none transition-colors text-sm resize-none"
            placeholder="E.g., vegetarian diet, window table, anniversary celebrations..."
          />
          {errors.specialRequests && (
            <p className="text-xs text-rose-400 mt-1">
              {errors.specialRequests}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gold-500 hover:bg-gold-600 disabled:bg-neutral-800 text-black py-3 rounded font-semibold text-xs tracking-widest uppercase transition-colors"
        >
          {isSubmitting ? "Submitting..." : "Confirm Reservation"}
        </button>
      </form>
    </div>
  );
}
export default ReservationForm;
