'use client';

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (!session) {
    router.push("/sign-in");
    return null;
  }

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/sign-in"),
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold text-blue-600 mb-8">SocialPost</h1>
          <nav className="space-y-2">
            <a href="/dashboard" className="block px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium">Dashboard</a>
            <a href="/dashboard/accounts" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">Accounts</a>
            <a href="/dashboard/create" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">Create Post</a>
            <a href="#" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">Analytics</a>
          </nav>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full py-2 px-4 text-sm text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition"
        >
          Sign Out
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">Overview</h2>
          <div className="text-sm text-gray-600">
            Signed in as: <span className="font-medium text-gray-900">{session.user.email}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Connected Accounts</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Scheduled Posts</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Total Reach</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
          </div>
        </div>
      </main>
    </div>
  );
}