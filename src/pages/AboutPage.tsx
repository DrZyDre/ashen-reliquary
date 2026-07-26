import { Link } from "react-router-dom";

export function AboutPage() {
  return (
    <section className="space-y-6">
      <Link to="/" className="inline-flex rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-200">
        Back to builds
      </Link>

      <article className="page-card rounded-xl p-6 space-y-8">

        <div>
          <h1 className="ink-text text-3xl font-bold mb-2">About Ashen Reliquary</h1>
          <p className="page-muted leading-relaxed">
            Ashen Reliquary is a community build companion for Witchfire. Browse curated
            builds, learn what gear you need and where to find it, and track your progression
            toward a fully kitted character.
          </p>
        </div>

        <div>
          <h2 className="ink-text text-xl font-semibold mb-4 border-l-2 border-red-700 pl-3">How it works</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-red-900/30 bg-black/30 p-4">
              <h3 className="font-medium text-red-200 mb-2">Browse builds</h3>
              <p className="text-sm page-muted leading-relaxed">
                Every build includes the recommended weapons, spells, prophecies, rosary beads,
                relics, fetishes, rings, and incense. Each item shows its Gnosis requirement and
                where to find or unlock it.
              </p>
            </div>
            <div className="rounded-lg border border-red-900/30 bg-black/30 p-4">
              <h3 className="font-medium text-red-200 mb-2">Track your progression</h3>
              <p className="text-sm page-muted leading-relaxed">
                Click "Track this build" to unlock a progression checklist. Check off items as
                you unlock them and watch your completion percentage climb. Progress is saved
                locally in your browser.
              </p>
            </div>
            <div className="rounded-lg border border-red-900/30 bg-black/30 p-4">
              <h3 className="font-medium text-red-200 mb-2">Filter and search</h3>
              <p className="text-sm page-muted leading-relaxed">
                Use the Scry Filters sidebar to search by build name, weapon, or spell.
                Filter by difficulty or toggle beginner-friendly builds only.
              </p>
            </div>
            <div className="rounded-lg border border-red-900/30 bg-black/30 p-4">
              <h3 className="font-medium text-red-200 mb-2">Unslotted prophecies</h3>
              <p className="text-sm page-muted leading-relaxed">
                Some builds intentionally leave prophecy rows unslotted. These appear faded
                in the build details — it means that row is flexible and can be filled based
                on what Arcana you encounter in a run.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="ink-text text-xl font-semibold mb-4 border-l-2 border-red-700 pl-3">Frequently asked questions</h2>
          <div className="space-y-4">

            <div className="rounded-lg border border-red-900/30 bg-black/30 p-4">
              <h3 className="font-medium text-red-200 mb-1">Is my progress saved?</h3>
              <p className="text-sm page-muted leading-relaxed">
                Yes — progress is saved to your browser's local storage. It persists between
                sessions on the same device and browser. Clearing your browser data will
                reset it.
              </p>
            </div>

            <div className="rounded-lg border border-red-900/30 bg-black/30 p-4">
              <h3 className="font-medium text-red-200 mb-1">What do the difficulty ratings mean?</h3>
              <p className="text-sm page-muted leading-relaxed">
                Difficulty reflects the mechanical skill required to play the build effectively,
                not how hard the gear is to acquire. A build can be Hard to play but still
                Beginner Friendly if the items are easy to obtain early on.
              </p>
            </div>

            <div className="rounded-lg border border-red-900/30 bg-black/30 p-4">
              <h3 className="font-medium text-red-200 mb-1">Are these builds up to date?</h3>
              <p className="text-sm page-muted leading-relaxed">
                Witchfire is in early access and receives regular updates. Builds are tested
                and credited to their creators — if something feels off after a patch, it may
                need to be revisited. Check the build credit link for the creator's latest content.
              </p>
            </div>

            <div className="rounded-lg border border-red-900/30 bg-black/30 p-4">
              <h3 className="font-medium text-red-200 mb-1">Can I suggest a build?</h3>
              <p className="text-sm page-muted leading-relaxed">
                Build submissions are coming soon. In the meantime, post your build in the{" "}
                <a
                  href="https://www.reddit.com/r/witchfire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-300 underline underline-offset-2 hover:text-red-100 transition"
                >
                  Witchfire subreddit
                </a>{" "}
                and tag it so the community can find it.
              </p>
            </div>

            <div className="rounded-lg border border-red-900/30 bg-black/30 p-4">
              <h3 className="font-medium text-red-200 mb-1">Who made this?</h3>
              <p className="text-sm page-muted leading-relaxed">
                Ashen Reliquary is a fan-made resource, not affiliated with The Astronauts.
                Builds are sourced from community creators. All credit goes to the original creators.
              </p>
            </div>

          </div>
        </div>

      </article>
    </section>
  );
}