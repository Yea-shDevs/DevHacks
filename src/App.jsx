import React, { useState, useEffect, useRef } from "react";
import {
  Hammer, Zap, Wrench, PaintBucket, Sparkles, Cog, HardHat, Package,
  PartyPopper, Users2, Mic, Phone, MessageSquare, Globe2, CheckCircle2,
  Star, MapPin, Clock, IndianRupee, ChevronRight, ChevronLeft, X, Home,
  Briefcase, MessageCircle, User, LayoutDashboard, ShieldCheck, BarChart3,
  Handshake, Camera, ArrowRight, Volume2, PhoneCall, Send, Check, Radio,
  TrendingUp, Award, CircleDot, Menu, Settings, LogOut, Search, Filter,
  Calendar, Upload, ChevronDown, SlidersHorizontal, AlertCircle,
} from "lucide-react";

/* ---------------------------------------------------------------------- */
/* DESIGN TOKENS                                                          */
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
  { id: "plumber", name: "Plumber", icon: Wrench, emoji: "🔧" },
  { id: "electrician", name: "Electrician", icon: Zap, emoji: "⚡" },
  { id: "carpenter", name: "Carpenter", icon: Hammer, emoji: "🪚" },
  { id: "painter", name: "Painter", icon: PaintBucket, emoji: "🎨" },
  { id: "cleaner", name: "Cleaner", icon: Sparkles, emoji: "🧹" },
  { id: "repair", name: "Appliance Repair", icon: Cog, emoji: "🔨" },
];

const WORKER_CATEGORIES = [
  { id: "construction", name: "Construction Helper", icon: HardHat, emoji: "🏗️" },
  { id: "labourer", name: "Daily Labourer", icon: Users2, emoji: "👷" },
  { id: "loader", name: "Loader / Mover", icon: Package, emoji: "📦" },
  { id: "event", name: "Event Worker", icon: PartyPopper, emoji: "🎉" },
  { id: "tempclean", name: "Temporary Cleaner", icon: Sparkles, emoji: "✨" },
  { id: "helper", name: "General Helper", icon: Handshake, emoji: "🤝" },
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
    distance: "1.8 km", available: true, availableText: "Available today",
    priceRange: "₹500 – ₹800 / visit",
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
    distance: "3.2 km", available: true, availableText: "Available today",
    priceRange: "₹600 – ₹900 / visit",
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
    distance: "4.5 km", available: false, availableText: "Available tomorrow",
    priceRange: "₹400 – ₹700 / visit",
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
    distance: "2.1 km", available: true, availableText: "Available today",
    priceRange: "₹350 – ₹650 / visit",
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
    distance: "5.0 km", available: true, availableText: "Available today",
    priceRange: "₹500 – ₹1,000 / visit",
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
    distance: "6.8 km", available: true, availableText: "Available today",
    priceRange: "₹400 / day",
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
    distance: "7.3 km", available: false, availableText: "Available tomorrow",
    priceRange: "₹500 / day",
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
    distance: "8.1 km", available: true, availableText: "Available today",
    priceRange: "₹450 / day",
  },
];

const SAMPLE_REVIEWS = {
  w1: [
    { name: "Anita V.", rating: 5, text: "Very professional and arrived exactly on time. Fixed the wiring issue quickly.", date: "Aug 2026" },
    { name: "Rohit G.", rating: 4, text: "Good work and reasonable pricing. Would hire again.", date: "Jul 2026" },
    { name: "Sunita D.", rating: 5, text: "Excellent service. Explained everything clearly before starting work.", date: "Jun 2026" },
  ],
  w2: [
    { name: "Priya S.", rating: 5, text: "Suresh is outstanding. Very experienced and got the job done right.", date: "Sep 2026" },
    { name: "Karan M.", rating: 5, text: "Professional, clean work. No mess left behind.", date: "Aug 2026" },
  ],
  w3: [
    { name: "Meera R.", rating: 4, text: "Decent work, fixed the issue same day. Good value for money.", date: "Aug 2026" },
  ],
  w4: [
    { name: "Meera R.", rating: 5, text: "Fixed a major leak in just 30 minutes. Highly recommended!", date: "Sep 2026" },
    { name: "Amit K.", rating: 4, text: "Good plumber, fair rates. Arrived a bit late but work quality was great.", date: "Aug 2026" },
  ],
  w5: [
    { name: "Riya S.", rating: 5, text: "Manoj ji made our dream wardrobe. Absolutely brilliant craftsmanship.", date: "Sep 2026" },
    { name: "Vivek P.", rating: 5, text: "Very neat and detailed work. The furniture looks fantastic.", date: "Jul 2026" },
  ],
  w6: [
    { name: "Sonal M.", rating: 5, text: "Our living room looks completely transformed. Neat, clean finish.", date: "Aug 2026" },
    { name: "Rakesh J.", rating: 4, text: "Good painter. Work took slightly longer than expected but quality was good.", date: "Jul 2026" },
  ],
  w7: [
    { name: "Gopal S.", rating: 4, text: "Hardworking and honest. Got the construction assistance work done well.", date: "Sep 2026" },
  ],
  w8: [
    { name: "Shikha T.", rating: 5, text: "Our entire household was shifted with zero damage. Very careful with fragile items.", date: "Sep 2026" },
    { name: "Manish B.", rating: 4, text: "Reliable and affordable. Would definitely book again.", date: "Aug 2026" },
  ],
};

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
function useProfileModal() {
  const [profileUser, setProfileUser] = useState(null);
  const openProfile = (user) => setProfileUser(user);
  const closeProfile = () => setProfileUser(null);
  return { profileUser, openProfile, closeProfile };
}

function ProfileModal({ user, onClose, onRequestService }) {
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
    { label: "Identity Verified", ok: user.verification?.identity ?? false },
    { label: "Phone Verified", ok: user.verification?.phone ?? false },
    { label: "Experience Verified", ok: user.badges?.includes("skill") ?? false },
    { label: "Skills Verified", ok: user.badges?.includes("skill") ?? false },
  ];

  const reviews = SAMPLE_REVIEWS[user.id] || [];

  return (
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
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full overflow-y-auto"
        style={{
          maxWidth: 540,
          maxHeight: "92vh",
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(226,232,240,0.9)",
          borderRadius: 24,
          boxShadow: "0 25px 60px rgba(15,23,42,0.18), 0 0 0 1px rgba(255,255,255,0.6) inset",
          animation: "pmSlideIn 0.25s cubic-bezier(0.34,1.3,0.64,1)",
        }}
      >
        {/* Gradient header band */}
        <div
          className="relative h-28 rounded-t-3xl"
          style={{
            background: `linear-gradient(135deg, ${user.avatarColor || C.teal}22 0%, #EEF2FF 100%)`,
            borderBottom: `1px solid ${C.line}`,
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-black/10"
            style={{ color: C.muted }}
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 pb-6">
          {/* Avatar + name */}
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

            <div className="pb-1 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-black text-xl" style={{ color: C.ink }}>{user.name}</span>
                {isVerified && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#DCFAF4", color: "#0B7C6B" }}>
                    ✓ Verified
                  </span>
                )}
              </div>
              <div className="text-sm mt-0.5" style={{ color: C.muted }}>{catName(user.skill)}</div>
              <div className="text-xs mt-0.5 flex items-center gap-1" style={{ color: C.mutedLight }}>
                <MapPin size={11} /> {user.area} · {user.exp} experience
              </div>
            </div>
          </div>

          {/* Bio */}
          {user.bio && (
            <p className="text-sm leading-relaxed mb-5" style={{ color: C.inkLight }}>
              {user.bio}
            </p>
          )}

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-2 mb-5">
            {[
              { label: "Jobs Done", value: user.completedTasks ?? user.jobs },
              { label: "Reviews", value: user.totalReviews ?? user.jobs },
              { label: "Experience", value: user.exp },
              { label: "Reliability", value: `${user.reliability}%` },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl p-3 text-center" style={{ background: C.bg, border: `1px solid ${C.line}` }}>
                <div className="font-black text-base" style={{ color: C.teal }}>{value}</div>
                <div className="text-[10px] mt-0.5 leading-tight" style={{ color: C.muted }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Rating section */}
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

          {/* Verification section — PROMINENT */}
          <div className="mb-5 rounded-2xl p-4" style={{ background: "#F0FDF9", border: "1px solid #B2F5EA" }}>
            <div className="text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-2" style={{ color: C.tealDeep }}>
              <ShieldCheck size={14} /> Verification Status
            </div>
            <div className="grid grid-cols-2 gap-2">
              {verifications.map(({ label, ok }) => (
                <div key={label} className="flex items-center gap-2 text-sm rounded-xl px-3 py-2.5" style={{ background: ok ? "#DCFAF4" : "#F8FAFB", border: `1px solid ${ok ? "#B2E8DF" : C.line}` }}>
                  {ok
                    ? <CheckCircle2 size={15} color="#0B7C6B" className="shrink-0" />
                    : <div className="w-3.5 h-3.5 rounded-full border-2 shrink-0" style={{ borderColor: C.lineStrong }} />
                  }
                  <span className="text-xs font-medium" style={{ color: ok ? "#0B7C6B" : C.muted }}>{label}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] mt-3 leading-relaxed" style={{ color: C.muted }}>
              Verification reflects information reviewed at the time of onboarding. SOLVO shows exactly what was checked — never overpromising.
            </p>
          </div>

          {/* Skills section */}
          {user.skills?.length > 0 && (
            <div className="mb-5">
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

          {/* Info grid */}
          <div className="mb-5 rounded-2xl p-4" style={{ background: C.bg, border: `1px solid ${C.line}` }}>
            <div className="text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-2" style={{ color: C.teal }}>
              <div style={{ width: 3, height: 14, background: C.teal, borderRadius: 99 }} /> Information
            </div>
            {[
              ["Location", user.area],
              ["Experience", user.exp],
              ["Rate", user.rate],
              ["Languages", user.langs?.join(", ")],
              ["Joined", user.joinedDate || "2024"],
            ].map(([k, v]) => v && (
              <div key={k} className="flex justify-between items-center py-1.5 border-b last:border-0" style={{ borderColor: C.line }}>
                <span className="text-xs" style={{ color: C.muted }}>{k}</span>
                <span className="text-xs font-semibold text-right" style={{ color: C.inkLight, maxWidth: "60%" }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Reviews section */}
          {reviews.length > 0 && (
            <div className="mb-5">
              <div className="text-xs font-bold tracking-widest uppercase mb-3 flex items-center gap-2" style={{ color: C.teal }}>
                <div style={{ width: 3, height: 14, background: C.teal, borderRadius: 99 }} /> Customer Reviews
              </div>
              <div className="flex flex-col gap-3">
                {reviews.map((r, i) => (
                  <div key={i} className="rounded-xl p-4" style={{ background: C.bg, border: `1px solid ${C.line}` }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                          style={{ background: C.indigo }}
                        >
                          {r.name[0]}
                        </div>
                        <span className="text-sm font-semibold" style={{ color: C.ink }}>{r.name}</span>
                      </div>
                      <span className="text-xs" style={{ color: C.mutedLight }}>{r.date}</span>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {[1,2,3,4,5].map((i) => (
                        <Star key={i} size={12} fill={i <= r.rating ? C.amber : "#E2E8F0"} color={i <= r.rating ? C.amber : "#E2E8F0"} />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: C.inkLight }}>"{r.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Price + CTA */}
          <div className="rounded-2xl p-4 mb-4" style={{ background: `linear-gradient(135deg, ${C.teal}10 0%, ${C.tealLight} 100%)`, border: `1px solid ${C.tealLight}` }}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs" style={{ color: C.muted }}>Starting from</div>
                <div className="font-black text-lg" style={{ color: C.ink }}>{user.priceRange || user.rate}</div>
              </div>
              {user.available !== false && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "#DCFAF4", color: "#0B7C6B" }}>
                  🟢 {user.availableText || "Available"}
                </span>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 flex-wrap">
            {onRequestService && (
              <Btn full variant="teal" icon={Send} onClick={() => { onClose(); onRequestService(user); }}>
                Request Service
              </Btn>
            )}
            <Btn variant="ghost" icon={MessageCircle} onClick={() => alert("Messaging coming soon!")}>Message</Btn>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pmFadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes pmSlideIn { from { opacity:0; transform:scale(0.92) translateY(8px) } to { opacity:1; transform:scale(1) translateY(0) } }
      `}</style>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* SERVICE REQUEST MODAL                                                  */
/* ---------------------------------------------------------------------- */
function ServiceRequestModal({ worker, onClose, onConfirm }) {
  const [form, setForm] = useState({
    service: catName(worker?.skill || ""),
    date: "today",
    time: "morning",
    location: AREAS[0],
    problem: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  function handleSubmit() {
    setSubmitted(true);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.55)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", animation: "pmFadeIn 0.2s ease" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full overflow-y-auto"
        style={{
          maxWidth: 480,
          maxHeight: "92vh",
          background: "#fff",
          borderRadius: 24,
          boxShadow: "0 25px 60px rgba(15,23,42,0.18)",
          animation: "pmSlideIn 0.25s cubic-bezier(0.34,1.3,0.64,1)",
        }}
      >
        {!submitted ? (
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-black text-xl" style={{ color: C.ink }}>Request a Service</h2>
                {worker && (
                  <p className="text-sm mt-0.5" style={{ color: C.muted }}>with {worker.name}</p>
                )}
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors" style={{ color: C.muted }}>
                <X size={18} />
              </button>
            </div>

            {/* Worker chip */}
            {worker && (
              <div className="flex items-center gap-3 p-3 rounded-xl mb-5" style={{ background: C.bg, border: `1px solid ${C.line}` }}>
                <Avatar name={worker.name} color={worker.avatarColor} size={40} />
                <div>
                  <div className="font-semibold text-sm" style={{ color: C.ink }}>{worker.name}</div>
                  <div className="text-xs" style={{ color: C.muted }}>{catName(worker.skill)} · ⭐ {worker.rating}</div>
                </div>
                {worker.badges?.includes("identity") && (
                  <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "#DCFAF4", color: "#0B7C6B" }}>✓ Verified</span>
                )}
              </div>
            )}

            {/* Service */}
            <div className="mb-4">
              <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: C.muted }}>Service</label>
              <div className="w-full rounded-xl px-4 py-3 text-sm font-semibold" style={{ background: C.bg, border: `1px solid ${C.line}`, color: C.ink }}>
                {form.service}
              </div>
            </div>

            {/* Date */}
            <div className="mb-4">
              <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: C.muted }}>Date</label>
              <div className="grid grid-cols-3 gap-2">
                {[["today", "Today"], ["tomorrow", "Tomorrow"], ["custom", "Pick date"]].map(([k, l]) => (
                  <button
                    key={k}
                    onClick={() => setForm(f => ({ ...f, date: k }))}
                    className="rounded-xl py-2.5 text-sm font-semibold transition-all"
                    style={{
                      border: `1.5px solid ${form.date === k ? C.teal : C.line}`,
                      background: form.date === k ? C.tealLight : "#fff",
                      color: form.date === k ? C.tealDeep : C.ink,
                    }}
                  >{l}</button>
                ))}
              </div>
            </div>

            {/* Time */}
            <div className="mb-4">
              <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: C.muted }}>Preferred Time</label>
              <div className="grid grid-cols-3 gap-2">
                {[["morning", "Morning", "8–12 PM"], ["afternoon", "Afternoon", "12–4 PM"], ["evening", "Evening", "4–8 PM"]].map(([k, l, sub]) => (
                  <button
                    key={k}
                    onClick={() => setForm(f => ({ ...f, time: k }))}
                    className="rounded-xl py-2.5 px-2 text-sm font-semibold transition-all text-center"
                    style={{
                      border: `1.5px solid ${form.time === k ? C.teal : C.line}`,
                      background: form.time === k ? C.tealLight : "#fff",
                      color: form.time === k ? C.tealDeep : C.ink,
                    }}
                  >
                    <div>{l}</div>
                    <div className="text-[10px] font-normal mt-0.5" style={{ color: form.time === k ? C.teal : C.mutedLight }}>{sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="mb-4">
              <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: C.muted }}>Location</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: C.muted }} />
                <select
                  value={form.location}
                  onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                  className="w-full rounded-xl pl-9 pr-4 py-3 text-sm outline-none appearance-none"
                  style={{ border: `1.5px solid ${C.line}`, color: C.ink, background: "#fff" }}
                >
                  {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            </div>

            {/* Problem description */}
            <div className="mb-4">
              <label className="block text-xs font-bold mb-1.5 uppercase tracking-wide" style={{ color: C.muted }}>Describe the Problem</label>
              <textarea
                value={form.problem}
                onChange={e => setForm(f => ({ ...f, problem: e.target.value }))}
                placeholder='e.g. "My fan and lights in one room stopped working this morning..."'
                className="w-full rounded-xl p-3 text-sm outline-none resize-none"
                style={{ border: `1.5px solid ${C.line}`, minHeight: 80, color: C.ink }}
              />
            </div>

            {/* Upload photos */}
            <button
              className="w-full rounded-xl py-3 flex items-center justify-center gap-2 text-sm font-semibold mb-5 transition-all hover:bg-slate-50"
              style={{ border: `1.5px dashed ${C.lineStrong}`, color: C.muted }}
            >
              <Camera size={16} /> Upload Photos (optional)
            </button>

            <Btn
              full
              variant="teal"
              size="lg"
              icon={Send}
              disabled={!form.problem.trim()}
              onClick={handleSubmit}
            >
              Confirm Request
            </Btn>
          </div>
        ) : (
          /* Success state */
          <div className="p-8 flex flex-col items-center text-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
              style={{ background: C.tealLight, animation: "pmSlideIn 0.3s ease" }}
            >
              <CheckCircle2 size={40} color={C.teal} />
            </div>
            <h2 className="font-black text-2xl mb-2" style={{ color: C.ink }}>Request Sent!</h2>
            <p className="text-sm leading-relaxed mb-1" style={{ color: C.muted }}>
              Your request has been sent to
            </p>
            <p className="font-bold mb-6" style={{ color: C.teal }}>{worker?.name}</p>

            <div className="w-full rounded-2xl p-4 mb-6 text-left" style={{ background: C.bg, border: `1px solid ${C.line}` }}>
              <div className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: C.muted }}>Request Summary</div>
              {[
                ["Service", form.service],
                ["Date", form.date === "today" ? "Today" : form.date === "tomorrow" ? "Tomorrow" : "Custom date"],
                ["Time", form.time === "morning" ? "8 AM – 12 PM" : form.time === "afternoon" ? "12 PM – 4 PM" : "4 PM – 8 PM"],
                ["Location", form.location],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-1.5 border-b last:border-0" style={{ borderColor: C.line }}>
                  <span className="text-xs" style={{ color: C.muted }}>{k}</span>
                  <span className="text-xs font-semibold" style={{ color: C.ink }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Job status tracker preview */}
            <div className="w-full rounded-2xl p-4 mb-6" style={{ background: "#F0FDF9", border: "1px solid #B2F5EA" }}>
              <div className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: C.tealDeep }}>Job Status</div>
              {["Request Sent ✓", "Worker Reviewing", "Worker Accepts", "Worker on the Way", "Job Completed"].map((s, i) => (
                <div key={s} className="flex gap-3 items-start mb-2 last:mb-0">
                  <div className="flex flex-col items-center" style={{ minWidth: 20 }}>
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: i === 0 ? C.teal : "#fff", border: `2px solid ${i === 0 ? C.teal : C.line}` }}
                    >
                      {i === 0 && <Check size={11} color="#fff" />}
                    </div>
                    {i < 4 && <div style={{ width: 2, height: 16, background: i < 1 ? C.teal : C.line }} />}
                  </div>
                  <span className="text-xs pt-0.5 font-medium" style={{ color: i === 0 ? C.tealDeep : C.muted }}>{s}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2 w-full">
              <Btn full variant="teal" onClick={onConfirm || onClose}>
                Track Request
              </Btn>
              <Btn variant="ghost" onClick={onClose}>Close</Btn>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes pmFadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes pmSlideIn { from { opacity:0; transform:scale(0.92) translateY(8px) } to { opacity:1; transform:scale(1) translateY(0) } }
      `}</style>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* TRUST BADGE EXPLAINER                                                  */
/* ---------------------------------------------------------------------- */
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

/* ---------------------------------------------------------------------- */
/* PROGRESS TIMELINE                                                      */
/* ---------------------------------------------------------------------- */
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
/* LANDING PAGE                                                           */
/* ---------------------------------------------------------------------- */
function Landing({ goto }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const { profileUser, openProfile, closeProfile } = useProfileModal();
  const [requestWorker, setRequestWorker] = useState(null);

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

  const popularServices = [
    { label: "Electrical", emoji: "⚡", id: "electrician" },
    { label: "Plumbing", emoji: "🔧", id: "plumber" },
    { label: "Carpentry", emoji: "🪚", id: "carpenter" },
    { label: "AC Repair", emoji: "❄️", id: "repair" },
    { label: "Cleaning", emoji: "🧹", id: "cleaner" },
    { label: "Appliance", emoji: "🔨", id: "repair" },
  ];

  return (
    <div style={{ background: "#ffffff", color: C.ink, fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }} className="min-h-full">

      {/* ── Sticky Nav ── */}
      <header style={{ background: "#fff", borderBottom: `1px solid ${C.line}` }} className="sticky top-0 z-30 w-full">
        <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-3.5">
          {/* Logo */}
          <div className="flex items-center gap-3 min-w-[160px]">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm shrink-0"
              style={{ background: `linear-gradient(135deg, ${C.teal} 0%, ${C.tealDeep} 100%)` }}
            >
              <span className="font-black text-white text-base tracking-tight">S</span>
            </div>
            <span className="font-black text-xl tracking-tight" style={{ color: C.ink }}>SOLVO</span>
            <span
              className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase"
              style={{ background: C.tealLight, color: C.teal }}
            >
              Beta
            </span>
          </div>

          {/* Center links */}
          <div className="hidden md:flex items-center gap-7 text-sm font-medium">
            <button
              onClick={() => goto("workerSearch")}
              style={{ color: C.muted, background: "none", border: "none", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.color = C.teal}
              onMouseLeave={e => e.currentTarget.style.color = C.muted}
            >
              Workers
            </button>
            {[["#how", "How it works"], ["#access", "Access modes"]].map(([href, label]) => (
              <a
                key={href}
                href={href}
                style={{ color: C.muted, textDecoration: "none" }}
                onMouseEnter={e => e.currentTarget.style.color = C.teal}
                onMouseLeave={e => e.currentTarget.style.color = C.muted}
              >
                {label}
              </a>
            ))}
            <button
              onClick={() => goto("trust")}
              style={{ color: C.muted, background: "none", border: "none", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.color = C.teal}
              onMouseLeave={e => e.currentTarget.style.color = C.muted}
            >
              Trust &amp; Safety
            </button>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 min-w-[160px] justify-end">
            <button
              onClick={() => goto("login")}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:bg-slate-50"
              style={{ color: C.inkLight, border: `1px solid ${C.line}` }}
            >
              Log in
            </button>
            <button
              onClick={() => goto("roleSelect")}
              className="px-5 py-2 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-px shadow-sm"
              style={{ background: `linear-gradient(135deg, ${C.teal} 0%, ${C.tealDeep} 100%)` }}
            >
              Get started
            </button>
          </div>
        </nav>
      </header>

      {/* ── Hero ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Blue-dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, rgba(10,22,50,0.80) 0%, rgba(14,76,90,0.70) 60%, rgba(10,22,50,0.82) 100%)",
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 max-w-3xl mx-auto px-6 pt-24 pb-20 text-center">
          <span
            className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.25)",
              backdropFilter: "blur(8px)",
            }}
          >
            📍 Ghaziabad · Delhi NCR · Now live
          </span>

          <h1
            className="font-black leading-[1.08] tracking-tight text-white"
            style={{ fontSize: "clamp(2.6rem, 6vw, 4rem)" }}
          >
            Every skilled hand<br />
            <span style={{ color: "#5DEDD8" }}>deserves an opportunity.</span>
          </h1>

          <p className="mt-5 text-lg leading-relaxed mx-auto" style={{ color: "rgba(255,255,255,0.80)", maxWidth: 520 }}>
            SOLVO connects customers with verified local workers — through an app, by voice, or even a basic phone call.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Btn variant="teal" size="lg" icon={Search} onClick={() => goto("workerSearch")}>Find a Worker</Btn>
            <button
              onClick={() => goto("worker")}
              className="inline-flex items-center justify-center gap-2 rounded-full font-semibold px-7 py-3.5 text-base transition-all hover:bg-white hover:text-slate-900"
              style={{ border: "2px solid rgba(255,255,255,0.7)", color: "#fff", background: "transparent" }}
            >
              <Briefcase size={18} /> Find Work
            </button>
          </div>

          {/* Stats strip */}
          <div className="mt-14 grid grid-cols-3 gap-4 max-w-md mx-auto">
            {[["8+", "Workers"], ["12+", "Bookings"], ["4.7★", "Avg Rating"]].map(([v, l]) => (
              <div
                key={l}
                className="rounded-2xl p-4"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div className="font-black text-xl" style={{ color: "#5DEDD8" }}>{v}</div>
                <div className="text-xs mt-0.5 text-white/70">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Popular Services ── */}
      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="text-center mb-8">
          <SectionLabel>Popular Services</SectionLabel>
          <h2 className="font-black text-3xl mt-1" style={{ color: C.ink }}>What do you need help with?</h2>
          <p className="mt-2 text-sm" style={{ color: C.muted }}>Tap a category to find verified workers near you.</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {popularServices.map((s) => (
            <button
              key={s.label}
              onClick={() => goto("workerSearch")}
              className="flex flex-col items-center gap-2 py-5 px-3 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-[0.97]"
              style={{ background: C.card, border: `1px solid ${C.line}`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
            >
              <span className="text-3xl">{s.emoji}</span>
              <span className="text-xs font-semibold text-center leading-tight" style={{ color: C.inkLight }}>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Top Rated Workers ── */}
      <div id="workers" className="py-14" style={{ background: C.bg, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <SectionLabel>Verified Professionals</SectionLabel>
              <h2 className="font-black text-3xl mt-1" style={{ color: C.ink }}>Trusted Workers</h2>
              <p className="mt-2 text-sm" style={{ color: C.muted }}>Click any card to view the full profile.</p>
            </div>
            <button
              onClick={() => goto("workerSearch")}
              className="hidden sm:flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80"
              style={{ color: C.teal }}
            >
              View All Workers <ArrowRight size={16} />
            </button>
          </div>

          {/* Filter chips */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6" style={{ scrollbarWidth: "none" }}>
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className="shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150"
                style={{
                  background: activeFilter === f.id ? C.teal : C.card,
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
                <button onClick={() => openProfile(w)} className="font-bold text-base mt-3 hover:underline text-center w-full" style={{ color: C.ink }}>{w.name}</button>
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
                  <Btn full variant="teal" onClick={() => setRequestWorker(w)}>
                    Book
                  </Btn>
                </div>
              </div>
            ))}
          </div>
          {filteredWorkers.length === 0 && (
            <p className="text-center py-8 text-sm" style={{ color: C.muted }}>No workers in this category yet.</p>
          )}

          <div className="flex justify-center mt-8">
            <Btn variant="outline" icon={ArrowRight} onClick={() => goto("workerSearch")}>
              View All Workers
            </Btn>
          </div>
        </div>
      </div>

      {profileUser && (
        <ProfileModal
          user={profileUser}
          onClose={closeProfile}
          onRequestService={(w) => { closeProfile(); setRequestWorker(w); }}
        />
      )}
      {requestWorker && (
        <ServiceRequestModal
          worker={requestWorker}
          onClose={() => setRequestWorker(null)}
          onConfirm={() => { setRequestWorker(null); goto("customer"); }}
        />
      )}

      {/* ── Trust section ── */}
      <div className="py-14">
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
                className="rounded-2xl p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
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
          <div className="flex justify-center mt-8">
            <Btn variant="outline" icon={ShieldCheck} onClick={() => goto("trust")}>
              Learn about Trust &amp; Safety
            </Btn>
          </div>
        </div>
      </div>

      {/* ── How it works ── */}
      <div id="how" style={{ background: C.bg, borderTop: `1px solid ${C.line}` }} className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <SectionLabel>How SOLVO Works</SectionLabel>
            <h2 className="font-black text-3xl mt-1" style={{ color: C.ink }}>From problem to paid — in minutes.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { n: "01", title: "Tell us what you need", desc: "Choose a service category and describe the work — by text, voice, or photo.", icon: Search },
              { n: "02", title: "Choose a trusted worker", desc: "Browse verified workers near you with real ratings and transparent trust badges.", icon: CheckCircle2 },
              { n: "03", title: "Get the job done", desc: "Track progress in real time. Pay only when the work is complete.", icon: Check },
            ].map(({ n, title, desc, icon: Icon }) => (
              <div
                key={n}
                className="rounded-2xl p-6 relative overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                style={{ background: C.card, border: `1px solid ${C.line}`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              >
                <div className="absolute top-4 right-4 font-black text-5xl" style={{ color: C.line }}>{n}</div>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: C.tealLight }}>
                  <Icon size={22} color={C.teal} />
                </div>
                <div className="font-bold text-base mb-2" style={{ color: C.ink }}>{title}</div>
                <div className="text-sm leading-relaxed" style={{ color: C.muted }}>{desc}</div>
              </div>
            ))}
          </div>
          {/* Worker flow */}
          <div
            className="rounded-2xl p-5 flex flex-wrap items-center gap-2"
            style={{ background: C.tealLight, border: `1px solid #B2E8DF` }}
          >
            <span className="text-xs font-bold tracking-widest uppercase mr-2" style={{ color: C.tealDeep }}>For Workers →</span>
            {["Set Available", "Receive Job Alert", "Accept", "Complete Work", "Earn"].map((s, i, arr) => (
              <React.Fragment key={s}>
                <span className="px-3 py-1.5 rounded-full text-sm font-semibold" style={{ background: "#fff", color: C.tealDeep, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>{s}</span>
                {i < arr.length - 1 && <ArrowRight size={14} color={C.teal} />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* ── Access methods ── */}
      <div id="access" className="py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <SectionLabel>Built for Real Access</SectionLabel>
            <h2 className="font-black text-3xl mt-1" style={{ color: C.ink }}>One network. Multiple ways in.</h2>
            <p className="mt-2 text-sm" style={{ color: C.muted }}>SOLVO is designed so that every worker can participate — not just those with smartphones.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Home, title: "App / Web", desc: "Full experience for customers, workers and admins on any device." },
              { icon: Mic, title: "Voice Assistance", desc: "Workers can check jobs, accept, and update status by voice." },
              { icon: Phone, title: "Basic Phone (IVR)", desc: "Press 1 to accept a job. No internet needed — ever." },
              { icon: Handshake, title: "Community Partners", desc: "Local NGOs and skill centres help workers get onboarded in person." },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                style={{ background: C.card, border: `1px solid ${C.line}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: C.tealLight }}>
                  <Icon size={20} color={C.teal} />
                </div>
                <div className="font-bold mb-1 text-sm" style={{ color: C.ink }}>{title}</div>
                <div className="text-xs leading-relaxed" style={{ color: C.muted }}>{desc}</div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Btn variant="outline" icon={Phone} onClick={() => goto("access")}>See the IVR / SMS demo</Btn>
          </div>
        </div>
      </div>

      {/* ── Final CTA ── */}
      <div style={{ background: C.bg, borderTop: `1px solid ${C.line}` }} className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Customer CTA */}
            <div
              className="rounded-3xl p-8 flex flex-col items-start"
              style={{ background: `linear-gradient(135deg, ${C.teal}15 0%, ${C.tealLight} 100%)`, border: `1px solid ${C.tealLight}` }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: C.teal }}>
                <Search size={22} color="#fff" />
              </div>
              <h3 className="font-black text-xl mb-2" style={{ color: C.ink }}>Need something fixed?</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: C.muted }}>
                Find a trusted local worker today. Browse verified professionals near you.
              </p>
              <Btn variant="teal" size="lg" icon={Search} onClick={() => goto("workerSearch")}>
                Find a Worker
              </Btn>
            </div>

            {/* Worker CTA */}
            <div
              className="rounded-3xl p-8 flex flex-col items-start"
              style={{ background: `linear-gradient(135deg, ${C.indigo}10 0%, #EEF2FF 100%)`, border: `1px solid #E0E7FF` }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: C.indigo }}>
                <Briefcase size={22} color="#fff" />
              </div>
              <h3 className="font-black text-xl mb-2" style={{ color: C.ink }}>Are you a skilled worker?</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: C.muted }}>
                Find work near you. Build your reputation. Get paid for your skills.
              </p>
              <Btn size="lg" icon={Briefcase} onClick={() => goto("worker")} style={{ background: C.indigo, color: "#fff" }}>
                Find Work
              </Btn>
            </div>
          </div>
        </div>
      </div>

      {/* ── Multi-column Footer ── */}
      <footer style={{ background: "#F4F4F4", borderTop: "1px solid #E2E8F0" }}>
        <div className="max-w-6xl mx-auto px-6 pt-10 pb-8">

          {/* Logo row */}
          <div className="flex items-center gap-2.5 mb-10">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-base shadow-sm"
              style={{ background: C.teal }}
            >S</div>
            <span className="font-black text-xl tracking-tight" style={{ color: C.ink }}>SOLVO</span>
          </div>

          {/* Four-column grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">

            {/* Column 1 — Company */}
            <div>
              <div className="font-bold text-sm mb-4" style={{ color: C.ink }}>Company</div>
              <ul className="flex flex-col gap-2.5">
                {[
                  ["About us", "#"],
                  ["How it works", "#how"],
                  ["Careers", "#"],
                  ["Terms & conditions", "#"],
                  ["Privacy policy", "#"],
                  ["Anti-discrimination policy", "#"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm transition-colors hover:underline"
                      style={{ color: C.muted, textDecoration: "none" }}
                      onMouseEnter={(e) => e.target.style.color = C.ink}
                      onMouseLeave={(e) => e.target.style.color = C.muted}
                    >{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 — For Customers */}
            <div>
              <div className="font-bold text-sm mb-4" style={{ color: C.ink }}>For customers</div>
              <ul className="flex flex-col gap-2.5">
                {[
                  ["Find a worker", null],
                  ["SOLVO reviews", "#"],
                  ["How SOLVO works", "#how"],
                  ["Trust & Safety", null],
                  ["Contact us", "#"],
                ].map(([label, href]) => (
                  <li key={label}>
                    {href ? (
                      <a href={href} className="text-sm transition-colors hover:underline" style={{ color: C.muted, textDecoration: "none" }}
                        onMouseEnter={(e) => e.target.style.color = C.ink}
                        onMouseLeave={(e) => e.target.style.color = C.muted}
                      >{label}</a>
                    ) : (
                      <button
                        onClick={() => label === "Find a worker" ? goto("workerSearch") : goto("trust")}
                        className="text-sm transition-colors hover:underline text-left"
                        style={{ color: C.muted, background: "none", border: "none", cursor: "pointer", padding: 0 }}
                        onMouseEnter={(e) => e.currentTarget.style.color = C.ink}
                        onMouseLeave={(e) => e.currentTarget.style.color = C.muted}
                      >{label}</button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — For Professionals */}
            <div>
              <div className="font-bold text-sm mb-4" style={{ color: C.ink }}>For professionals</div>
              <ul className="flex flex-col gap-2.5">
                {[
                  ["Register as a professional", "#"],
                  ["Find work near you", "#"],
                  ["Worker app guide", "#"],
                  ["Earnings & payments", "#"],
                  ["Voice assistance (IVR)", "#access"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a href={href} className="text-sm transition-colors hover:underline" style={{ color: C.muted, textDecoration: "none" }}
                      onMouseEnter={(e) => e.target.style.color = C.ink}
                      onMouseLeave={(e) => e.target.style.color = C.muted}
                    >{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 — Social Links */}
            <div>
              <div className="font-bold text-sm mb-4" style={{ color: C.ink }}>Social links</div>

              <div className="flex gap-2.5 mb-5">
                {[
                  <svg key="x" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.732-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
                  <svg key="fb" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
                  <svg key="ig" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
                  <svg key="li" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
                ].map((icon, i) => (
                  <button
                    key={i}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                    style={{ border: `1.5px solid #CBD5E1`, background: "#fff", color: C.ink }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = C.ink; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = C.ink; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = C.ink; e.currentTarget.style.borderColor = "#CBD5E1"; }}
                  >
                    {icon}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-2.5">
                <button
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-opacity hover:opacity-80"
                  style={{ background: "#000", width: "fit-content" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  <div className="text-left">
                    <div className="text-white/70 text-[9px] leading-none">Download on the</div>
                    <div className="text-white font-bold text-sm leading-tight">App Store</div>
                  </div>
                </button>
                <button
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-opacity hover:opacity-80"
                  style={{ background: "#000", width: "fit-content" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M3.18 23.76c.3.17.65.19.96.06l12.26-7.03-2.76-2.76L3.18 23.76zm-1.9-20.4C1.1 3.7 1 4.08 1 4.5v15c0 .42.1.8.28 1.14l.08.07 8.4-8.4v-.2L1.36 3.3l-.08.06zM20.54 10.3l-2.64-1.51-3.06 3.07 3.06 3.06 2.67-1.53c.76-.44.76-1.65-.03-2.09zM4.14.23L16.4 7.26l-2.76 2.76L3.18.3C3.49.17 3.84.2 4.14.23z"/></svg>
                  <div className="text-left">
                    <div className="text-white/70 text-[9px] leading-none">GET IT ON</div>
                    <div className="text-white font-bold text-sm leading-tight">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div style={{ height: 1, background: "#CBD5E1" }} className="mb-5" />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-xs" style={{ color: C.mutedLight }}>
              © Copyright 2026 SOLVO Technologies Pvt. Ltd. All rights reserved.
            </p>
            <p className="text-xs" style={{ color: C.mutedLight }}>
              MVP for Ghaziabad / Delhi NCR · Work Without Barriers
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}


/* ---------------------------------------------------------------------- */
/* WORKER SEARCH PAGE  — Customer Discovery Experience                    */
/* ---------------------------------------------------------------------- */
function WorkerSearchPage({ goto }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Ghaziabad, Delhi NCR");
  const [activeCategory, setActiveCategory] = useState("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    service: "all", distance: "all", rating: "all", price: "all", availability: "all"
  });
  const [openFilter, setOpenFilter] = useState(null);
  const { profileUser, openProfile, closeProfile } = useProfileModal();
  const [requestWorker, setRequestWorker] = useState(null);

  const serviceCategories = [
    { id: "all", label: "All Services", emoji: "🔍" },
    { id: "electrician", label: "Electrical", emoji: "⚡" },
    { id: "plumber", label: "Plumbing", emoji: "🔧" },
    { id: "carpenter", label: "Carpentry", emoji: "🪚" },
    { id: "repair", label: "AC Repair", emoji: "❄️" },
    { id: "cleaner", label: "Cleaning", emoji: "🧹" },
    { id: "painter", label: "Painting", emoji: "🎨" },
    { id: "labourer", label: "Labour", emoji: "👷" },
    { id: "loader", label: "Movers", emoji: "📦" },
  ];

  const filteredWorkers = WORKERS.filter(w => {
    if (activeCategory !== "all" && w.skill !== activeCategory) return false;
    if (verifiedOnly && !w.badges.includes("identity")) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return w.name.toLowerCase().includes(q) ||
        catName(w.skill).toLowerCase().includes(q) ||
        w.skills?.some(s => s.toLowerCase().includes(q)) ||
        w.area.toLowerCase().includes(q);
    }
    return true;
  });

  const filterOptions = {
    service: ["All Services", "Electrician", "Plumber", "Carpenter", "Painter", "Cleaner"],
    distance: ["Any distance", "Under 2 km", "Under 5 km", "Under 10 km"],
    rating: ["Any rating", "4.5+ stars", "4.0+ stars", "3.5+ stars"],
    price: ["Any price", "Under ₹400", "₹400–₹700", "₹700+"],
    availability: ["Any time", "Available today", "Available tomorrow"],
  };

  function toggleFilter(key) {
    setOpenFilter(openFilter === key ? null : key);
  }

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}>

      {/* ── Top Bar ── */}
      <header style={{ background: "#fff", borderBottom: `1px solid ${C.line}` }} className="sticky top-0 z-30 w-full">
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 py-3.5 gap-4">
          <button onClick={() => goto("landing")} className="flex items-center gap-2.5 shrink-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `linear-gradient(135deg, ${C.teal} 0%, ${C.tealDeep} 100%)` }}
            >
              <span className="font-black text-white text-sm">S</span>
            </div>
            <span className="font-black text-lg tracking-tight hidden sm:block" style={{ color: C.ink }}>SOLVO</span>
          </button>

          {/* Search bar — desktop */}
          <div className="hidden sm:flex flex-1 max-w-xl gap-2">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: C.muted }} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search for electricians, plumbers, carpenters..."
                className="w-full rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none"
                style={{ border: `1.5px solid ${C.line}`, color: C.ink, background: "#fff" }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => goto("roleSelect")}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:bg-slate-50"
              style={{ color: C.inkLight, border: `1px solid ${C.line}` }}
            >
              Sign in
            </button>
            <button
              onClick={() => goto("landing")}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors"
              style={{ color: C.muted }}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero Search ── */}
      <div
        className="py-12 px-6"
        style={{ background: `linear-gradient(135deg, ${C.ink} 0%, ${C.indigo} 50%, #0B3D4A 100%)` }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-black text-white mb-2" style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)" }}>
            Find trusted workers near you
          </h1>
          <p className="text-white/70 mb-8 text-base">Verified local professionals ready to help</p>

          {/* Search inputs */}
          <div
            className="flex flex-col sm:flex-row gap-3 p-4 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search for electricians, plumbers, carpenters..."
                className="w-full rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", caretColor: "#fff" }}
              />
            </div>
            <div className="relative sm:w-52">
              <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="Your location"
                className="w-full rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", caretColor: "#fff" }}
              />
            </div>
            <button
              className="px-6 py-3.5 rounded-xl font-bold text-sm transition-all hover:opacity-90 active:scale-[0.97] shrink-0"
              style={{ background: C.teal, color: "#fff", boxShadow: "0 4px 12px rgba(14,156,134,0.4)" }}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* ── Category pills ── */}
      <div style={{ background: "#fff", borderBottom: `1px solid ${C.line}` }} className="px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {serviceCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150"
                style={{
                  background: activeCategory === cat.id ? C.teal : C.bg,
                  color: activeCategory === cat.id ? "#fff" : C.muted,
                  border: `1.5px solid ${activeCategory === cat.id ? C.teal : C.line}`,
                }}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        {/* ── Filter bar ── */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          <div className="flex items-center gap-1.5 text-xs font-semibold mr-1" style={{ color: C.muted }}>
            <SlidersHorizontal size={14} /> Filters:
          </div>

          {Object.entries(filterOptions).map(([key, opts]) => (
            <div key={key} className="relative">
              <button
                onClick={() => toggleFilter(key)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all hover:bg-slate-100"
                style={{
                  border: `1.5px solid ${openFilter === key ? C.teal : C.line}`,
                  background: openFilter === key ? C.tealLight : "#fff",
                  color: openFilter === key ? C.tealDeep : C.ink,
                }}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
                <ChevronDown size={12} className={openFilter === key ? "rotate-180" : ""} style={{ transition: "transform 0.15s" }} />
              </button>
              {openFilter === key && (
                <div
                  className="absolute top-full left-0 mt-1 z-20 min-w-[160px] rounded-xl py-1 shadow-lg"
                  style={{ background: "#fff", border: `1px solid ${C.line}`, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}
                >
                  {opts.map(opt => (
                    <button
                      key={opt}
                      onClick={() => { setActiveFilters(f => ({ ...f, [key]: opt })); setOpenFilter(null); }}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-slate-50 transition-colors"
                      style={{ color: activeFilters[key] === opt ? C.teal : C.ink }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Verified only toggle */}
          <button
            onClick={() => setVerifiedOnly(v => !v)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all"
            style={{
              border: `1.5px solid ${verifiedOnly ? C.teal : C.line}`,
              background: verifiedOnly ? C.tealLight : "#fff",
              color: verifiedOnly ? C.tealDeep : C.muted,
            }}
          >
            <div
              className="w-4 h-4 rounded flex items-center justify-center"
              style={{ border: `1.5px solid ${verifiedOnly ? C.teal : C.lineStrong}`, background: verifiedOnly ? C.teal : "#fff" }}
            >
              {verifiedOnly && <Check size={10} color="#fff" strokeWidth={3} />}
            </div>
            Verified workers only
          </button>

          {/* Results count */}
          <span className="ml-auto text-xs font-semibold" style={{ color: C.muted }}>
            {filteredWorkers.length} worker{filteredWorkers.length !== 1 ? "s" : ""} found
          </span>
        </div>

        {/* Click away to close filters */}
        {openFilter && (
          <div className="fixed inset-0 z-10" onClick={() => setOpenFilter(null)} />
        )}

        {/* ── Worker cards grid ── */}
        {filteredWorkers.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="font-bold text-lg mb-2" style={{ color: C.ink }}>No workers found</h3>
            <p className="text-sm" style={{ color: C.muted }}>Try adjusting your search or filters.</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("all"); setVerifiedOnly(false); }}
              className="mt-4 text-sm font-semibold"
              style={{ color: C.teal }}
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredWorkers.map((w) => {
              const isVerified = w.badges.includes("identity") && w.badges.includes("skill");
              return (
                <div
                  key={w.id}
                  className="rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-xl hover:-translate-y-1"
                  style={{ background: C.card, border: `1px solid ${C.line}`, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                >
                  {/* Card header */}
                  <div
                    className="px-5 pt-5 pb-4"
                    style={{ background: `linear-gradient(135deg, ${w.avatarColor || C.teal}12 0%, #F8FAFB 100%)` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="relative">
                        <Avatar name={w.name} color={w.avatarColor} size={56} profilePic={w.profilePic} />
                        {isVerified && (
                          <div
                            className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                            style={{ background: C.teal, border: "2px solid #fff" }}
                          >
                            <Check size={9} color="#fff" strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <span
                        className="text-[10px] font-bold px-2 py-1 rounded-full"
                        style={{
                          background: w.available ? "#DCFAF4" : "#FEF3C7",
                          color: w.available ? "#0B7C6B" : "#92400E",
                        }}
                      >
                        {w.available ? "🟢" : "🟡"} {w.availableText}
                      </span>
                    </div>

                    <div>
                      <button
                        onClick={() => openProfile(w)}
                        className="font-bold text-base hover:underline text-left block"
                        style={{ color: C.ink }}
                      >
                        {w.name}
                      </button>
                      <div className="text-sm mt-0.5" style={{ color: C.muted }}>{catName(w.skill)}</div>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="px-5 pb-5">
                    {/* Rating + stats */}
                    <div className="flex items-center gap-3 py-3 border-b" style={{ borderColor: C.line }}>
                      <div className="flex items-center gap-1">
                        <Star size={14} fill={C.amber} color={C.amber} />
                        <span className="font-bold text-sm" style={{ color: C.ink }}>{w.rating}</span>
                      </div>
                      <span className="text-xs" style={{ color: C.muted }}>{w.jobs} jobs completed</span>
                      <span className="text-xs flex items-center gap-1 ml-auto" style={{ color: C.muted }}>
                        <MapPin size={11} />{w.distance}
                      </span>
                    </div>

                    {/* Skills */}
                    <div className="py-3 border-b" style={{ borderColor: C.line }}>
                      <div className="flex flex-wrap gap-1.5">
                        {(w.skills || []).slice(0, 3).map(s => (
                          <span key={s} className="text-[10px] font-semibold px-2 py-1 rounded-full" style={{ background: C.tealLight, color: C.tealDeep }}>
                            {s}
                          </span>
                        ))}
                        {(w.skills || []).length > 3 && (
                          <span className="text-[10px] font-semibold px-2 py-1 rounded-full" style={{ background: C.bgAlt, color: C.muted }}>
                            +{w.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="pt-3 mb-4">
                      <span className="text-xs" style={{ color: C.muted }}>Starting from </span>
                      <span className="font-bold text-sm" style={{ color: C.ink }}>{w.priceRange || w.rate}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Btn variant="ghost" onClick={() => openProfile(w)} style={{ flex: 1, justifyContent: "center" }}>
                        View Profile
                      </Btn>
                      <Btn variant="teal" onClick={() => setRequestWorker(w)} style={{ flex: 1, justifyContent: "center" }}>
                        Request
                      </Btn>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {profileUser && (
        <ProfileModal
          user={profileUser}
          onClose={closeProfile}
          onRequestService={(w) => { closeProfile(); setRequestWorker(w); }}
        />
      )}
      {requestWorker && (
        <ServiceRequestModal
          worker={requestWorker}
          onClose={() => setRequestWorker(null)}
          onConfirm={() => { setRequestWorker(null); goto("customer"); }}
        />
      )}
    </div>
  );
}


/* ---------------------------------------------------------------------- */
/* TRUST & SAFETY PAGE                                                    */
/* ---------------------------------------------------------------------- */
function TrustSafetyPage({ goto }) {
  const verificationItems = [
    {
      icon: CheckCircle2,
      title: "Identity Verification",
      desc: "Workers submit government-issued identification during onboarding. Our team reviews submitted information before the worker appears on the platform.",
      status: "Active",
      tone: "teal",
    },
    {
      icon: Phone,
      title: "Phone Verification",
      desc: "Every worker account is linked to a verified phone number using OTP confirmation. This ensures real, contactable people are on the platform.",
      status: "Active",
      tone: "teal",
    },
    {
      icon: Award,
      title: "Experience Verification",
      desc: "Workers self-report their experience. We review plausibility but cannot independently verify all prior employment. Experience badges reflect self-declared information.",
      status: "Self-declared",
      tone: "amber",
    },
    {
      icon: Star,
      title: "Ratings & Reviews",
      desc: "All reviews are submitted by customers who have completed a booking with that specific worker. Reviews are not editable after submission.",
      status: "Active",
      tone: "teal",
    },
    {
      icon: ShieldCheck,
      title: "Skill Assessment",
      desc: "For platform launch, skill badges reflect our team's review of worker-submitted information and community partner recommendations. Formal skill tests are planned.",
      status: "In development",
      tone: "amber",
    },
    {
      icon: AlertCircle,
      title: "Report & Support",
      desc: "Customers can report concerns about any worker or job. Reports are reviewed by the SOLVO team. Workers subject to validated reports may be removed from the platform.",
      status: "Demo only",
      tone: "grey",
    },
  ];

  const toneMap = {
    teal: { bg: "#F0FDF9", border: "#B2F5EA", iconBg: "#DCFAF4", iconColor: C.tealDeep, badge: "#DCFAF4", badgeText: "#0B7C6B" },
    amber: { bg: "#FFFBEB", border: "#FDE68A", iconBg: "#FEF3C7", iconColor: "#92400E", badge: "#FEF3C7", badgeText: "#92400E" },
    grey: { bg: C.bg, border: C.line, iconBg: C.bgAlt, iconColor: C.muted, badge: C.bgAlt, badgeText: C.muted },
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}>

      {/* Nav */}
      <header style={{ background: "#fff", borderBottom: `1px solid ${C.line}` }} className="sticky top-0 z-30">
        <div className="flex items-center justify-between max-w-5xl mx-auto px-6 py-3.5">
          <button onClick={() => goto("landing")} className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.teal} 0%, ${C.tealDeep} 100%)` }}>
              <span className="font-black text-white text-sm">S</span>
            </div>
            <span className="font-black text-lg tracking-tight" style={{ color: C.ink }}>SOLVO</span>
          </button>
          <button
            onClick={() => goto("landing")}
            className="flex items-center gap-1.5 text-sm font-semibold"
            style={{ color: C.muted }}
          >
            <ChevronLeft size={16} /> Back to home
          </button>
        </div>
      </header>

      {/* Hero */}
      <div className="py-16 px-6" style={{ background: `linear-gradient(135deg, #F0FDF9 0%, ${C.bg} 100%)`, borderBottom: `1px solid ${C.line}` }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: C.tealLight }}>
            <ShieldCheck size={32} color={C.teal} />
          </div>
          <SectionLabel>Platform Trust</SectionLabel>
          <h1 className="font-black text-4xl mt-2 mb-4" style={{ color: C.ink }}>Trust &amp; Safety</h1>
          <p className="text-base leading-relaxed" style={{ color: C.muted, maxWidth: 540, margin: "0 auto" }}>
            We show exactly what has been verified — never overpromising. SOLVO's trust system is built on transparency, not false reassurance.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Honesty disclaimer */}
        <div className="rounded-2xl p-5 mb-10 flex gap-4" style={{ background: C.amberLight, border: `1px solid #FDE68A` }}>
          <AlertCircle size={22} color="#92400E" className="shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-sm mb-1" style={{ color: "#92400E" }}>Important: We are honest about what we check</div>
            <p className="text-sm leading-relaxed" style={{ color: "#78350F" }}>
              SOLVO does not claim to perform criminal background checks or guarantee worker conduct. We verify identity, phone, and platform history. Badges clearly indicate what type of verification applies to each worker.
            </p>
          </div>
        </div>

        {/* Verification items */}
        <div className="mb-10">
          <h2 className="font-black text-2xl mb-6" style={{ color: C.ink }}>Our Verification System</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {verificationItems.map((item) => {
              const t = toneMap[item.tone];
              return (
                <div
                  key={item.title}
                  className="rounded-2xl p-5"
                  style={{ background: t.bg, border: `1px solid ${t.border}` }}
                >
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: t.iconBg }}>
                      <item.icon size={20} color={t.iconColor} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="font-bold text-sm" style={{ color: C.ink }}>{item.title}</div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: t.badge, color: t.badgeText }}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: C.inkLight }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* What badges mean */}
        <div className="mb-10">
          <h2 className="font-black text-2xl mb-2" style={{ color: C.ink }}>What the badges mean</h2>
          <p className="text-sm mb-6" style={{ color: C.muted }}>Every worker card shows exactly which verifications have been completed.</p>
          <TrustBadgeExplainer />
        </div>

        {/* Community partners */}
        <div className="rounded-2xl p-6 mb-10" style={{ background: C.bg, border: `1px solid ${C.line}` }}>
          <div className="flex gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: C.tealLight }}>
              <Handshake size={22} color={C.teal} />
            </div>
            <div>
              <h3 className="font-bold text-base mb-1" style={{ color: C.ink }}>Assisted Onboarding via Community Partners</h3>
              <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
                Workers who are not comfortable using a smartphone can be onboarded in person through our network of NGOs, community centres, and skill training organisations. Community partners help workers create a profile, add skills, select work areas, and understand voice or basic-phone access.
              </p>
            </div>
          </div>
        </div>

        {/* Report mechanism */}
        <div className="rounded-2xl p-6" style={{ background: "#FFF1F2", border: "1px solid #FECDD3" }}>
          <div className="flex gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#FEE2E2" }}>
              <AlertCircle size={22} color="#B91C1C" />
            </div>
            <div>
              <h3 className="font-bold text-base mb-1" style={{ color: C.ink }}>Report a Concern</h3>
              <p className="text-sm leading-relaxed mb-3" style={{ color: C.muted }}>
                If you have a concern about a worker, a job, or your safety, please contact our support team immediately. This feature is planned for a future release — for now, please reach out via email.
              </p>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: "#FEE2E2", color: "#B91C1C" }}>
                Demo functionality — not yet live
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Btn variant="teal" size="lg" icon={Search} onClick={() => goto("workerSearch")}>
            Browse Verified Workers
          </Btn>
        </div>
      </div>
    </div>
  );
}


/* ---------------------------------------------------------------------- */
/* ROLE SELECT                                                            */
/* ---------------------------------------------------------------------- */
function RoleSelect({ goto }) {
  const roles = [
    { key: "customer", label: "I need work done", sub: "Customer — hire verified workers", icon: Search, color: C.teal },
    { key: "worker", label: "I'm looking for work", sub: "Worker — find jobs near you", icon: Briefcase, color: C.indigo },
    { key: "admin", label: "Platform administration", sub: "Admin — manage the platform", icon: LayoutDashboard, color: C.muted },
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
        {/* Admin note */}
        <p className="text-xs text-center mt-4 px-4" style={{ color: C.mutedLight }}>
          Platform administration is for authorised staff only.
        </p>
        <button onClick={() => goto("landing")} className="mt-4 text-sm font-semibold w-full text-center" style={{ color: C.muted }}>← Back to home</button>
      </div>
    </div>
  );
}


/* ---------------------------------------------------------------------- */
/* LOGIN PAGE                                                             */
/* ---------------------------------------------------------------------- */
function LoginPage({ goto }) {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("auth");
  const [emailFocused, setEmailFocused] = useState(false);

  return (
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}>
      <div className="px-8 py-5 flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm shrink-0"
          style={{ background: `linear-gradient(135deg, ${C.teal} 0%, ${C.tealDeep} 100%)` }}
        >
          <span className="font-black text-white text-base">S</span>
        </div>
        <span className="font-black text-xl tracking-tight" style={{ color: C.ink }}>SOLVO</span>
      </div>

      <div className="flex min-h-[calc(100vh-72px)]">
        <div className="flex-1 flex items-start justify-center px-8 pt-16 pb-12">
          <div className="w-full max-w-[340px]">

            {step === "auth" ? (
              <>
                <h1 className="font-black text-[1.75rem] leading-tight mb-7" style={{ color: C.ink }}>
                  Sign up or log in
                </h1>

                <div className="flex flex-col gap-3 mb-5">
                  <button
                    className="w-full flex items-center justify-center gap-3 rounded-xl py-3 text-sm font-semibold transition-all hover:bg-slate-50 active:scale-[0.98]"
                    style={{ border: `1.5px solid ${C.lineStrong}`, color: C.ink }}
                    onClick={() => alert("Google auth coming soon!")}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
                      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
                      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
                      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                  </button>

                  <button
                    className="w-full flex items-center justify-center gap-3 rounded-xl py-3 text-sm font-semibold transition-all hover:bg-slate-50 active:scale-[0.98]"
                    style={{ border: `1.5px solid ${C.lineStrong}`, color: C.ink }}
                    onClick={() => alert("Phone auth coming soon!")}
                  >
                    <Phone size={17} />
                    Continue with Phone
                  </button>
                </div>

                <div className="flex items-center gap-3 mb-5">
                  <div style={{ flex: 1, height: 1, background: C.line }} />
                  <span className="text-xs font-medium" style={{ color: C.mutedLight }}>or</span>
                  <div style={{ flex: 1, height: 1, background: C.line }} />
                </div>

                <div className="mb-3">
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: C.inkLight }}>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    placeholder="Enter your email..."
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                    style={{
                      border: `1.5px solid ${emailFocused ? C.teal : C.lineStrong}`,
                      color: C.ink,
                      boxShadow: emailFocused ? `0 0 0 3px ${C.tealLight}` : "none",
                    }}
                  />
                </div>

                <button
                  onClick={() => setStep("role")}
                  className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] mb-5"
                  style={{ background: `linear-gradient(135deg, ${C.teal} 0%, ${C.tealDeep} 100%)` }}
                >
                  Continue with email
                </button>

                <p className="text-[11px] leading-relaxed" style={{ color: C.mutedLight }}>
                  By continuing, you agree to SOLVO's{" "}
                  <span className="underline cursor-pointer" style={{ color: C.teal }}>Terms of Service</span>{" "}
                  and{" "}
                  <span className="underline cursor-pointer" style={{ color: C.teal }}>Privacy Policy</span>.
                </p>

                <button
                  onClick={() => goto("landing")}
                  className="mt-8 text-xs font-semibold flex items-center gap-1 hover:opacity-70 transition-opacity"
                  style={{ color: C.muted }}
                >
                  <ChevronLeft size={14} /> Back to home
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setStep("auth")}
                  className="flex items-center gap-1 text-xs font-semibold mb-6 hover:opacity-70 transition-opacity"
                  style={{ color: C.muted }}
                >
                  <ChevronLeft size={14} /> Back
                </button>
                <h1 className="font-black text-[1.75rem] leading-tight mb-2" style={{ color: C.ink }}>
                  How are you using SOLVO?
                </h1>
                <p className="text-sm mb-7" style={{ color: C.muted }}>Choose your role to continue.</p>

                <div className="flex flex-col gap-3">
                  {[
                    { key: "customer", label: "I need work done", sub: "Customer — hire verified workers", icon: Search, color: C.teal },
                    { key: "worker", label: "I'm looking for work", sub: "Worker — find jobs near you", icon: Briefcase, color: C.indigo },
                    { key: "admin", label: "Platform administration", sub: "Admin — manage the platform", icon: LayoutDashboard, color: C.amber },
                  ].map((r) => (
                    <button
                      key={r.key}
                      onClick={() => goto(r.key)}
                      className="w-full flex items-center gap-4 rounded-2xl px-4 py-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]"
                      style={{ border: `1.5px solid ${C.lineStrong}`, background: "#fff" }}
                    >
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: r.color + "18" }}
                      >
                        <r.icon size={20} color={r.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm" style={{ color: C.ink }}>{r.label}</div>
                        <div className="text-xs mt-0.5" style={{ color: C.muted }}>{r.sub}</div>
                      </div>
                      <ChevronRight size={17} color={C.mutedLight} />
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => goto("access")}
                  className="mt-4 w-full flex items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all hover:bg-slate-50"
                  style={{ border: `1.5px dashed ${C.lineStrong}`, color: C.muted }}
                >
                  <Phone size={16} /> Use basic phone / IVR access
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right illustration panel */}
        <div
          className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden"
          style={{ background: "#F8FAFB" }}
        >
          <div className="relative w-[380px] h-[320px]">
            <div
              className="absolute"
              style={{
                width: 260, height: 180,
                background: `linear-gradient(135deg, ${C.amber}BB 0%, ${C.amber}44 100%)`,
                borderRadius: 24,
                top: 60, left: 60,
                transform: "rotate(-8deg)",
              }}
            />
            <div
              className="absolute"
              style={{
                width: 220, height: 14,
                background: `${C.tealDeep}CC`,
                borderRadius: 99,
                bottom: 80, left: 80,
                transform: "rotate(-3deg)",
              }}
            />
            <div
              className="absolute"
              style={{
                width: 160, height: 10,
                background: `${C.ink}55`,
                borderRadius: 99,
                bottom: 60, left: 100,
                transform: "rotate(-3deg)",
              }}
            />
            <div
              className="absolute flex items-center justify-center"
              style={{
                width: 120, height: 120,
                background: "linear-gradient(145deg, #e2e8f0 0%, #cbd5e1 100%)",
                borderRadius: 20,
                top: 40, left: 140,
                boxShadow: "6px 6px 20px rgba(0,0,0,0.13)",
              }}
            >
              <div style={{ width: 36, height: 50, border: `3px solid ${C.muted}`, borderRadius: 6, position: "relative" }}>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 12, height: 16, borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", background: C.muted }} />
              </div>
            </div>
            <div
              className="absolute rounded-full"
              style={{
                width: 40, height: 40,
                background: `radial-gradient(circle at 35% 35%, #f97316, #ea580c)`,
                top: 30, right: 100,
                boxShadow: "0 4px 12px rgba(234,88,12,0.35)",
              }}
            />
          </div>

          <div className="absolute bottom-10 left-0 right-0 text-center">
            <p className="text-sm font-semibold" style={{ color: C.mutedLight }}>
              Work without barriers — NCR's trusted platform
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}


/* ---------------------------------------------------------------------- */
/* CUSTOMER APP                                                           */
/* ---------------------------------------------------------------------- */
function CustomerApp({ goto, jobs, addJob, updateJob }) {
  const [view, setView] = useState("dashboard");
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

function VoiceDescribeButton({ onResult, lang = "en-IN" }) {
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState("");
  const recRef = useRef(null);

  const SR = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);

  function startListening() {
    if (!SR) {
      alert("Voice input is not supported in this browser. Please type instead.");
      return;
    }
    const rec = new SR();
    recRef.current = rec;
    rec.lang = lang;
    rec.continuous = false;
    rec.interimResults = true;
    rec.onstart = () => { setListening(true); setInterim(""); };
    rec.onresult = (e) => {
      let fin = "", intr = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) fin += e.results[i][0].transcript;
        else intr += e.results[i][0].transcript;
      }
      setInterim(intr || fin);
      if (fin) { setListening(false); setInterim(""); onResult(fin.trim()); }
    };
    rec.onerror = () => { setListening(false); setInterim(""); };
    rec.onend = () => { setListening(false); };
    rec.start();
  }

  function stopListening() {
    recRef.current?.stop();
    setListening(false);
  }

  return (
    <button
      onClick={listening ? stopListening : startListening}
      className="flex-1 rounded-xl p-3 flex flex-col items-center gap-1 text-xs font-semibold"
      style={{ border: `1px solid ${listening ? C.teal : C.line}`, color: listening ? C.teal : C.muted, background: listening ? "#F0FAF8" : "#fff" }}
    >
      <Mic size={20} className={listening ? "animate-pulse" : ""} />
      {listening ? (interim ? `"${interim}"` : "सुन रहा हूँ…") : "🎙 Speak"}
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

  const newOpps = jobs.filter((j) => j.status === "WORKER MATCHED" && j.category === worker.skill);
  const activeJob = jobs.find((j) => j.worker === worker.name && ["WORKER ACCEPTED", "WORK IN PROGRESS"].includes(j.status));

  // Demo opportunities shown when no real matched jobs exist
  const DEMO_OPPS = [
    { id: "demo1", category: "electrician", area: "Indirapuram", distance: "1.8 km", price: "₹600 – ₹800", time: "Today · 11:30 AM", isDemo: true },
    { id: "demo2", category: "electrician", area: "Vaishali", distance: "3.2 km", price: "₹700 – ₹900", time: "Today · 2:00 PM", isDemo: true },
    { id: "demo3", category: "electrician", area: "Kaushambi", distance: "5.0 km", price: "₹500 – ₹700", time: "Tomorrow · 10:00 AM", isDemo: true },
  ];
  const displayOpps = newOpps.length > 0 ? newOpps : DEMO_OPPS;
  const langCode = lang === "hi" ? "hi-IN" : "en-IN";
  const isHi = lang === "hi";

  return (
    <div style={{ background: "#12151C" }} className="min-h-full flex flex-col text-white">
      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3.5" style={{ background: "#1A1E28", borderBottom: "1px solid #262B36" }}>
        <div className="flex items-center gap-3">
          <Avatar name={worker.name} color={worker.avatarColor} size={40} />
          <div>
            <div className="font-bold text-base leading-tight">{worker.name}</div>
            <div className="text-xs flex items-center gap-1 text-white/50">
              <span>{catName(worker.skill)}</span>
              <span className="text-white/20">·</span>
              <Star size={10} fill={C.amber} color={C.amber} />
              <span style={{ color: C.amber }}>{worker.rating}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid #3A3F50" }}>
            {["hi", "en"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="px-3 py-1.5 text-xs font-bold transition-colors"
                style={{ background: lang === l ? C.teal : "transparent", color: lang === l ? "#fff" : "rgba(255,255,255,0.5)" }}
              >
                {l === "hi" ? "हिं" : "EN"}
              </button>
            ))}
          </div>
          <button onClick={() => goto("landing")} className="p-2 rounded-lg hover:bg-white/10 transition-colors" style={{ background: "#262B36" }}>
            <LogOut size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto pb-24">

        {/* ── HOME VIEW ── */}
        {view === "home" && (
          <div className="p-4 max-w-2xl mx-auto">

            {/* Availability toggle — large, obvious */}
            <button
              onClick={() => setAvailable((a) => !a)}
              className="w-full rounded-2xl mb-4 overflow-hidden transition-all active:scale-[0.98]"
              style={{
                background: available
                  ? `linear-gradient(135deg, ${C.teal}, ${C.tealDeep})`
                  : "#2D1515",
                border: available ? "none" : "1px solid #5C2B2B",
                boxShadow: available ? "0 4px 20px rgba(14,156,134,0.35)" : "none",
              }}
            >
              <div className="flex items-center gap-4 px-6 py-5">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: available ? "rgba(255,255,255,0.2)" : "rgba(220,50,50,0.3)" }}
                >
                  <CircleDot size={28} color={available ? "#fff" : "#F87171"} />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-black text-xl" style={{ color: available ? "#fff" : "#F87171" }}>
                    {available
                      ? (isHi ? "🟢 उपलब्ध हूँ" : "🟢 Available")
                      : (isHi ? "🔴 उपलब्ध नहीं" : "🔴 Not Available")}
                  </div>
                  <div className="text-sm mt-0.5" style={{ color: available ? "rgba(255,255,255,0.75)" : "rgba(248,113,113,0.7)" }}>
                    {available
                      ? (isHi ? "ग्राहक आपको ढूंढ सकते हैं" : "Customers can find you now")
                      : (isHi ? "आप अभी काम के लिए उपलब्ध नहीं हैं" : "You won't receive new jobs")}
                  </div>
                </div>
                <div className="text-white/40 text-xs">{isHi ? "बदलें ▾" : "Tap ▾"}</div>
              </div>
            </button>

            {/* Voice Assistance button — large, prominent */}
            <button
              onClick={() => setVoiceOpen(true)}
              className="w-full rounded-2xl p-5 flex items-center gap-4 mb-4 transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: "#1A1E28", border: `2px solid ${C.amber}44` }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                style={{ background: `radial-gradient(circle, ${C.amber}33 0%, ${C.amber}11 100%)`, border: `2px solid ${C.amber}44` }}
              >
                <Mic size={24} color={C.amber} />
              </div>
              <div className="flex-1 text-left">
                <div className="font-bold text-base" style={{ color: C.amber }}>
                  {isHi ? "🎙 आवाज़ सहायता" : "🎙 Voice Assistant"}
                </div>
                <div className="text-sm text-white/50 mt-0.5">
                  {isHi ? "बोलकर अपनी जानकारी दें" : "Speak to update your profile"}
                </div>
              </div>
              <ChevronRight size={20} className="text-white/30" />
            </button>

            {/* Active job card */}
            {activeJob && (
              <div className="rounded-2xl p-5 mb-4" style={{ background: "#1A1E28", border: `1px solid ${C.amber}55` }}>
                <div className="text-xs font-bold mb-3 flex items-center gap-2" style={{ color: C.amber }}>
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.amber }} />
                  {isHi ? "चालू काम" : "CURRENT JOB"} — {activeJob.status}
                </div>
                <div className="font-black text-xl mb-2">{catName(activeJob.category)}</div>
                <div className="text-sm text-white/60 flex items-center gap-3">
                  <span className="flex items-center gap-1"><MapPin size={13} /> {activeJob.area}</span>
                  <span className="flex items-center gap-1"><IndianRupee size={13} />{activeJob.price}</span>
                </div>
                <div className="mt-4">
                  {activeJob.status === "WORKER ACCEPTED" && (
                    <button
                      onClick={() => updateJob(activeJob.id, { status: "WORK IN PROGRESS" })}
                      className="w-full py-4 rounded-2xl font-black text-lg text-white transition-all active:scale-[0.98]"
                      style={{ background: C.teal, boxShadow: "0 4px 16px rgba(14,156,134,0.4)" }}
                    >
                      {isHi ? "काम शुरू करें" : "Start Work"}
                    </button>
                  )}
                  {activeJob.status === "WORK IN PROGRESS" && (
                    <button
                      onClick={() => updateJob(activeJob.id, { status: "COMPLETED" })}
                      className="w-full py-4 rounded-2xl font-black text-lg transition-all active:scale-[0.98]"
                      style={{ background: C.amber, color: "#1a1200", boxShadow: "0 4px 16px rgba(245,158,11,0.4)" }}
                    >
                      {isHi ? "✓ काम पूरा हुआ" : "✓ Mark Complete"}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* New Opportunities */}
            <div className="flex items-center justify-between mb-3">
              <div className="font-black text-lg">{isHi ? "नए अवसर" : "New Opportunities"}</div>
              {newOpps.length === 0 && (
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: "#262B36", color: "rgba(255,255,255,0.4)" }}>
                  {isHi ? "डेमो" : "DEMO"}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              {displayOpps.map((j) => {
                const Icon = catIcon(j.category);
                return (
                  <div key={j.id} className="rounded-2xl overflow-hidden" style={{ background: "#1A1E28", border: "1px solid #2D3244" }}>
                    <div className="px-5 pt-4 pb-3">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#262B36" }}>
                            <Icon size={20} color={C.amber} />
                          </div>
                          <div>
                            <div className="font-bold text-base">{catName(j.category)}</div>
                            <div className="text-sm text-white/50 flex items-center gap-1 mt-0.5">
                              <MapPin size={11} /> {j.area}{j.distance ? ` · ${j.distance}` : ""}
                            </div>
                          </div>
                        </div>
                        {j.isDemo && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#262B36", color: "rgba(255,255,255,0.3)" }}>
                            DEMO
                          </span>
                        )}
                      </div>
                      <div className="flex gap-4 mb-4">
                        <span className="flex items-center gap-1.5 text-sm font-bold" style={{ color: C.teal }}>
                          <IndianRupee size={13} />{j.price || j.price}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                          <Clock size={13} /> {j.time || "Today"}
                        </span>
                      </div>
                    </div>
                    <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          if (!j.isDemo) updateJob(j.id, { status: "WORKER ACCEPTED", worker: worker.name });
                          else alert(isHi ? "यह एक डेमो है — असली काम जल्द आएगा।" : "Demo job — real jobs coming soon!");
                        }}
                        className="py-3.5 rounded-xl font-black text-sm text-white transition-all active:scale-[0.97]"
                        style={{ background: C.teal, boxShadow: "0 2px 10px rgba(14,156,134,0.3)" }}
                      >
                        {isHi ? "✓ स्वीकार करें" : "✓ Accept"}
                      </button>
                      <button
                        onClick={() => { if (!j.isDemo) updateJob(j.id, { status: "REQUEST CREATED", worker: null }); }}
                        className="py-3.5 rounded-xl font-black text-sm transition-all active:scale-[0.97]"
                        style={{ background: "#2D1515", color: "#F87171", border: "1px solid #5C2B2B" }}
                      >
                        {isHi ? "✗ मना करें" : "✗ Decline"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3 mt-5">
              <div className="rounded-xl p-3 text-center" style={{ background: "#1A1E28", border: "1px solid #262B36" }}>
                <div className="font-black text-xl" style={{ color: C.teal }}>{worker.jobs}</div>
                <div className="text-[10px] text-white/40 mt-0.5">{isHi ? "काम किए" : "Jobs Done"}</div>
              </div>
              <div className="rounded-xl p-3 text-center" style={{ background: "#1A1E28", border: "1px solid #262B36" }}>
                <div className="font-black text-xl" style={{ color: C.amber }}>{worker.rating}⭐</div>
                <div className="text-[10px] text-white/40 mt-0.5">{isHi ? "रेटिंग" : "Rating"}</div>
              </div>
              <div className="rounded-xl p-3 text-center" style={{ background: "#1A1E28", border: "1px solid #262B36" }}>
                <div className="font-black text-xl text-white">{worker.reliability}%</div>
                <div className="text-[10px] text-white/40 mt-0.5">{isHi ? "विश्वसनीयता" : "Reliability"}</div>
              </div>
            </div>
          </div>
        )}

        {/* ── OPPORTUNITIES VIEW ── */}
        {view === "opportunities" && (
          <div className="p-4 max-w-2xl mx-auto">
            <div className="font-black text-xl mb-4">{isHi ? "सभी अवसर" : "All Opportunities"}</div>
            <div className="flex flex-col gap-3">
              {displayOpps.map((j) => {
                const Icon = catIcon(j.category);
                return (
                  <div key={j.id} className="rounded-2xl p-4" style={{ background: "#1A1E28", border: "1px solid #2D3244" }}>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon size={18} color={C.amber} />
                      <div className="font-bold">{catName(j.category)} · {j.area}</div>
                    </div>
                    <div className="text-sm text-white/50">{j.price} · {j.time || "Today"}</div>
                    {j.isDemo && <div className="text-xs text-white/30 mt-1">{isHi ? "यह एक डेमो है" : "Demo opportunity"}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === "earnings" && <EarningsView lang={lang} />}
        {view === "profile" && <WorkerProfileView worker={worker} lang={lang} />}
      </div>

      <BottomNav
        active={view}
        onChange={setView}
        items={[
          { key: "home", label: isHi ? "होम" : "Home", icon: Home },
          { key: "opportunities", label: isHi ? "अवसर" : "Jobs", icon: Briefcase },
          { key: "earnings", label: isHi ? "कमाई" : "Earnings", icon: IndianRupee },
          { key: "profile", label: isHi ? "प्रोफ़ाइल" : "Profile", icon: User },
        ]}
      />

      {voiceOpen && (
        <VoiceAssistantModal
          onClose={() => setVoiceOpen(false)}
          lang={lang}
          langCode={langCode}
          setLang={setLang}
          setView={setView}
          setAvailable={setAvailable}
          worker={worker}
        />
      )}
    </div>
  );
}

function EarningsView({ lang = "en" }) {
  const isHi = lang === "hi";
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="font-black text-xl mb-4">{isHi ? "मेरी कमाई" : "My Earnings"}</div>
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          [isHi ? "आज" : "Today", "₹850", C.teal],
          [isHi ? "इस सप्ताह" : "This Week", "₹4,200", C.amber],
          [isHi ? "इस महीने" : "This Month", "₹14,800", "#fff"],
        ].map(([label, val, color]) => (
          <div key={label} className="rounded-xl p-3 text-center" style={{ background: "#1A1E28", border: "1px solid #262B36" }}>
            <div className="text-[10px] text-white/40 mb-1">{label}</div>
            <div className="font-black text-lg" style={{ color }}>{val}</div>
          </div>
        ))}
      </div>
      <div className="rounded-xl p-4 mb-4" style={{ background: "#1A1E28", border: "1px solid #262B36" }}>
        <div className="font-bold text-sm mb-3">{isHi ? "पिछले 7 दिन" : "Last 7 days"}</div>
        <div className="flex items-end gap-2 h-28">
          {[600, 850, 400, 900, 700, 500, 850].map((v, i) => (
            <div key={i} className="flex-1 rounded-t-md" style={{ height: `${(v / 900) * 100}%`, background: C.teal }} />
          ))}
        </div>
      </div>
      <div className="font-bold text-sm mb-2">{isHi ? "भुगतान इतिहास" : "Payment History"}</div>
      <div className="flex flex-col gap-2">
        {[
          ["Electrical Repair · Indirapuram", "₹700", "Paid"],
          ["Switchboard fix · Vaishali", "₹450", "Paid"],
          ["Wiring inspection · Kaushambi", "₹300", "Pending"],
        ].map(([l, a, s]) => (
          <div key={l} className="rounded-xl p-3 flex items-center justify-between" style={{ background: "#1A1E28", border: "1px solid #262B36" }}>
            <span className="text-sm">{l}</span>
            <div className="text-right">
              <div className="font-bold text-sm">{a}</div>
              <Badge tone={s === "Paid" ? "teal" : "amber"}>{s}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkerProfileView({ worker, lang = "en" }) {
  const isHi = lang === "hi";
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="rounded-2xl p-5 mb-4 flex items-center gap-4" style={{ background: "#1A1E28", border: "1px solid #262B36" }}>
        <Avatar name={worker.name} color={worker.avatarColor} size={72} />
        <div>
          <div className="font-black text-xl">{worker.name}</div>
          <div className="text-sm text-white/50 mt-0.5">{catName(worker.skill)} · Indirapuram</div>
          <div className="flex gap-0.5 mt-1.5">
            {[1,2,3,4,5].map((i) => (
              <Star key={i} size={13} fill={i <= Math.round(worker.rating) ? C.amber : "#333"} color={i <= Math.round(worker.rating) ? C.amber : "#333"} />
            ))}
            <span className="text-xs ml-1" style={{ color: C.amber }}>{worker.rating}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          [isHi ? "काम किए" : "Jobs Done", worker.jobs, C.teal],
          [isHi ? "रेटिंग" : "Rating", worker.rating, C.amber],
          [isHi ? "विश्वसनीयता" : "Reliability", `${worker.reliability}%`, "#fff"],
        ].map(([label, val, color]) => (
          <div key={label} className="rounded-xl p-3 text-center" style={{ background: "#1A1E28", border: "1px solid #262B36" }}>
            <div className="font-black text-xl" style={{ color }}>{val}</div>
            <div className="text-[10px] text-white/40">{label}</div>
          </div>
        ))}
      </div>
      <div className="text-xs text-white/30 mb-4">{isHi ? "विश्वसनीयता स्कोर प्लेटफ़ॉर्म गतिविधि पर आधारित है।" : "Reliability score is based on platform activity."}</div>

      <div className="rounded-xl p-4 mb-4" style={{ background: "#1A1E28", border: "1px solid #262B36" }}>
        <div className="font-bold text-sm mb-3">{isHi ? "मेरे कौशल" : "My Skills"}</div>
        <div className="flex flex-wrap gap-2">
          {["Electrical Repair", "House Wiring", "Switchboard", "Fan Installation", "MCB Fitting"].map((s) => (
            <span key={s} className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: "#262B36", color: C.teal }}>{s}</span>
          ))}
        </div>
      </div>

      <div className="rounded-xl p-4 mb-4" style={{ background: "#1A1E28", border: "1px solid #262B36" }}>
        <div className="font-bold text-sm mb-3">{isHi ? "मेरी दर" : "My Rates"}</div>
        <div className="grid grid-cols-3 gap-2">
          {[["Hourly", "₹150"], ["Daily", "₹1,200"], ["Visit", "₹100"]].map(([l, v]) => (
            <div key={l} className="rounded-lg p-2.5 text-center" style={{ background: "#262B36" }}>
              <div className="text-[10px] text-white/40">{l}</div>
              <div className="font-bold text-sm">{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="font-bold text-sm mb-2">{isHi ? "काम का इतिहास" : "Work History"}</div>
      <div className="flex flex-col gap-2 mb-4">
        <div className="rounded-xl p-3" style={{ background: "#1A1E28", border: "1px solid #262B36" }}>
          <div className="font-semibold text-sm">House Wiring Repair</div>
          <div className="text-xs text-white/40 mt-0.5">Completed August 2026</div>
          <div className="mt-1.5 flex gap-0.5">{[1,2,3,4,5].map((i) => <Star key={i} size={12} fill={C.amber} color={C.amber} />)}</div>
        </div>
        <div className="rounded-xl p-3" style={{ background: "#1A1E28", border: "1px solid #262B36" }}>
          <div className="font-semibold text-sm">Switchboard Installation</div>
          <div className="text-xs text-white/40 mt-0.5">Completed July 2026</div>
          <div className="mt-1.5 flex gap-0.5">{[1,2,3,4].map((i) => <Star key={i} size={12} fill={C.amber} color={C.amber} />)}<Star size={12} fill="#333" color="#333" /></div>
        </div>
      </div>

      <div className="text-xs text-white/30 text-center">{isHi ? "SOLVO आपकी दरें जैसी हैं वैसे ही दिखाता है।" : "SOLVO shows your rates exactly as you set them."}</div>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* VOICE ASSISTANT MODAL — Real Web Speech API                            */
/* ---------------------------------------------------------------------- */
function VoiceAssistantModal({ onClose, lang, langCode, setLang, setView, setAvailable, worker }) {
  const [mode, setMode] = useState("menu"); // "menu" | "profile" | "command"
  const [profileStep, setProfileStep] = useState(0);
  const [profileData, setProfileData] = useState({ profession: "", skills: "", experience: "", area: "" });
  const [profileDone, setProfileDone] = useState(false);

  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [error, setError] = useState(null); // "unsupported" | "denied" | null

  const recRef = useRef(null);
  const isHi = lang === "hi";

  const SR = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
  const TTS = typeof window !== "undefined" && window.speechSynthesis;

  function speak(text) {
    if (!TTS) return;
    TTS.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = langCode;
    utt.rate = 0.92;
    TTS.speak(utt);
  }

  function startListening() {
    if (!SR) { setError("unsupported"); return; }
    setTranscript(""); setInterim(""); setConfirmed(false); setEditing(false); setError(null);
    const rec = new SR();
    recRef.current = rec;
    rec.lang = langCode;
    rec.continuous = false;
    rec.interimResults = true;
    rec.onstart = () => setListening(true);
    rec.onresult = (e) => {
      let fin = "", intr = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) fin += e.results[i][0].transcript;
        else intr += e.results[i][0].transcript;
      }
      if (intr) setInterim(intr);
      if (fin) { setTranscript(fin.trim()); setInterim(""); setListening(false); }
    };
    rec.onerror = (e) => {
      setListening(false);
      if (e.error === "not-allowed" || e.error === "service-not-allowed") setError("denied");
      else setError("unsupported");
    };
    rec.onend = () => setListening(false);
    try { rec.start(); } catch { setError("unsupported"); }
  }

  function stopListening() { recRef.current?.stop(); setListening(false); }

  function resetVoiceState() { setTranscript(""); setInterim(""); setConfirmed(false); setEditing(false); setEditText(""); }

  function confirmTranscript() {
    const text = (editing ? editText : transcript).trim();
    if (!text) return;
    if (mode === "profile") {
      const keys = ["profession", "skills", "experience", "area"];
      setProfileData(d => ({ ...d, [keys[profileStep]]: text }));
      resetVoiceState();
      if (profileStep < 3) setProfileStep(s => s + 1);
      else {
        setProfileDone(true);
        speak(isHi ? "आपकी जानकारी सेव हो गई है।" : "Your information has been saved.");
      }
    }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; recRef.current?.stop(); TTS?.cancel(); };
  }, []);

  const profileQuestions = [
    { hi: "आप क्या काम करते हैं?", en: "What kind of work do you do?" },
    { hi: "आपको कौन-कौन से काम आते हैं?", en: "What are your skills?" },
    { hi: "आपको कितने साल का अनुभव है?", en: "How many years of experience?" },
    { hi: "आप किस इलाके में काम करते हैं?", en: "Which area do you work in?" },
  ];
  const currentQ = profileQuestions[profileStep];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl flex flex-col"
        style={{ background: "#1A1E28", color: "#fff", maxHeight: "92vh" }}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-4 shrink-0" style={{ borderBottom: "1px solid #262B36" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: C.amber + "22" }}>
              <Mic size={18} color={C.amber} />
            </div>
            <div>
              <div className="font-bold" style={{ color: C.amber }}>{isHi ? "आवाज़ सहायता" : "Voice Assistant"}</div>
              <div className="text-[10px] text-white/40">{langCode}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid #3A3F50" }}>
              {["hi", "en"].map((l) => (
                <button key={l} onClick={() => setLang(l)}
                  className="px-3 py-1.5 text-xs font-bold"
                  style={{ background: lang === l ? C.teal : "transparent", color: lang === l ? "#fff" : "rgba(255,255,255,0.4)" }}
                >
                  {l === "hi" ? "हिं" : "EN"}
                </button>
              ))}
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10"><X size={18} /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">

          {/* ── ERROR: UNSUPPORTED ── */}
          {error === "unsupported" && (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🎙</div>
              <div className="font-bold text-base mb-2">{isHi ? "इस ब्राउज़र में आवाज़ सहायता उपलब्ध नहीं है।" : "Voice input not supported in this browser."}</div>
              <p className="text-sm text-white/50 mb-6">{isHi ? "Chrome या Edge ब्राउज़र में खोलें।" : "Please use Chrome or Edge."}</p>
              <button onClick={() => setError(null)} className="w-full py-3.5 rounded-2xl text-sm font-bold" style={{ background: "#262B36", color: "rgba(255,255,255,0.7)" }}>
                ⌨ {isHi ? "टाइप करके लिखें" : "Type instead"}
              </button>
            </div>
          )}

          {/* ── ERROR: PERMISSION DENIED ── */}
          {error === "denied" && (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🎙</div>
              <div className="font-bold text-base mb-2">{isHi ? "माइक्रोफ़ोन की अनुमति नहीं मिली" : "Microphone permission required"}</div>
              <p className="text-sm text-white/50 mb-6">{isHi ? "Voice assistance के लिए microphone की अनुमति दें।" : "Please allow microphone access."}</p>
              <button onClick={() => { setError(null); startListening(); }} className="w-full py-4 rounded-2xl font-bold text-sm text-white mb-3" style={{ background: C.teal }}>
                {isHi ? "माइक्रोफ़ोन अनुमति दें" : "Allow Microphone"}
              </button>
              <button onClick={() => setError(null)} className="w-full py-3.5 rounded-2xl text-sm font-bold" style={{ background: "#262B36", color: "rgba(255,255,255,0.6)" }}>
                ⌨ {isHi ? "टाइप करें" : "Type instead"}
              </button>
            </div>
          )}

          {/* ── MENU ── */}
          {!error && mode === "menu" && (
            <div>
              <p className="text-sm text-white/50 mb-5 text-center">{isHi ? "आप क्या करना चाहते हैं?" : "What would you like to do?"}</p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => { setMode("profile"); setProfileStep(0); setProfileDone(false); setProfileData({ profession: "", skills: "", experience: "", area: "" }); resetVoiceState(); }}
                  className="flex items-center gap-4 p-4 rounded-2xl text-left active:scale-[0.98]"
                  style={{ background: `${C.teal}18`, border: `1px solid ${C.teal}44` }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: C.teal + "33" }}>
                    <User size={22} color={C.teal} />
                  </div>
                  <div>
                    <div className="font-bold text-base" style={{ color: C.teal }}>{isHi ? "🎙 प्रोफ़ाइल बनाएं" : "🎙 Setup My Profile"}</div>
                    <div className="text-xs text-white/40 mt-0.5">{isHi ? "4 सवालों के जवाब बोलकर दें" : "Answer 4 questions by voice"}</div>
                  </div>
                </button>
                <button
                  onClick={() => { setMode("command"); resetVoiceState(); }}
                  className="flex items-center gap-4 p-4 rounded-2xl text-left active:scale-[0.98]"
                  style={{ background: "#262B36", border: "1px solid #3A3F50" }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: C.amber + "22" }}>
                    <Mic size={22} color={C.amber} />
                  </div>
                  <div>
                    <div className="font-bold text-base" style={{ color: C.amber }}>{isHi ? "🎙 Voice Commands" : "🎙 Voice Commands"}</div>
                    <div className="text-xs text-white/40 mt-0.5">{isHi ? "बोलकर ऐप कंट्रोल करें" : "Control the app by speaking"}</div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* ── PROFILE WIZARD ── */}
          {!error && mode === "profile" && !profileDone && (
            <div>
              <button onClick={() => { setMode("menu"); recRef.current?.stop(); setListening(false); resetVoiceState(); }}
                className="flex items-center gap-1 text-xs text-white/40 mb-4 hover:text-white/70">
                <ChevronLeft size={14} />{isHi ? "वापस" : "Back"}
              </button>

              {/* Progress bar */}
              <div className="flex gap-1.5 mb-6">
                {profileQuestions.map((_, i) => (
                  <div key={i} className="flex-1 h-1.5 rounded-full transition-all" style={{ background: i <= profileStep ? C.teal : "#262B36" }} />
                ))}
              </div>

              {/* Question */}
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">🎙</div>
                <div className="font-black text-xl mb-2" style={{ color: C.amber }}>
                  {isHi ? currentQ.hi : currentQ.en}
                </div>
                <div className="text-xs text-white/40 mb-3">{isHi ? `सवाल ${profileStep + 1} / 4` : `Question ${profileStep + 1} of 4`}</div>
                <button
                  onClick={() => speak(isHi ? currentQ.hi : currentQ.en)}
                  className="flex items-center gap-1.5 text-xs mx-auto px-3 py-1.5 rounded-full"
                  style={{ background: "#262B36", color: C.amber }}
                >
                  <Volume2 size={12} /> {isHi ? "🔊 सुनें" : "🔊 Listen"}
                </button>
              </div>

              {/* Previously answered */}
              {Object.values(profileData).some(Boolean) && (
                <div className="rounded-xl p-3 mb-4 text-xs" style={{ background: "#262B36" }}>
                  {profileData.profession && <div className="mb-1"><span className="text-white/40">{isHi ? "काम: " : "Work: "}</span><span className="font-semibold">{profileData.profession}</span></div>}
                  {profileData.skills && <div className="mb-1"><span className="text-white/40">{isHi ? "कौशल: " : "Skills: "}</span><span className="font-semibold">{profileData.skills}</span></div>}
                  {profileData.experience && <div className="mb-1"><span className="text-white/40">{isHi ? "अनुभव: " : "Exp: "}</span><span className="font-semibold">{profileData.experience}</span></div>}
                  {profileData.area && <div><span className="text-white/40">{isHi ? "इलाका: " : "Area: "}</span><span className="font-semibold">{profileData.area}</span></div>}
                </div>
              )}

              {/* Listening indicator */}
              {listening && (
                <div className="text-center py-5 mb-4 rounded-2xl" style={{ background: "#262B36", border: `2px solid ${C.teal}44` }}>
                  <div className="flex justify-center gap-1.5 mb-3">
                    {[0,1,2,3,4].map(i => (
                      <div key={i} className="w-1.5 rounded-full" style={{
                        background: C.teal,
                        height: `${14 + i * 4}px`,
                        animation: `voiceBar ${0.5 + i * 0.12}s ease-in-out infinite alternate`,
                      }} />
                    ))}
                  </div>
                  <div className="text-sm font-bold" style={{ color: C.teal }}>🔴 {isHi ? "सुन रहा हूँ..." : "Listening..."}</div>
                  {interim && <div className="text-sm text-white/60 mt-2 px-4">"{interim}"</div>}
                </div>
              )}

              {/* Recognized text */}
              {transcript && !listening && (
                <div className="rounded-2xl p-4 mb-4" style={{ background: "#262B36", border: `1px solid ${C.teal}33` }}>
                  <div className="text-xs mb-2" style={{ color: C.teal }}>{isHi ? "आपने कहा:" : "You said:"}</div>
                  {editing ? (
                    <textarea
                      autoFocus
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                      className="w-full rounded-xl p-3 text-sm outline-none resize-none"
                      style={{ background: "#1A1E28", border: `1px solid ${C.teal}55`, color: "#fff", minHeight: 80 }}
                    />
                  ) : (
                    <div className="text-base font-semibold leading-relaxed">"{transcript}"</div>
                  )}
                  <div className="flex gap-2 mt-3">
                    {editing ? (
                      <>
                        <button onClick={() => setEditing(false)} className="flex-1 py-3 rounded-xl text-sm font-bold" style={{ background: "#1A1E28", color: "rgba(255,255,255,0.5)" }}>
                          {isHi ? "रद्द" : "Cancel"}
                        </button>
                        <button onClick={confirmTranscript} className="flex-1 py-3 rounded-xl text-sm font-bold text-white" style={{ background: C.teal }}>
                          ✓ {isHi ? "सेव करें" : "Save"}
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => { setEditing(true); setEditText(transcript); }} className="flex-1 py-3 rounded-xl text-sm font-bold" style={{ background: "#1A1E28", color: C.amber }}>
                          ✏ {isHi ? "बदलें" : "Edit"}
                        </button>
                        <button onClick={confirmTranscript} className="flex-1 py-3 rounded-xl text-sm font-bold text-white" style={{ background: C.teal }}>
                          ✓ {isHi ? "ठीक है" : "Use This"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Speak / Type buttons */}
              {!listening && !transcript && (
                <div className="flex flex-col gap-3">
                  <button
                    onClick={startListening}
                    className="w-full py-5 rounded-2xl font-black text-lg text-white active:scale-[0.98]"
                    style={{ background: `linear-gradient(135deg, ${C.teal}, ${C.tealDeep})`, boxShadow: "0 4px 20px rgba(14,156,134,0.35)" }}
                  >
                    🎙 {isHi ? "बोलिए" : "Tap to Speak"}
                  </button>
                  <button
                    onClick={() => { setEditing(true); setEditText(""); setTranscript(" "); }}
                    className="w-full py-3.5 rounded-2xl font-bold text-sm"
                    style={{ background: "#262B36", color: "rgba(255,255,255,0.6)", border: "1px solid #3A3F50" }}
                  >
                    ⌨ {isHi ? "टाइप करके लिखें" : "Type instead"}
                  </button>
                </div>
              )}

              {listening && (
                <button onClick={stopListening} className="w-full py-4 rounded-2xl font-bold text-sm" style={{ background: "#3A1515", color: "#F87171", border: "1px solid #5C2B2B" }}>
                  ⏹ {isHi ? "रोकें" : "Stop Listening"}
                </button>
              )}

              {transcript && !listening && (
                <button onClick={resetVoiceState} className="w-full mt-2 py-3 rounded-2xl font-bold text-sm" style={{ background: "#262B36", color: "rgba(255,255,255,0.5)" }}>
                  🔄 {isHi ? "दोबारा बोलें" : "Try Again"}
                </button>
              )}
            </div>
          )}

          {/* ── PROFILE COMPLETE ── */}
          {!error && mode === "profile" && profileDone && (
            <div className="text-center py-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: C.teal + "22" }}>
                <CheckCircle2 size={40} color={C.teal} />
              </div>
              <h2 className="font-black text-2xl mb-2">{isHi ? "जानकारी सेव हुई!" : "Profile Updated!"}</h2>
              <p className="text-sm text-white/50 mb-4">{isHi ? "आपकी जानकारी सेव हो गई है।" : "Your information has been saved."}</p>
              <button
                onClick={() => speak(isHi ? "आपकी जानकारी सेव हो गई है।" : "Your information has been saved successfully.")}
                className="flex items-center gap-2 mx-auto mb-6 px-4 py-2 rounded-full text-sm font-bold"
                style={{ background: C.amber + "22", color: C.amber, border: `1px solid ${C.amber}44` }}
              >
                <Volume2 size={16} /> {isHi ? "🔊 सुनें" : "🔊 Play"}
              </button>
              <div className="rounded-2xl p-4 text-left mb-5" style={{ background: "#262B36" }}>
                <div className="font-black text-lg mb-1">{worker.name}</div>
                <div className="text-sm font-bold mb-4" style={{ color: C.teal }}>{profileData.profession || catName(worker.skill)}</div>
                {[
                  [isHi ? "कौशल" : "Skills", profileData.skills],
                  [isHi ? "अनुभव" : "Experience", profileData.experience],
                  [isHi ? "इलाका" : "Area", profileData.area],
                ].map(([k, v]) => v && (
                  <div key={k} className="flex items-start gap-2 mb-2">
                    <span className="text-xs text-white/40 w-24 shrink-0 pt-0.5">{k}:</span>
                    <span className="text-sm font-semibold flex-1">{v}</span>
                  </div>
                ))}
              </div>
              <button onClick={onClose} className="w-full py-4 rounded-2xl font-black text-base text-white" style={{ background: C.teal }}>
                {isHi ? "ठीक है, बंद करें" : "Done"}
              </button>
            </div>
          )}

          {/* ── COMMAND MODE ── */}
          {!error && mode === "command" && (
            <div>
              <button onClick={() => { setMode("menu"); recRef.current?.stop(); setListening(false); resetVoiceState(); }}
                className="flex items-center gap-1 text-xs text-white/40 mb-4 hover:text-white/70">
                <ChevronLeft size={14} />{isHi ? "वापस" : "Back"}
              </button>

              <div className="text-center mb-5">
                <div className="text-4xl mb-2">🎙</div>
                <div className="font-bold" style={{ color: C.amber }}>{isHi ? "बोलकर कंट्रोल करें" : "Control by voice"}</div>
              </div>

              {listening && (
                <div className="text-center py-4 rounded-2xl mb-4" style={{ background: "#262B36", border: `2px solid ${C.teal}44` }}>
                  <div className="text-sm font-bold mb-1" style={{ color: C.teal }}>🔴 {isHi ? "सुन रहा हूँ..." : "Listening..."}</div>
                  {interim && <div className="text-sm text-white/60">"{interim}"</div>}
                </div>
              )}
              {transcript && !listening && (
                <div className="rounded-xl p-3 mb-4" style={{ background: "#262B36" }}>
                  <div className="text-xs mb-1" style={{ color: C.teal }}>{isHi ? "आपने कहा:" : "You said:"}</div>
                  <div className="text-sm font-semibold">"{transcript}"</div>
                </div>
              )}

              {!listening ? (
                <button onClick={startListening} className="w-full py-4 rounded-2xl font-black text-base text-white mb-3" style={{ background: `linear-gradient(135deg, ${C.teal}, ${C.tealDeep})`, boxShadow: "0 4px 16px rgba(14,156,134,0.3)" }}>
                  🎙 {isHi ? "बोलिए" : "Speak"}
                </button>
              ) : (
                <button onClick={stopListening} className="w-full py-4 rounded-2xl font-bold text-sm mb-3" style={{ background: "#3A1515", color: "#F87171" }}>
                  ⏹ {isHi ? "रोकें" : "Stop"}
                </button>
              )}

              <div className="text-xs text-white/40 mb-2 font-semibold">{isHi ? "उदाहरण:" : "Examples:"}</div>
              <div className="flex flex-col gap-2">
                {(isHi
                  ? ['"उपलब्ध हूँ"', '"कमाई दिखाओ"', '"काम दिखाओ"', '"प्रोफ़ाइल दिखाओ"']
                  : ['"I am available"', '"Show earnings"', '"Show jobs"', '"Show my profile"']
                ).map((cmd) => (
                  <div key={cmd} className="rounded-xl px-4 py-3 text-sm font-semibold" style={{ background: "#262B36", color: "rgba(255,255,255,0.65)" }}>
                    {cmd}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <style>{`
          @keyframes voiceBar { from { transform: scaleY(0.5); } to { transform: scaleY(1.5); } }
        `}</style>
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
  const [ivrState, setIvrState] = useState("ringing");
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
/* DEMO JOURNEY                                                           */
/* ---------------------------------------------------------------------- */
function DemoJourney({ goto }) {
  const [step, setStep] = useState(0);
  const [jobCount, setJobCount] = useState(3);
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
    { title: "Rahul's profile updates", body: "Jobs Completed: 42 → 43. Rating updates. Reputation history recorded.", actor: "worker", onEnter: () => setJobCount(43) },
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
              <div className="text-center"><div className="font-black text-xl" style={{ color: C.teal }}>{jobCount}</div><div className="text-xs" style={{ color: C.muted }}>Jobs Completed</div></div>
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
  else if (screen === "login") content = <LoginPage goto={goto} />;
  else if (screen === "roleSelect") content = <RoleSelect goto={goto} />;
  else if (screen === "workerSearch") content = <WorkerSearchPage goto={goto} />;
  else if (screen === "trust") content = <TrustSafetyPage goto={goto} />;
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
