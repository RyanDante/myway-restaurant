import React from 'react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-900 bg-neutral-950 p-6 hidden md:flex flex-col justify-between">
        <div className="space-y-8">
          <div>
            <h1 className="text-lg font-bold tracking-widest text-gold-500">
              MYWAY ADMIN
            </h1>
            <p className="text-xs text-neutral-500">BaaS Appwrite Dashboard</p>
          </div>

          <nav className="flex flex-col space-y-2">
            <Link
              href="/admin"
              className="text-sm text-neutral-300 hover:text-white px-4 py-2 hover:bg-neutral-900 transition-all"
            >
              Dashboard
            </Link>
            <Link
              href="/"
              className="text-sm text-neutral-400 hover:text-white px-4 py-2 transition-all"
            >
              View Live Site
            </Link>
          </nav>
        </div>

        <div className="text-[10px] text-neutral-600">
          Logged in as Administrator
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <header className="border-b border-neutral-900 bg-neutral-950 p-6 flex justify-between items-center md:justify-end">
          <span className="md:hidden text-lg font-bold text-gold-500">MYWAY</span>
          <div className="text-sm text-neutral-400">Admin Control Panel</div>
        </header>

        <main className="flex-1 p-8 bg-neutral-950/40">{children}</main>
      </div>
    </div>
  );
}
