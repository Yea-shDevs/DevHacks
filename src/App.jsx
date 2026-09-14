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
/* DESIGN TOKENS                                                          */
/* ink:#151A24  indigo:#1E2A55  teal:#0E9C86  amber:#F2A33C  bg:#F5F6F3   */
/* ---------------------------------------------------------------------- */
const C = {
  ink: "#151A24",
  indigo: "#1E2A55",
  indigoDeep: "#131C3B",
  teal: "#0E9C86",
  tealDeep: "#0B7C6B",
  amber: "#F2A33C",
  amberDeep: "#D6852090",
  bg: "#F5F6F3",
  card: "#FFFFFF",
  line: "#E4E6E0",
  muted: "#6B7180",
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
  { id: "w1", name: "Rahul Kumar", skill: "electrician", exp: "6 yrs", area: "Indirapuram", rate: "₹500–₹800", jobs: 42, rating: 4.7, reliability: 92, badges: ["identity", "skill", "community"], langs: ["Hindi", "Hinglish"], avatarColor: C.teal },
  { id: "w2", name: "Suresh Yadav", skill: "electrician", exp: "9 yrs", area: "Vaishali", rate: "₹600–₹900", jobs: 78, rating: 4.9, reliability: 96, badges: ["identity", "skill", "community"], langs: ["Hindi"], avatarColor: C.indigo },
  { id: "w3", name: "Aslam Sheikh", skill: "electrician", exp: "3 yrs", area: "Raj Nagar", rate: "₹400–₹700", jobs: 19, rating: 4.4, reliability: 84, badges: ["identity", "skill"], langs: ["Hindi", "English"], avatarColor: C.amber },
  { id: "w4", name: "Vikram Singh", skill: "plumber", exp: "8 yrs", area: "Vasundhara", rate: "₹350–₹650", jobs: 61, rating: 4.6, reliability: 90, badges: ["identity", "skill", "community"], langs: ["Hindi"], avatarColor: C.teal },
  { id: "w5", name: "Manoj Prajapati", skill: "carpenter", exp: "12 yrs", area: "Kaushambi", rate: "₹500–₹1000", jobs: 103, rating: 4.8, reliability: 95, badges: ["identity", "skill", "community"], langs: ["Hindi"], avatarColor: C.indigo },
  { id: "w6", name: "Farhan Ali", skill: "painter", exp: "5 yrs", area: "Sahibabad", rate: "₹400/day", jobs: 34, rating: 4.5, reliability: 88, badges: ["identity", "skill"], langs: ["Hindi", "Hinglish"], avatarColor: C.amber },
  { id: "w7", name: "Deepak Mishra", skill: "labourer", exp: "4 yrs", area: "Ghaziabad City", rate: "₹500/day", jobs: 27, rating: 4.3, reliability: 81, badges: ["identity"], langs: ["Hindi"], avatarColor: C.teal },
  { id: "w8", name: "Ramesh Chand", skill: "loader", exp: "7 yrs", area: "Crossings Republik", rate: "₹450/day", jobs: 55, rating: 4.6, reliability: 89, badges: ["identity", "skill"], langs: ["Hindi"], avatarColor: C.indigo },
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
function Avatar({ name, color, size = 48 }) {
  const initials = name.split(" ").map((p) => p[0]).slice(0, 2).join("");
  return (
    <div
      style={{ width: size, height: size, background: color, color: "#fff", fontWeight: 700 }}
      className="rounded-full flex items-center justify-center shrink-0"
    >
      {initials}
    </div>
  );
}

function Badge({ children, tone = "teal" }) {
  const map = {
    teal: { bg: "#E6F5F2", fg: C.tealDeep },
    amber: { bg: "#FCEEDA", fg: "#9A5F0F" },
    indigo: { bg: "#E7EAF3", fg: C.indigo },
    grey: { bg: "#EEEFEC", fg: C.muted },
  };
  const s = map[tone];
  return (
    <span style={{ background: s.bg, color: s.fg }} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold">
      {children}
    </span>
  );
}

function Btn({ children, onClick, variant = "primary", full, icon: Icon, size = "md", disabled }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition active:scale-[0.98] disabled:opacity-50";
  const sizes = { md: "px-5 py-3 text-sm", lg: "px-6 py-4 text-base", xl: "px-8 py-5 text-lg" };
  const variants = {
    primary: { background: C.indigo, color: "#fff" },
    teal: { background: C.teal, color: "#fff" },
    amber: { background: C.amber, color: "#1a1200" },
    outline: { background: "transparent", color: C.indigo, border: `1.5px solid ${C.indigo}` },
    ghost: { background: "#fff", color: C.ink, border: `1px solid ${C.line}` },
    danger: { background: "#FBE9E7", color: "#B23A2E" },
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={variants[variant]}
      className={`${base} ${sizes[size]} ${full ? "w-full" : ""}`}
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
      style={{ background: C.card, border: `1px solid ${C.line}`, ...style }}
      className={`rounded-2xl ${onClick ? "cursor-pointer hover:shadow-md transition" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return <div style={{ color: C.teal }} className="text-sm font-bold tracking-wide mb-2">{children}</div>;
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
    <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3" style={{ background: C.card, borderBottom: `1px solid ${C.line}` }}>
      <div className="flex items-center gap-2">
        {onBack && (
          <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-black/5">
            <ChevronLeft size={22} />
          </button>
        )}
        <span className="font-bold text-lg" style={{ color: C.indigo }}>{title}</span>
      </div>
      {right}
    </div>
  );
}

function BottomNav({ items, active, onChange }) {
  return (
    <div className="sticky bottom-0 z-20 grid" style={{ gridTemplateColumns: `repeat(${items.length},1fr)`, background: C.card, borderTop: `1px solid ${C.line}` }}>
      {items.map((it) => (
        <button key={it.key} onClick={() => onChange(it.key)} className="flex flex-col items-center gap-1 py-2.5">
          <it.icon size={22} color={active === it.key ? C.teal : C.muted} />
          <span className="text-[11px] font-semibold" style={{ color: active === it.key ? C.teal : C.muted }}>{it.label}</span>
        </button>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* LANDING PAGE                                                           */
/* ---------------------------------------------------------------------- */
function Landing({ goto }) {
  return (
    <div style={{ background: C.bg, color: C.ink }} className="min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div style={{ background: C.indigo }} className="w-9 h-9 rounded-lg flex items-center justify-center">
            <span style={{ color: C.amber }} className="font-black text-lg">S</span>
          </div>
          <span className="font-black text-xl tracking-tight" style={{ color: C.indigo }}>SOLVO</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold" style={{ color: C.ink }}>
          <a href="#how" className="hover:opacity-70">How it works</a>
          <a href="#categories" className="hover:opacity-70">Categories</a>
          <a href="#access" className="hover:opacity-70">Access for everyone</a>
        </div>
        <div className="flex gap-2">
          <Btn variant="ghost" onClick={() => goto("roleSelect")}>Log in</Btn>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <Badge tone="amber">Ghaziabad · Delhi NCR</Badge>
          <h1 className="mt-4 font-black leading-[1.05]" style={{ fontSize: "clamp(2.4rem,5vw,3.6rem)", color: C.indigo }}>
            Work Without Barriers.
          </h1>
          <p className="mt-5 text-lg" style={{ color: C.muted, maxWidth: 480 }}>
            SOLVO connects skilled hands with real opportunities through smartphones, voice assistance, basic phones, and community support.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Btn variant="teal" size="lg" icon={Search} onClick={() => goto("roleSelect", "customer")}>Find a Worker</Btn>
            <Btn variant="primary" size="lg" icon={Briefcase} onClick={() => goto("roleSelect", "worker")}>Find Work</Btn>
          </div>
          <a href="#how" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold" style={{ color: C.indigo }}>
            Explore How SOLVO Works <ArrowRight size={15} />
          </a>
        </div>
        <div className="relative">
          <Card className="p-6" style={{ background: C.indigoDeep, border: "none" }}>
            <div className="text-white/70 text-xs font-bold tracking-wide mb-4">ONE WORKER · ONE NETWORK · MANY DOORS IN</div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Home, label: "Smartphone App" },
                { icon: Mic, label: "Voice Assistance" },
                { icon: Phone, label: "Basic Phone / IVR" },
                { icon: Handshake, label: "Community Partner" },
              ].map((d) => (
                <div key={d.label} className="rounded-xl p-4 flex flex-col gap-3" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <d.icon size={22} color={C.amber} />
                  <span className="text-white text-sm font-semibold">{d.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl p-4 flex items-center gap-3" style={{ background: C.teal }}>
              <CircleDot size={18} className="text-white" />
              <span className="text-white text-sm font-bold">All roads lead to one worker profile</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Categories */}
      <div id="categories" className="max-w-6xl mx-auto px-6 py-14">
        <SectionLabel>What you can get done</SectionLabel>
        <h2 className="font-black text-3xl mb-8" style={{ color: C.indigo }}>Book a Professional, or hire workers for the day.</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <div className="font-bold mb-3">Book a Professional</div>
            <div className="grid grid-cols-3 gap-3">
              {PRO_CATEGORIES.map((c) => (
                <Card key={c.id} className="p-4 flex flex-col items-center gap-2 text-center" onClick={() => goto("roleSelect", "customer")}>
                  <c.icon size={24} color={C.teal} />
                  <span className="text-xs font-semibold">{c.name}</span>
                </Card>
              ))}
            </div>
          </div>
          <div>
            <div className="font-bold mb-3">Hire Workers</div>
            <div className="grid grid-cols-3 gap-3">
              {WORKER_CATEGORIES.map((c) => (
                <Card key={c.id} className="p-4 flex flex-col items-center gap-2 text-center" onClick={() => goto("roleSelect", "customer")}>
                  <c.icon size={24} color={C.indigo} />
                  <span className="text-xs font-semibold">{c.name}</span>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div id="how" style={{ background: "#EFF1EC" }} className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel>How SOLVO works</SectionLabel>
          <h2 className="font-black text-3xl mb-10" style={{ color: C.indigo }}>From a problem at home to a job well done.</h2>
          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {[
              ["Choose a Service", "Select the type of worker needed."],
              ["Describe the Work", "Use text, an image, or your voice."],
              ["Get Matched", "SOLVO finds suitable nearby workers."],
              ["Worker Accepts", "The worker receives and accepts the opportunity."],
              ["Work Gets Done", "Track progress until completion."],
              ["Pay and Review", "Complete payment and rate the experience."],
            ].map(([t, d], i) => (
              <Card key={t} className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div style={{ background: C.indigo }} className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold">{i + 1}</div>
                  <div className="font-bold">{t}</div>
                </div>
                <div className="text-sm" style={{ color: C.muted }}>{d}</div>
              </Card>
            ))}
          </div>
          <div className="rounded-2xl p-6" style={{ background: C.indigo }}>
            <div className="text-amber-200/90 text-xs font-bold tracking-wide mb-3" style={{ color: C.amber }}>FOR WORKERS — KEPT SIMPLE ON PURPOSE</div>
            <div className="flex flex-wrap items-center gap-3 text-white font-bold text-lg">
              {["Available", "Receive Job", "Accept", "Complete", "Earn"].map((s, i, arr) => (
                <React.Fragment key={s}>
                  <span className="px-4 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.1)" }}>{s}</span>
                  {i < arr.length - 1 && <ArrowRight size={18} color={C.amber} />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Access methods */}
      <div id="access" className="max-w-6xl mx-auto px-6 py-16">
        <SectionLabel>Built for real access, not assumed access</SectionLabel>
        <h2 className="font-black text-3xl mb-8" style={{ color: C.indigo }}>One work network. Four ways in.</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            [Home, "Smartphone / Web", "A full app for customers, workers and admins."],
            [Mic, "Voice Assistance", "Speak commands — accept jobs, check earnings, switch language."],
            [Phone, "Basic Phone (IVR/SMS)", "No smartphone needed. Press 1 to accept, reply YES by SMS."],
            [Handshake, "Assisted Onboarding", "Local partners help workers build a profile in person."],
          ].map(([Icon, t, d]) => (
            <Card key={t} className="p-5">
              <Icon size={24} color={C.teal} className="mb-3" />
              <div className="font-bold mb-1">{t}</div>
              <div className="text-sm" style={{ color: C.muted }}>{d}</div>
            </Card>
          ))}
        </div>
        <div className="mt-6">
          <Btn variant="outline" icon={Phone} onClick={() => goto("access")}>See SOLVO Access demo (IVR / SMS / Voice)</Btn>
        </div>
      </div>

      {/* Trust */}
      <div style={{ background: "#EFF1EC" }} className="py-14">
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel>Trust, stated honestly</SectionLabel>
          <h2 className="font-black text-2xl mb-6" style={{ color: C.indigo }}>We don't promise guarantees. We show you what's been checked.</h2>
          <TrustBadgeExplainer />
        </div>
      </div>

      {/* Footer CTA */}
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="font-black text-3xl mb-3" style={{ color: C.indigo }}>Every Skilled Hand Deserves an Opportunity.</h2>
        <p className="mb-6" style={{ color: C.muted }}>See the complete journey — from a customer's request to a worker getting paid.</p>
        <Btn variant="amber" size="lg" onClick={() => goto("demo")}>Watch the SOLVO demo journey</Btn>
      </div>
      <div className="text-center py-6 text-xs" style={{ color: C.muted }}>SOLVO · Work Without Barriers · MVP for Ghaziabad / Delhi NCR</div>
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
          <div style={{ background: C.indigo }} className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <span style={{ color: C.amber }} className="font-black text-2xl">S</span>
          </div>
          <h1 className="font-black text-2xl" style={{ color: C.indigo }}>Continue as</h1>
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
          <div className="p-4 max-w-3xl mx-auto">
            <div className="rounded-xl p-3 mb-4 text-sm" style={{ background: "#E7EAF3", color: C.indigo }}>
              Recommended based on skills, availability, service area, pricing preferences, and work history.
            </div>
            <div className="flex flex-col gap-3">
              {matchedWorkers.map((w, i) => (
                <Card key={w.id} className="p-4">
                  <div className="flex gap-3">
                    <Avatar name={w.name} color={w.avatarColor} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-bold">{w.name}</div>
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
                  <Btn full variant="teal" className="mt-3" onClick={() => pickWorker(w)}>Select {w.name.split(" ")[0]}</Btn>
                </Card>
              ))}
            </div>
          </div>
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
            <div className="flex flex-col gap-2">
              {WORKERS.map((w) => (
                <Card key={w.id} className="p-3 flex items-center gap-3">
                  <Avatar name={w.name} color={w.avatarColor} size={40} />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">{w.name}</div>
                    <div className="text-xs" style={{ color: C.muted }}>{catName(w.skill)} · {w.area} · {w.jobs} jobs</div>
                  </div>
                  <div className="hidden sm:flex gap-1.5">
                    {w.badges.includes("identity") && <Badge tone="indigo">Identity</Badge>}
                    {w.badges.includes("skill") && <Badge tone="teal">Skill</Badge>}
                    {w.badges.includes("community") && <Badge tone="amber">Trusted</Badge>}
                  </div>
                  <Badge tone="grey"><Star size={11} fill={C.amber} color={C.amber} />{w.rating}</Badge>
                </Card>
              ))}
            </div>
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
    <div style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" }} className="min-h-screen w-full">
      {content}
    </div>
  );
}
