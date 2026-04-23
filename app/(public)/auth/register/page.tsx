"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Home, User, Mail, Phone, MapPin, Wheat, Factory,
  Building2, ArrowRight, ArrowLeft, CheckCircle2,
  ShieldCheck, RotateCcw, ChevronRight,
} from "lucide-react";

type Role = "petani" | "pengolah" | null;
type Step = 1 | 2 | 3;

const font = "'Plus Jakarta Sans', sans-serif";

/* ─── Shared style objects ─── */
const inp: React.CSSProperties = {
  width: "100%", padding: "12px 14px 12px 40px",
  border: "1.5px solid rgba(255,255,255,0.25)", borderRadius: 11,
  background: "rgba(255,255,255,0.1)", color: "white",
  fontFamily: font, fontSize: 14, outline: "none", boxSizing: "border-box",
};
const lbl: React.CSSProperties = {
  display: "block", color: "rgba(255,255,255,0.72)",
  fontSize: 12, fontWeight: 600, marginBottom: 6,
};
const yBtn: React.CSSProperties = {
  padding: "13px 20px", background: "#c9a227", color: "white",
  fontFamily: font, fontSize: 15, fontWeight: 800,
  border: "none", borderRadius: 12, cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
};
const oBtn: React.CSSProperties = {
  padding: "13px 16px", background: "transparent", color: "rgba(255,255,255,0.85)",
  fontFamily: font, fontSize: 14, fontWeight: 600,
  border: "1.5px solid rgba(255,255,255,0.35)", borderRadius: 12, cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
  whiteSpace: "nowrap" as const,
};

/* ─── Icon helper ─── */
function FieldIcon({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <span style={{
      position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)",
      color: "rgba(255,255,255,0.5)", display: "flex", pointerEvents: "none",
    }}>
      <Icon size={15} strokeWidth={2.2} />
    </span>
  );
}

/* ─── Stepper ─── */
function Stepper({ current }: { current: Step }) {
  const steps = [
    { n: 1 as Step, label: "Pilih Tipe Akun" },
    { n: 2 as Step, label: "Data Diri" },
    { n: 3 as Step, label: "Verifikasi" },
  ];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 28 }}>
      {steps.map((s, i) => {
        const active = current >= s.n;
        const last = i === steps.length - 1;
        return (
          <div key={s.n} style={{ display: "flex", alignItems: "center", minWidth: 0 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: `8px ${last ? 12 : 20}px 8px 12px`,
              background: active ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.08)",
              color: active ? "white" : "rgba(255,255,255,0.45)",
              fontFamily: font, fontSize: 12, fontWeight: 700,
              clipPath: last ? "none" : "polygon(0 0,calc(100% - 9px) 0,100% 50%,calc(100% - 9px) 100%,0 100%)",
              borderRadius: last ? "0 8px 8px 0" : 0,
              border: active ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(255,255,255,0.08)",
              transition: "all 0.3s",
            }}>
              <span style={{
                width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                background: active ? "#c9a227" : "rgba(255,255,255,0.2)",
                color: "white", fontSize: 10, fontWeight: 800,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {current > s.n ? <CheckCircle2 size={12} strokeWidth={3} /> : s.n}
              </span>
              <span style={{ whiteSpace: "nowrap" }}>{s.label}</span>
            </div>
            {!last && <div style={{ width: 2 }} />}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Right Panel ─── */
function RightPanel({ step }: { step: Step }) {
  const titles: Record<Step, string> = {
    1: "Pilih Peran Anda",
    2: "Langkah 2 dari 3:\nLengkapi Data Diri Anda",
    3: "Langkah 3 dari 3:\nVerifikasi",
  };
  const subs: Record<Step, string> = {
    1: "Daftar sebagai Petani atau Pengolah Industri",
    2: "", 3: "",
  };

  return (
    <div style={{
      flex: 1, minWidth: 0,
      background: "linear-gradient(145deg, #e8f5ee 0%, #c8e6d4 55%, #a5d1bc 100%)",
      borderRadius: 28, padding: "36px 36px 32px",
      display: "flex", flexDirection: "column",
      boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div style={{
          width: 42, height: 42, borderRadius: 13, background: "#1a5c38",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 12px rgba(26,92,56,0.35)",
        }}>
          <Home size={20} color="white" strokeWidth={2.2} />
        </div>
        <span style={{ fontWeight: 900, fontSize: 20, color: "#1a5c38" }}>NusaTani</span>
      </div>

      {/* Stepper */}
      <Stepper current={step} />

      {/* Illustration + text */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        {step === 3 ? (
          /* Farmer SVG */
          <svg viewBox="0 0 260 340" xmlns="http://www.w3.org/2000/svg" style={{ width: 170, animation: "float 3.5s ease-in-out infinite" }}>
            <ellipse cx="130" cy="77" rx="50" ry="10" fill="#c8a000" />
            <path d="M90 77 Q100 52 130 46 Q160 52 170 77 Z" fill="#d4af37" />
            <path d="M96 75 Q130 67 164 75" stroke="#8b6914" strokeWidth="3" fill="none" />
            <ellipse cx="130" cy="105" rx="30" ry="32" fill="#f5cba7" />
            <circle cx="120" cy="103" r="3.5" fill="#4a3728" />
            <circle cx="140" cy="103" r="3.5" fill="#4a3728" />
            <circle cx="121" cy="101" r="1.5" fill="white" />
            <circle cx="141" cy="101" r="1.5" fill="white" />
            <path d="M120 118 Q130 128 140 118" stroke="#d4956a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <circle cx="114" cy="113" r="6" fill="#f08080" opacity="0.28" />
            <circle cx="146" cy="113" r="6" fill="#f08080" opacity="0.28" />
            <path d="M102 134 Q90 170 92 224 L168 224 Q170 170 158 134 Q145 128 130 128 Q115 128 102 134 Z" fill="#388e5f" />
            <rect x="119" y="130" width="24" height="30" rx="5" fill="#2d7a4f" />
            <path d="M122 130 Q113 140 105 153" stroke="#1a5c38" strokeWidth="3" fill="none" />
            <path d="M138 130 Q147 140 155 153" stroke="#1a5c38" strokeWidth="3" fill="none" />
            <path d="M102 144 Q85 159 82 184" stroke="#f5cba7" strokeWidth="15" strokeLinecap="round" fill="none" />
            <path d="M158 144 Q175 159 178 184" stroke="#f5cba7" strokeWidth="15" strokeLinecap="round" fill="none" />
            <path d="M102 144 Q88 157 85 180" stroke="#388e5f" strokeWidth="13" strokeLinecap="round" fill="none" />
            <path d="M158 144 Q172 157 175 180" stroke="#388e5f" strokeWidth="13" strokeLinecap="round" fill="none" />
            <rect x="170" y="178" width="19" height="31" rx="4" fill="#37474f" />
            <rect x="172" y="181" width="15" height="22" rx="2" fill="#64b5f6" />
            <circle cx="180" cy="205" r="2" fill="#90a4ae" />
            <path d="M114 222 Q110 254 108 286" stroke="#2d7a4f" strokeWidth="17" strokeLinecap="round" fill="none" />
            <path d="M146 222 Q150 254 152 286" stroke="#2d7a4f" strokeWidth="17" strokeLinecap="round" fill="none" />
            <ellipse cx="106" cy="288" rx="13" ry="6.5" fill="#4e342e" />
            <ellipse cx="154" cy="288" rx="13" ry="6.5" fill="#4e342e" />
            <ellipse cx="130" cy="298" rx="110" ry="24" fill="#2d7a4f" opacity="0.25" />
          </svg>
        ) : (
          /* Barn SVG */
          <svg viewBox="0 0 440 290" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 400, animation: "float 3.5s ease-in-out infinite" }}>
            <path d="M0 212 Q110 155 220 190 Q330 226 440 202 L440 290 L0 290 Z" fill="#4caf7d" />
            <path d="M0 238 Q110 210 220 224 Q330 238 440 230 L440 290 L0 290 Z" fill="#2d7a4f" />
            <path d="M0 260 Q110 245 220 252 Q330 260 440 255 L440 290 L0 290 Z" fill="#1a5c38" />
            {/* Trees */}
            <rect x="40" y="155" width="9" height="52" rx="3" fill="#5d4037" />
            <ellipse cx="45" cy="143" rx="27" ry="35" fill="#2d7a4f" />
            <ellipse cx="45" cy="127" rx="19" ry="26" fill="#388e5f" />
            <rect x="374" y="162" width="9" height="44" rx="3" fill="#5d4037" />
            <ellipse cx="379" cy="153" rx="24" ry="30" fill="#1a5c38" />
            <ellipse cx="379" cy="138" rx="17" ry="23" fill="#2d7a4f" />
            {/* Barn */}
            <g transform="translate(177,94)">
              <polygon points="0,52 86,52 86,0 43,-18 0,0" fill="#c0392b" />
              <rect x="0" y="52" width="86" height="84" fill="#e74c3c" />
              <rect x="4" y="52" width="78" height="84" fill="#e03535" />
              <rect x="28" y="100" width="30" height="36" rx="2" fill="#5d4037" />
              <path d="M28 101 Q43 91 58 101" fill="#4e342e" />
              <rect x="8" y="68" width="20" height="17" rx="3" fill="#81d4fa" opacity="0.8" />
              <rect x="58" y="68" width="20" height="17" rx="3" fill="#81d4fa" opacity="0.8" />
              <line x1="18" y1="68" x2="18" y2="85" stroke="#5d4037" strokeWidth="1.5" />
              <line x1="8" y1="76.5" x2="28" y2="76.5" stroke="#5d4037" strokeWidth="1.5" />
              <line x1="68" y1="68" x2="68" y2="85" stroke="#5d4037" strokeWidth="1.5" />
              <line x1="58" y1="76.5" x2="78" y2="76.5" stroke="#5d4037" strokeWidth="1.5" />
            </g>
            {/* Crops */}
            {[26, 62, 110, 158, 308, 352, 394, 426].map((x, i) => (
              <g key={i}>
                <path d={`M${x} 255 Q${x - 8} 240 ${x - 4} 234`} stroke="#1a5c38" strokeWidth="2" fill="none" />
                <path d={`M${x} 255 Q${x + 8} 240 ${x + 4} 234`} stroke="#2d7a4f" strokeWidth="2" fill="none" />
                <circle cx={x} cy="256" r="2.5" fill="#c8a000" />
              </g>
            ))}
          </svg>
        )}

        <div style={{ textAlign: "center", marginTop: 18 }}>
          <h2 style={{ fontSize: 21, fontWeight: 900, color: "#1a5c38", whiteSpace: "pre-line", lineHeight: 1.32, margin: 0 }}>
            {titles[step]}
          </h2>
          {subs[step] && (
            <p style={{ marginTop: 8, fontSize: 13.5, color: "#2d7a4f" }}>{subs[step]}</p>
          )}
        </div>
      </div>

      {/* Deco blobs */}
      <div style={{ position: "absolute", bottom: 20, right: 16, width: 90, height: 90, borderRadius: "50%", background: "#2d7a4f", opacity: 0.1 }} />
      <div style={{ position: "absolute", top: 30, right: -20, width: 60, height: 60, borderRadius: "50%", background: "#1a5c38", opacity: 0.07 }} />
    </div>
  );
}

/* ─── Step 1: Pilih Peran ─── */
function Step1({ role, setRole, onNext }: { role: Role; setRole: (r: Role) => void; onNext: () => void }) {
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", margin: "0 0 22px" }}>Daftar sebagai...</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
        {([
          { val: "petani" as Role, Icon: Wheat, title: "Petani", desc: "Saya ingin menjual panen gagal", emoji: "🧑‍🌾" },
          { val: "pengolah" as Role, Icon: Factory, title: "Pengolah", desc: "Saya ingin membeli bahan baku", emoji: "🏭" },
        ]).map(card => {
          const sel = role === card.val;
          return (
            <button key={card.val!} id={`card-${card.val}`} onClick={() => setRole(card.val)} style={{
              background: sel ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.07)",
              border: `2px solid ${sel ? "#c9a227" : "rgba(255,255,255,0.18)"}`,
              borderRadius: 16, padding: "22px 14px", cursor: "pointer", textAlign: "center",
              boxShadow: sel ? "0 0 0 3px rgba(201,162,39,0.22), 0 8px 28px rgba(0,0,0,0.18)" : "none",
              transform: sel ? "translateY(-3px)" : "none",
              transition: "all 0.25s",
            }}>
              <div style={{ fontSize: 42, marginBottom: 10 }}>{card.emoji}</div>
              <div style={{
                color: "white", fontWeight: 700, fontSize: 16,
                paddingBottom: 10, marginBottom: 10,
                borderBottom: "1.5px solid rgba(255,255,255,0.18)",
              }}>{card.title}</div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12.5, margin: 0, lineHeight: 1.55 }}>{card.desc}</p>
              {sel && (
                <div style={{ marginTop: 12 }}>
                  <span style={{ background: "#c9a227", color: "white", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>✓ Dipilih</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
      <button id="btn-lanjut-peran" onClick={onNext} disabled={!role} style={{
        ...yBtn, width: "100%", fontSize: 15,
        opacity: role ? 1 : 0.45, cursor: role ? "pointer" : "not-allowed",
      }}>
        Lanjutkan ke Data Diri <ArrowRight size={16} strokeWidth={2.5} />
      </button>
    </div>
  );
}

/* ─── Step 2 Petani ─── */
function Step2Petani({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [d, setD] = useState({ nama: "", email: "", hp: "", lokasi: "", komoditas: "" });
  const u = (f: keyof typeof d) => (e: React.ChangeEvent<HTMLInputElement>) => setD({ ...d, [f]: e.target.value });
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", margin: "0 0 22px" }}>Isi Data Diri</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <div>
          <label style={lbl}>Nama Lengkap</label>
          <div style={{ position: "relative" }}>
            <FieldIcon icon={User} />
            <input id="nama-lengkap" type="text" placeholder="Nama Lengkap" value={d.nama} onChange={u("nama")} style={inp} />
          </div>
        </div>
        <div>
          <label style={lbl}>Email</label>
          <div style={{ position: "relative" }}>
            <FieldIcon icon={Mail} />
            <input id="email-petani" type="email" placeholder="Email" value={d.email} onChange={u("email")} style={inp} />
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <div>
          <label style={lbl}>Nomor HandPhone</label>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.25)", borderRadius: 11, padding: "12px 10px", color: "white", fontWeight: 700, fontSize: 13, flexShrink: 0, display: "flex", alignItems: "center", gap: 5 }}>
              <Phone size={13} strokeWidth={2.2} /> +62
            </div>
            <input id="nohp-petani" type="tel" placeholder="Nomor HP" value={d.hp} onChange={u("hp")} style={{ ...inp, paddingLeft: 14, flex: 1 }} />
          </div>
        </div>
        <div>
          <label style={lbl}>Lokasi</label>
          <div style={{ position: "relative" }}>
            <FieldIcon icon={MapPin} />
            <input id="lokasi-petani" type="text" placeholder="Lokasi" value={d.lokasi} onChange={u("lokasi")} style={inp} />
          </div>
        </div>
      </div>
      <div style={{ marginBottom: 24 }}>
        <label style={lbl}>Jenis Komoditas Utama</label>
        <div style={{ position: "relative", width: "55%" }}>
          <FieldIcon icon={Wheat} />
          <input id="komoditas" type="text" placeholder="Jenis Komoditas" value={d.komoditas} onChange={u("komoditas")} style={inp} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button id="btn-lanjut-petani" style={{ ...yBtn, flex: 2 }} onClick={onNext}>Lanjutkan ke Verifikasi <ArrowRight size={15} /></button>
        <button id="btn-kembali-petani" style={{ ...oBtn, flex: 1 }} onClick={onBack}><ArrowLeft size={14} /> Kembali</button>
      </div>
    </div>
  );
}

/* ─── Step 2 Pengolah ─── */
function Step2Pengolah({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [d, setD] = useState({ nama: "", email: "", hp: "", alamat: "", jenis: "" });
  const u = (f: keyof typeof d) => (e: React.ChangeEvent<HTMLInputElement>) => setD({ ...d, [f]: e.target.value });
  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", margin: "0 0 22px" }}>Isi Data Diri</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <div>
          <label style={lbl}>Nama Perusahaan</label>
          <div style={{ position: "relative" }}>
            <FieldIcon icon={Building2} />
            <input id="nama-perusahaan" type="text" placeholder="Nama Perusahaan" value={d.nama} onChange={u("nama")} style={inp} />
          </div>
        </div>
        <div>
          <label style={lbl}>Email</label>
          <div style={{ position: "relative" }}>
            <FieldIcon icon={Mail} />
            <input id="email-pengolah" type="email" placeholder="Email" value={d.email} onChange={u("email")} style={inp} />
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <div>
          <label style={lbl}>Nomor HandPhone</label>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.25)", borderRadius: 11, padding: "12px 10px", color: "white", fontWeight: 700, fontSize: 13, flexShrink: 0, display: "flex", alignItems: "center", gap: 5 }}>
              <Phone size={13} strokeWidth={2.2} /> +62
            </div>
            <input id="nohp-pengolah" type="tel" placeholder="Nomor HP" value={d.hp} onChange={u("hp")} style={{ ...inp, paddingLeft: 14, flex: 1 }} />
          </div>
        </div>
        <div>
          <label style={lbl}>Alamat</label>
          <div style={{ position: "relative" }}>
            <FieldIcon icon={MapPin} />
            <input id="alamat-pengolah" type="text" placeholder="Alamat" value={d.alamat} onChange={u("alamat")} style={inp} />
          </div>
        </div>
      </div>
      <div style={{ marginBottom: 24 }}>
        <label style={lbl}>Jenis Pengolahan</label>
        <div style={{ position: "relative", width: "55%" }}>
          <FieldIcon icon={Factory} />
          <input id="jenis-pengolahan" type="text" placeholder="Jenis Pengolahan" value={d.jenis} onChange={u("jenis")} style={inp} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button id="btn-lanjut-pengolah" style={{ ...yBtn, flex: 2 }} onClick={onNext}>Lanjutkan ke Verifikasi <ArrowRight size={15} /></button>
        <button id="btn-kembali-pengolah" style={{ ...oBtn, flex: 1 }} onClick={onBack}><ArrowLeft size={14} /> Kembali</button>
      </div>
    </div>
  );
}

/* ─── Step 3: OTP ─── */
function Step3({ onFinish }: { onFinish: () => void }) {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [agreed, setAgreed] = useState(false);
  const [done, setDone] = useState(false);
  const ref0 = useRef<HTMLInputElement>(null);
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);
  const ref4 = useRef<HTMLInputElement>(null);
  const refs = [ref0, ref1, ref2, ref3, ref4];

  const handleOtp = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const n = [...otp]; n[i] = val; setOtp(n);
    if (val && i < 4) refs[i + 1].current?.focus();
  };
  const handleKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) refs[i - 1].current?.focus();
  };

  if (done) return (
    <div style={{ textAlign: "center", padding: "28px 0" }}>
      <div style={{ fontSize: 60, marginBottom: 14 }}>🎉</div>
      <h2 style={{ fontSize: 22, fontWeight: 900, color: "white", margin: "0 0 8px" }}>Pendaftaran Berhasil!</h2>
      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>Akun Anda aktif. Mengarahkan ke halaman masuk...</p>
      <div style={{ width: 36, height: 36, borderRadius: "50%", border: "4px solid #c9a227", borderTopColor: "transparent", margin: "20px auto 0", animation: "spin 0.8s linear infinite" }} />
    </div>
  );

  const allFilled = otp.every(v => v !== "");
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <ShieldCheck size={28} color="#c9a227" strokeWidth={2} />
        <h2 style={{ fontSize: 24, fontWeight: 900, color: "white", margin: 0 }}>Verifikasi Akun</h2>
      </div>
      <p style={{ color: "rgba(255,255,255,0.58)", fontSize: 14, marginBottom: 28 }}>
        Masukkan kode OTP yang telah dikirim
      </p>

      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 20 }}>
        {otp.map((v, i) => (
          <input
            key={i} id={`otp-${i}`} ref={refs[i]}
            type="text" inputMode="numeric" maxLength={1} value={v}
            onChange={e => handleOtp(i, e.target.value)}
            onKeyDown={e => handleKey(i, e)}
            style={{
              width: 56, height: 64, borderRadius: 12, textAlign: "center",
              border: `2px solid ${v ? "#c9a227" : "rgba(255,255,255,0.28)"}`,
              background: "rgba(255,255,255,0.1)", color: "white",
              fontFamily: font, fontSize: 26, fontWeight: 800, outline: "none",
              transition: "border-color 0.2s",
            }}
          />
        ))}
      </div>

      <div style={{ height: 1, background: "rgba(255,255,255,0.16)", marginBottom: 16 }} />

      <p style={{ textAlign: "center", fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>
        Tidak menerima kode?{" "}
        <button onClick={() => setOtp(["", "", "", "", ""])} style={{
          background: "none", border: "none", cursor: "pointer", color: "#c9a227",
          fontWeight: 700, fontStyle: "italic", textDecoration: "underline",
          fontFamily: font, fontSize: 14, display: "inline-flex", alignItems: "center", gap: 4,
        }}>
          <RotateCcw size={13} /> Kirim ulang
        </button>
      </p>

      <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginBottom: 26 }}>
        <div onClick={() => setAgreed(!agreed)} style={{
          width: 20, height: 20, borderRadius: 6, flexShrink: 0,
          background: agreed ? "#c9a227" : "rgba(255,255,255,0.1)",
          border: `2px solid ${agreed ? "#c9a227" : "rgba(255,255,255,0.35)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.2s",
        }}>
          {agreed && <CheckCircle2 size={13} color="white" strokeWidth={3} />}
        </div>
        <span style={{ color: "rgba(255,255,255,0.78)", fontSize: 14 }}>
          Saya menyetujui{" "}
          <a href="#" style={{ color: "#c9a227", fontWeight: 700, textDecoration: "underline" }}>Syarat &amp; Ketentuan</a>
        </span>
      </label>

      <button
        id="btn-selesai"
        disabled={!agreed || !allFilled}
        onClick={() => { setDone(true); setTimeout(onFinish, 1800); }}
        style={{
          ...yBtn, width: "100%", fontSize: 15,
          opacity: (agreed && allFilled) ? 1 : 0.4,
          cursor: (agreed && allFilled) ? "pointer" : "not-allowed",
        }}
      >
        Selesaikan Pendaftaran <ChevronRight size={16} />
      </button>
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function RegisterPage() {
  const [step, setStep] = useState<Step>(1);
  const [role, setRole] = useState<Role>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        @keyframes spin  { to{transform:rotate(360deg)} }
        @keyframes fadeUp{ from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow: hidden; }
        input::placeholder { color: rgba(255,255,255,0.42) !important; }
      `}</style>

      {/* ── Background ── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <Image src="/bgregister.svg" alt="bg" fill style={{ objectFit: "cover" }} priority />
      </div>

      {/* ── Content ── */}
      <div style={{
        position: "relative", zIndex: 1,
        minHeight: "100vh", display: "flex",
        alignItems: "center", justifyContent: "center",
        padding: "28px 24px", fontFamily: font,
      }}>
        <div style={{ display: "flex", width: "100%", maxWidth: 1100, gap: 22, alignItems: "stretch" }}>

          {/* LEFT — Dark Green Form Card */}
          <div style={{
            flex: 1, minWidth: 0,
            background: "linear-gradient(145deg, #1e7a42f0 0%, #145030f0 100%)",
            borderRadius: 28, padding: "40px 44px",
            display: "flex", flexDirection: "column", justifyContent: "center",
            backdropFilter: "blur(14px)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
            animation: "fadeUp 0.5s ease forwards",
          }}>
            <div style={{ width: "100%", maxWidth: 430, margin: "0 auto" }}>
              {step === 1 && <Step1 role={role} setRole={setRole} onNext={() => setStep(2)} />}
              {step === 2 && role === "petani" && <Step2Petani onNext={() => setStep(3)} onBack={() => setStep(1)} />}
              {step === 2 && role === "pengolah" && <Step2Pengolah onNext={() => setStep(3)} onBack={() => setStep(1)} />}
              {step === 3 && <Step3 onFinish={() => { window.location.href = "/auth/login"; }} />}

              {step === 1 && (
                <p style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: "rgba(255,255,255,0.55)" }}>
                  Sudah punya akun?{" "}
                  <Link href="/login" style={{ color: "#c9a227", fontWeight: 800, fontStyle: "italic", textDecoration: "underline" }}>
                    Masuk di sini
                  </Link>
                </p>
              )}
            </div>
          </div>

          {/* RIGHT — Light Green Info Card */}
          <RightPanel step={step} />
        </div>
      </div>
    </>
  );
}
