import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
 
type Mode = "login" | "signup";
 
export function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
 
  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);
 
    if (mode === "signup") {
      if (!username.trim()) {
        setError("Username is required.");
        setLoading(false);
        return;
      }
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username },
        },
      });
      if (error) {
        setError(error.message);
      } else {
        setSuccess("Account created! Check your email to confirm your account.");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        navigate("/");
      }
    }
 
    setLoading(false);
  };
 
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="page-card w-full max-w-md rounded-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="ink-text text-3xl font-bold mb-1">
            {mode === "login" ? "Welcome Back" : "Join the Reliquary"}
          </h1>
          <p className="page-muted text-sm">
            {mode === "login"
              ? "Sign in to track builds and submit your own."
              : "Create an account to get started."}
          </p>
        </div>
 
        <div className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="mb-1 block text-xs uppercase tracking-widest text-red-300/60">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="witchhunter42"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-100 outline-none focus:border-red-700 transition"
              />
            </div>
          )}
 
          <div>
            <label className="mb-1 block text-xs uppercase tracking-widest text-red-300/60">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-100 outline-none focus:border-red-700 transition"
            />
          </div>
 
          <div>
            <label className="mb-1 block text-xs uppercase tracking-widest text-red-300/60">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-100 outline-none focus:border-red-700 transition"
            />
          </div>
        </div>
 
        {error && (
          <p className="rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-2 text-sm text-red-300">
            {error}
          </p>
        )}
 
        {success && (
          <p className="rounded-lg border border-green-900/50 bg-green-950/30 px-4 py-2 text-sm text-green-300">
            {success}
          </p>
        )}
 
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full rounded-lg bg-red-700 py-2 text-sm font-medium text-zinc-100 transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-zinc-700"
        >
          {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
        </button>
 
        <p className="text-center text-sm text-zinc-400">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError(null);
              setSuccess(null);
            }}
            className="text-red-300 underline underline-offset-2 hover:text-red-100 transition"
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}