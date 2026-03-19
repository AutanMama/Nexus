import React, { useState, useEffect } from 'react';
import { 
  Bell, Search, ShoppingBag, Coffee, Car, 
  ArrowRight, Fingerprint, Eye, X, CheckCircle2,
  ShieldCheck, Zap, Globe, Menu, ChevronRight, 
  CreditCard as CardIcon, User, Mail, Lock, UserPlus
} from 'lucide-react';

// --- MAIN APP COMPONENT ---
export default function App() {
  const [view, setView] = useState('landing'); // 'landing', 'login', 'register', 'app'
  const [activeTab, setActiveTab] = useState('home');
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [view]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* PERSISTENT GUEST NAVBAR (Only shown for guest views) */}
      {(view === 'landing' || view === 'login' || view === 'register') && (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
          <div className="flex justify-between items-center p-6 max-w-6xl mx-auto">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <ShieldCheck className="text-white" size={20} />
              </div>
              <span className="font-black text-xl tracking-tight">NEXUS</span>
            </div>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setView('login')} 
                className={`text-sm font-bold transition-colors ${view === 'login' ? 'text-emerald-500' : 'text-slate-600 hover:text-emerald-500'}`}
              >
                Login
              </button>
              <button 
                onClick={() => setView('register')} 
                className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold active:scale-95 transition-all shadow-lg shadow-slate-200"
              >
                Open Account
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* CONTENT AREA */}
      <div className={(view === 'landing' || view === 'login' || view === 'register') ? "pt-24" : ""}>
        {view === 'landing' && <LandingPage onStart={() => setView('register')} />}
        
        {(view === 'login' || view === 'register') && (
          <AuthScreen 
            mode={view} 
            setView={setView} 
            onSuccess={() => setView('app')} 
          />
        )}

        {view === 'app' && (
          <div className="max-w-md mx-auto min-h-screen bg-slate-50 pb-24 relative shadow-2xl shadow-slate-200">
            <AppHeader user="John Doe" />
            <main className="px-6 pt-4">
              {activeTab === 'home' && <HomeView onSend={() => setIsSendModalOpen(true)} />}
              {activeTab === 'analytics' && <AnalyticsView />}
              {activeTab === 'cards' && <CardsView />}
              {activeTab === 'profile' && <ProfileView onLogout={() => setView('landing')} />}
            </main>
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
            {isSendModalOpen && <SendMoneyModal onClose={() => setIsSendModalOpen(false)} />}
          </div>
        )}
      </div>
    </div>
  );
}

// --- AUTH COMPONENT (LOGIN & REGISTER) ---
function AuthScreen({ mode, setView, onSuccess }) {
  const isLogin = mode === 'login';

  return (
    <div className="max-w-md mx-auto min-h-[80vh] flex flex-col justify-center px-8 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-black text-slate-900 mb-3">
          {isLogin ? "Welcome back" : "Create Account"}
        </h2>
        <p className="text-slate-400 font-medium">
          {isLogin ? "Enter your details to access your vault." : "Join 2M+ users banking with Nexus today."}
        </p>
      </div>

      <div className="space-y-4">
        {!isLogin && (
          <div className="relative group">
            <User className="absolute left-4 top-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={20} />
            <input type="text" placeholder="Full Name" className="w-full p-4 pl-12 bg-white rounded-2xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-medium shadow-sm" />
          </div>
        )}
        
        <div className="relative group">
          <Mail className="absolute left-4 top-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={20} />
          <input type="email" placeholder="Email Address" className="w-full p-4 pl-12 bg-white rounded-2xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-medium shadow-sm" />
        </div>

        <div className="relative group">
          <Lock className="absolute left-4 top-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={20} />
          <input type="password" placeholder="Password" className="w-full p-4 pl-12 bg-white rounded-2xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 font-medium shadow-sm" />
          <Eye size={18} className="absolute right-4 top-4 text-slate-300 cursor-pointer" />
        </div>

        <button 
          onClick={onSuccess} 
          className="w-full bg-emerald-500 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-emerald-100 active:scale-95 transition-all mt-4 flex items-center justify-center gap-2"
        >
          {isLogin ? "Sign In" : "Get Started"} <ChevronRight size={20} />
        </button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-slate-400 font-bold text-sm">
          {isLogin ? "New to Nexus?" : "Already have an account?"}
          <button 
            onClick={() => setView(isLogin ? 'register' : 'login')}
            className="ml-2 text-emerald-500 hover:underline transition-all"
          >
            {isLogin ? "Create one here" : "Login here"}
          </button>
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-100">
        <button className="w-full flex items-center justify-center gap-3 py-4 bg-slate-50 rounded-2xl text-slate-500 font-bold text-sm active:scale-95 transition-all">
          <Fingerprint size={24} className="text-emerald-500" />
          Secure Biometric Login
        </button>
      </div>
    </div>
  );
}

// --- LANDING PAGE ---
function LandingPage({ onStart }) {
  return (
    <div className="animate-in fade-in duration-700">
      <section className="px-6 py-20 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold mb-8">
          <Zap size={14} fill="currentColor" /> OVER 2 MILLION ACTIVE USERS
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[1] mb-8 tracking-tighter">
          Banking for the <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">Next Generation.</span>
        </h1>
        <p className="text-slate-500 text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
          Experience the most beautiful way to manage your finances. 
          Instant transfers, smart analytics, and world-class security.
        </p>
        <button onClick={onStart} className="bg-emerald-500 text-white px-12 py-6 rounded-[2rem] text-xl font-black shadow-2xl shadow-emerald-200 active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto">
          Open Free Account <UserPlus size={24} />
        </button>
      </section>

      {/* Social Proof / Features */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          {[
            { icon: Globe, title: "No Borders", desc: "Spend in any currency without the ridiculous bank fees." },
            { icon: ShieldCheck, title: "Vault Security", desc: "Your funds are protected by multi-layer encryption." },
            { icon: Zap, title: "Lightning Fast", desc: "Move money across the globe in less than 2 seconds." }
          ].map((f, i) => (
            <div key={i} className="group">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-emerald-500 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                <f.icon size={28} />
              </div>
              <h3 className="text-2xl font-black mb-4">{f.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// --- DASHBOARD COMPONENTS ---
function HomeView({ onSend }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <BalanceCard onAction={onSend} />
      <TransactionSection />
    </div>
  );
}

// (Other components like BalanceCard, TransactionSection, etc. remain the same as previous versions)
// Ensure they use the updated font-black and emerald-500 styles to stay consistent.