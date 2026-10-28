'use client';

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function AnalyticsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (!session) {
    router.push("/sign-in");
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold text-blue-600 mb-8">SocialPost</h1>
          <nav className="space-y-2">
            <a href="/dashboard" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">Dashboard</a>
            <a href="/dashboard/accounts" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">Accounts</a>
            <a href="/dashboard/create" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">Create Post</a>
            <a href="/dashboard/analytics" className="block px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium">Analytics</a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">Performance & Analytics</h2>
          <div className="text-sm text-gray-600">
            Engagement Overview
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Total Impressions</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">24,580</p>
            <span className="text-xs text-green-600 font-medium mt-1 inline-block">+12% this week</span>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Engagement Rate</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">4.8%</p>
            <span className="text-xs text-green-600 font-medium mt-1 inline-block">+0.6% this week</span>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Link Clicks</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">1,240</p>
            <span className="text-xs text-green-600 font-medium mt-1 inline-block">+18% this week</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Post History</h3>
          <div className="space-y-4">
            <div className="p-4 border border-gray-100 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">Launching our brand new Next.js dashboard template! 🚀</p>
                <span className="text-xs text-gray-400">Posted to X, LinkedIn • 2 hours ago</span>
              </div>
              <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full">Published</span>
            </div>
            <div className="p-4 border border-gray-100 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">5 tips to scale your remote engineering workflow efficiently.</p>
                <span className="text-xs text-gray-400">Scheduled for LinkedIn • Tomorrow at 9:00 AM</span>
              </div>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">Scheduled</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}