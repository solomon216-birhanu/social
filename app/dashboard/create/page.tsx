'use client';

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const PLATFORMS = [
  { id: "twitter", name: "X (Twitter)" },
  { id: "linkedin", name: "LinkedIn" },
  { id: "facebook", name: "Facebook" },
];

export default function CreatePostPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  
  const [content, setContent] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isPending) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (!session) {
    router.push("/sign-in");
    return null;
  }

  const togglePlatform = (id: string) => {
    if (selectedPlatforms.includes(id)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== id));
    } else {
      setSelectedPlatforms([...selectedPlatforms, id]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlatforms.length === 0) {
      alert("Please select at least one platform to post to.");
      return;
    }
    if (!content.trim()) {
      alert("Post content cannot be empty.");
      return;
    }

    setIsSubmitting(true);
    // Simulate API publishing delay
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Post successfully published/scheduled!");
      setContent("");
      setSelectedPlatforms([]);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold text-blue-600 mb-8">SocialPost</h1>
          <nav className="space-y-2">
            <a href="/dashboard" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">Dashboard</a>
            <a href="/dashboard/accounts" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">Accounts</a>
            <a href="/dashboard/create" className="block px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium">Create Post</a>
            <a href="#" className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">Analytics</a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">Create New Post</h2>
          <div className="text-sm text-gray-600">
            Draft & Broadcast
          </div>
        </header>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm max-w-2xl space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Target Platforms</label>
            <div className="flex gap-4">
              {PLATFORMS.map((platform) => {
                const isSelected = selectedPlatforms.includes(platform.id);
                return (
                  <button
                    key={platform.id}
                    type="button"
                    onClick={() => togglePlatform(platform.id)}
                    className={px-4 py-2 rounded-lg text-sm font-medium border transition \}
                  >
                    {platform.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Post Content</label>
            <textarea
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What would you like to share across your networks today?"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
            <p className="text-xs text-gray-400 mt-1 text-right">{content.length} characters</p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Publishing..." : "Publish Post"}
          </button>
        </form>
      </main>
    </div>
  );
}