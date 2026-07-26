import { BrowserRouter, Route, Routes } from "react-router-dom";
import { builds } from "./data/builds";
import { HomePage } from "./pages/HomePage";
import { BuildDetailPage } from "./pages/BuildDetailPage";
import { useTrackedBuilds } from "./hooks/useTrackedBuilds";
import { AboutPage } from "./pages/AboutPage";
 
function App() {
  const { trackedBuilds, isTracked, trackBuild, untrackBuild, toggleChecklistItem, getCompletion } =
    useTrackedBuilds();
 
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
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
 
export default App;
