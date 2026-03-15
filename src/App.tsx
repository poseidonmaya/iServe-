/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  LayoutDashboard, 
  ClipboardCheck, 
  TrendingUp, 
  Users, 
  Menu, 
  X, 
  ArrowRight,
  ShieldCheck,
  Zap,
  BarChart3,
  Sun,
  Moon,
  Home
} from 'lucide-react';
import { Logo } from './components/Logo';
import { BackgroundAnimation } from './components/BackgroundAnimation';

type Page = 'home' | 'smart-menu' | 'system' | 'auditing' | 'consultancy' | 'about' | 'figma-export';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Check for URL parameter to auto-enable figma-export mode
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'figma') {
      setCurrentPage('figma-export');
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  const NavLink = ({ page, label }: { page: Page; label: string }) => (
    <button
      onClick={() => {
        setCurrentPage(page);
        setIsMenuOpen(false);
      }}
      className={`nav-link ${currentPage === page ? 'text-white after:w-full' : ''}`}
    >
      {label}
    </button>
  );

  if (currentPage === 'figma-export') {
    return <FigmaExportView onExit={() => setCurrentPage('home')} />;
  }

  return (
    <div className="min-h-screen bg-obsidian selection:bg-steel/30 relative">
      <BackgroundAnimation />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-bg-main/60 backdrop-blur-xl border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <button onClick={() => setCurrentPage('home')} className="hover:opacity-80 transition-opacity">
            <Logo className="h-8" />
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            <NavLink page="home" label="Home" />
            <NavLink page="smart-menu" label="Smart Menu" />
            <NavLink page="system" label="System" />
            <NavLink page="auditing" label="Auditing" />
            <NavLink page="consultancy" label="Consultancy" />
            <NavLink page="about" label="About" />
            <div className="h-6 w-[1px] bg-border-subtle mx-2" />
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-text-muted hover:text-text-main transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="text-sm font-semibold text-text-main hover:text-brand-primary transition-colors">Log In</button>
            <button className="btn-primary py-3 text-sm">Get Started</button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 lg:hidden">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-text-muted hover:text-text-main transition-colors"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button className="text-text-main p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-24 left-0 w-full bg-bg-main border-b border-border-subtle overflow-hidden lg:hidden"
            >
              <div className="p-8 flex flex-col gap-8">
                <NavLink page="home" label="Home" />
                <NavLink page="smart-menu" label="Smart Menu" />
                <NavLink page="system" label="System" />
                <NavLink page="auditing" label="Auditing" />
                <NavLink page="consultancy" label="Consultancy" />
                <NavLink page="about" label="About" />
                <hr className="border-border-subtle" />
                <button className="text-left font-semibold text-text-main">Log In</button>
                <button className="btn-primary w-full">Get Started</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-24">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
          {currentPage === 'smart-menu' && <SmartMenuPage key="smart-menu" />}
          {currentPage === 'system' && <SystemPage key="system" />}
          {currentPage === 'auditing' && <AuditingPage key="auditing" />}
          {currentPage === 'consultancy' && <ConsultancyPage key="consultancy" />}
          {currentPage === 'about' && <AboutPage key="about" />}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-midnight/30 border-t border-white/5 pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
            <div className="lg:col-span-2">
              <Logo className="mb-8 h-8" />
              <p className="text-muted max-w-sm text-lg">
                The structured operating layer for modern restaurants. 
                Combining digital systems with operational expertise.
              </p>
              <button 
                onClick={() => setCurrentPage('figma-export')}
                className="mt-8 text-xs text-steel hover:underline flex items-center gap-2"
              >
                <LayoutDashboard size={12} /> Export to Figma
              </button>
            </div>
            <div>
              <h4 className="font-bold mb-8 text-white text-sm uppercase tracking-widest">Platform</h4>
              <div className="flex flex-col gap-5">
                <button onClick={() => setCurrentPage('smart-menu')} className="text-muted hover:text-steel text-left transition-colors">Smart Menu</button>
                <button onClick={() => setCurrentPage('system')} className="text-muted hover:text-steel text-left transition-colors">Management System</button>
                <button onClick={() => setCurrentPage('auditing')} className="text-muted hover:text-steel text-left transition-colors">Auditing</button>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-8 text-white text-sm uppercase tracking-widest">Company</h4>
              <div className="flex flex-col gap-5">
                <button onClick={() => setCurrentPage('about')} className="text-muted hover:text-steel text-left transition-colors">About Us</button>
                <button onClick={() => setCurrentPage('consultancy')} className="text-muted hover:text-steel text-left transition-colors">Consultancy</button>
                <a href="#" className="text-muted hover:text-steel transition-colors">Careers</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-8 text-white text-sm uppercase tracking-widest">Support</h4>
              <div className="flex flex-col gap-5">
                <a href="#" className="text-muted hover:text-steel transition-colors">Help Center</a>
                <a href="#" className="text-muted hover:text-steel transition-colors">Contact</a>
                <a href="#" className="text-muted hover:text-steel transition-colors">API Docs</a>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex gap-8">
              <p className="text-xs text-muted">© 2026 iServe+. All rights reserved.</p>
              <a href="#" className="text-xs text-muted hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-xs text-muted hover:text-white transition-colors">Terms</a>
            </div>
            <div className="flex gap-6">
              {/* Social placeholders */}
              <div className="w-5 h-5 bg-white/10 rounded-full hover:bg-steel transition-colors cursor-pointer" />
              <div className="w-5 h-5 bg-white/10 rounded-full hover:bg-steel transition-colors cursor-pointer" />
              <div className="w-5 h-5 bg-white/10 rounded-full hover:bg-steel transition-colors cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomePage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Logo className="h-10 mb-12 opacity-40" />
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-steel/10 border border-steel/20 text-steel text-xs font-bold uppercase tracking-widest mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-steel opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-steel"></span>
              </span>
              New: Smart Menu v2.0
            </div>
            <h1 className="heading-xl mb-10">
              The Digital <span className="text-steel">Operating Layer</span> For Restaurants.
            </h1>
            <p className="text-xl text-muted mb-12 max-w-xl">
              iServe+ connects your menu, operations, and financial data into one disciplined framework. 
              Built for owners who value structure over guesswork.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button className="btn-primary">Request a Demo</button>
              <button onClick={() => onNavigate('smart-menu')} className="btn-secondary flex items-center justify-center gap-3">
                Explore Smart Menu <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-panel p-4 aspect-square max-w-[500px] mx-auto relative overflow-hidden group">
              <img 
                src="https://picsum.photos/seed/restaurant-tech/800/800" 
                alt="Restaurant Technology" 
                className="w-full h-full object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <div className="glass-panel p-6 border-white/20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-steel flex items-center justify-center">
                      <TrendingUp size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-muted uppercase tracking-widest">Live Performance</p>
                      <p className="text-xl font-bold">+24.8% Margin Growth</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-steel/20 rounded-full blur-[80px] -z-10" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-midnight/30 rounded-full blur-[100px] -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="section-container py-0">
          <p className="text-center text-xs font-bold text-muted uppercase tracking-[0.3em] mb-12">Trusted by leading F&B groups</p>
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-30 grayscale">
            {/* Logo placeholders */}
            <div className="text-2xl font-black tracking-tighter">RESTO.</div>
            <div className="text-2xl font-black tracking-tighter italic underline decoration-steel">GROUP</div>
            <div className="text-2xl font-black tracking-tighter uppercase">Kitchen.</div>
            <div className="text-2xl font-black tracking-tighter">DINE+</div>
            <div className="text-2xl font-black tracking-tighter">BISTRO</div>
          </div>
        </div>
      </section>

      {/* Alternating Features */}
      <section className="py-32">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center mb-48">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-steel/10 flex items-center justify-center mb-8">
                <Zap className="text-steel" size={32} />
              </div>
              <h2 className="heading-lg mb-8">Smart Menu. The Entry Layer.</h2>
              <p className="text-xl text-muted mb-10 leading-relaxed">
                Eliminate outdated pricing and menu confusion. Our structured digital menu ensures accuracy and provides deep insights into customer preferences.
              </p>
              <ul className="space-y-5 mb-12">
                {['Real-time price updates', 'Customer interaction tracking', 'Brand-consistent presentation', 'Structured data export'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-light/80">
                    <div className="w-5 h-5 rounded-full bg-steel/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-steel" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={() => onNavigate('smart-menu')} className="btn-secondary">Learn More about Smart Menu</button>
            </div>
            <div className="glass-panel p-4 aspect-video relative overflow-hidden">
              <img 
                src="https://picsum.photos/seed/menu-tech/1200/800" 
                alt="Smart Menu Interface" 
                className="w-full h-full object-cover rounded-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="order-2 lg:order-1 glass-panel p-4 aspect-video relative overflow-hidden">
              <img 
                src="https://picsum.photos/seed/dashboard/1200/800" 
                alt="Management Dashboard" 
                className="w-full h-full object-cover rounded-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="w-16 h-16 rounded-2xl bg-steel/10 flex items-center justify-center mb-8">
                <LayoutDashboard className="text-steel" size={32} />
              </div>
              <h2 className="heading-lg mb-8">Unified Management System.</h2>
              <p className="text-xl text-muted mb-10 leading-relaxed">
                Connect your sales, items, and operational visibility into one clean dashboard. Stop guessing and start managing with data-backed discipline.
              </p>
              <ul className="space-y-5 mb-12">
                {['Live sales performance', 'Item-level profitability', 'Operational blind-spot detection', 'Margin leakage alerts'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-light/80">
                    <div className="w-5 h-5 rounded-full bg-steel/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-steel" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={() => onNavigate('system')} className="btn-secondary">Explore Management System</button>
            </div>
          </div>
        </div>
      </section>

      {/* Why iServe+ Grid */}
      <section className="bg-midnight/20 py-32">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="heading-lg mb-8">Why iServe+?</h2>
            <p className="text-xl text-muted">We don't just provide software. We provide the structure your restaurant needs to scale profitably.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <WhyCard 
              icon={<ShieldCheck size={32} />}
              title="Financial Oversight"
              description="Deep auditing and financial diagnostics to eliminate leakage and protect your margins."
            />
            <WhyCard 
              icon={<Users size={32} />}
              title="Operational Expertise"
              description="Advisory services grounded in real data, helping you implement disciplined SOPs."
            />
            <WhyCard 
              icon={<BarChart3 size={32} />}
              title="Data-Driven Results"
              description="Measurable performance tracking that turns operational noise into clear action."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-container text-center">
        <div className="glass-panel p-16 md:p-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-steel/10 to-transparent -z-10" />
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg mb-10">Ready to Bring Structure to Your Restaurant?</h2>
            <p className="text-xl text-muted mb-12">
              Join the growing list of operators who have eliminated guesswork with iServe+.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="btn-primary">Request a Demo</button>
              <button className="btn-secondary">Speak to an Advisor</button>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function WhyCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass-panel p-10 hover:border-steel/30 transition-all group">
      <div className="mb-8 text-steel group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-6">{title}</h3>
      <p className="text-muted leading-relaxed">{description}</p>
    </div>
  );
}

function FeatureCard({ icon, title, description, onClick }: { icon: React.ReactNode, title: string, description: string, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="glass-panel p-8 hover:bg-white/5 transition-all cursor-pointer group"
    >
      <div className="mb-6 p-3 bg-white/5 rounded-xl w-fit group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-muted leading-relaxed mb-6">{description}</p>
      <div className="flex items-center gap-2 text-steel font-medium text-sm">
        Learn More <ArrowRight size={16} />
      </div>
    </div>
  );
}

function SmartMenuPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-container">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20">
          <h1 className="heading-lg mb-8">Professional Digital Menu. Structured From Day One.</h1>
          <p className="text-xl text-muted">
            Smart Menu is the entry layer of iServe+. It eliminates outdated pricing, menu confusion, and presentation inconsistency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="glass-panel p-10">
            <h2 className="text-2xl font-bold mb-8">What It Does</h2>
            <ul className="space-y-6">
              {[
                'Converts paper menus into structured digital format',
                'Maintains price accuracy',
                'Provides visibility into customer interaction',
                'Preserves brand identity'
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-steel shrink-0" />
                  <span className="text-slate-light/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center">
            <div className="mb-12">
              <h3 className="text-steel font-mono text-xs uppercase tracking-widest mb-4">Pricing</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold">$12</span>
                <span className="text-muted">/ month</span>
              </div>
              <p className="text-muted mt-2">or $120 / year</p>
            </div>
            <button className="btn-primary w-fit">Activate Smart Menu</button>
            <p className="text-sm text-muted mt-8">Fast setup. Clean presentation. Zero operational disruption.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SystemPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-container">
      <div className="max-w-4xl mx-auto">
        <h1 className="heading-lg mb-8">Operational Control, Unified.</h1>
        <p className="text-xl text-muted mb-20">
          The iServe+ Management System connects Menu, Sales, Operations, and Reporting into one dashboard. One structure.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="glass-panel p-8">
            <h3 className="text-xl font-bold mb-6">Designed to:</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-muted"><ChevronRight size={16} className="text-steel" /> Monitor item performance</li>
              <li className="flex items-center gap-3 text-muted"><ChevronRight size={16} className="text-steel" /> Detect inefficiencies</li>
              <li className="flex items-center gap-3 text-muted"><ChevronRight size={16} className="text-steel" /> Improve margin discipline</li>
              <li className="flex items-center gap-3 text-muted"><ChevronRight size={16} className="text-steel" /> Reduce operational blind spots</li>
            </ul>
          </div>
          <div className="bg-midnight/20 rounded-2xl p-8 flex flex-col justify-center items-center text-center">
            <TrendingUp size={48} className="text-steel mb-6" />
            <h3 className="text-xl font-bold mb-4">Upgrade to Full Control</h3>
            <button className="btn-primary">Join Early Access</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AuditingPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-container">
      <div className="max-w-4xl mx-auto">
        <h1 className="heading-lg mb-8">Structured Financial Oversight for Restaurants</h1>
        <p className="text-xl text-muted mb-20">
          Restaurants require specialized financial discipline. iServe+ provides structured auditing and financial oversight designed specifically for restaurants.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <AuditItem title="Operational Audits" desc="Identify process gaps and inefficiencies." />
          <AuditItem title="Cost Leakage Analysis" desc="Detect waste, shrinkage, and pricing inconsistencies." />
          <AuditItem title="Food Cost Validation" desc="Verify recipe costing and margin accuracy." />
          <AuditItem title="Financial Report Structuring" desc="Clean P&L alignment with operational data." />
          <AuditItem title="SOP & KPI Alignment" desc="Create measurable operational benchmarks." />
          <div className="glass-panel p-8 flex flex-col justify-center">
            <p className="font-bold text-steel mb-4 italic">"We don't only show the data. We validate it. Correct it. Structure it."</p>
            <button className="text-sm font-bold text-white flex items-center gap-2">Request Financial Review <ArrowRight size={14} /></button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AuditItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="glass-panel p-8">
      <h3 className="font-bold mb-3">{title}</h3>
      <p className="text-sm text-muted leading-relaxed">{desc}</p>
    </div>
  );
}

function ConsultancyPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-container">
      <div className="max-w-4xl mx-auto">
        <h1 className="heading-lg mb-8">Operational Discipline. Measurable Results.</h1>
        <p className="text-xl text-muted mb-20">
          Our advisory is grounded in real operational data — not opinion. Consulting supported by system-backed data.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-steel font-mono text-xs uppercase tracking-widest mb-6">Our Focus</h3>
            <ul className="space-y-4">
              {['Margin improvement', 'Cost control', 'SOP development', 'Performance structure', 'Strategic stabilization'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-lg">
                  <ClipboardCheck size={20} className="text-steel" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-panel p-10">
            <h3 className="text-xl font-bold mb-6">Who We Work With</h3>
            <div className="space-y-4 mb-10">
              <p className="text-muted">• New F&B startups</p>
              <p className="text-muted">• Growing restaurants</p>
              <p className="text-muted">• Underperforming businesses</p>
            </div>
            <button className="btn-primary w-full">Book Advisory Session</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AboutPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-container">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20">
          <h1 className="heading-lg mb-8">iServe+</h1>
          <p className="text-xl text-muted leading-relaxed">
            iServe+ is an operations and advisory firm built for modern restaurants. 
            Our mission is simple: Help restaurant owners manage with clarity — not guessing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold">We combine:</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-steel/10 rounded-xl flex items-center justify-center text-steel"><Zap /></div>
                <span className="text-lg font-medium">Structured digital systems</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-steel/10 rounded-xl flex items-center justify-center text-steel"><ShieldCheck /></div>
                <span className="text-lg font-medium">Financial oversight</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-steel/10 rounded-xl flex items-center justify-center text-steel"><Users /></div>
                <span className="text-lg font-medium">Operational expertise</span>
              </div>
            </div>
          </div>
          <div className="glass-panel p-10">
            <h3 className="text-steel font-mono text-xs uppercase tracking-widest mb-6">Positioning</h3>
            <div className="space-y-4 text-slate-light/70">
              <p>• A structured SaaS platform</p>
              <p>• An advisory authority</p>
              <p>• A financial oversight partner</p>
              <p>• A restaurant-focused discipline system</p>
              <div className="pt-6 border-t border-white/5 mt-6">
                <p className="text-white font-medium">Not a startup tool.</p>
                <p className="text-white font-medium">Not a generic consultancy.</p>
                <p className="text-white font-medium">Not a basic POS.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FigmaExportView({ onExit }: { onExit: () => void }) {
  return (
    <div className="bg-bg-main min-h-screen">
      {/* Floating Instructions */}
      <div className="fixed top-6 right-6 z-[100] glass-panel p-6 max-w-sm shadow-2xl border-brand-primary/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <LayoutDashboard className="text-brand-primary" size={20} />
            Figma Export Helper
          </h3>
          <button onClick={onExit} className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <X size={16} />
          </button>
        </div>
        <p className="text-sm text-muted mb-6">
          Use this view to capture your entire site into Figma using a plugin.
        </p>
        <div className="space-y-4 mb-6">
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary text-xs font-bold shrink-0">1</div>
            <p className="text-xs text-muted">Install the <span className="text-white font-medium">html.to.design</span> plugin in Figma.</p>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary text-xs font-bold shrink-0">2</div>
            <p className="text-xs text-muted">Copy this current URL and paste it into the plugin.</p>
          </div>
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary text-xs font-bold shrink-0">3</div>
            <p className="text-xs text-muted">Select "Import" to generate your fully editable Figma file.</p>
          </div>
        </div>
        <button 
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert('URL copied to clipboard!');
          }}
          className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2"
        >
          Copy URL for Figma
        </button>
      </div>

      {/* Static Site Content (No Animations for cleaner capture) */}
      <div className="pt-12">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <Logo className="h-8 mb-4" />
          <h1 className="text-4xl font-bold">Design System & Page Map</h1>
          <p className="text-muted">Capturing all pages for Figma import...</p>
        </div>

        <div className="space-y-32 pb-32">
          <div className="border-t border-white/5 pt-12">
            <p className="px-6 text-xs font-mono text-steel uppercase tracking-widest mb-8">Page: Home</p>
            <HomePage onNavigate={() => {}} />
          </div>
          <div className="border-t border-white/5 pt-12">
            <p className="px-6 text-xs font-mono text-steel uppercase tracking-widest mb-8">Page: Smart Menu</p>
            <SmartMenuPage />
          </div>
          <div className="border-t border-white/5 pt-12">
            <p className="px-6 text-xs font-mono text-steel uppercase tracking-widest mb-8">Page: Management System</p>
            <SystemPage />
          </div>
          <div className="border-t border-white/5 pt-12">
            <p className="px-6 text-xs font-mono text-steel uppercase tracking-widest mb-8">Page: Auditing</p>
            <AuditingPage />
          </div>
          <div className="border-t border-white/5 pt-12">
            <p className="px-6 text-xs font-mono text-steel uppercase tracking-widest mb-8">Page: Consultancy</p>
            <ConsultancyPage />
          </div>
          <div className="border-t border-white/5 pt-12">
            <p className="px-6 text-xs font-mono text-steel uppercase tracking-widest mb-8">Page: About</p>
            <AboutPage />
          </div>
        </div>
      </div>
    </div>
  );
}
