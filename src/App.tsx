import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import { builds } from "./data/builds";
import { HomePage } from "./pages/HomePage";
import { BuildDetailPage } from "./pages/BuildDetailPage";
import { AboutPage } from "./pages/AboutPage";
import { AuthPage } from "./pages/AuthPage";
import { useTrackedBuilds } from "./hooks/useTrackedBuilds";
import { supabase } from "./lib/supabase";
 
function NavBar({ user }: { user: User | null }) {
  const navigate = useNavigate();
 
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };
 
  return (
    <nav className="mb-8 flex items-center justify-between">
      <Link to="/" className="ink-text text-lg font-bold text-zinc-100 hover:text-red-300 transition">
        Ashen Reliquary
      </Link>
      <div className="flex items-center gap-4">
        <Link to="/about" className="text-sm text-zinc-400 hover:text-zinc-100 transition">
          About
        </Link>
        {user ? (
          <>
            <span className="text-sm text-zinc-400">
              {user.user_metadata?.username ?? user.email}
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300 transition hover:border-red-600 hover:text-red-300"
            >
              Sign out
            </button>
          </>
        ) : (
          <Link
            to="/auth"
            className="rounded-lg bg-red-700 px-3 py-1.5 text-sm font-medium text-zinc-100 transition hover:bg-red-600"
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}
 
function App() {
  const [user, setUser] = useState<User | null>(null);
  const { trackedBuilds, isTracked, trackBuild, untrackBuild, toggleChecklistItem, getCompletion } =
    useTrackedBuilds();
 
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
 
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
 
    return () => subscription.unsubscribe();
  }, []);
 
  const onTrackBuild = (buildId: string) => {
    const build = builds.find((entry) => entry.id === buildId);
    if (!build) return;
    trackBuild(build);
  };
 
  const onUntrackBuild = (buildId: string) => {
    untrackBuild(buildId);
  };
 
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="mx-auto max-w-screen-2xl px-4 py-8 md:px-8">
          <NavBar user={user} />
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    isTracked={isTracked}
                    getCompletionPercent={(buildId) => {
                      const build = builds.find((entry) => entry.id === buildId);
                      if (!build) return 0;
                      return getCompletion(build).percent;
                    }}
                    onTrackBuild={onTrackBuild}
                    onUntrackBuild={onUntrackBuild}
                  />
                }
              />
              <Route
                path="/build/:buildId"
                element={
                  <BuildDetailPage
                    isTracked={isTracked}
                    getCompletion={(buildId) => {
                      const build = builds.find((entry) => entry.id === buildId);
                      if (!build) return { completed: 0, total: 0, percent: 0 };
                      return getCompletion(build);
                    }}
                    getChecklistState={(buildId) => trackedBuilds[buildId] ?? {}}
                    onTrackBuild={onTrackBuild}
                    onUntrackBuild={onUntrackBuild}
                    onToggleChecklist={toggleChecklistItem}
                  />
                }
              />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/auth" element={<AuthPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
 
export default App;
 
