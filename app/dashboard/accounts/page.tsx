'use client';

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const AVAILABLE_PLATFORMS = [
  { id: "twitter", name: "X (Twitter)", icon: "𝕏", color: "bg-black text-white" },
  { id: "linkedin", name: "LinkedIn", icon: "in", color: "bg-blue-700 text-white" },
  { id: "facebook", name: "Facebook", icon: "f", color: "bg-blue-600 text-white" },
];

export default function AccountsPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([]);

  if (isPending) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (!session) {
    router.push("/sign-in");
    return null;
  }

  const toggleConnect = (platformId: string) => {
    if (connectedAccounts.includes(platformId)) {
      setConnectedAccounts(connectedAccounts.filter((id) => id !== platformId));
    } else {
      setConnectedAccounts([...connectedAccounts, platformId]);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold text-blue-600 mb-8">SocialPost</h1>
          <nav className="space-y-2">
            <a href="/dashboard" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">Dashboard</a>
            <a href="/dashboard/accounts" className="block px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium">Accounts</a>
            <a href="#" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">Analytics</a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">Connected Accounts</h2>
          <div className="text-sm text-gray-600">
            Active Platform Integrations
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AVAILABLE_PLATFORMS.map((platform) => {
            const isConnected = connectedAccounts.includes(platform.id);
            return (
              <div key={platform.id} className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between">
                <div>
                  <div className={w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold mb-4 }>
                    {platform.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{platform.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {isConnected ? "Connected and ready to post" : "Not connected yet"}
                  </p>
                </div>
                <button
                  onClick={() => toggleConnect(platform.id)}
                  className={mt-6 w-full py-2 px-4 rounded-md text-sm font-medium transition \}
                >
                  {isConnected ? "Disconnect" : "Connect Account"}
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}