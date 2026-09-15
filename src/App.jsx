import React, { useState, useEffect, useRef } from "react";
import {
  Hammer, Zap, Wrench, PaintBucket, Sparkles, Cog, HardHat, Package,
  PartyPopper, Users2, Mic, Phone, MessageSquare, Globe2, CheckCircle2,
  Star, MapPin, Clock, IndianRupee, ChevronRight, ChevronLeft, X, Home,
  Briefcase, MessageCircle, User, LayoutDashboard, ShieldCheck, BarChart3,
  Handshake, Camera, ArrowRight, Volume2, PhoneCall, Send, Check, Radio,
  TrendingUp, Award, CircleDot, Menu, Settings, LogOut, Search, Filter,
} from "lucide-react";

/* ---------------------------------------------------------------------- */
/* DESIGN TOKENS  — Option 2: Fresh & Minimal                            */
/* bg:#FFFFFF  surface:#F8FAFB  border:#E2E8F0  ink:#0F172A  teal:#0E9C86 */
/* ---------------------------------------------------------------------- */
const C = {
  ink: "#0F172A",
  inkLight: "#334155",
  indigo: "#1E2A55",
  indigoDeep: "#131C3B",
  teal: "#0E9C86",
  tealLight: "#E6F7F4",
  tealDeep: "#0B7C6B",
  amber: "#F59E0B",
  amberLight: "#FEF3C7",
  bg: "#F8FAFB",
  bgAlt: "#F1F5F9",
  card: "#FFFFFF",
  line: "#E2E8F0",
  lineStrong: "#CBD5E1",
  muted: "#64748B",
  mutedLight: "#94A3B8",
};


/* ---------------------------------------------------------------------- */
/* COPY / TRANSLATIONS                                                    */
/* ---------------------------------------------------------------------- */
const T = {
  en: {
    available: "AVAILABLE", notAvailable: "NOT AVAILABLE", newOpportunities: "New Opportunities",
    accept: "ACCEPT", decline: "DECLINE", home: "Home", opportunities: "Opportunities",
    earnings: "Earnings", profile: "My Profile", today: "Today's Earnings", week: "This Week",
    month: "This Month", markComplete: "MARK WORK COMPLETED", voice: "Voice Assistance",
  },
  hi: {
    available: "उपलब्ध", notAvailable: "अनुपलब्ध", newOpportunities: "नए अवसर",
    accept: "स्वीकार करें", decline: "अस्वीकार करें", home: "होम", opportunities: "अवसर",
    earnings: "कमाई", profile: "मेरी प्रोफ़ाइल", today: "आज की कमाई", week: "इस सप्ताह",
    month: "इस महीने", markComplete: "काम पूरा हुआ", voice: "आवाज़ सहायता",
  },
  hinglish: {
    available: "AVAILABLE HAI", notAvailable: "AVAILABLE NAHI", newOpportunities: "Naye Kaam",
    accept: "ACCEPT KARO", decline: "MANA KARO", home: "Home", opportunities: "Kaam",
    earnings: "Kamai", profile: "Meri Profile", today: "Aaj ki Kamai", week: "Is Hafte",
    month: "Is Mahine", markComplete: "KAAM HO GAYA", voice: "Voice Sahayata",
  },
};

/* ---------------------------------------------------------------------- */
/* MOCK DATA                                                              */
/* ---------------------------------------------------------------------- */
const AREAS = ["Indirapuram", "Vaishali", "Raj Nagar", "Crossings Republik", "Kaushambi", "Vasundhara", "Sahibabad", "Ghaziabad City"];

const PRO_CATEGORIES = [
  { id: "plumber", name: "Plumber", icon: Wrench },
  { id: "electrician", name: "Electrician", icon: Zap },
  { id: "carpenter", name: "Carpenter", icon: Hammer },
  { id: "painter", name: "Painter", icon: PaintBucket },
  { id: "cleaner", name: "Cleaner", icon: Sparkles },
  { id: "repair", name: "Repair Technician", icon: Cog },
];

const WORKER_CATEGORIES = [
  { id: "construction", name: "Construction Helper", icon: HardHat },
  { id: "labourer", name: "Daily Labourer", icon: Users2 },
  { id: "loader", name: "Loader / Mover", icon: Package },
  { id: "event", name: "Event Worker", icon: PartyPopper },
  { id: "tempclean", name: "Temporary Cleaner", icon: Sparkles },
  { id: "helper", name: "General Helper", icon: Handshake },
];

const ALL_CATEGORIES = [...PRO_CATEGORIES, ...WORKER_CATEGORIES];

const WORKERS = [
  {
    id: "w1", name: "Rahul Kumar", username: "@rahul.kumar", skill: "electrician", exp: "6 yrs",
    area: "Indirapuram", rate: "₹500–₹800", jobs: 42, rating: 4.7, reliability: 92,
    badges: ["identity", "skill", "community"], langs: ["Hindi", "Hinglish"], avatarColor: C.teal,
    profilePic: "/default-avatar.png", joinedDate: "March 2024",
    bio: "Experienced electrician specialising in house wiring, switchboard installation & repairs. Punctual and reliable.",
    skills: ["Electrical Repair", "Wiring", "Switchboard", "MCB Fitting", "Fan Installation"],
    totalReviews: 38, ratingBreakdown: { 5: 72, 4: 18, 3: 7, 2: 2, 1: 1 },
    verification: { email: true, phone: true, identity: true, profile: true },
    completedTasks: 42, projects: 6,
  },
  {
    id: "w2", name: "Suresh Yadav", username: "@suresh.yadav", skill: "electrician", exp: "9 yrs",
    area: "Vaishali", rate: "₹600–₹900", jobs: 78, rating: 4.9, reliability: 96,
    badges: ["identity", "skill", "community"], langs: ["Hindi"], avatarColor: C.indigo,
    profilePic: "/default-avatar.png", joinedDate: "January 2023",
    bio: "Senior electrician with 9 years of field experience. Specialist in industrial and residential electrical systems.",
    skills: ["Industrial Wiring", "Electrical Repair", "Panel Installation", "Cable Management"],
    totalReviews: 71, ratingBreakdown: { 5: 85, 4: 12, 3: 2, 2: 1, 1: 0 },
    verification: { email: true, phone: true, identity: true, profile: true },
    completedTasks: 78, projects: 14,
  },
  {
    id: "w3", name: "Aslam Sheikh", username: "@aslam.sheikh", skill: "electrician", exp: "3 yrs",
    area: "Raj Nagar", rate: "₹400–₹700", jobs: 19, rating: 4.4, reliability: 84,
    badges: ["identity", "skill"], langs: ["Hindi", "English"], avatarColor: C.amber,
    profilePic: "/default-avatar.png", joinedDate: "August 2024",
    bio: "Certified electrician for residential wiring and appliance installations. Available on short notice.",
    skills: ["Residential Wiring", "Appliance Fitting", "Troubleshooting"],
    totalReviews: 17, ratingBreakdown: { 5: 60, 4: 25, 3: 10, 2: 5, 1: 0 },
    verification: { email: true, phone: true, identity: true, profile: false },
    completedTasks: 19, projects: 3,
  },
  {
    id: "w4", name: "Vikram Singh", username: "@vikram.singh", skill: "plumber", exp: "8 yrs",
    area: "Vasundhara", rate: "₹350–₹650", jobs: 61, rating: 4.6, reliability: 90,
    badges: ["identity", "skill", "community"], langs: ["Hindi"], avatarColor: C.teal,
    profilePic: "/default-avatar.png", joinedDate: "June 2023",
    bio: "Expert plumber for leak repairs, pipe fitting, bathroom fixtures and drain cleaning.",
    skills: ["Leak Repair", "Pipe Fitting", "Bathroom Fixtures", "Drain Cleaning", "Water Heater"],
    totalReviews: 55, ratingBreakdown: { 5: 68, 4: 20, 3: 8, 2: 3, 1: 1 },
    verification: { email: true, phone: true, identity: true, profile: true },
    completedTasks: 61, projects: 9,
  },
  {
    id: "w5", name: "Manoj Prajapati", username: "@manoj.carpenter", skill: "carpenter", exp: "12 yrs",
    area: "Kaushambi", rate: "₹500–₹1000", jobs: 103, rating: 4.8, reliability: 95,
    badges: ["identity", "skill", "community"], langs: ["Hindi"], avatarColor: C.indigo,
    profilePic: "/default-avatar.png", joinedDate: "October 2022",
    bio: "Master carpenter with 12 years of experience in furniture making, wooden fittings and interior woodwork.",
    skills: ["Furniture Making", "Wooden Fixtures", "Door & Window Fitting", "Interior Woodwork", "Polish"],
    totalReviews: 97, ratingBreakdown: { 5: 80, 4: 14, 3: 4, 2: 1, 1: 1 },
    verification: { email: true, phone: true, identity: true, profile: true },
    completedTasks: 103, projects: 18,
  },
  {
    id: "w6", name: "Farhan Ali", username: "@farhan.painter", skill: "painter", exp: "5 yrs",
    area: "Sahibabad", rate: "₹400/day", jobs: 34, rating: 4.5, reliability: 88,
    badges: ["identity", "skill"], langs: ["Hindi", "Hinglish"], avatarColor: C.amber,
    profilePic: "/default-avatar.png", joinedDate: "April 2024",
    bio: "Professional painter for interior and exterior walls. Uses premium materials and delivers clean finishes.",
    skills: ["Interior Painting", "Exterior Painting", "Texture Finish", "Wall Putty", "Waterproofing"],
    totalReviews: 30, ratingBreakdown: { 5: 63, 4: 23, 3: 10, 2: 3, 1: 1 },
    verification: { email: true, phone: true, identity: true, profile: false },
    completedTasks: 34, projects: 7,
  },
  {
    id: "w7", name: "Deepak Mishra", username: "@deepak.mishra", skill: "labourer", exp: "4 yrs",
    area: "Ghaziabad City", rate: "₹500/day", jobs: 27, rating: 4.3, reliability: 81,
    badges: ["identity"], langs: ["Hindi"], avatarColor: C.teal,
    profilePic: "/default-avatar.png", joinedDate: "July 2024",
    bio: "Hard-working general labourer available for construction, loading and site assistance work.",
    skills: ["Construction Work", "Loading", "Site Assistance", "Material Handling"],
    totalReviews: 22, ratingBreakdown: { 5: 55, 4: 25, 3: 12, 2: 6, 1: 2 },
    verification: { email: true, phone: true, identity: false, profile: false },
    completedTasks: 27, projects: 4,
  },
  {
    id: "w8", name: "Ramesh Chand", username: "@ramesh.chand", skill: "loader", exp: "7 yrs",
    area: "Crossings Republik", rate: "₹450/day", jobs: 55, rating: 4.6, reliability: 89,
    badges: ["identity", "skill"], langs: ["Hindi"], avatarColor: C.indigo,
    profilePic: "/default-avatar.png", joinedDate: "February 2023",
    bio: "Experienced loader and mover. Handles household shifting, goods loading/unloading with care.",
    skills: ["Household Shifting", "Loading & Unloading", "Packing", "Heavy Lifting"],
    totalReviews: 49, ratingBreakdown: { 5: 67, 4: 22, 3: 8, 2: 2, 1: 1 },
    verification: { email: true, phone: true, identity: true, profile: false },
    completedTasks: 55, projects: 10,
  },
];

const CUSTOMERS = ["Priya Sharma", "Anita Verma", "Rohit Gupta", "Sunita Devi", "Karan Malhotra"];

const INITIAL_JOBS = [
  { id: "j1", category: "electrician", customer: "Anita Verma", area: "Vaishali", worker: "Suresh Yadav", status: "COMPLETED", price: "₹650", date: "3 Sep 2026", rating: 5 },
  { id: "j2", category: "plumber", customer: "Rohit Gupta", area: "Vasundhara", worker: "Vikram Singh", status: "WORK IN PROGRESS", price: "₹450", date: "9 Sep 2026" },
  { id: "j3", category: "carpenter", customer: "Sunita Devi", area: "Kaushambi", worker: "Manoj Prajapati", status: "REQUEST CREATED", price: "Quote requested", date: "9 Sep 2026" },
];

const STAGES = ["REQUEST CREATED", "WORKER MATCHED", "WORKER ACCEPTED", "WORK IN PROGRESS", "COMPLETED", "PAYMENT COMPLETED"];

/* ---------------------------------------------------------------------- */
/* SMALL UI PRIMITIVES                                                    */
/* ---------------------------------------------------------------------- */
function Avatar({ name, color, size = 48, profilePic, onClick }) {
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("");
  const fontSize = size <= 32 ? 11 : size <= 48 ? 14 : 18;
  if (profilePic) {
    return (
      <img
        src={profilePic}
        alt={name}
        onClick={onClick}
        style={{ width: size, height: size, objectFit: "cover", cursor: onClick ? "pointer" : "default" }}
        className={`rounded-full shrink-0 shadow-sm ${onClick ? "hover:ring-2 hover:ring-teal-400 transition-all" : ""}`}
      />
    );
  }
  if (!color) {
    return (
      <img
        src="/default-avatar.png"
        alt={name}
        onClick={onClick}
        style={{ width: size, height: size, objectFit: "cover", cursor: onClick ? "pointer" : "default" }}
        className={`rounded-full shrink-0 shadow-sm bg-slate-100 ${onClick ? "hover:ring-2 hover:ring-teal-400 transition-all" : ""}`}
      />
    );
  }
  return (
    <div
      onClick={onClick}
      style={{ width: size, height: size, background: color, color: "#fff", fontWeight: 700, fontSize, cursor: onClick ? "pointer" : "default" }}
      className={`rounded-full flex items-center justify-center shrink-0 shadow-sm ${onClick ? "hover:ring-2 hover:ring-teal-400 transition-all" : ""}`}
    >
      {initials}
    </div>
  );
}

function Badge({ children, tone = "teal" }) {
  const map = {
    teal: { bg: "#DCFAF4", fg: "#0B7C6B" },
    amber: { bg: "#FEF3C7", fg: "#92400E" },
    indigo: { bg: "#EEF2FF", fg: "#3730A3" },
    grey: { bg: "#F1F5F9", fg: C.muted },
  };
  const s = map[tone];
  return (
    <span style={{ background: s.bg, color: s.fg }} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
      {children}
    </span>
  );
}

function Btn({ children, onClick, variant = "primary", full, icon: Icon, size = "md", disabled, style: extraStyle }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-150 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed";
  const sizes = { md: "px-5 py-2.5 text-sm", lg: "px-7 py-3.5 text-base", xl: "px-9 py-4 text-lg" };
  const variants = {
    primary: { background: C.indigo, color: "#fff", boxShadow: "0 1px 3px rgba(30,42,85,0.25)" },
    teal: { background: C.teal, color: "#fff", boxShadow: "0 1px 3px rgba(14,156,134,0.3)" },
    amber: { background: C.amber, color: "#1a1200", boxShadow: "0 1px 3px rgba(245,158,11,0.3)" },
    outline: { background: "transparent", color: C.ink, border: `1.5px solid ${C.lineStrong}` },
    ghost: { background: C.card, color: C.ink, border: `1px solid ${C.line}`, boxShadow: "0 1px 2px rgba(0,0,0,0.04)" },
    danger: { background: "#FEE2E2", color: "#B91C1C" },
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ ...variants[variant], ...extraStyle }}
      className={`${base} ${sizes[size]} ${full ? "w-full" : ""} hover:opacity-90 hover:-translate-y-px`}
    >
      {Icon && <Icon size={size === "xl" ? 24 : 18} />}
      {children}
    </button>
  );
}

function Card({ children, className = "", style = {}, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: C.card,
        border: `1px solid ${C.line}`,
        boxShadow: "0 1px 4px rgba(0,0,0,0.05), 0 0 0 0 transparent",
        ...style,
      }}
      className={`rounded-2xl ${onClick ? "cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div style={{ width: 3, height: 16, background: C.teal, borderRadius: 99 }} />
      <span style={{ color: C.teal }} className="text-xs font-bold tracking-widest uppercase">{children}</span>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* PROFILE MODAL                                                          */
/* ---------------------------------------------------------------------- */

/** Hook: open/close profile modal from anywhere */
function useProfileModal() {
  const [profileUser, setProfileUser] = useState(null);
  const openProfile = (user) => setProfileUser(user);
  const closeProfile = () => setProfileUser(null);
  return { profileUser, openProfile, closeProfile };
}

function ProfileModal({ user, onClose }) {
  // Escape key + body scroll lock
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!user) return null;

  const isVerified = user.badges?.includes("identity") && user.badges?.includes("skill");
  const ratingPct = (v) => `${v}%`;

  const verifications = [
    { label: "Email Verified",    ok: user.verification?.email    ?? false },
    { label: "Phone Verified",    ok: user.verification?.phone    ?? false },
    { label: "Identity Verified", ok: user.verification?.identity ?? false },
    { label: "Profile Verified",  ok: user.verification?.profile  ?? false },
  ];

  return (
    /* ── Backdrop ── */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: "rgba(15,23,42,0.55)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        animation: "pmFadeIn 0.2s ease",
      }}
      onClick={onClose}
    >
      {/* ── Modal card ── */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full overflow-y-auto"
        style={{
          maxWidth: 520,
          maxHeight: "90vh",
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(226,232,240,0.9)",
          borderRadius: 24,
          boxShadow: "0 25px 60px rgba(15,23,42,0.18), 0 0 0 1px rgba(255,255,255,0.6) inset",
          animation: "pmSlideIn 0.25s cubic-bezier(0.34,1.3,0.64,1)",
        }}
      >
        {/* ── Gradient header band ── */}
        <div
          className="relative h-28 rounded-t-3xl"
          style={{
            background: `linear-gradient(135deg, ${user.avatarColor || C.teal}22 0%, #EEF2FF 100%)`,
            borderBottom: `1px solid ${C.line}`,
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-black/10"
            style={{ color: C.muted }}
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Avatar (overlaps header) ── */}
        <div className="px-6 pb-5">
          <div className="flex items-end gap-4 -mt-12 mb-4">
            <div className="relative">
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={user.name}
                  className="rounded-2xl object-cover"
                  style={{ width: 88, height: 88, border: "3px solid #fff", boxShadow: "0 4px 14px rgba(0,0,0,0.12)" }}
                />
              ) : (
                <div
                  className="rounded-2xl flex items-center justify-center font-black text-white text-2xl"
                  style={{
                    width: 88, height: 88,
                    background: user.avatarColor || C.teal,
                    border: "3px solid #fff",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
                  }}
                >
                  {user.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                </div>
              )}
              {isVerified && (
                <div
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: C.teal, border: "2px solid #fff" }}
                  title="Verified Worker"
                >
                  <Check size={11} color="#fff" strokeWidth={3} />
                </div>
              )}
            </div>

            {/* Name / username / badges */}
            <div className="pb-1 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-black text-xl" style={{ color: C.ink }}>{user.name}</span>
                {isVerified && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#DCFAF4", color: "#0B7C6B" }}>
                    ✓ Verified
                  </span>
                )}
              </div>
              <div className="text-sm mt-0.5" style={{ color: C.muted }}>{user.username || `@${user.name.toLowerCase().replace(" ", ".")}`}</div>
              <div className="text-xs mt-0.5 flex items-center gap-1" style={{ color: C.mutedLight }}>
                <MapPin size={11} /> {user.area}
              </div>
            </div>
          </div>

          {/* Bio */}
          {user.bio && (
            <p className="text-sm leading-relaxed mb-5" style={{ color: C.inkLight }}>
              {user.bio}
            </p>
          )}

          {/* ── Stats row ── */}
          <div className="grid grid-cols-4 gap-2 mb-5">
            {[
              { label: "Jobs Done",  value: user.completedTasks ?? user.jobs },
              { label: "Reviews",    value: user.totalReviews ?? user.jobs },
              { label: "Projects",   value: user.projects ?? "—" },
              { label: "Reliability", value: `${user.reliability}%` },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl p-3 text-center" style={{ background: C.bg, border: `1px solid ${C.line}` }}>
                <div className="font-black text-base" style={{ color: C.teal }}>{value}</div>
                <div className="text-[10px] mt-0.5 leading-tight" style={{ color: C.muted }}>{label}</div>
              </div>
            ))}
          </div>

          {/* ── Rating section ── */}
          <div className="mb-5 rounded-2xl p-4" style={{ background: C.bg, border: `1px solid ${C.line}` }}>
            <div className="flex items-center gap-4 mb-3">
              <div>
                <div className="font-black text-4xl" style={{ color: C.ink }}>{user.rating.toFixed(1)}</div>
                <div className="text-xs" style={{ color: C.muted }}>out of 5.0</div>
              </div>
              <div className="flex-1">
                <div className="flex gap-0.5 mb-1">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} size={16} fill={i <= Math.round(user.rating) ? C.amber : "#E2E8F0"} color={i <= Math.round(user.rating) ? C.amber : "#E2E8F0"} />
                  ))}
                </div>
                <div className="text-xs" style={{ color: C.muted }}>
                  Based on {user.totalReviews ?? user.jobs} reviews
                </div>
              </div>
            </div>
            {/* Rating bars */}
            <div className="flex flex-col gap-1.5">
              {[5,4,3,2,1].map((star) => {
                const pct = user.ratingBreakdown?.[star] ?? 0;
                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-xs font-semibold w-6 text-right shrink-0" style={{ color: C.muted }}>{star} ★</span>
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: C.line }}>
                      <div
                        className="h-2 rounded-full transition-all duration-700"
                        style={{ width: ratingPct(pct), background: pct >= 60 ? C.teal : pct >= 30 ? C.amber : "#F87171" }}
                      />
                    </div>
                    <span className="text-xs w-8 shrink-0" style={{ color: C.muted }}>{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Verification section ── */}
          <div className="mb-5">
            <div className="text-xs font-bold tracking-widest uppercase mb-2 flex items-center gap-2" style={{ color: C.teal }}>
              <div style={{ width: 3, height: 14, background: C.teal, borderRadius: 99 }} /> Verification
            </div>
            <div className="grid grid-cols-2 gap-2">
              {verifications.map(({ label, ok }) => (
                <div key={label} className="flex items-center gap-2 text-sm rounded-xl px-3 py-2.5" style={{ background: ok ? "#F0FDF9" : C.bg, border: `1px solid ${ok ? "#B2F5EA" : C.line}` }}>
                  {ok
                    ? <CheckCircle2 size={15} color="#0B7C6B" className="shrink-0" />
                    : <div className="w-3.5 h-3.5 rounded-full border-2 shrink-0" style={{ borderColor: C.lineStrong }} />
                  }
                  <span className="text-xs font-medium" style={{ color: ok ? "#0B7C6B" : C.muted }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── User info grid ── */}
          <div className="mb-5 rounded-2xl p-4" style={{ background: C.bg, border: `1px solid ${C.line}` }}>
            <div className="text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-2" style={{ color: C.teal }}>
              <div style={{ width: 3, height: 14, background: C.teal, borderRadius: 99 }} /> Information
            </div>
            {[
              ["Full Name",   user.name],
              ["Username",    user.username || `@${user.name.toLowerCase().replace(" ", ".")}`],
              ["Location",    user.area],
              ["Experience",  user.exp],
              ["Rate",        user.rate],
              ["Languages",   user.langs?.join(", ")],
              ["Joined",      user.joinedDate || "2024"],
            ].map(([k, v]) => v && (
              <div key={k} className="flex justify-between items-center py-1.5 border-b last:border-0" style={{ borderColor: C.line }}>
                <span className="text-xs" style={{ color: C.muted }}>{k}</span>
                <span className="text-xs font-semibold text-right" style={{ color: C.inkLight, maxWidth: "60%" }}>{v}</span>
              </div>
            ))}
          </div>

          {/* ── Skills section ── */}
          {user.skills?.length > 0 && (
            <div className="mb-6">
              <div className="text-xs font-bold tracking-widest uppercase mb-2 flex items-center gap-2" style={{ color: C.teal }}>
                <div style={{ width: 3, height: 14, background: C.teal, borderRadius: 99 }} /> Skills
              </div>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: C.tealLight, color: C.tealDeep, border: `1px solid #B2E8DF` }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── Action buttons ── */}
          <div className="flex gap-2 flex-wrap">
            <Btn variant="teal" icon={User} onClick={() => alert("Full profile coming soon!")}>View Full Profile</Btn>
            <Btn variant="outline" icon={Handshake} onClick={() => alert("Connect feature coming soon!")}>Connect</Btn>
            <Btn variant="ghost" icon={MessageCircle} onClick={() => alert("Messaging coming soon!")}>Message</Btn>
          </div>
        </div>
      </div>

      {/* CSS keyframe animations injected once */}
      <style>{`
        @keyframes pmFadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes pmSlideIn { from { opacity:0; transform:scale(0.92) translateY(8px) } to { opacity:1; transform:scale(1) translateY(0) } }
      `}</style>
    </div>
  );
}



function TrustBadgeExplainer() {
  const items = [
    { icon: CheckCircle2, label: "Identity Confirmed", desc: "The worker's submitted identity information has been reviewed.", tone: "indigo" },
    { icon: ShieldCheck, label: "Skill Confirmed", desc: "The worker's skill has been validated through available evidence or assessment.", tone: "teal" },
    { icon: Star, label: "Community Trusted", desc: "The worker has developed a positive history within the platform.", tone: "amber" },
  ];
  return (
    <div className="grid sm:grid-cols-3 gap-3">
      {items.map((it) => (
        <div key={it.label} className="flex gap-3 p-3 rounded-xl" style={{ background: "#FAFAF8", border: `1px solid ${C.line}` }}>
          <it.icon size={20} style={{ color: it.tone === "teal" ? C.teal : it.tone === "amber" ? "#9A5F0F" : C.indigo }} className="shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-semibold">{it.label}</div>
            <div className="text-xs mt-0.5" style={{ color: C.muted }}>{it.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProgressTimeline({ status }) {
  const idx = STAGES.indexOf(status);
  return (
    <div className="flex flex-col gap-0">
      {STAGES.map((s, i) => (
        <div key={s} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div
              className="rounded-full flex items-center justify-center shrink-0"
              style={{
                width: 26, height: 26,
                background: i <= idx ? C.teal : "#fff",
                border: `2px solid ${i <= idx ? C.teal : C.line}`,
              }}
            >
              {i <= idx && <Check size={14} color="#fff" />}
            </div>
            {i < STAGES.length - 1 && <div style={{ width: 2, height: 34, background: i < idx ? C.teal : C.line }} />}
          </div>
          <div className="pb-2 pt-0.5">
            <div className="text-sm font-semibold" style={{ color: i <= idx ? C.ink : C.muted }}>{s}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function catIcon(catId) {
  const c = ALL_CATEGORIES.find((c) => c.id === catId);
  return c ? c.icon : Wrench;
}
function catName(catId) {
  const c = ALL_CATEGORIES.find((c) => c.id === catId);
  return c ? c.name : catId;
}

/* ---------------------------------------------------------------------- */
/* TOP NAV (shared shell)                                                 */
/* ---------------------------------------------------------------------- */
function TopBar({ title, onBack, right }) {
  return (
    <div
      className="sticky top-0 z-20 flex items-center justify-between px-4 py-3"
      style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: `1px solid ${C.line}`,
      }}
    >
      <div className="flex items-center gap-2">
        {onBack && (
          <button onClick={onBack} className="p-1.5 rounded-full hover:bg-slate-100 transition-colors">
            <ChevronLeft size={20} color={C.inkLight} />
          </button>
        )}
        <span className="font-bold text-base" style={{ color: C.ink }}>{title}</span>
      </div>
      {right}
    </div>
  );
}

function BottomNav({ items, active, onChange }) {
  return (
    <div
      className="sticky bottom-0 z-20 grid"
      style={{
        gridTemplateColumns: `repeat(${items.length},1fr)`,
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: `1px solid ${C.line}`,
      }}
    >
      {items.map((it) => (
        <button key={it.key} onClick={() => onChange(it.key)} className="flex flex-col items-center gap-1 py-3 relative">
          {active === it.key && (
            <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 24, height: 2.5, background: C.teal, borderRadius: 99 }} />
          )}
          <it.icon size={21} color={active === it.key ? C.teal : C.mutedLight} />
          <span className="text-[10px] font-semibold" style={{ color: active === it.key ? C.teal : C.mutedLight }}>{it.label}</span>
        </button>
      ))}
    </div>
  );
}


/* ---------------------------------------------------------------------- */
/* LANDING PAGE  — Option 2: Fresh & Minimal                             */
/* ---------------------------------------------------------------------- */
function Landing({ goto }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const { profileUser, openProfile, closeProfile } = useProfileModal();
  const filters = [
    { id: "all", label: "All Services" },
    { id: "plumber", label: "Plumber" },
    { id: "electrician", label: "Electrician" },
    { id: "carpenter", label: "Carpenter" },
    { id: "painter", label: "Painter" },
    { id: "cleaner", label: "Cleaner" },
    { id: "labourer", label: "Daily Labourer" },
  ];
  const filteredWorkers = activeFilter === "all"
    ? WORKERS.slice(0, 3)
    : WORKERS.filter((w) => w.skill === activeFilter).slice(0, 3);

  return (
    <div style={{ background: "#ffffff", color: C.ink, fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }} className="min-h-full">

      {/* ── Sticky Nav ── */}
      <nav
        className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto"
        style={{
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: `1px solid ${C.line}`,
        }}
      >
        <div className="flex items-center gap-2.5">
          <div style={{ background: C.teal }} className="w-8 h-8 rounded-xl flex items-center justify-center shadow-sm">
            <span style={{ color: "#fff" }} className="font-black text-base">S</span>
          </div>
          <span className="font-black text-lg tracking-tight" style={{ color: C.ink }}>SOLVO</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: C.muted }}>
          <a href="#workers" className="hover:text-teal-600 transition-colors" style={{ color: "inherit" }}>Workers</a>
          <a href="#how" className="hover:text-teal-600 transition-colors" style={{ color: "inherit" }}>How it works</a>
          <a href="#access" className="hover:text-teal-600 transition-colors" style={{ color: "inherit" }}>Access</a>
        </div>
        <div className="flex items-center gap-2">
          <Btn variant="ghost" onClick={() => goto("roleSelect")}>Log in</Btn>
          <Btn variant="teal" onClick={() => goto("roleSelect")}>Get Started</Btn>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
        <Badge tone="teal">Ghaziabad · Delhi NCR · Now live</Badge>
        <h1
          className="mt-6 font-black leading-[1.08] tracking-tight"
          style={{ fontSize: "clamp(2.6rem, 6vw, 4rem)", color: C.ink }}
        >
          Every skilled hand<br />
          <span style={{ color: C.teal }}>deserves an opportunity.</span>
        </h1>
        <p className="mt-5 text-lg leading-relaxed mx-auto" style={{ color: C.muted, maxWidth: 520 }}>
          SOLVO connects customers with verified local workers — through an app, by voice, or even a basic phone call.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Btn variant="teal" size="lg" icon={Search} onClick={() => goto("roleSelect", "customer")}>Find a Worker</Btn>
          <Btn variant="outline" size="lg" icon={Briefcase} onClick={() => goto("roleSelect", "worker")}>Find Work</Btn>
        </div>
        {/* Stats strip */}
        <div className="mt-14 grid grid-cols-3 gap-4 max-w-md mx-auto">
          {[["8+", "Workers"], ["12+", "Bookings"], ["4.7★", "Avg Rating"]].map(([v, l]) => (
            <div key={l} className="rounded-2xl p-4" style={{ background: C.bg, border: `1px solid ${C.line}` }}>
              <div className="font-black text-xl" style={{ color: C.teal }}>{v}</div>
              <div className="text-xs mt-0.5" style={{ color: C.muted }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Top Rated Workers ── */}
      <div id="workers" className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <SectionLabel>Verified Professionals</SectionLabel>
          <h2 className="font-black text-3xl mt-1" style={{ color: C.ink }}>Top Rated Workers</h2>
          <p className="mt-2 text-sm" style={{ color: C.muted }}>Click any worker card to view their full profile.</p>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6" style={{ scrollbarWidth: "none" }}>
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className="shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150"
              style={{
                background: activeFilter === f.id ? C.teal : C.bg,
                color: activeFilter === f.id ? "#fff" : C.muted,
                border: `1px solid ${activeFilter === f.id ? C.teal : C.line}`,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Worker cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {(filteredWorkers.length > 0 ? filteredWorkers : WORKERS.slice(0, 3)).map((w) => (
            <div
              key={w.id}
              className="rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
              style={{ background: C.card, border: `1px solid ${C.line}`, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
            >
              <Avatar name={w.name} color={w.avatarColor} size={72} profilePic={w.profilePic} onClick={() => openProfile(w)} />
              <button onClick={() => openProfile(w)} className="font-bold text-base mt-3 hover:underline text-left w-full text-center" style={{ color: C.ink }}>{w.name}</button>
              <div className="text-sm mt-0.5" style={{ color: C.muted }}>{catName(w.skill)} · {w.area}</div>
              <div className="flex items-center justify-center gap-1 mt-2">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} size={13} fill={i <= Math.round(w.rating) ? C.amber : "none"} color={C.amber} />
                ))}
                <span className="text-xs ml-1 font-semibold" style={{ color: C.muted }}>{w.rating} ({w.jobs} jobs)</span>
              </div>
              <div className="flex gap-1.5 mt-3 flex-wrap justify-center">
                {w.badges.includes("identity") && <Badge tone="indigo">✓ Identity</Badge>}
                {w.badges.includes("skill") && <Badge tone="teal">✓ Skill</Badge>}
                {w.badges.includes("community") && <Badge tone="amber">★ Trusted</Badge>}
              </div>
              <div className="flex gap-2 mt-4 w-full">
                <Btn full variant="ghost" onClick={() => openProfile(w)}>
                  View Profile
                </Btn>
                <Btn full variant="teal" onClick={() => goto("roleSelect", "customer")}>
                  Book
                </Btn>
              </div>
            </div>
          ))}
        </div>
        {filteredWorkers.length === 0 && (
          <p className="text-center py-8 text-sm" style={{ color: C.muted }}>No workers in this category yet.</p>
        )}
      </div>

      {profileUser && <ProfileModal user={profileUser} onClose={closeProfile} />}

      {/* ── Trust section ── */}
      <div style={{ background: C.bg, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }} className="py-14">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <SectionLabel>Why SOLVO</SectionLabel>
            <h2 className="font-black text-3xl mt-1" style={{ color: C.ink }}>Built on honesty, not promises.</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: CheckCircle2, title: "Verified Professionals", desc: "Identity and skill checks before workers appear on the platform.", color: C.teal },
              { icon: ShieldCheck, title: "Transparent Trust Badges", desc: "We show exactly what was checked — never overpromising.", color: C.indigo },
              { icon: Star, title: "Real Ratings", desc: "Job-by-job ratings from real customers, publicly visible.", color: C.amber },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-6"
                style={{ background: C.card, border: `1px solid ${C.line}`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: item.color + "18" }}>
                  <item.icon size={22} color={item.color} />
                </div>
                <div className="font-bold text-base mb-1" style={{ color: C.ink }}>{item.title}</div>
                <div className="text-sm leading-relaxed" style={{ color: C.muted }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── How it works ── */}
      <div id="how" className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <SectionLabel>How SOLVO Works</SectionLabel>
          <h2 className="font-black text-3xl mt-1" style={{ color: C.ink }}>From problem to paid — in minutes.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {[
            ["Choose a Service", "Select the type of work you need done.", "01"],
            ["Describe the Work", "Type, speak, or upload a photo of the problem.", "02"],
            ["Get Matched", "SOLVO finds verified nearby workers for you.", "03"],
            ["Worker Accepts", "The worker reviews and accepts the job.", "04"],
            ["Work Gets Done", "Track progress in real time.", "05"],
            ["Pay and Rate", "Complete payment and leave a rating.", "06"],
          ].map(([t, d, n]) => (
            <div
              key={t}
              className="rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              style={{ background: C.card, border: `1px solid ${C.line}`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
            >
              <div className="text-3xl font-black mb-3" style={{ color: C.line }}>{n}</div>
              <div className="font-bold mb-1" style={{ color: C.ink }}>{t}</div>
              <div className="text-sm leading-relaxed" style={{ color: C.muted }}>{d}</div>
            </div>
          ))}
        </div>
        {/* Worker flow pill */}
        <div
          className="rounded-2xl p-5 flex flex-wrap items-center gap-2"
          style={{ background: C.tealLight, border: `1px solid #B2E8DF` }}
        >
          <span className="text-xs font-bold tracking-widest uppercase mr-2" style={{ color: C.tealDeep }}>For Workers →</span>
          {["Available", "Receive Job", "Accept", "Complete", "Earn"].map((s, i, arr) => (
            <React.Fragment key={s}>
              <span className="px-3 py-1.5 rounded-full text-sm font-semibold" style={{ background: "#fff", color: C.tealDeep, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>{s}</span>
              {i < arr.length - 1 && <ArrowRight size={14} color={C.teal} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── Access methods ── */}
      <div id="access" style={{ background: C.bg, borderTop: `1px solid ${C.line}` }} className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <SectionLabel>Built for Real Access</SectionLabel>
            <h2 className="font-black text-3xl mt-1" style={{ color: C.ink }}>One network. Four ways in.</h2>
            <p className="mt-2 text-sm" style={{ color: C.muted }}>No smartphone required — every worker can access SOLVO.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              [Home, "Smartphone / Web", "Full app for customers, workers and admins."],
              [Mic, "Voice Assistance", "Speak to accept jobs and check earnings."],
              [Phone, "Basic Phone (IVR)", "Press 1 to accept. No internet needed."],
              [Handshake, "Community Partners", "Local NGOs help workers get onboarded."],
            ].map(([Icon, t, d]) => (
              <div
                key={t}
                className="rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                style={{ background: C.card, border: `1px solid ${C.line}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: C.tealLight }}>
                  <Icon size={20} color={C.teal} />
                </div>
                <div className="font-bold mb-1 text-sm" style={{ color: C.ink }}>{t}</div>
                <div className="text-xs leading-relaxed" style={{ color: C.muted }}>{d}</div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Btn variant="outline" icon={Phone} onClick={() => goto("access")}>See the IVR / SMS demo</Btn>
          </div>
        </div>
      </div>

      {/* ── Footer CTA ── */}
      <div className="py-20 text-center px-6" style={{ background: C.teal }}>
        <h2 className="font-black text-3xl text-white mb-3">Every Skilled Hand Deserves an Opportunity.</h2>
        <p className="text-white/80 mb-8 text-base">See the full journey — from a customer's request to a worker getting paid.</p>
        <Btn
          size="lg"
          onClick={() => goto("demo")}
          style={{ background: "#fff", color: C.teal, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
        >
          Watch the SOLVO Demo
        </Btn>
      </div>
      <div className="text-center py-5 text-xs" style={{ color: C.mutedLight, background: "#fff" }}>
        SOLVO · Work Without Barriers · MVP for Ghaziabad / Delhi NCR
      </div>
    </div>
  );
}


/* ---------------------------------------------------------------------- */
/* ROLE SELECT                                                            */
/* ---------------------------------------------------------------------- */
function RoleSelect({ goto }) {
  const roles = [
    { key: "customer", label: "I need work done", sub: "Customer", icon: Search, color: C.teal },
    { key: "worker", label: "I'm looking for work", sub: "Worker", icon: Briefcase, color: C.indigo },
    { key: "admin", label: "Platform administration", sub: "Admin", icon: LayoutDashboard, color: C.amber },
  ];
  return (
    <div style={{ background: C.bg }} className="min-h-full flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div style={{ background: C.teal }} className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
            <span style={{ color: "#fff" }} className="font-black text-2xl">S</span>
          </div>
          <h1 className="font-black text-2xl" style={{ color: C.ink }}>Continue as</h1>
          <p style={{ color: C.muted }} className="text-sm mt-1">Choose how you'd like to use SOLVO</p>
        </div>
        <div className="flex flex-col gap-3">
          {roles.map((r) => (
            <Card key={r.key} className="p-4 flex items-center gap-4" onClick={() => goto(r.key)}>
              <div style={{ background: r.color + "22" }} className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                <r.icon size={22} color={r.color} />
              </div>
              <div className="flex-1">
                <div className="font-bold">{r.label}</div>
                <div className="text-xs" style={{ color: C.muted }}>{r.sub}</div>
              </div>
              <ChevronRight size={18} color={C.muted} />
            </Card>
          ))}
        </div>
        <button onClick={() => goto("landing")} className="mt-6 text-sm font-semibold w-full text-center" style={{ color: C.muted }}>← Back to home</button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* CUSTOMER APP                                                           */
/* ---------------------------------------------------------------------- */
function CustomerApp({ goto, jobs, addJob, updateJob }) {
  const [view, setView] = useState("dashboard"); // dashboard, create, matching, tracking, bookings
  const [draft, setDraft] = useState({ category: null, workType: null, desc: "", area: null, pricing: null });
  const [step, setStep] = useState(1);
  const [activeJobId, setActiveJobId] = useState(null);
  const { profileUser, openProfile, closeProfile } = useProfileModal();
  const customerName = "Priya Sharma";

  const myJobs = jobs.filter((j) => j.customer === customerName || j.mine);

  function startCreate() { setDraft({ category: null, workType: null, desc: "", area: null, pricing: null }); setStep(1); setView("create"); }

  function submitJob() {
    const id = "j" + Math.random().toString(36).slice(2, 7);
    const newJob = {
      id, category: draft.category, customer: customerName, mine: true, area: draft.area,
      status: "REQUEST CREATED", price: draft.pricing === "quote" ? "Quote requested" : draft.pricing === "hourly" ? "₹150/hr" : draft.pricing === "daily" ? "₹800/day" : "₹600 (fixed)",
      date: "9 Sep 2026", desc: draft.desc, workType: draft.workType,
    };
    addJob(newJob);
    setActiveJobId(id);
    setView("matching");
  }

  function pickWorker(w) {
    updateJob(activeJobId, { status: "WORKER MATCHED", worker: w.name });
    setView("tracking");
    setTimeout(() => updateJob(activeJobId, { status: "WORKER ACCEPTED" }), 1800);
  }

  const activeJob = jobs.find((j) => j.id === activeJobId);
  const matchedWorkers = draft.category ? WORKERS.filter((w) => w.skill === draft.category).slice(0, 3) : WORKERS.slice(0, 3);


  return (
    <div style={{ background: C.bg }} className="min-h-full flex flex-col">
      <TopBar
        title={view === "dashboard" ? `Hi, ${customerName.split(" ")[0]}` : view === "create" ? "New Job Request" : view === "matching" ? "Matched Workers" : view === "tracking" ? "Booking Status" : "My Bookings"}
        onBack={view !== "dashboard" ? () => setView("dashboard") : undefined}
        right={<button onClick={() => goto("landing")} className="p-2 rounded-lg hover:bg-black/5"><LogOut size={18} /></button>}
      />
      <div className="flex-1 overflow-auto pb-4">
        {view === "dashboard" && (
          <div className="p-4 max-w-3xl mx-auto">
            <div className="grid grid-cols-3 gap-3 mb-5">
              <Card className="p-3 text-center">
                <div className="font-black text-xl" style={{ color: C.teal }}>{myJobs.filter((j) => j.status !== "COMPLETED" && j.status !== "PAYMENT COMPLETED").length}</div>
                <div className="text-xs" style={{ color: C.muted }}>Active</div>
              </Card>
              <Card className="p-3 text-center">
                <div className="font-black text-xl" style={{ color: C.indigo }}>{myJobs.filter((j) => j.status === "COMPLETED" || j.status === "PAYMENT COMPLETED").length}</div>
                <div className="text-xs" style={{ color: C.muted }}>Completed</div>
              </Card>
              <Card className="p-3 text-center">
                <div className="font-black text-xl" style={{ color: "#9A5F0F" }}>{myJobs.length}</div>
                <div className="text-xs" style={{ color: C.muted }}>Total</div>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <Card className="p-4 flex flex-col gap-2" onClick={startCreate} style={{ background: C.indigo }}>
                <Wrench size={22} color={C.amber} />
                <span className="font-bold text-white text-sm">Book a Professional</span>
              </Card>
              <Card className="p-4 flex flex-col gap-2" onClick={startCreate} style={{ background: C.teal }}>
                <HardHat size={22} color="#fff" />
                <span className="font-bold text-white text-sm">Hire Workers</span>
              </Card>
              <Card className="p-4 flex flex-col gap-2" onClick={startCreate}>
                <Mic size={22} color={C.indigo} />
                <span className="font-bold text-sm">Describe Work by Voice</span>
              </Card>
              <Card className="p-4 flex flex-col gap-2" onClick={() => setView("bookings")}>
                <Briefcase size={22} color={C.teal} />
                <span className="font-bold text-sm">My Bookings</span>
              </Card>
            </div>

            <div className="font-bold mb-2">Recent activity</div>
            <div className="flex flex-col gap-2">
              {myJobs.slice(0, 4).map((j) => {
                const Icon = catIcon(j.category);
                return (
                  <Card key={j.id} className="p-3 flex items-center gap-3" onClick={() => { setActiveJobId(j.id); setView("tracking"); }}>
                    <div style={{ background: "#F0F1ED" }} className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"><Icon size={18} color={C.indigo} /></div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate">{catName(j.category)} · {j.area}</div>
                      <div className="text-xs" style={{ color: C.muted }}>{j.worker ? `Worker: ${j.worker}` : "Awaiting match"}</div>
                    </div>
                    <Badge tone={j.status === "COMPLETED" || j.status === "PAYMENT COMPLETED" ? "teal" : "amber"}>{j.status}</Badge>
                  </Card>
                );
              })}
              {myJobs.length === 0 && <div className="text-sm text-center py-6" style={{ color: C.muted }}>No bookings yet. Tap "Book a Professional" to get started.</div>}
            </div>
          </div>
        )}

        {view === "create" && (
          <CreateJobFlow draft={draft} setDraft={setDraft} step={step} setStep={setStep} onSubmit={submitJob} />
        )}

        {view === "matching" && (
          <>
            <div className="p-4 max-w-3xl mx-auto">
              <div className="rounded-xl p-3 mb-4 text-sm" style={{ background: "#E7EAF3", color: C.indigo }}>
                Recommended based on skills, availability, service area, pricing preferences, and work history.
              </div>
              <div className="flex flex-col gap-3">
                {matchedWorkers.map((w, i) => (
                  <Card key={w.id} className="p-4">
                    <div className="flex gap-3">
                      <Avatar name={w.name} color={w.avatarColor} profilePic={w.profilePic} onClick={() => openProfile(w)} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <button onClick={() => openProfile(w)} className="font-bold hover:underline text-left" style={{ color: C.ink }}>{w.name}</button>
                          {i === 0 && <Badge tone="amber">Best Match</Badge>}
                        </div>
                        <div className="text-sm" style={{ color: C.muted }}>{catName(w.skill)} · {w.exp} experience</div>
                        <div className="flex flex-wrap gap-3 mt-2 text-xs" style={{ color: C.muted }}>
                          <span className="flex items-center gap-1"><MapPin size={12} />{w.area}</span>
                          <span className="flex items-center gap-1"><IndianRupee size={12} />{w.rate}</span>
                          <span className="flex items-center gap-1"><Star size={12} fill={C.amber} color={C.amber} />{w.rating} ({w.jobs} jobs)</span>
                        </div>
                        <div className="flex gap-1.5 mt-2 flex-wrap">
                          {w.badges.includes("identity") && <Badge tone="indigo">✓ Identity Confirmed</Badge>}
                          {w.badges.includes("skill") && <Badge tone="teal">✓ Skill Confirmed</Badge>}
                          {w.badges.includes("community") && <Badge tone="amber">★ Community Trusted</Badge>}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Btn variant="ghost" onClick={() => openProfile(w)}>View Profile</Btn>
                      <Btn full variant="teal" onClick={() => pickWorker(w)}>Select {w.name.split(" ")[0]}</Btn>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            {profileUser && <ProfileModal user={profileUser} onClose={closeProfile} />}
          </>
        )}




        {view === "tracking" && activeJob && (
          <div className="p-4 max-w-3xl mx-auto">
            <Card className="p-4 mb-4">
              <div className="flex items-center gap-3 mb-1">
                {React.createElement(catIcon(activeJob.category), { size: 20, color: C.indigo })}
                <div className="font-bold">{catName(activeJob.category)}</div>
              </div>
              <div className="text-sm" style={{ color: C.muted }}>{activeJob.area} · {activeJob.price}</div>
              {activeJob.worker && <div className="text-sm mt-1 font-semibold">Worker: {activeJob.worker}</div>}
            </Card>
            <Card className="p-4 mb-4">
              <ProgressTimeline status={activeJob.status} />
            </Card>
            {activeJob.status === "WORKER ACCEPTED" && (
              <Btn full variant="outline" onClick={() => updateJob(activeJob.id, { status: "WORK IN PROGRESS" })}>Simulate: Worker starts work</Btn>
            )}
            {activeJob.status === "WORK IN PROGRESS" && (
              <Btn full variant="teal" onClick={() => updateJob(activeJob.id, { status: "COMPLETED" })}>Confirm work completed</Btn>
            )}
            {activeJob.status === "COMPLETED" && (
              <Btn full variant="primary" onClick={() => updateJob(activeJob.id, { status: "PAYMENT COMPLETED" })}>Complete payment (simulated)</Btn>
            )}
            {activeJob.status === "PAYMENT COMPLETED" && !activeJob.rated && (
              <RateWorker onRate={(r) => updateJob(activeJob.id, { rated: true, rating: r })} />
            )}
            {activeJob.rated && (
              <Card className="p-4 text-center"><div className="font-bold" style={{ color: C.teal }}>Thanks — your rating has been recorded.</div></Card>
            )}
          </div>
        )}

        {view === "bookings" && (
          <div className="p-4 max-w-3xl mx-auto flex flex-col gap-2">
            {myJobs.map((j) => (
              <Card key={j.id} className="p-3 flex items-center gap-3" onClick={() => { setActiveJobId(j.id); setView("tracking"); }}>
                <div style={{ background: "#F0F1ED" }} className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0">{React.createElement(catIcon(j.category), { size: 18, color: C.indigo })}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{catName(j.category)} · {j.area}</div>
                  <div className="text-xs" style={{ color: C.muted }}>{j.date}</div>
                </div>
                <Badge tone={j.status === "COMPLETED" || j.status === "PAYMENT COMPLETED" ? "teal" : "amber"}>{j.status}</Badge>
              </Card>
            ))}
          </div>
        )}
      </div>
      {view === "dashboard" || view === "bookings" ? (
        <BottomNav
          active={view === "dashboard" ? "home" : "bookings"}
          onChange={(k) => setView(k === "home" ? "dashboard" : k === "bookings" ? "bookings" : "dashboard")}
          items={[
            { key: "home", label: "Home", icon: Home },
            { key: "book", label: "Book", icon: Search },
            { key: "bookings", label: "My Jobs", icon: Briefcase },
            { key: "messages", label: "Messages", icon: MessageCircle },
            { key: "profile", label: "Profile", icon: User },
          ]}
        />
      ) : null}
    </div>
  );
}

function RateWorker({ onRate }) {
  const [stars, setStars] = useState(0);
  const [tags, setTags] = useState([]);
  const toggle = (t) => setTags((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));
  return (
    <Card className="p-4">
      <div className="font-bold mb-2">Rate your experience</div>
      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <button key={i} onClick={() => setStars(i)}>
            <Star size={28} fill={i <= stars ? C.amber : "none"} color={C.amber} />
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {["Punctuality", "Work quality", "Communication", "Professionalism"].map((t) => (
          <button key={t} onClick={() => toggle(t)} className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: tags.includes(t) ? C.teal : "#EEEFEC", color: tags.includes(t) ? "#fff" : C.muted }}>{t}</button>
        ))}
      </div>
      <Btn full variant="teal" disabled={!stars} onClick={() => onRate(stars)}>Submit rating</Btn>
    </Card>
  );
}

function CreateJobFlow({ draft, setDraft, step, setStep, onSubmit }) {
  const total = 5;
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex gap-1.5 mb-5">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{ background: i < step ? C.teal : C.line }} className="h-1.5 flex-1 rounded-full" />
        ))}
      </div>

      {step === 1 && (
        <div>
          <div className="font-bold text-lg mb-3">Select a category</div>
          <div className="grid grid-cols-3 gap-3">
            {ALL_CATEGORIES.map((c) => (
              <Card key={c.id} className="p-3 flex flex-col items-center gap-2 text-center" style={draft.category === c.id ? { borderColor: C.teal, background: "#F0FAF8" } : {}} onClick={() => setDraft((d) => ({ ...d, category: c.id }))}>
                <c.icon size={22} color={C.indigo} />
                <span className="text-xs font-semibold">{c.name}</span>
              </Card>
            ))}
          </div>
          <Btn full className="mt-6" disabled={!draft.category} onClick={() => setStep(2)}>Continue</Btn>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="font-bold text-lg mb-3">Choose work type</div>
          <div className="flex flex-col gap-3">
            <Card className="p-4" style={draft.workType === "urgent" ? { borderColor: C.amber, background: "#FCF3E6" } : {}} onClick={() => setDraft((d) => ({ ...d, workType: "urgent" }))}>
              <div className="flex items-center gap-2 font-bold"><Zap size={18} color="#9A5F0F" /> Urgent</div>
              <div className="text-sm mt-1" style={{ color: C.muted }}>Need someone as soon as possible.</div>
            </Card>
            <Card className="p-4" style={draft.workType === "scheduled" ? { borderColor: C.teal, background: "#F0FAF8" } : {}} onClick={() => setDraft((d) => ({ ...d, workType: "scheduled" }))}>
              <div className="flex items-center gap-2 font-bold"><Clock size={18} color={C.tealDeep} /> Scheduled</div>
              <div className="text-sm mt-1" style={{ color: C.muted }}>Choose a preferred date and time.</div>
            </Card>
          </div>
          <div className="flex gap-3 mt-6">
            <Btn variant="ghost" onClick={() => setStep(1)}>Back</Btn>
            <Btn full disabled={!draft.workType} onClick={() => setStep(3)}>Continue</Btn>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="font-bold text-lg mb-3">Describe the job</div>
          <textarea
            value={draft.desc}
            onChange={(e) => setDraft((d) => ({ ...d, desc: e.target.value }))}
            placeholder='e.g. "My kitchen sink is leaking."'
            className="w-full rounded-xl p-3 text-sm outline-none"
            style={{ border: `1px solid ${C.line}`, minHeight: 90 }}
          />
          <div className="flex gap-3 mt-3">
            <VoiceDescribeButton onResult={(text) => setDraft((d) => ({ ...d, desc: (d.desc ? d.desc + " " : "") + text }))} />
            <button className="flex-1 rounded-xl p-3 flex flex-col items-center gap-1 text-xs font-semibold" style={{ border: `1px dashed ${C.line}`, color: C.muted }}>
              <Camera size={20} /> Upload photo
            </button>
          </div>
          <div className="flex gap-3 mt-6">
            <Btn variant="ghost" onClick={() => setStep(2)}>Back</Btn>
            <Btn full disabled={!draft.desc} onClick={() => setStep(4)}>Continue</Btn>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <div className="font-bold text-lg mb-3">Location</div>
          <div className="text-sm mb-3" style={{ color: C.muted }}>Select your approximate service area — no continuous GPS tracking needed.</div>
          <div className="grid grid-cols-2 gap-2">
            {AREAS.map((a) => (
              <button key={a} onClick={() => setDraft((d) => ({ ...d, area: a }))} className="rounded-xl p-3 text-sm font-semibold text-left flex items-center gap-2" style={{ border: `1.5px solid ${draft.area === a ? C.teal : C.line}`, background: draft.area === a ? "#F0FAF8" : "#fff" }}>
                <MapPin size={15} color={draft.area === a ? C.teal : C.muted} /> {a}
              </button>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <Btn variant="ghost" onClick={() => setStep(3)}>Back</Btn>
            <Btn full disabled={!draft.area} onClick={() => setStep(5)}>Continue</Btn>
          </div>
        </div>
      )}

      {step === 5 && (
        <div>
          <div className="font-bold text-lg mb-3">Pricing preference</div>
          <div className="grid grid-cols-2 gap-3">
            {[["fixed", "Fixed Price"], ["quote", "Request Quotations"], ["hourly", "Hourly Rate"], ["daily", "Daily Rate"]].map(([k, l]) => (
              <button key={k} onClick={() => setDraft((d) => ({ ...d, pricing: k }))} className="rounded-xl p-4 text-sm font-bold" style={{ border: `1.5px solid ${draft.pricing === k ? C.teal : C.line}`, background: draft.pricing === k ? "#F0FAF8" : "#fff" }}>{l}</button>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <Btn variant="ghost" onClick={() => setStep(4)}>Back</Btn>
            <Btn full variant="teal" disabled={!draft.pricing} onClick={onSubmit}>Find Workers</Btn>
          </div>
        </div>
      )}
    </div>
  );
}

function VoiceDescribeButton({ onResult }) {
  const [listening, setListening] = useState(false);
  function simulate() {
    setListening(true);
    setTimeout(() => {
      setListening(false);
      onResult("Fan and lights in one room are not working since morning.");
    }, 1600);
  }
  return (
    <button onClick={simulate} className="flex-1 rounded-xl p-3 flex flex-col items-center gap-1 text-xs font-semibold" style={{ border: `1px solid ${listening ? C.teal : C.line}`, color: listening ? C.teal : C.muted, background: listening ? "#F0FAF8" : "#fff" }}>
      <Mic size={20} className={listening ? "animate-pulse" : ""} /> {listening ? "Listening…" : "Speak description"}
    </button>
  );
}

/* ---------------------------------------------------------------------- */
/* WORKER APP                                                             */
/* ---------------------------------------------------------------------- */
function WorkerApp({ goto, jobs, updateJob, addJob }) {
  const [view, setView] = useState("home");
  const [available, setAvailable] = useState(true);
  const [lang, setLang] = useState("hi");
  const [voiceOpen, setVoiceOpen] = useState(false);
  const worker = { name: "Rahul Kumar", skill: "electrician", jobs: 42, rating: 4.7, reliability: 92, avatarColor: C.teal };
  const t = T[lang];

  const newOpps = jobs.filter((j) => j.status === "WORKER MATCHED" && j.category === worker.skill);
  const activeJob = jobs.find((j) => j.worker === worker.name && ["WORKER ACCEPTED", "WORK IN PROGRESS"].includes(j.status));

  return (
    <div style={{ background: "#12151C" }} className="min-h-full flex flex-col text-white">
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3" style={{ background: "#1A1E28", borderBottom: "1px solid #262B36" }}>
        <div className="flex items-center gap-2">
          <Avatar name={worker.name} color={worker.avatarColor} size={36} />
          <div>
            <div className="font-bold text-sm leading-tight">{worker.name}</div>
            <div className="text-[11px] text-white/50">{catName(worker.skill)}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="text-xs rounded-lg px-2 py-1.5 font-bold" style={{ background: "#262B36", color: "#fff", border: "none" }}>
            <option value="en">EN</option>
            <option value="hi">हिं</option>
            <option value="hinglish">Hinglish</option>
          </select>
          <button onClick={() => goto("landing")} className="p-2 rounded-lg" style={{ background: "#262B36" }}><LogOut size={16} /></button>
        </div>
      </div>

      <div className="flex-1 overflow-auto pb-6">
        {view === "home" && (
          <div className="p-4 max-w-2xl mx-auto">
            <button
              onClick={() => setAvailable((a) => !a)}
              className="w-full rounded-2xl py-6 flex flex-col items-center gap-2 mb-5"
              style={{ background: available ? C.teal : "#3A2020" }}
            >
              <CircleDot size={30} color={available ? "#fff" : "#F08072"} />
              <span className="font-black text-2xl">{available ? `🟢 ${t.available}` : `🔴 ${t.notAvailable}`}</span>
              <span className="text-xs text-white/70">Tap to change</span>
            </button>

            <button onClick={() => setVoiceOpen(true)} className="w-full rounded-2xl p-4 flex items-center gap-3 mb-5" style={{ background: "#1A1E28", border: "1px solid #262B36" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: C.amber }}><Mic size={20} color="#1a1200" /></div>
              <span className="font-bold">{t.voice}</span>
              <ChevronRight size={18} className="ml-auto text-white/40" />
            </button>

            {activeJob && (
              <Card style={{ background: "#1A1E28", border: "1px solid #262B36" }} className="p-4 mb-5">
                <div className="text-xs font-bold mb-2" style={{ color: C.amber }}>CURRENT JOB — {activeJob.status}</div>
                <div className="font-black text-lg">{catName(activeJob.category)}</div>
                <div className="text-sm text-white/60 flex items-center gap-1 mt-1"><MapPin size={13} /> {activeJob.area} · <IndianRupee size={13} />{activeJob.price}</div>
                {activeJob.status === "WORKER ACCEPTED" && (
                  <Btn full variant="teal" size="lg" className="mt-4" onClick={() => updateJob(activeJob.id, { status: "WORK IN PROGRESS" })}>Start Work</Btn>
                )}
                {activeJob.status === "WORK IN PROGRESS" && (
                  <Btn full variant="amber" size="lg" className="mt-4" onClick={() => updateJob(activeJob.id, { status: "COMPLETED" })}>{t.markComplete}</Btn>
                )}
              </Card>
            )}

            <div className="font-black text-lg mb-3">{t.newOpportunities}</div>
            <div className="flex flex-col gap-3">
              {newOpps.length === 0 && <div className="text-sm text-white/40 text-center py-8">No new opportunities right now.</div>}
              {newOpps.map((j) => (
                <Card key={j.id} style={{ background: "#1A1E28", border: "1px solid #262B36" }} className="p-4">
                  <div className="flex items-center gap-2 font-black text-xl mb-1">
                    {React.createElement(catIcon(j.category), { size: 22, color: C.amber })} {catName(j.category)}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/70 mb-4">
                    <span className="flex items-center gap-1"><MapPin size={14} /> {j.area}</span>
                    <span className="flex items-center gap-1"><IndianRupee size={14} /> {j.price}</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> Today</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Btn variant="teal" size="lg" onClick={() => updateJob(j.id, { status: "WORKER ACCEPTED" })}>{t.accept}</Btn>
                    <Btn variant="danger" size="lg" onClick={() => updateJob(j.id, { status: "REQUEST CREATED", worker: null })}>{t.decline}</Btn>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {view === "opportunities" && (
          <div className="p-4 max-w-2xl mx-auto">
            <div className="font-black text-lg mb-3">All opportunities</div>
            <div className="flex flex-col gap-3">
              {jobs.filter((j) => j.category === worker.skill).map((j) => (
                <Card key={j.id} style={{ background: "#1A1E28", border: "1px solid #262B36" }} className="p-4">
                  <div className="font-bold">{catName(j.category)} · {j.area}</div>
                  <div className="text-xs text-white/50 mt-1">{j.status}</div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {view === "earnings" && <EarningsView t={t} />}

        {view === "profile" && <WorkerProfileView worker={worker} />}
      </div>

      <BottomNav
        active={view}
        onChange={setView}
        items={[
          { key: "home", label: t.home, icon: Home },
          { key: "opportunities", label: t.opportunities, icon: Briefcase },
          { key: "earnings", label: t.earnings, icon: IndianRupee },
          { key: "profile", label: t.profile, icon: User },
        ]}
      />

      {voiceOpen && <VoiceAssistantModal onClose={() => setVoiceOpen(false)} setLang={setLang} setView={setView} setAvailable={setAvailable} />}
    </div>
  );
}

function EarningsView({ t }) {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="grid grid-cols-3 gap-3 mb-5">
        <Card style={{ background: "#1A1E28", border: "1px solid #262B36" }} className="p-3 text-center">
          <div className="text-xs text-white/50 mb-1">{t.today}</div>
          <div className="font-black text-lg" style={{ color: C.teal }}>₹850</div>
        </Card>
        <Card style={{ background: "#1A1E28", border: "1px solid #262B36" }} className="p-3 text-center">
          <div className="text-xs text-white/50 mb-1">{t.week}</div>
          <div className="font-black text-lg" style={{ color: C.amber }}>₹4,200</div>
        </Card>
        <Card style={{ background: "#1A1E28", border: "1px solid #262B36" }} className="p-3 text-center">
          <div className="text-xs text-white/50 mb-1">{t.month}</div>
          <div className="font-black text-lg text-white">₹14,800</div>
        </Card>
      </div>
      <Card style={{ background: "#1A1E28", border: "1px solid #262B36" }} className="p-4 mb-4">
        <div className="font-bold mb-3">Last 7 days</div>
        <div className="flex items-end gap-2 h-28">
          {[600, 850, 400, 900, 700, 500, 850].map((v, i) => (
            <div key={i} className="flex-1 rounded-t-md" style={{ height: `${(v / 900) * 100}%`, background: C.teal }} />
          ))}
        </div>
      </Card>
      <div className="font-bold mb-2">Payment history</div>
      <div className="flex flex-col gap-2">
        {[["Electrical Repair · Indirapuram", "₹700", "Paid"], ["Switchboard fix · Vaishali", "₹450", "Paid"], ["Wiring inspection · Kaushambi", "₹300", "Pending"]].map(([l, a, s]) => (
          <Card key={l} style={{ background: "#1A1E28", border: "1px solid #262B36" }} className="p-3 flex items-center justify-between">
            <span className="text-sm">{l}</span>
            <div className="text-right">
              <div className="font-bold text-sm">{a}</div>
              <Badge tone={s === "Paid" ? "teal" : "amber"}>{s}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function WorkerProfileView({ worker }) {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <Avatar name={worker.name} color={worker.avatarColor} size={64} />
        <div>
          <div className="font-black text-xl">{worker.name}</div>
          <div className="text-sm text-white/50">{catName(worker.skill)} · Indirapuram</div>
        </div>
      </div>
      <div className="font-bold mb-2">My Work Identity</div>
      <div className="grid grid-cols-3 gap-3 mb-5">
        <Card style={{ background: "#1A1E28", border: "1px solid #262B36" }} className="p-3 text-center">
          <div className="font-black text-xl" style={{ color: C.teal }}>{worker.jobs}</div>
          <div className="text-xs text-white/50">Jobs Completed</div>
        </Card>
        <Card style={{ background: "#1A1E28", border: "1px solid #262B36" }} className="p-3 text-center">
          <div className="font-black text-xl" style={{ color: C.amber }}>{worker.rating}</div>
          <div className="text-xs text-white/50">Customer Rating</div>
        </Card>
        <Card style={{ background: "#1A1E28", border: "1px solid #262B36" }} className="p-3 text-center">
          <div className="font-black text-xl text-white">{worker.reliability}%</div>
          <div className="text-xs text-white/50">Reliability</div>
        </Card>
      </div>
      <div className="text-xs text-white/40 mb-5">Reliability score is based on platform work activity and is not a guarantee of future performance.</div>

      <div className="font-bold mb-2">Skills</div>
      <div className="flex flex-wrap gap-2 mb-5">
        {["Electrical Repair", "Wiring", "Switchboard Installation"].map((s) => <Badge key={s} tone="teal">{s}</Badge>)}
      </div>

      <div className="font-bold mb-2">Work history</div>
      <div className="flex flex-col gap-2 mb-5">
        <Card style={{ background: "#1A1E28", border: "1px solid #262B36" }} className="p-3">
          <div className="font-semibold text-sm">House Wiring Repair</div>
          <div className="text-xs text-white/50">Customer: Verified Customer · Completed August 2026</div>
          <div className="mt-1 flex gap-0.5">{[1, 2, 3, 4, 5].map((i) => <Star key={i} size={13} fill={C.amber} color={C.amber} />)}</div>
        </Card>
      </div>

      <div className="font-bold mb-2">Expected earnings</div>
      <div className="grid grid-cols-3 gap-2 mb-5">
        {[["Hourly", "₹150"], ["Daily", "₹1,200"], ["Visit fee", "₹100"]].map(([l, v]) => (
          <Card key={l} style={{ background: "#1A1E28", border: "1px solid #262B36" }} className="p-3 text-center">
            <div className="text-xs text-white/50">{l}</div>
            <div className="font-bold">{v}</div>
          </Card>
        ))}
      </div>
      <div className="text-xs text-white/40">You set your own rates — SOLVO shows them to customers as-is.</div>
    </div>
  );
}

function VoiceAssistantModal({ onClose, setLang, setView, setAvailable }) {
  const [transcript, setTranscript] = useState([]);
  const commands = [
    { label: "Show available work", act: () => { setView("home"); log("Showing available work near you."); } },
    { label: "Accept this job", act: () => log("Please open a job card and tap Accept.") },
    { label: "My earnings", act: () => { setView("earnings"); log("Opening your earnings."); } },
    { label: "Change availability", act: () => { setAvailable((a) => !a); log("Availability updated."); } },
    { label: "Hindi language", act: () => { setLang("hi"); log("भाषा हिंदी में बदल दी गई है।"); } },
  ];
  function log(reply) { setTranscript((t) => [...t, reply]); }
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" style={{ background: "rgba(0,0,0,0.6)" }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl p-5" style={{ background: "#1A1E28", color: "#fff" }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 font-bold"><Mic size={18} color={C.amber} /> Voice Assistance</div>
          <button onClick={onClose}><X size={18} /></button>
        </div>
        <div className="text-xs text-white/50 mb-3">Tap a command to simulate speaking it.</div>
        <div className="flex flex-col gap-2 mb-4">
          {commands.map((c) => (
            <button key={c.label} onClick={c.act} className="text-left rounded-xl px-4 py-3 text-sm font-semibold" style={{ background: "#262B36" }}>"{c.label}"</button>
          ))}
        </div>
        {transcript.length > 0 && (
          <div className="rounded-xl p-3 text-sm" style={{ background: "#262B36" }}>
            {transcript.map((t, i) => <div key={i} className="flex gap-2 items-start mb-1 last:mb-0"><Volume2 size={14} className="mt-0.5 shrink-0" color={C.teal} /><span>{t}</span></div>)}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* ADMIN APP                                                              */
/* ---------------------------------------------------------------------- */
function AdminApp({ goto, jobs }) {
  const [view, setView] = useState("overview");
  const { profileUser: adminProfileUser, openProfile: adminOpenProfile, closeProfile: adminCloseProfile } = useProfileModal();
  const nav = [
    { key: "overview", label: "Dashboard", icon: LayoutDashboard },
    { key: "workers", label: "Workers", icon: HardHat },
    { key: "jobs", label: "Jobs", icon: Briefcase },
    { key: "partners", label: "Partners", icon: Handshake },
  ];
  const catCounts = ALL_CATEGORIES.map((c) => ({ ...c, count: jobs.filter((j) => j.category === c.id).length }));


  return (
    <div style={{ background: C.bg }} className="min-h-full flex">
      <div className="hidden md:flex flex-col w-56 p-4 gap-1" style={{ background: C.indigoDeep }}>
        <div className="flex items-center gap-2 px-2 py-3 mb-3">
          <div style={{ background: C.amber }} className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-indigo-950">S</div>
          <span className="text-white font-black">SOLVO Admin</span>
        </div>
        {nav.map((n) => (
          <button key={n.key} onClick={() => setView(n.key)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold" style={{ background: view === n.key ? "rgba(255,255,255,0.1)" : "transparent", color: view === n.key ? "#fff" : "rgba(255,255,255,0.6)" }}>
            <n.icon size={17} /> {n.label}
          </button>
        ))}
        <button onClick={() => goto("landing")} className="mt-auto flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-white/50"><LogOut size={17} /> Exit</button>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title={nav.find((n) => n.key === view).label} right={<button onClick={() => goto("landing")} className="md:hidden p-2 rounded-lg hover:bg-black/5"><LogOut size={18} /></button>} />
        <div className="flex-1 overflow-auto p-4 max-w-5xl w-full mx-auto">
          {view === "overview" && (
            <div>
              <div className="grid sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
                {[
                  ["Total Customers", CUSTOMERS.length, C.indigo],
                  ["Total Workers", WORKERS.length, C.teal],
                  ["Active Jobs", jobs.filter((j) => !["COMPLETED", "PAYMENT COMPLETED"].includes(j.status)).length, "#9A5F0F"],
                  ["Completed Jobs", jobs.filter((j) => ["COMPLETED", "PAYMENT COMPLETED"].includes(j.status)).length, C.teal],
                  ["New Registrations", 6, C.indigo],
                ].map(([l, v, color]) => (
                  <Card key={l} className="p-4">
                    <div className="font-black text-2xl" style={{ color }}>{v}</div>
                    <div className="text-xs mt-1" style={{ color: C.muted }}>{l}</div>
                  </Card>
                ))}
              </div>
              <Card className="p-4">
                <div className="font-bold mb-3">Jobs by category</div>
                <div className="flex flex-col gap-2">
                  {catCounts.filter((c) => c.count > 0 || true).slice(0, 8).map((c) => (
                    <div key={c.id} className="flex items-center gap-3">
                      <c.icon size={16} color={C.indigo} />
                      <span className="text-sm flex-1">{c.name}</span>
                      <div className="w-40 h-2 rounded-full" style={{ background: "#EEEFEC" }}>
                        <div className="h-2 rounded-full" style={{ width: `${Math.min(100, c.count * 30 + 6)}%`, background: C.teal }} />
                      </div>
                      <span className="text-xs font-bold w-5 text-right">{c.count}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {view === "workers" && (
            <>
              <div className="flex flex-col gap-2">
                {WORKERS.map((w) => (
                  <Card key={w.id} className="p-3 flex items-center gap-3">
                    <Avatar name={w.name} color={w.avatarColor} profilePic={w.profilePic} size={40} onClick={() => adminOpenProfile(w)} />
                    <div className="flex-1 min-w-0">
                      <button onClick={() => adminOpenProfile(w)} className="font-semibold text-sm hover:underline text-left" style={{ color: C.ink }}>{w.name}</button>
                      <div className="text-xs" style={{ color: C.muted }}>{catName(w.skill)} · {w.area} · {w.jobs} jobs</div>
                    </div>
                    <div className="hidden sm:flex gap-1.5">
                      {w.badges.includes("identity") && <Badge tone="indigo">Identity</Badge>}
                      {w.badges.includes("skill") && <Badge tone="teal">Skill</Badge>}
                      {w.badges.includes("community") && <Badge tone="amber">Trusted</Badge>}
                    </div>
                    <Badge tone="grey"><Star size={11} fill={C.amber} color={C.amber} />{w.rating}</Badge>
                    <button onClick={() => adminOpenProfile(w)} className="text-xs font-semibold px-3 py-1.5 rounded-full transition-colors hover:bg-slate-100" style={{ color: C.teal, border: `1px solid ${C.line}` }}>Profile</button>
                  </Card>
                ))}
              </div>
              {adminProfileUser && <ProfileModal user={adminProfileUser} onClose={adminCloseProfile} />}
            </>
          )}


          {view === "jobs" && (
            <div className="flex flex-col gap-2">
              {jobs.map((j) => (
                <Card key={j.id} className="p-3 flex items-center gap-3">
                  {React.createElement(catIcon(j.category), { size: 18, color: C.indigo })}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">{catName(j.category)} · {j.customer}</div>
                    <div className="text-xs" style={{ color: C.muted }}>{j.area} {j.worker ? `· Worker: ${j.worker}` : ""}</div>
                  </div>
                  <Badge tone={["COMPLETED", "PAYMENT COMPLETED"].includes(j.status) ? "teal" : "amber"}>{j.status}</Badge>
                </Card>
              ))}
            </div>
          )}

          {view === "partners" && (
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                ["Ghaziabad Skill Mission", "Skill training centre", "34 workers onboarded"],
                ["Nav Kiran NGO", "Community organisation", "21 workers onboarded"],
                ["Indirapuram Seva Kendra", "Community centre", "17 workers onboarded"],
                ["Kaushambi Employment Cell", "Local employment org.", "12 workers onboarded"],
              ].map(([n, type, stat]) => (
                <Card key={n} className="p-4">
                  <div className="font-bold">{n}</div>
                  <div className="text-xs mb-2" style={{ color: C.muted }}>{type}</div>
                  <Badge tone="teal">{stat}</Badge>
                  <div className="text-xs mt-2" style={{ color: C.muted }}>Helps workers create profiles, add skills, select work areas, and understand voice / basic-phone access.</div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* SOLVO ACCESS — IVR / SMS / VOICE demo                                  */
/* ---------------------------------------------------------------------- */
function AccessDemo({ goto }) {
  const [ivrState, setIvrState] = useState("ringing"); // ringing, accepted, declined
  const [smsState, setSmsState] = useState("waiting");

  return (
    <div style={{ background: C.bg }} className="min-h-full">
      <TopBar title="SOLVO Access" onBack={() => goto("landing")} />
      <div className="max-w-4xl mx-auto p-4">
        <p className="text-sm mb-6" style={{ color: C.muted }}>Workers without a smartphone can still accept SOLVO jobs — through a phone call, an SMS, or with help from a community partner. All three update the same worker profile as the app.</p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* IVR phone mock */}
          <div>
            <div className="font-bold mb-3 flex items-center gap-2"><PhoneCall size={18} color={C.indigo} /> Incoming SOLVO Call</div>
            <div className="mx-auto rounded-[2rem] p-4" style={{ background: "#1A1E28", width: 280 }}>
              <div className="rounded-2xl p-5 text-white text-center" style={{ background: "#262B36", minHeight: 340 }}>
                {ivrState === "ringing" && (
                  <>
                    <div className="text-xs text-white/50 mb-6">📞 Incoming Call</div>
                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: C.teal }}><Phone size={26} /></div>
                    <div className="font-bold mb-1">SOLVO</div>
                    <div className="text-xs text-white/50 mb-6">Voice job alert</div>
                    <div className="text-sm text-left rounded-xl p-3 mb-6" style={{ background: "#151922" }}>
                      "Namaste. Aapke area mein electrician ka kaam available hai. Kaam Indirapuram mein hai. Payment ₹700 hai. Accept karne ke liye 1 dabayein. Mana karne ke liye 2 dabayein."
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setIvrState("accepted")} className="flex-1 rounded-xl py-3 font-bold text-sm" style={{ background: C.teal }}>Press 1 – Accept</button>
                      <button onClick={() => setIvrState("declined")} className="flex-1 rounded-xl py-3 font-bold text-sm" style={{ background: "#B23A2E" }}>Press 2 – Decline</button>
                    </div>
                  </>
                )}
                {ivrState === "accepted" && (
                  <div className="flex flex-col items-center justify-center h-full pt-16">
                    <CheckCircle2 size={40} color={C.teal} className="mb-3" />
                    <div className="font-bold">Job Accepted</div>
                    <div className="text-xs text-white/50 mt-1">"Dhanyavaad. Kaam confirm ho gaya hai."</div>
                    <button onClick={() => setIvrState("ringing")} className="mt-8 text-xs text-white/40 underline">Reset demo</button>
                  </div>
                )}
                {ivrState === "declined" && (
                  <div className="flex flex-col items-center justify-center h-full pt-16">
                    <X size={40} color="#F08072" className="mb-3" />
                    <div className="font-bold">Job Declined</div>
                    <div className="text-xs text-white/50 mt-1">"Theek hai. Agla kaam milte hi call karenge."</div>
                    <button onClick={() => setIvrState("ringing")} className="mt-8 text-xs text-white/40 underline">Reset demo</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SMS mock */}
          <div>
            <div className="font-bold mb-3 flex items-center gap-2"><MessageSquare size={18} color={C.indigo} /> SMS Alert</div>
            <div className="mx-auto rounded-[2rem] p-4" style={{ background: "#1A1E28", width: 280 }}>
              <div className="rounded-2xl p-4" style={{ background: "#EDEDED", minHeight: 340 }}>
                <div className="text-[10px] text-center text-gray-500 mb-3">SOLVO • now</div>
                <div className="rounded-2xl rounded-tl-sm p-3 mb-3 text-sm" style={{ background: "#fff" }}>
                  <div className="font-bold text-xs mb-1">SOLVO ALERT</div>
                  Electrician work available near Indirapuram. Expected payment ₹700. Reply YES to accept or NO to decline.
                </div>
                {smsState === "waiting" && (
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => setSmsState("yes")} className="rounded-2xl rounded-tr-sm px-4 py-2 text-sm font-bold text-white" style={{ background: C.teal }}>YES</button>
                    <button onClick={() => setSmsState("no")} className="rounded-2xl rounded-tr-sm px-4 py-2 text-sm font-bold text-white" style={{ background: "#B23A2E" }}>NO</button>
                  </div>
                )}
                {smsState === "yes" && (
                  <>
                    <div className="flex justify-end mb-2"><div className="rounded-2xl rounded-tr-sm px-3 py-2 text-sm text-white" style={{ background: C.teal }}>YES</div></div>
                    <div className="rounded-2xl rounded-tl-sm p-3 text-sm" style={{ background: "#fff" }}>Job confirmed. Rahul, please reach Indirapuram today. — SOLVO</div>
                  </>
                )}
                {smsState === "no" && (
                  <>
                    <div className="flex justify-end mb-2"><div className="rounded-2xl rounded-tr-sm px-3 py-2 text-sm text-white" style={{ background: "#B23A2E" }}>NO</div></div>
                    <div className="rounded-2xl rounded-tl-sm p-3 text-sm" style={{ background: "#fff" }}>No problem — we'll send the next matching job. — SOLVO</div>
                  </>
                )}
                {smsState !== "waiting" && <button onClick={() => setSmsState("waiting")} className="mt-3 text-xs text-gray-400 underline block mx-auto">Reset demo</button>}
              </div>
            </div>
          </div>
        </div>

        <Card className="p-4 mt-6 flex items-start gap-3">
          <Handshake size={20} color={C.teal} className="shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-sm mb-1">Assisted Onboarding</div>
            <div className="text-sm" style={{ color: C.muted }}>Local partners — NGOs, community centres, skill training centres — help workers who need it create a profile in person, add skills, select work areas, and understand voice or basic-phone access. See these partners in the Admin dashboard.</div>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* DEMO JOURNEY — Priya Sharma ↔ Rahul Kumar                              */
/* ---------------------------------------------------------------------- */
function DemoJourney({ goto }) {
  const [step, setStep] = useState(0);
  const [jobs, setJobs] = useState(3);
  const [rating, setRating] = useState(4.7);

  const steps = [
    { title: "Priya opens SOLVO", body: "Priya Sharma needs help: the fan and lights in one room are not working.", actor: "customer" },
    { title: "She selects a category", body: "⚡ Electrician", actor: "customer" },
    { title: "She chooses work type", body: "⚡ Urgent — she needs someone as soon as possible.", actor: "customer" },
    { title: "She describes the problem", body: '"The fan and lights in one room are not working."', actor: "customer" },
    { title: "SOLVO matches suitable workers", body: "Three electricians near Indirapuram are ranked by skill, area, availability and rating.", actor: "system" },
    { title: "Three recommendations appear", body: "Rahul Kumar, Suresh Yadav, and Aslam Sheikh.", actor: "system", showWorkers: true },
    { title: "Rahul Kumar receives the opportunity", body: "⚡ Electrical Repair · 📍 Indirapuram · 💰 ₹500–₹800", actor: "worker" },
    { title: "Rahul reviews it on his phone", body: "Large job card, two buttons: ACCEPT / DECLINE.", actor: "worker" },
    { title: "Rahul taps ACCEPT", body: "Job status changes for everyone in real time.", actor: "worker" },
    { title: "Priya sees WORKER ACCEPTED", body: "The booking timeline updates automatically.", actor: "customer" },
    { title: "Rahul completes the work", body: "He taps MARK WORK COMPLETED.", actor: "worker" },
    { title: "Priya confirms completion", body: "She confirms the work was done.", actor: "customer" },
    { title: "Payment is completed", body: "₹700 — simulated UPI payment.", actor: "customer" },
    { title: "Priya rates the job", body: "⭐⭐⭐⭐⭐ — 5 stars.", actor: "customer", onEnter: () => setRating(4.71) },
    { title: "Rahul's profile updates", body: "Jobs Completed: 42 → 43. Rating updates. Reputation history recorded.", actor: "worker", onEnter: () => setJobs(43) },
  ];
  const s = steps[step];

  return (
    <div style={{ background: C.bg }} className="min-h-full flex flex-col">
      <TopBar title="Demo Journey" onBack={() => goto("landing")} />
      <div className="flex-1 max-w-2xl mx-auto w-full p-4 flex flex-col">
        <div className="flex gap-1 mb-5">
          {steps.map((_, i) => <div key={i} style={{ background: i <= step ? C.teal : C.line }} className="h-1.5 flex-1 rounded-full" />)}
        </div>
        <Badge tone={s.actor === "customer" ? "indigo" : s.actor === "worker" ? "teal" : "amber"}>
          {s.actor === "customer" ? "Priya Sharma (Customer)" : s.actor === "worker" ? "Rahul Kumar (Worker)" : "SOLVO Matching Engine"}
        </Badge>
        <h2 className="font-black text-2xl mt-3 mb-2" style={{ color: C.indigo }}>{s.title}</h2>
        <p className="text-base mb-4" style={{ color: C.muted }}>{s.body}</p>

        {s.showWorkers && (
          <div className="flex flex-col gap-2 mb-4">
            {WORKERS.filter((w) => w.skill === "electrician").map((w, i) => (
              <Card key={w.id} className="p-3 flex items-center gap-3">
                <Avatar name={w.name} color={w.avatarColor} size={40} />
                <div className="flex-1">
                  <div className="font-semibold text-sm">{w.name} {i === 0 && <Badge tone="amber">Best Match</Badge>}</div>
                  <div className="text-xs" style={{ color: C.muted }}>{w.area} · {w.rate} · ⭐ {w.rating}</div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {step === steps.length - 1 && (
          <Card className="p-4 mb-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center"><div className="font-black text-xl" style={{ color: C.teal }}>{jobs}</div><div className="text-xs" style={{ color: C.muted }}>Jobs Completed</div></div>
              <div className="text-center"><div className="font-black text-xl" style={{ color: C.amber }}>{rating}</div><div className="text-xs" style={{ color: C.muted }}>Rating</div></div>
            </div>
          </Card>
        )}

        <div className="mt-auto flex gap-3 pt-4">
          <Btn variant="ghost" onClick={() => setStep((n) => Math.max(0, n - 1))} disabled={step === 0}>Back</Btn>
          {step < steps.length - 1 ? (
            <Btn full onClick={() => { setStep((n) => { const next = n + 1; steps[next].onEnter && steps[next].onEnter(); return next; }); }}>Next</Btn>
          ) : (
            <Btn full variant="teal" onClick={() => goto("landing")}>Finish demo</Btn>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* ROOT APP                                                               */
/* ---------------------------------------------------------------------- */
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [jobs, setJobs] = useState(INITIAL_JOBS);

  function goto(s) { setScreen(s); window.scrollTo(0, 0); }
  function addJob(j) { setJobs((prev) => [j, ...prev]); }
  function updateJob(id, patch) { setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, ...patch } : j))); }

  let content;
  if (screen === "landing") content = <Landing goto={goto} />;
  else if (screen === "roleSelect") content = <RoleSelect goto={goto} />;
  else if (screen === "customer") content = <CustomerApp goto={goto} jobs={jobs} addJob={addJob} updateJob={updateJob} />;
  else if (screen === "worker") content = <WorkerApp goto={goto} jobs={jobs} addJob={addJob} updateJob={updateJob} />;
  else if (screen === "admin") content = <AdminApp goto={goto} jobs={jobs} />;
  else if (screen === "access") content = <AccessDemo goto={goto} />;
  else if (screen === "demo") content = <DemoJourney goto={goto} />;
  else content = <Landing goto={goto} />;

  return (
    <div style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" }} className="min-h-screen w-full">
      {content}
    </div>
  );
}
