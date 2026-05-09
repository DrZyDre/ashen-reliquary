import { BrowserRouter, Route, Routes } from "react-router-dom";
import { builds } from "./data/builds";
import { HomePage } from "./pages/HomePage";
import { BuildDetailPage } from "./pages/BuildDetailPage";
import { useTrackedBuilds } from "./hooks/useTrackedBuilds";

function App() {
  const { trackedBuilds, trackedCount, isTracked, trackBuild, toggleChecklistItem, getCompletion } =
    useTrackedBuilds();

  const onTrackBuild = (buildId: string) => {
    const build = builds.find((entry) => entry.id === buildId);
    if (!build) return;
    trackBuild(build);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
          <header className="page-card relative mb-8 rounded-xl p-6">
            <h1 className="ink-text text-3xl font-bold md:text-4xl">Ashen Reliquary</h1>
            <p className="page-muted mt-2 max-w-3xl">
              Witchfire-inspired build codex with progression tracking for weapons, spells, stats, gear, and upgrades.
            </p>
            <p className="mt-3 text-sm text-red-300">Tracked builds: {trackedCount}</p>
          </header>

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
                    onToggleChecklist={toggleChecklistItem}
                  />
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
