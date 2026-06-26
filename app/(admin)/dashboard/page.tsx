import React from 'react';

export default function AdminDashboardPage() {
  // Mock counters for dashboard overview
  const stats = [
    { name: 'Pending Reservations', value: 12 },
    { name: 'Confirmed Reservations', value: 45 },
    { name: 'Menu Items Catalog', value: 24 },
    { name: 'Pending Reviews', value: 3 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-wide text-white uppercase">Dashboard Overview</h2>
        <p className="text-sm text-neutral-400 font-light mt-1">
          Monitor reservations, review site comments, and manage menu items.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-neutral-900 border border-neutral-850 p-6 rounded-lg shadow-sm"
          >
            <p className="text-xs text-neutral-400 uppercase tracking-widest font-semibold">
              {stat.name}
            </p>
            <p className="text-3xl font-extrabold text-gold-500 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Panel Placeholder */}
      <div className="bg-neutral-900 border border-neutral-850 p-8 rounded-lg">
        <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4">
          Recent Activity Log
        </h3>
        <div className="text-sm text-neutral-500 font-light italic">
          No database documents found. Make sure to configure active Appwrite credentials in `.env.local`.
        </div>
      </div>
    </div>
  );
}
