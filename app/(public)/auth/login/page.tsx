"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  User, Lock, Eye, EyeOff, Home, LogIn,
} from "lucide-react";

const font = "'Plus Jakarta Sans', sans-serif";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Email dan password wajib diisi."); return; }
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (!result.ok) { setError(result.error || "Login gagal."); return; }

    // Set cookies dan redirect berdasarkan role
    const { getUsers } = await import("@/lib/storage");
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      document.cookie = `nusatani_uid=${user.id}; path=/; max-age=86400`;
      document.cookie = `nusatani_role=${user.role}; path=/; max-age=86400`;
      router.push(user.role === "petani" ? "/petani/dashboard" : "/pengolah/dashboard");
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow: hidden; }
        .login-input {
          width: 100%; padding: 13px 16px 13px 44px;
          border: 1.5px solid rgba(255,255,255,0.25); border-radius: 12px;
          background: rgba(255,255,255,0.1); color: white;
          font-family: ${font}; font-size: 14px; outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .login-input::placeholder { color: rgba(255,255,255,0.45); }
        .login-input:focus {
          border-color: rgba(255,255,255,0.6);
          background: rgba(255,255,255,0.16);
        }
        .btn-yellow {
          width: 100%; padding: 14px; background: #c9a227; color: white;
          font-family: ${font}; font-size: 15px; font-weight: 800;
          border: none; border-radius: 12px; cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .btn-yellow:hover { background: #b08f1f; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(201,162,39,0.4); }
        .btn-google {
          width: 100%; padding: 12px; background: white; color: #374151;
          font-family: ${font}; font-size: 14px; font-weight: 600;
          border: 1.5px solid #e5e7eb; border-radius: 12px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: box-shadow 0.2s, transform 0.15s;
        }
        .btn-google:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.1); transform: translateY(-1px); }
        .btn-fb {
          width: 100%; padding: 12px; background: #1877f2; color: white;
          font-family: ${font}; font-size: 14px; font-weight: 600;
          border: none; border-radius: 12px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: background 0.2s, transform 0.15s;
        }
        .btn-fb:hover { background: #1565d8; transform: translateY(-1px); }
        .icon-wrap {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          color: rgba(255,255,255,0.55); display: flex; align-items: center;
          pointer-events: none;
        }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        .float-anim { animation: float 3.5s ease-in-out infinite; }
      `}</style>

      {/* ── Full-page background ── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <Image
          src="/bglogin.svg"
          alt="background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      {/* ── Content layer ── */}
      <div style={{
        position: "relative", zIndex: 1,
        minHeight: "100vh", display: "flex",
        alignItems: "center", justifyContent: "center",
        padding: "32px 24px", fontFamily: font,
      }}>
        <div style={{
          display: "flex", width: "100%", maxWidth: 1100,
          gap: 24, alignItems: "stretch",
        }}>

          {/* ── LEFT CARD — Illustration ── */}
          <div style={{
            flex: 1, minWidth: 0,
            background: "linear-gradient(145deg, #1e7a42ee 0%, #145030ee 100%)",
            borderRadius: 28, padding: "44px 40px",
            display: "flex", flexDirection: "column",
            backdropFilter: "blur(12px)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
            overflow: "hidden", position: "relative",
          }} className="fade-up">

            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 14,
                background: "rgba(255,255,255,0.18)",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1.5px solid rgba(255,255,255,0.25)",
              }}>
                <Home size={22} color="white" strokeWidth={2.2} />
              </div>
              <span style={{ fontWeight: 900, fontSize: 22, color: "white", letterSpacing: "-0.3px" }}>NusaTani</span>
            </div>

            {/* Tagline */}
            <div style={{ marginBottom: 24 }}>
              <h1 style={{ fontSize: 40, fontWeight: 900, color: "white", lineHeight: 1.15, margin: 0 }}>
                Ubah Sisa<br />Jadi Asa
              </h1>
              <p style={{ marginTop: 12, color: "rgba(255,255,255,0.72)", fontSize: 15, lineHeight: 1.65, maxWidth: 280 }}>
                Masuk kembali untuk mengelola hasil tani Anda bersama <strong style={{ color: "white" }}>NusaTani</strong>
              </p>
            </div>

            {/* Tractor SVG illustration */}
            <div style={{ flex: 1, display: "flex", alignItems: "flex-end" }} className="float-anim">
              <svg viewBox="0 0 520 290" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%" }}>
                <path d="M0 200 Q130 145 260 182 Q390 220 520 196 L520 290 L0 290 Z" fill="rgba(255,255,255,0.1)" />
                <path d="M0 228 Q130 200 260 216 Q390 232 520 224 L520 290 L0 290 Z" fill="rgba(255,255,255,0.08)" />
                <path d="M0 252 Q130 236 260 244 Q390 252 520 247 L520 290 L0 290 Z" fill="rgba(255,255,255,0.06)" />
                {/* Trees */}
                <rect x="400" y="138" width="10" height="50" rx="3" fill="rgba(255,255,255,0.3)" />
                <ellipse cx="405" cy="128" rx="24" ry="32" fill="rgba(255,255,255,0.2)" />
                <ellipse cx="405" cy="112" rx="17" ry="24" fill="rgba(255,255,255,0.25)" />
                <rect x="448" y="152" width="8" height="38" rx="3" fill="rgba(255,255,255,0.25)" />
                <ellipse cx="452" cy="143" rx="19" ry="26" fill="rgba(255,255,255,0.18)" />
                <rect x="62" y="160" width="8" height="36" rx="3" fill="rgba(255,255,255,0.25)" />
                <ellipse cx="66" cy="152" rx="21" ry="27" fill="rgba(255,255,255,0.2)" />
                {/* Tractor */}
                <g transform="translate(148,168)">
                  <rect x="18" y="14" width="98" height="54" rx="10" fill="rgba(255,255,255,0.2)" />
                  <rect x="55" y="0" width="61" height="40" rx="8" fill="rgba(255,255,255,0.15)" />
                  <rect x="62" y="7" width="22" height="20" rx="3" fill="rgba(255,255,255,0.4)" />
                  <rect x="89" y="7" width="17" height="20" rx="3" fill="rgba(255,255,255,0.4)" />
                  <rect x="48" y="-6" width="7" height="20" rx="3" fill="rgba(255,255,255,0.3)" />
                  <circle cx="51" cy="-8" r="6" fill="rgba(255,255,255,0.2)" />
                  {/* Rear wheel */}
                  <circle cx="94" cy="72" r="28" fill="rgba(0,0,0,0.3)" />
                  <circle cx="94" cy="72" r="21" fill="rgba(255,255,255,0.15)" />
                  <circle cx="94" cy="72" r="10" fill="#c9a227" />
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
                    <line key={i}
                      x1={94 + 11 * Math.cos(a * Math.PI / 180)} y1={72 + 11 * Math.sin(a * Math.PI / 180)}
                      x2={94 + 21 * Math.cos(a * Math.PI / 180)} y2={72 + 21 * Math.sin(a * Math.PI / 180)}
                      stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" />
                  ))}
                  {/* Front wheel */}
                  <circle cx="22" cy="72" r="18" fill="rgba(0,0,0,0.3)" />
                  <circle cx="22" cy="72" r="12" fill="rgba(255,255,255,0.15)" />
                  <circle cx="22" cy="72" r="5" fill="#c9a227" />
                  {/* Sprayer */}
                  <rect x="116" y="46" width="40" height="5" rx="2.5" fill="rgba(255,255,255,0.25)" />
                  <rect x="122" y="32" width="5" height="20" rx="2" fill="rgba(255,255,255,0.2)" />
                  <rect x="136" y="32" width="5" height="26" rx="2" fill="rgba(255,255,255,0.2)" />
                  <rect x="150" y="34" width="5" height="22" rx="2" fill="rgba(255,255,255,0.2)" />
                  <circle cx="124" cy="56" r="4" fill="rgba(255,255,255,0.5)" />
                  <circle cx="138" cy="59" r="3" fill="rgba(255,255,255,0.4)" />
                  <circle cx="152" cy="55" r="4" fill="rgba(255,255,255,0.5)" />
                </g>
                {/* Ground dots / crops */}
                {[38, 80, 135, 185, 260, 320, 370, 430, 480, 510].map((x, i) => (
                  <g key={i}>
                    <path d={`M${x} 252 Q${x - 8} 236 ${x - 4} 230`} stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" />
                    <path d={`M${x} 252 Q${x + 8} 236 ${x + 4} 230`} stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none" />
                    <circle cx={x} cy="253" r="3" fill="#c9a227" opacity="0.7" />
                  </g>
                ))}
              </svg>
            </div>

            {/* Deco blobs */}
            <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
            <div style={{ position: "absolute", bottom: -20, left: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
          </div>

          {/* ── RIGHT CARD — Login Form ── */}
          <div style={{
            flex: 1, minWidth: 0,
            background: "linear-gradient(145deg, #1e7a42f2 0%, #145030f2 100%)",
            borderRadius: 28, padding: "48px 44px",
            display: "flex", flexDirection: "column", justifyContent: "center",
            backdropFilter: "blur(14px)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
          }} className="fade-up">

            <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 6px", letterSpacing: "-0.3px" }}>
              Masuk ke Akun Anda
            </h2>
            <p style={{ color: "rgba(255,255,255,0.58)", fontSize: 14, marginBottom: 32 }}>
              Selamat datang kembali 👋
            </p>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div style={{ position: "relative", marginBottom: 14 }}>
                <span className="icon-wrap"><User size={16} strokeWidth={2.2} /></span>
                <input
                  id="email" type="text" className="login-input"
                  placeholder="Email / Nomor Telepon"
                  value={email} onChange={e => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div style={{ position: "relative", marginBottom: 12 }}>
                <span className="icon-wrap"><Lock size={16} strokeWidth={2.2} /></span>
                <input
                  id="password" type={showPass ? "text" : "password"} className="login-input"
                  style={{ paddingRight: 44 }}
                  placeholder="Password"
                  value={password} onChange={e => setPassword(e.target.value)}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{
                  position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "rgba(255,255,255,0.55)", display: "flex", alignItems: "center", padding: 0,
                }}>
                  {showPass ? <EyeOff size={16} strokeWidth={2} /> : <Eye size={16} strokeWidth={2} />}
                </button>
              </div>

              {/* Forgot */}
              <div style={{ textAlign: "right", marginBottom: 22 }}>
                <a href="#" style={{ color: "#c9a227", fontSize: 13, fontWeight: 700, textDecoration: "underline" }}>
                  Lupa Password?
                </a>
              </div>

              {/* Error message */}
              {error && (
                <div style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.4)", borderRadius: 10, padding: "10px 14px", marginBottom: 12, color: "#fca5a5", fontSize: 13 }}>
                  {error}
                </div>
              )}

              {/* Masuk Button */}
              <button type="submit" id="btn-masuk" className="btn-yellow" disabled={loading} style={{ opacity: loading ? 0.75 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                {loading ? (
                  <span style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                ) : (
                  <LogIn size={16} strokeWidth={2.5} />
                )}
                {loading ? 'Memproses...' : 'Masuk'}
              </button>

              {/* Divider */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "18px 0" }}>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.18)" }} />
                <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, fontWeight: 600 }}>Atau</span>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.18)" }} />
              </div>

              {/* Google */}
              <button type="button" id="btn-google" className="btn-google" style={{ marginBottom: 10 }}>
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>Masuk dengan Google</span>
              </button>

              {/* Facebook */}
              <button type="button" id="btn-facebook" className="btn-fb">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Masuk dengan Facebook</span>
              </button>
            </form>

            <p style={{ textAlign: "center", marginTop: 28, fontSize: 14, color: "rgba(255,255,255,0.58)" }}>
              Belum punya akun?{" "}
              <Link href="/auth/register" style={{ color: "#c9a227", fontWeight: 800, fontStyle: "italic", textDecoration: "underline" }}>
                Daftar di sini
              </Link>
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
