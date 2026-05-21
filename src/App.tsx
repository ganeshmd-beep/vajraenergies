/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Sun, Battery, Factory, Wrench, Lightbulb, 
  Settings, CheckCircle, ArrowRight, Instagram, 
  Linkedin, Facebook, Phone, Mail, MapPin,
  Clock, ArrowUpRight, ShieldCheck, Zap, Leaf, MessageCircle,
  Users, Home, BarChart
} from 'lucide-react';
import slideRooftopOne from './assets/WhatsApp Image 2026-05-05 at 4.56.36 PM.jpeg';
import slideRooftopTwo from './assets/WhatsApp Image 2026-05-05 at 4.56.40 PM.jpeg';
import slideRooftopThree from './assets/WhatsApp Image 2026-05-05 at 4.56.41 PM (1).jpeg';
import slideRooftopClean from './assets/WhatsApp Image 2026-05-05 at 4.56.37 PM.jpeg';
import slideGroundOne from './assets/Ground mount solar/WhatsApp Image 2026-05-05 at 4.56.38 PM.jpeg';
import slideGroundTwo from './assets/Ground mount solar/WhatsApp Image 2026-05-05 at 4.56.39 PM.jpeg';
import slideGroundThree from './assets/Ground mount solar/WhatsApp Image 2026-05-05 at 4.56.38 PM (1).jpeg';
import slideGroundFour from './assets/Ground mount solar/WhatsApp Image 2026-05-05 at 4.56.38 PM (2).jpeg';
import slideGroundColumns from './assets/Ground mount column post.jpeg';
import slideInverter from './assets/Inverter picture.jpeg';
import slideRooftopFour from './assets/WhatsApp Image 2026-05-05 at 4.56.35 PM.jpeg';
import slideRooftopFive from './assets/WhatsApp Image 2026-05-05 at 4.56.37 PM (1).jpeg';
import slideRooftopSix from './assets/WhatsApp Image 2026-05-05 at 4.56.41 PM (2).jpeg';
import logoImage from './assets/logo.jpeg';

// --- TYPES ---
type Page = 'home' | 'about' | 'services' | 'service-detail' | 'projects' | 'project-detail' | 'blog' | 'contact';

const companyName = 'VAJRA ENERGIES LLP';
const salesEmail = 'sales@vajraenergies.info';
const phoneNumber = '7095696666';
const phoneLink = 'tel:7095696666';
const whatsappLink = 'https://wa.me/917095696666?text=Hi%20VAJRA%20ENERGIES%20LLP%2C%20I%27d%20like%20to%20discuss%20a%20solar%20project.';
const solutionTypes = ['Residential Solar', 'Commercial Solar', 'Industrial Solar', 'Maintenance', 'O&M Services'];

type ServiceItem = {
  title: string;
  tagline: string;
  num: string;
  icon: typeof Home;
  image: string;
  description: string;
  benefits: string[];
  idealFor: string;
  includes: string[];
  timeline: string;
  heroNote: string;
};

type ProjectItem = {
  title: string;
  cap: string;
  type: 'Residential' | 'Commercial' | 'Industrial';
  outcome: string;
  img: string;
  summary: string;
  scope: string[];
  highlight: string;
};

const serviceItems: ServiceItem[] = [
  {
    title: 'Residential Solar',
    tagline: 'Homes that feel future-ready',
    num: '01',
    icon: Home,
    image: slideRooftopOne,
    description: 'Custom rooftop solar for apartments, independent houses, and villas, designed to reduce bills while keeping the finish neat and premium.',
    benefits: ['Rooftop survey and capacity planning', 'Subsidy and net-metering support', 'Clean installation and handover'],
    idealFor: 'Homeowners who want a tidy rooftop solution with lower bills and minimal maintenance.',
    includes: ['Load assessment', 'Rooftop layout planning', 'Panel and inverter selection', 'Approvals and handover'],
    timeline: 'Typically 2 to 6 weeks depending on site size and approvals.',
    heroNote: 'Best for homes that want efficient savings with a neat rooftop finish.',
  },
  {
    title: 'Commercial Solar',
    tagline: 'Cleaner energy for modern businesses',
    num: '02',
    icon: Factory,
    image: slideRooftopFour,
    description: 'Scalable solar systems for offices, retail spaces, schools, and hospitality assets that lower operating costs and improve brand value.',
    benefits: ['Custom design for each building', 'Grid integration and approvals', 'Operational savings with better control'],
    idealFor: 'Businesses that want stronger operating margins, better ESG value, and dependable execution.',
    includes: ['Consumption analysis', 'Structural review', 'Utility coordination', 'Performance monitoring'],
    timeline: 'Usually 3 to 8 weeks based on scale and building complexity.',
    heroNote: 'Ideal for organizations that want to reduce power cost without compromising presentation.',
  },
  {
    title: 'Industrial Solar',
    tagline: 'Built for serious energy demand',
    num: '03',
    icon: Zap,
    image: slideGroundOne,
    description: 'Ground-mount and large-capacity solar solutions for factories, warehouses, and cold storage facilities that need dependable output.',
    benefits: ['MW-scale engineering support', 'Energy audits and ROI planning', 'Long-term performance monitoring'],
    idealFor: 'Plants and logistics sites that need serious capacity, predictable operating cost, and long-term uptime.',
    includes: ['Energy audit', 'Land or roof feasibility', 'System design', 'Commissioning and maintenance planning'],
    timeline: 'Project schedules vary by capacity, approvals, and site readiness.',
    heroNote: 'Good for higher-load sites that need scale, structure, and long-term reliability.',
  },
  {
    title: 'Maintenance',
    tagline: 'Keep the system performing well',
    num: '04',
    icon: Wrench,
    image: slideInverter,
    description: 'Maintenance support that keeps assets clean, monitored, and reliable long after commissioning.',
    benefits: ['24/7 monitoring support', 'Routine cleaning and inspection', 'Fault response and reporting'],
    idealFor: 'Clients who already have a solar asset and want stronger output, fewer faults, and easier oversight.',
    includes: ['Remote monitoring', 'Cleaning schedule', 'Fault diagnostics', 'Health reporting'],
    timeline: 'Can begin immediately after the initial site review.',
    heroNote: 'Designed for owners who want steady output and fewer surprises.',
  },
  {
    title: 'Solar Consultation',
    tagline: 'Clear advice before you commit',
    num: '05',
    icon: Lightbulb,
    image: slideGroundColumns,
    description: 'A practical first step for owners who want a clear feasibility view before moving ahead with a project.',
    benefits: ['Site survey and shading review', 'Energy and savings analysis', 'Feasibility and payback guidance'],
    idealFor: 'Anyone who wants a second opinion, a feasibility study, or a better understanding of solar ROI.',
    includes: ['Bill analysis', 'Shading review', 'Savings estimate', 'Project recommendation'],
    timeline: 'A consultation can usually be arranged within a few days.',
    heroNote: 'A smart first step before committing to a full installation.',
  },
  {
    title: 'INC Services',
    tagline: 'Approvals, paperwork, and coordination',
    num: '06',
    icon: Settings,
    image: slideRooftopSix,
    description: 'End-to-end support for net-metering, utility coordination, and compliance so launch stays smooth.',
    benefits: ['Documentation and liaison support', 'Net-metering assistance', 'Launch readiness tracking'],
    idealFor: 'Projects that need a clean paperwork trail and smoother coordination with utility authorities.',
    includes: ['Application support', 'Single-line diagrams', 'Approval tracking', 'Launch coordination'],
    timeline: 'Handled in parallel with the project timeline.',
    heroNote: 'Helpful when approvals, documentation, and utility steps need careful handling.',
  },
  {
    title: 'O&M Services',
    tagline: 'Keep assets running at peak performance',
    num: '07',
    icon: Wrench,
    image: slideRooftopTwo,
    description: 'Operations and maintenance support that keeps solar assets clean, monitored, and performing reliably over time.',
    benefits: ['Scheduled inspections and preventive care', 'Module cleaning and performance checks', 'Fault response and uptime support'],
    idealFor: 'Asset owners who want better generation, fewer surprises, and long-term reliability from their solar plant.',
    includes: ['Preventive maintenance', 'Site inspections', 'Cleaning schedules', 'Issue resolution tracking'],
    timeline: 'Can be started immediately or folded into an existing maintenance contract.',
    heroNote: 'Best for teams that want ongoing care, stable output, and less downtime.',
  },
];

const projectItems: ProjectItem[] = [
  {
    title: 'The Sunlit Estate',
    cap: '15kW Elite',
    type: 'Residential',
    outcome: 'Net-Zero for 25yrs',
    img: slideRooftopOne,
    summary: 'A premium rooftop system built for a private residence with a clean finish and a compact footprint.',
    scope: ['Rooftop layout planning', 'Inverter and panel integration', 'Net-metering support'],
    highlight: 'Best for homeowners who want reliable savings without a heavy visual footprint.',
  },
  {
    title: 'Crystal Mall Hub',
    cap: '120kW Hybrid',
    type: 'Commercial',
    outcome: 'OPEX Reduction 45%',
    img: slideRooftopFour,
    summary: 'A commercial rooftop deployment designed to reduce overheads and fit a busy business environment.',
    scope: ['Commercial load study', 'Grid coordination', 'Performance monitoring'],
    highlight: 'Ideal for retail or hospitality assets that need practical savings and dependable output.',
  },
  {
    title: 'Nexa Industrial',
    cap: '1.2MW Prime',
    type: 'Industrial',
    outcome: 'Carbon-Neutral MFG',
    img: slideGroundOne,
    summary: 'A large-scale industrial installation planned for output, access, and long-term asset performance.',
    scope: ['Ground-mount engineering', 'Large-capacity design', 'Maintenance planning'],
    highlight: 'Built for high-load sites that need predictable cost and serious energy capacity.',
  },
  {
    title: 'Metro HealthCare',
    cap: '85kW Backup',
    type: 'Commercial',
    outcome: 'Critical Power Sync',
    img: slideRooftopThree,
    summary: 'A hospital-facing rooftop system focused on stable backup support and cleaner energy coverage.',
    scope: ['Critical load mapping', 'Backup alignment', 'Operational continuity'],
    highlight: 'Useful when uptime and uninterrupted support matter as much as savings.',
  },
  {
    title: 'Kisan Cold Storage',
    cap: '300kW Solar',
    type: 'Industrial',
    outcome: 'ROI achieved in 3.2yrs',
    img: slideGroundTwo,
    summary: 'A cold-storage project optimized for reliable output, cost control, and a measurable payback.',
    scope: ['Energy audit', 'Cold-load planning', 'ROI analysis'],
    highlight: 'Well suited for facilities where predictable operating cost is the main goal.',
  },
  {
    title: 'Marine Sky Villa',
    cap: '20kW Bespoke',
    type: 'Residential',
    outcome: 'Smart Home Integrated',
    img: slideRooftopFive,
    summary: 'A bespoke villa installation shaped around clean visual integration and premium residential use.',
    scope: ['Bespoke rooftop layout', 'Smart-home sync', 'Tidy handover'],
    highlight: 'Great for premium homes that need solar to look as polished as the house itself.',
  },
];

const heroSlides = [
  {
    src: slideRooftopOne,
    title: 'Rooftop solar built with precision',
    caption: 'Residential installations with a clean, modern finish.',
    stat: '25-year performance mindset',
  },
  {
    src: slideGroundOne,
    title: 'Ground-mount systems at scale',
    caption: 'Engineered for performance, access, and long-term reliability.',
    stat: 'Utility-grade execution',
  },
  {
    src: slideRooftopClean,
    title: 'Rooftop systems built with precision',
    caption: 'A cleaner visual for residential and commercial solar.',
    stat: 'Premium execution',
  },
  {
    src: slideGroundTwo,
    title: 'Large arrays with a premium finish',
    caption: 'A cleaner presentation for serious solar infrastructure.',
    stat: 'Clean engineering detail',
  },
  {
    src: slideGroundColumns,
    title: 'Foundations and structure that hold the line',
    caption: 'Ground-mount engineering with a clean site presence.',
    stat: 'Structural precision',
  },
];

// --- COMPONENTS ---

const AnimatedCounter = ({
  value,
  suffix = '',
  prefix = '',
  duration = 1600,
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    let startTime: number | null = null;

    const tick = (time: number) => {
      if (startTime === null) {
        startTime = time;
      }

      const progress = Math.min((time - startTime) / duration, 1);
      const nextValue = value * (1 - Math.pow(1 - progress, 3));
      setDisplayValue(nextValue);

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [value, duration]);

  return (
    <span>
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
};

const Navbar = ({ activePage, onNavigate }: { activePage: Page, onNavigate: (p: Page) => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHomeTop = activePage === 'home' && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks: { label: string, id: Page }[] = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Projects', id: 'projects' },
    { label: 'Blog', id: 'blog' },
  ];

  return (
    <nav className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isHomeTop
        ? 'bg-[linear-gradient(135deg,rgba(3,8,6,0.90),rgba(18,56,31,0.72))] backdrop-blur-2xl py-4 border-b border-white/10 shadow-[0_18px_60px_rgba(0,0,0,0.22)]'
        : 'bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(246,249,241,0.92))] backdrop-blur-2xl py-4 border-b border-white/70 shadow-[0_14px_45px_rgba(15,23,42,0.07)]'
    }`}>
      <div className="container-custom flex items-center justify-between">
        <button onClick={() => onNavigate('home')} className="flex items-center gap-4 group text-left">
          <div className="relative w-14 h-14 flex items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(245,248,241,0.9))] shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
            <img src={logoImage} alt={companyName} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className={`text-xl md:text-2xl font-display font-bold tracking-tight uppercase leading-none ${isHomeTop ? 'text-white' : 'text-primary'}`}>{companyName}</span>
            <span className={`text-[9px] font-bold tracking-[0.45em] uppercase mt-1 ${isHomeTop ? 'text-white/65' : 'text-gray-400'}`}>Solar Engineering</span>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-12 text-left">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`group relative inline-flex items-center py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5 ${activePage === link.id ? (isHomeTop ? 'text-white' : 'text-primary') : (isHomeTop ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-primary')}`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-1/2 h-1 -translate-x-1/2 rounded-full bg-secondary transition-all duration-300 group-hover:w-full ${activePage === link.id ? 'w-full' : 'w-0'}`} />
            </button>
          ))}
          <button 
            onClick={() => onNavigate('contact')}
            className="btn-primary shadow-[0_18px_45px_rgba(36,95,42,0.2)]"
          >
            Contact Us <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      {/* Mobile Toggle */}
        <button
          className={`lg:hidden p-2 rounded-xl transition-all duration-300 hover:-translate-y-0.5 ${isHomeTop ? 'text-white hover:bg-white/10' : 'text-primary hover:bg-primary/5'}`}
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/45 backdrop-blur-md px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -24, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.985 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="mx-auto mt-2 flex max-h-[calc(100dvh-1.5rem)] w-full max-w-md flex-col overflow-hidden rounded-[1.75rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.985),rgba(246,249,241,0.965))] shadow-[0_30px_90px_rgba(15,23,42,0.28)]"
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.45em] text-gray-400">Menu</p>
                  <p className="mt-1 text-sm font-semibold text-primary">{companyName}</p>
                </div>
                <button
                  className="rounded-full p-2 text-primary transition-colors hover:bg-primary/5"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={28} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-5">
                <div className="space-y-2.5">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => { onNavigate(link.id); setMobileMenuOpen(false); }}
                      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition-all duration-300 active:scale-[0.99] ${
                        activePage === link.id
                          ? 'border-secondary/25 bg-secondary/10 text-primary shadow-[0_10px_28px_rgba(240,185,11,0.12)]'
                          : 'border-gray-100 bg-white text-primary hover:border-primary/15 hover:bg-primary/[0.03]'
                      }`}
                    >
                      <span className="text-[0.95rem] font-bold uppercase tracking-[0.18em]">{link.label}</span>
                      <span className={`h-2.5 w-2.5 rounded-full ${activePage === link.id ? 'bg-secondary' : 'bg-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 bg-white px-5 py-4">
                <button 
                  onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }}
                  className="btn-primary w-full py-4"
                >
                  Contact Us
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ onNavigate }: { onNavigate: (p: Page) => void }) => {
  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(135deg,#0f4317,#13531d_45%,#0d3813)] pt-20 pb-8 text-white">
      <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_top_left,white_0,transparent_32%),radial-gradient(circle_at_bottom_right,white_0,transparent_28%)]"></div>
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.8fr_0.8fr_1.25fr] gap-14 items-start">
          <div className="text-left max-w-md">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 overflow-hidden rounded-2xl bg-white/95 p-2">
                <img src={logoImage} alt={companyName} className="h-full w-full object-contain" />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-display font-bold tracking-tight uppercase leading-none">{companyName}</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.45em] text-white/60 mt-2">Solar Engineering</p>
              </div>
            </div>
            <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-sm">
              Leading the way in sustainable solar energy solutions across India.
            </p>
            <div className="flex gap-4 mt-8">
              {[
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Linkedin, href: '#' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-all"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold mb-8 uppercase tracking-[0.45em] text-white">Quick Links</h4>
            <ul className="space-y-5 text-white/85">
              {['Home', 'About', 'Services', 'Projects', 'Blog', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigate(item.toLowerCase().replace(' ', '-') as Page)}
                    className="text-left text-base font-medium hover:text-secondary transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold mb-8 uppercase tracking-[0.45em] text-white">Services</h4>
            <ul className="space-y-5 text-white/85">
              {['Residential Solar', 'Commercial Solar', 'Industrial Solar', 'Maintenance', 'O&M Services', 'Consultation', 'INC Services'].map((item) => (
                <li key={item} className="text-base font-medium">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold mb-8 uppercase tracking-[0.45em] text-white">Contact Us</h4>
            <div className="space-y-6 text-white/85">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <p className="text-base leading-relaxed">
                  Vajra Residency, Hyderabad,<br />Telangana, India
                </p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1 text-white/55">Phone</p>
                  <a href={phoneLink} className="text-base font-semibold hover:text-secondary transition-colors">
                    {phoneNumber}
                  </a>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1 text-white/55">Email</p>
                  <a href={`mailto:${salesEmail}`} className="text-base font-semibold hover:text-secondary transition-colors break-all">
                    {salesEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/65 text-sm">
          <p>&copy; 2025 {companyName}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};;


// --- PAGES ---

const HomePage = ({ onNavigate }: { onNavigate: (p: Page) => void }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, []);

  const currentSlide = heroSlides[activeSlide];

  return (
    <div className="overflow-hidden bg-[#f8faf7]">
      <section className="relative isolate min-h-[88vh] overflow-hidden bg-[#07110d] pt-0">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide.src}
              src={currentSlide.src}
              alt={currentSlide.title}
              className="h-full w-full object-cover object-[center_28%] md:object-[center_24%]"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,8,6,0.92)_0%,rgba(3,8,6,0.74)_42%,rgba(3,8,6,0.28)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(240,185,11,0.12),transparent_28%)]" />
          <motion.div
            aria-hidden="true"
            className="absolute -top-16 right-12 h-72 w-72 rounded-full bg-secondary/20 blur-3xl"
            animate={{ y: [0, 16, 0], x: [0, -12, 0], opacity: [0.35, 0.6, 0.35] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute bottom-12 left-10 h-56 w-56 rounded-full bg-primary/20 blur-3xl"
            animate={{ y: [0, -12, 0], x: [0, 8, 0], opacity: [0.2, 0.42, 0.2] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="container-custom relative z-10 flex min-h-[88vh] items-start pt-12 md:pt-16 pb-14 md:pb-20">
          <div className="grid w-full grid-cols-1 items-center">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="max-w-5xl text-left text-white pt-2 md:pt-4"
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-secondary" />
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.38em] text-white/85">
                  Clean energy, engineered
                </span>
              </div>

              <h1 className="mt-8 max-w-5xl text-4xl font-semibold leading-[0.9] tracking-tight text-white md:text-6xl lg:text-[5.8rem]">
                <span className="block">Powering India with</span>
                <span className="block text-secondary">premium solar solutions</span>
                <span className="block">for homes, businesses, and industry</span>
              </h1>

              <p className="mt-9 max-w-2xl text-base leading-relaxed text-white/72 md:text-lg">
                Premium rooftop, ground-mount, and industrial solar systems designed with a cleaner look, smoother delivery, and long-term performance.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center justify-center gap-4 rounded-full bg-secondary px-8 py-4.5 text-sm font-bold text-primary transition-all duration-500 hover:-translate-y-1 hover:bg-lime-300 shadow-[0_18px_40px_rgba(255,193,7,0.22)]"
                >
                  Get Started
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-primary">
                    <ArrowRight size={18} />
                  </span>
                </button>
                <button
                  onClick={() => onNavigate('projects')}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-4.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white/90 backdrop-blur-xl transition-all duration-500 hover:border-white/35 hover:bg-white/10"
                >
                  View Work
                </button>
              </div>

              <div className="mt-12 grid max-w-2xl grid-cols-2 gap-3 text-left sm:grid-cols-4">
                {[
                  { value: '500+', label: 'Projects delivered' },
                  { value: '50MW+', label: 'Installed capacity' },
                  { value: '24/7', label: 'Support' },
                  { value: 'Tier-1', label: 'Hardware' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 backdrop-blur-xl">
                    <div className="text-xl font-semibold text-white md:text-2xl">{item.value}</div>
                    <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.24em] text-white/45">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>

      </section>

      {/* Corporate Trust Matrix (Stats Section) */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="section-panel px-8 py-10 md:px-12 md:py-14">
            <div className="mb-10 flex flex-col gap-4 text-left md:mb-12 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.45em] text-secondary">
                  Results
                </span>
                <h2 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-5xl">
                  Built for reliable delivery and long-term performance.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-gray-500 md:text-base">
                A compact snapshot of the scale, consistency, and uptime behind the work we deliver.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
              {[
                { label: 'Successful Installs', value: 500, suffix: '+', icon: CheckCircle, accent: 'from-primary/10 to-primary/5' },
                { label: 'Installed Capacity', value: 50, suffix: 'MW+', icon: Zap, accent: 'from-secondary/20 to-secondary/10' },
                { label: 'CO2 Offset / Year', value: 1.2, suffix: 'M Tons', icon: Leaf, accent: 'from-emerald-100 to-emerald-50', decimals: 1 },
                { label: 'Uptime Score', value: 99.9, suffix: '%', icon: Settings, accent: 'from-slate-100 to-slate-50', decimals: 1 },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.25 }}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-6 text-left shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                  <div className="relative z-10">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/6 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white">
                      <stat.icon size={20} />
                    </div>
                    <div className="mb-3 text-3xl md:text-5xl font-semibold tracking-tight text-primary transition-colors duration-500 group-hover:text-primary-dark">
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                        decimals={stat.decimals ?? 0}
                      />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-gray-400">
                      {stat.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Elite Services Overview */}
      <section className="section-spacing bg-[linear-gradient(180deg,rgba(243,247,240,0.95),rgba(255,255,255,0.96))]">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 md:mb-24 gap-8 md:gap-12 text-left">
            <div className="max-w-3xl">
              <span className="text-secondary font-bold text-xs uppercase tracking-[0.5em] mb-6 block">Capabilities</span>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 leading-[1.05] tracking-tight">
                Engineering <span className="text-primary italic">Precision.</span> <br /> Delivered at Scale.
              </h2>
            </div>
            <p className="text-gray-500 text-xl max-w-sm leading-relaxed mb-4">
              From sophisticated residential systems to megawatt-scale industrial plants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: Home, title: 'Residential Elite', desc: 'Custom energy ecosystems designed for high-end residential architectures.', features: ['90% Bill Reduction', '25yr Performance Guarantee'] },
              { icon: Factory, title: 'Industrial Infrastructure', desc: 'Enterprise-grade solar plants for manufacturing and cold storage.', features: ['MW Scale Expertise', 'Grid Synchronization'] },
              { icon: BarChart, title: 'Commercial Assets', desc: 'Optimizing operational expenses for retail and corporate complexes.', features: ['Accelerated Depreciation', 'Smart Net-Metering'] }
            ].map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -15 }}
                className="card-premium group"
              >
                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <service.icon size={32} />
                </div>
                <h3 className="text-2xl font-display font-bold mb-6 text-gray-900 tracking-tight">{service.title}</h3>
                <p className="text-gray-500 text-base leading-relaxed mb-10 font-light">{service.desc}</p>
                <div className="space-y-4 mb-12">
                  {service.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-bold text-primary uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                      {f}
                    </div>
                  ))}
                </div>
                <button onClick={() => onNavigate('services')} className="group/btn flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-primary hover:text-secondary transition-all">
                  View Full Solution <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy / Why Choose Us */}
      <section className="section-spacing bg-[#f6f9f4]">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-[0_30px_80px_rgba(15,23,42,0.10)] relative z-10 border border-white/70">
              <img src={slideGroundColumns} alt="Solar site foundations" className="w-full h-full object-cover object-[center_18%]" />
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
            </div>
            <div className="absolute -bottom-10 -right-10 bg-white p-4 rounded-[2.25rem] shadow-2xl z-20 hidden xl:block border border-white/80 w-[240px]">
              <img
                src={slideGroundThree}
                alt="Ground mount installation detail"
                className="h-[180px] w-full rounded-[1.5rem] object-cover object-[center_16%]"
              />
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.35em] text-gray-500 text-center">
                Ground-mount detail
              </p>
            </div>
          </div>
          <div className="text-left">
            <span className="text-secondary font-bold text-xs uppercase tracking-[0.4em] mb-6 block">The Vajra Standard</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-12 leading-tight">Engineering That <span className="text-primary italic">Lasts.</span></h2>
            <div className="space-y-12">
              {[
                { title: 'Bespoke Design', desc: 'Every rooftop has a unique profile. Our engineers create custom simulations to maximize photon capture based on your specific coordination.', icon: Settings },
                { title: 'Premium Hardware', desc: 'We only partner with Tier-1 manufacturers. Our components are tested for the harsh Indian climate to ensure zero failure rates.', icon: ShieldCheck },
                { title: 'End-to-End Compliance', desc: 'We handle the red tape. From DISCOM approvals to grid synchronization, our team manages the entire process.', icon: CheckCircle }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center shrink-0 border border-gray-100 group-hover:border-primary transition-colors duration-500">
                    <item.icon size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{item.title}</h4>
                    <p className="text-gray-500 text-base leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* High-Impact Portfolio */}
      <section className="section-spacing bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(243,247,240,0.92))]">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-24 gap-8 md:gap-12 text-left">
            <div>
              <span className="text-primary font-bold text-xs uppercase tracking-[0.4em] mb-6 block">Portfolio</span>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 leading-[0.95] tracking-tighter">
                Signature <br /><span className="text-secondary italic">Installations.</span>
              </h2>
            </div>
            <button 
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-6 group text-primary hover:text-secondary transition-all"
            >
              <span className="text-xs font-bold uppercase tracking-[0.3em]">View Master Archive</span>
              <div className="w-16 h-16 rounded-full border border-gray-100 flex items-center justify-center group-hover:border-secondary transition-colors">
                <ArrowRight size={24} />
              </div>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {[
              { img: slideRooftopOne, title: 'Estate 10kW', category: 'Residential' },
              { img: slideRooftopThree, title: 'Retail 100kW', category: 'Commercial' },
              { img: slideGroundFour, title: 'Manufacturing 1MW', category: 'Industrial' }
            ].map((project, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group relative h-[600px] rounded-[3.5rem] overflow-hidden cursor-pointer"
                onClick={() => onNavigate('projects')}
              >
                <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-12 flex flex-col justify-end text-left">
                  <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.4em] mb-4">{project.category}</span>
                  <h3 className="text-3xl font-display font-bold text-white mb-2 tracking-tight">{project.title}</h3>
                  
                  <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500">
                    <span className="text-[10px] font-bold text-white uppercase tracking-[0.3em]">Examine Project</span>
                    <ArrowUpRight size={20} className="text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global CTA - Redesigned */}
      <section className="section-spacing bg-[linear-gradient(180deg,rgba(243,247,240,0.92),rgba(255,255,255,0.98))] relative overflow-hidden">
        <div className="container-custom">
          <div className="bg-primary rounded-[4rem] p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-[0_60px_120px_rgba(46,125,50,0.25)]">
            {/* Visual Decor */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-1/4"></div>
            <div className="absolute bottom-10 left-10 opacity-20"><Zap size={200} /></div>

            <div className="relative z-10 max-w-4xl mx-auto">
              <span className="text-secondary font-bold text-[11px] uppercase tracking-[0.5em] mb-10 block">{companyName}</span>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-12 leading-[0.95] tracking-tighter">
                Ready to Invest in <br />
                <span className="text-secondary italic">Clean Assets?</span>
              </h2>
              <p className="text-xl text-white/70 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
                Join hundreds of families and businesses across India securing their energy future with our premium solar infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row gap-8 justify-center">
                <button 
                  onClick={() => onNavigate('contact')}
                  className="btn-secondary py-6 px-14 text-sm"
                >
                  Consult an Engineer
                </button>
                <a 
                  href={phoneLink}
                  className="inline-flex items-center justify-center gap-5 px-12 py-6 rounded-xl border border-white/20 font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-primary transition-all text-sm"
                >
                  <Phone size={20} /> {phoneNumber}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const AboutPage = () => {
  const values = [
    {
      icon: ShieldCheck,
      title: 'Trust by design',
      text: 'We keep the process transparent from survey to commissioning, so clients always know what is happening and why.',
    },
    {
      icon: Zap,
      title: 'Engineering first',
      text: 'Every system is sized, aligned, and detailed for performance, not just for a quick visual impression.',
    },
    {
      icon: Leaf,
      title: 'Cleaner execution',
      text: 'We care about the finish as much as the output, because well-built solar should look as good as it performs.',
    },
    {
      icon: CheckCircle,
      title: 'Reliable delivery',
      text: 'Our team focuses on dependable schedules, coordinated installs, and strong long-term support.',
    },
  ];

  return (
    <div className="pt-0 bg-[linear-gradient(180deg,rgba(243,247,240,0.8),#fff_24%,#fff)]">
      <section className="pt-6 md:pt-10 pb-12 md:pb-24 text-primary">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 md:gap-16 items-center mb-16 md:mb-24">
            <div className="text-left max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-secondary mb-8">
                About {companyName}
              </span>
              <h1 className="text-4xl md:text-6xl xl:text-7xl font-display font-bold leading-[0.96] tracking-tight mb-8">
                Solar work that feels
                <span className="block text-secondary italic">clear, premium, and built to last.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed max-w-xl">
                We design and deliver rooftop, commercial, and ground-mount solar systems with stronger execution, cleaner presentation, and a smoother client experience.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
                {[
                  { value: '500+', label: 'Projects' },
                  { value: '50MW+', label: 'Installed' },
                  { value: '24/7', label: 'Support' },
                ].map((stat) => (
                  <div key={stat.label} className="card-premium p-6">
                    <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-secondary/10 blur-2xl"></div>
              <div className="relative overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
                <img
                  src={slideGroundColumns}
                  alt="Solar project foundations and structural installation"
                  className="h-[520px] w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary mb-3 block">
                    Built with detail
                  </span>
                  <p className="max-w-md text-sm md:text-base text-white/80 leading-relaxed">
                    We choose images that match the story: structure for engineering, rooftops for delivery, and electrical rooms for precision.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16 md:mb-24">
            {values.map((value, idx) => (
              <div key={idx} className="card-premium p-8 h-full">
                <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-6">
                  <value.icon size={28} />
                </div>
                <h3 className="text-2xl font-display font-bold text-primary mb-4 tracking-tight">{value.title}</h3>
                <p className="text-gray-500 leading-relaxed font-light">{value.text}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-10 md:gap-12 items-center mb-16 md:mb-24">
            <div className="relative">
              <div className="overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.06)]">
                <img
                  src={slideInverter}
                  alt="Electrical and inverter installation"
                  className="h-[460px] w-full object-cover object-center"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 card-premium p-5 shadow-xl max-w-[240px]">
                <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-secondary mb-2">Our approach</div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We keep the design clean, the documentation clear, and the handover practical for the client.
                </p>
              </div>
            </div>

            <div className="text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-gray-500 mb-6">
                What we stand for
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-primary leading-[0.98] tracking-tight mb-6">
                Precision at every step.
              </h2>
              <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed mb-10 max-w-2xl">
                From first survey to final commissioning, our process is built around clarity, accountability, and a finish that reflects serious solar expertise.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="rounded-[2rem] border border-gray-100 bg-surface p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users size={20} className="text-secondary" />
                    <h3 className="text-lg font-bold text-primary">Client-first coordination</h3>
                  </div>
                  <p className="text-gray-500 leading-relaxed text-sm">
                    We align engineering, procurement, and installation so the project feels controlled from day one.
                  </p>
                </div>
                <div className="rounded-[2rem] border border-gray-100 bg-surface p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <BarChart size={20} className="text-secondary" />
                    <h3 className="text-lg font-bold text-primary">Performance tracking</h3>
                  </div>
                  <p className="text-gray-500 leading-relaxed text-sm">
                    We prioritize yield, monitoring, and long-term stability so the system keeps delivering after commissioning.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary rounded-[3rem] p-10 lg:p-16 text-white relative overflow-hidden shadow-[0_50px_120px_rgba(46,125,50,0.22)]">
            <div className="absolute inset-y-0 right-0 w-1/3 bg-white/5 blur-3xl"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
              <div>
                <span className="text-secondary font-bold text-[10px] uppercase tracking-[0.45em] mb-6 block">
                  Why clients choose us
                </span>
                <h2 className="text-4xl md:text-6xl font-display font-bold leading-[0.98] tracking-tight mb-6">
                  We build solar systems
                  <span className="block text-secondary italic">with a premium finish.</span>
                </h2>
                <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
                  Our work is meant to look disciplined, operate reliably, and represent the client well from the first site visit to the final handover.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { value: '500+', label: 'Installs' },
                  { value: '50MW+', label: 'Capacity' },
                  { value: '99.9%', label: 'Reliability' },
                ].map((item) => (
                  <div key={item.label} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                    <div className="text-3xl font-display font-bold text-white mb-2">{item.value}</div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-white/55">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ServicesPage = ({ onOpenDetail, onNavigate }: { onOpenDetail: (service: ServiceItem) => void; onNavigate: (p: Page) => void }) => {
  return (
    <div className="pt-0 bg-[linear-gradient(180deg,rgba(243,247,240,0.8),#fff_22%,#fff)]">
      <section className="pt-6 md:pt-10 pb-12 md:pb-24 text-primary">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 md:gap-16 items-center mb-16 md:mb-20">
            <div className="text-left max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-secondary mb-8">
                Services
              </span>
              <h1 className="text-4xl md:text-6xl xl:text-7xl font-display font-bold leading-[0.96] tracking-tight mb-8">
                Solar services that feel
                <span className="block text-secondary italic">clear, dependable, and well finished.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed max-w-xl">
                We keep this page light and direct. If a service fits, tap full details to open its dedicated page with the full scope and contact options.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { value: '6', label: 'Core services' },
                { value: '500+', label: 'Projects handled' },
                { value: '24/7', label: 'Support' },
              ].map((stat) => (
                <div key={stat.label} className="card-premium p-6">
                  <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {serviceItems.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="group flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.06)]"
              >
                <div className="relative h-[250px] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.15),rgba(2,6,23,0.72))]" />
                  <div className="absolute top-6 left-6 flex items-center gap-3">
                    <span className="rounded-full bg-white/90 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.35em] text-primary">
                      {s.num}
                    </span>
                    <span className="rounded-full bg-secondary px-4 py-2 text-[9px] font-bold uppercase tracking-[0.3em] text-primary">
                      {s.tagline}
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md text-white transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <s.icon size={24} className="text-white" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-7 lg:p-8 text-left">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/6 text-primary">
                      <s.icon size={22} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 tracking-tight">
                      {s.title}
                    </h2>
                  </div>

                  <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed mb-6 max-w-xl flex-1">
                    {s.heroNote}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {s.benefits.slice(0, 2).map((benefit) => (
                      <div key={benefit} className="rounded-2xl border border-gray-100 bg-surface px-4 py-4 text-sm leading-relaxed text-gray-600">
                        {benefit}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-400">
                      Full details on click
                    </p>
                    <button
                      onClick={() => onOpenDetail(s)}
                      className="btn-primary py-4 px-7 whitespace-nowrap"
                    >
                      Full Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 bg-primary rounded-[2.5rem] p-10 lg:p-14 text-white overflow-hidden relative">
            <div className="absolute inset-y-0 right-0 w-1/3 bg-white/5 blur-3xl"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <span className="text-secondary font-bold text-[10px] uppercase tracking-[0.45em] mb-5 block">
                  Need the right service fit?
                </span>
                <h2 className="text-3xl md:text-5xl font-display font-bold leading-[1.02] tracking-tight mb-5">
                  We can shape the service around your site, budget, and timeline.
                </h2>
                <p className="text-white/70 text-base md:text-lg leading-relaxed">
                  Whether it is a home rooftop, a commercial building, or a large industrial site, we will help you choose the right path and keep the process simple.
                </p>
              </div>
              <button
                onClick={() => onNavigate('contact')}
                className="btn-secondary py-5 px-8"
              >
                Start a Conversation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ServiceDetailPage = ({ service, onNavigate }: { service: ServiceItem | null; onNavigate: (p: Page) => void }) => {
  if (!service) {
    return (
      <div className="pt-0 bg-white min-h-screen">
        <section className="pt-6 md:pt-10 pb-12 md:pb-24 text-primary">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Select a service first</h1>
            <p className="text-gray-500 mb-10 max-w-2xl mx-auto">
              The detail page opens from the Services page so we can show the right content for the service you choose.
            </p>
            <button onClick={() => onNavigate('services')} className="btn-primary px-8 py-4">
              Back to Services
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-0 bg-[linear-gradient(180deg,rgba(243,247,240,0.8),#fff_22%,#fff)]">
      <section className="pt-6 md:pt-10 pb-12 md:pb-24 text-primary">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[0.98fr_1.02fr] gap-12 items-stretch">
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-[0_30px_80px_rgba(15,23,42,0.10)] min-h-[520px]">
              <img src={service.image} alt={service.title} className="absolute inset-0 h-full w-full object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/55 to-transparent" />
              <button
                onClick={() => onNavigate('services')}
                className="absolute top-5 left-5 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary backdrop-blur-md transition hover:bg-white"
              >
                <ArrowRight size={14} className="rotate-180" />
                Back
              </button>
              <div className="absolute left-6 bottom-6 right-6 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
                <span className="mb-3 inline-flex rounded-full bg-secondary px-4 py-2 text-[9px] font-bold uppercase tracking-[0.35em] text-primary">
                  {service.tagline}
                </span>
                <h1 className="text-4xl md:text-6xl font-display font-bold leading-[0.98] tracking-tight text-white">
                  {service.title}
                </h1>
                <p className="mt-5 max-w-xl text-white/90 text-base md:text-lg leading-relaxed">
                  {service.heroNote}
                </p>
              </div>
            </div>

            <div className="text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-secondary mb-8">
                Full service detail
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 leading-[1.02] tracking-tight mb-6">
                A clearer view of what this service includes.
              </h2>
              <p className="text-lg text-gray-500 font-light leading-relaxed mb-10 max-w-2xl">
                {service.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="card-premium p-6">
                  <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-400 mb-3">Best for</div>
                  <p className="text-sm leading-relaxed text-gray-600">{service.idealFor}</p>
                </div>
                <div className="card-premium p-6">
                  <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-400 mb-3">Timeline</div>
                  <p className="text-sm leading-relaxed text-gray-600">{service.timeline}</p>
                </div>
              </div>

              <div className="mb-8">
                <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-400 mb-4">What&apos;s included</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.includes.map((item) => (
                    <div key={item} className="rounded-2xl border border-gray-100 bg-surface px-4 py-4 flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CheckCircle size={12} />
                      </div>
                      <span className="text-sm leading-relaxed text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-400 mb-4">Why clients like it</div>
                <div className="space-y-3">
                  {service.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3 rounded-2xl bg-white border border-gray-100 px-4 py-4">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/20 text-primary">
                        <CheckCircle size={12} />
                      </div>
                      <span className="text-sm leading-relaxed text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary rounded-[2rem] p-8 text-white">
                <div className="max-w-2xl">
                  <span className="text-secondary font-bold text-[10px] uppercase tracking-[0.45em] mb-4 block">
                    Ready to talk?
                  </span>
                  <h3 className="text-3xl md:text-4xl font-display font-bold leading-[1.02] tracking-tight mb-4">
                    Let us build a clean proposal around your site.
                  </h3>
                  <p className="text-white/70 leading-relaxed mb-8">
                    We can discuss the scope, timeline, and next steps for this service and guide you to the most suitable setup.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => onNavigate('contact')}
                      className="btn-secondary py-5 px-8"
                    >
                      Contact Us
                    </button>
                    <a
                      href={phoneLink}
                      className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/20 px-8 py-5 text-[11px] font-bold uppercase tracking-[0.25em] text-white transition hover:bg-white hover:text-primary"
                    >
                      <Phone size={16} />
                      Call Now
                    </a>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/20 px-8 py-5 text-[11px] font-bold uppercase tracking-[0.25em] text-white transition hover:bg-white hover:text-primary"
                    >
                      <MessageCircle size={16} />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProjectsPage = ({ onOpenDetail, onNavigate }: { onOpenDetail: (project: ProjectItem) => void; onNavigate: (p: Page) => void }) => {
    const filters = ['All', 'Residential', 'Commercial', 'Industrial'];
    const [activeFilter, setActiveFilter] = useState('All');
    const filteredProjects = activeFilter === 'All' ? projectItems : projectItems.filter(p => p.type === activeFilter);

    return (
        <div className="pt-0 bg-white min-h-screen">
            <section className="pt-6 md:pt-10 pb-12 md:pb-24 text-primary">
                <div className="container-custom">
                    <div className="text-center max-w-5xl mx-auto mb-20 md:mb-40">
                        <span className="text-secondary font-bold text-[10px] uppercase tracking-[0.6em] mb-10 block">Global Portfolio</span>
                        <h1 className="text-4xl md:text-6xl font-display font-bold mb-12 leading-[1.0] tracking-tight">
                            Signature <br /><span className="text-primary italic">Deployments.</span>
                        </h1>
                        
                        <div className="flex flex-wrap justify-center gap-6 bg-surface p-4 rounded-full w-fit mx-auto border border-gray-100 shadow-sm">
                            {filters.map(f => (
                                <button
                                    key={f}
                                    onClick={() => setActiveFilter(f)}
                                    className={`px-12 py-4 rounded-full font-bold uppercase text-[9px] tracking-[0.3em] transition-all duration-500 ${activeFilter === f ? 'bg-primary text-white shadow-xl scale-105' : 'text-gray-400 hover:text-primary'}`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((p, i) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    key={p.title}
                                    className="group relative h-[650px] rounded-[4rem] overflow-hidden cursor-pointer bg-surface border border-gray-100"
                                >
                                    <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" referrerPolicy="no-referrer" />
                                    
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-12 flex flex-col justify-end text-left translate-y-12 group-hover:translate-y-0 transition-transform duration-700">
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className="bg-secondary text-primary px-3 py-1 rounded text-[9px] font-black uppercase tracking-[0.2em]">{p.type}</span>
                                        </div>
                                        <h3 className="text-4xl font-display font-bold text-white mb-6 leading-tight tracking-tight">{p.title}</h3>
                                        
                                        <div className="grid grid-cols-2 gap-4 pt-10 border-t border-white/10">
                                            <div className="flex flex-col">
                                                <span className="text-[8px] font-bold text-white/40 uppercase tracking-[0.3em] mb-1">Capacity</span>
                                                <span className="text-white font-bold text-sm tracking-widest">{p.cap}</span>
                                            </div>
                                            <div className="flex flex-col items-end">
                                               <span className="text-[8px] font-bold text-white/40 uppercase tracking-[0.3em] mb-1">Key Result</span>
                                               <span className="text-secondary font-bold text-sm tracking-widest text-right">{p.outcome}</span>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onOpenDetail(p);
                                            }}
                                            className="mt-10 opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-center bg-white p-6 rounded-[2rem] w-full text-left cursor-pointer relative z-10"
                                        >
                                            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Examine Case Study</span>
                                            <ArrowUpRight size={24} className="text-primary" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </div>
    );
};

const ProjectDetailPage = ({ project, onNavigate }: { project: ProjectItem | null; onNavigate: (p: Page) => void }) => {
  if (!project) {
    return (
      <div className="pt-0 bg-white min-h-screen">
        <section className="pt-6 md:pt-10 pb-12 md:pb-24 text-primary">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Select a project first</h1>
            <p className="text-gray-500 mb-10 max-w-2xl mx-auto">
              The case study page opens from a project card so you can see the matching details for that installation.
            </p>
            <button onClick={() => onNavigate('projects')} className="btn-primary px-8 py-4">
              Back to Projects
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-0 bg-[linear-gradient(180deg,rgba(243,247,240,0.8),#fff_22%,#fff)]">
      <section className="pt-6 md:pt-10 pb-12 md:pb-24 text-primary">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-[0.98fr_1.02fr] gap-12 items-stretch">
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-[0_30px_80px_rgba(15,23,42,0.10)] min-h-[520px]">
              <img src={project.img} alt={project.title} className="absolute inset-0 h-full w-full object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
              <button
                onClick={() => onNavigate('projects')}
                className="absolute top-5 left-5 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary backdrop-blur-md transition hover:bg-white"
              >
                <ArrowRight size={14} className="rotate-180" />
                Back
              </button>
              <div className="absolute left-6 bottom-6 right-6 text-white">
                <span className="mb-3 inline-flex rounded-full bg-secondary px-4 py-2 text-[9px] font-bold uppercase tracking-[0.35em] text-primary">
                  {project.type}
                </span>
                <h1 className="text-4xl md:text-6xl font-display font-bold leading-[0.98] tracking-tight">
                  {project.title}
                </h1>
                <p className="mt-5 max-w-xl text-white/80 text-base md:text-lg leading-relaxed">
                  {project.highlight}
                </p>
              </div>
            </div>

            <div className="text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.4em] text-secondary mb-8">
                Case study
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-gray-900 leading-[1.02] tracking-tight mb-6">
                A cleaner look at this deployment.
              </h2>
              <p className="text-lg text-gray-500 font-light leading-relaxed mb-10 max-w-2xl">
                {project.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mb-8">
                <div className="card-premium p-6">
                  <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-400 mb-3">Capacity</div>
                  <p className="text-sm leading-relaxed text-gray-600">{project.cap}</p>
                </div>
              </div>

              <div className="mb-8">
                <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-gray-400 mb-4">Scope</div>
                <div className="grid grid-cols-1 gap-3">
                  {project.scope.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-white border border-gray-100 px-4 py-4">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CheckCircle size={12} />
                      </div>
                      <span className="text-sm leading-relaxed text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary rounded-[2rem] p-8 text-white">
                <span className="text-secondary font-bold text-[10px] uppercase tracking-[0.45em] mb-4 block">
                  Want something similar?
                </span>
                <p className="text-white/70 leading-relaxed mb-8">
                  We can prepare a project proposal for a similar setup and help you understand the scope, cost, and next steps.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => onNavigate('contact')}
                    className="btn-secondary py-5 px-8"
                  >
                    Contact Us
                  </button>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/20 px-8 py-5 text-[11px] font-bold uppercase tracking-[0.25em] text-white transition hover:bg-white hover:text-primary"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const BlogPage = () => {
    const posts = [
        { title: 'The 2025 Indian Solar Cost Report', category: 'Market Insight', date: 'May 10, 2025', img: slideGroundOne, readTime: '5 min read', desc: 'A detailed breakdown of grid tariffs vs solar ROI for the upcoming fiscal year.' },
        { title: 'PM Surya Ghar Policy Guide', category: 'Regulatory', date: 'Apr 28, 2025', img: slideRooftopFour, readTime: '8 min read', desc: 'How to maximize your government subsidy for residential rooftop installations.' },
        { title: 'Decentralized Energy in MFG', category: 'Industrial', date: 'Mar 15, 2025', img: slideGroundColumns, readTime: '6 min read', desc: 'Case studies on how Indian manufacturers are optimizing power backup costs.' },
    ];

    return (
        <div className="pt-0 bg-white">
            <section className="pt-6 md:pt-10 pb-12 md:pb-24 text-primary">
                <div className="container-custom">
                    <div className="text-center max-w-4xl mx-auto mb-16 md:mb-32">
                        <span className="text-primary font-bold text-[10px] uppercase tracking-[0.5em] mb-8 block">Technical Intelligence</span>
                        <h1 className="text-4xl md:text-7xl font-display font-bold leading-[0.9] mb-12 tracking-tighter">
                            The <span className="text-secondary italic">Energy News.</span>
                        </h1>
                        <p className="text-xl text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">Staying ahead of the curve in the Indian renewable energy landscape with critical data and policy briefings.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {posts.map((post, i) => (
                            <motion.div 
                                whileHover={{ y: -15 }}
                                key={i} 
                                className="group card-premium flex flex-col hover:border-primary transition-all duration-700 overflow-hidden"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden -mx-8 -mt-8 mb-10">
                                    <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                    <div className="absolute top-6 left-6 bg-primary text-white text-[9px] font-bold uppercase tracking-[0.3em] px-5 py-2 rounded-lg backdrop-blur-md">
                                        {post.category}
                                    </div>
                                </div>
                                <div className="flex flex-col flex-grow text-left">
                                    <div className="flex items-center gap-4 text-gray-400 text-[9px] font-bold uppercase tracking-[0.3em] mb-8 border-b border-gray-50 pb-8">
                                        <Clock size={16} className="text-secondary" /> {post.date}
                                        <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                                        {post.readTime}
                                    </div>
                                    <h3 className="text-3xl font-display font-bold text-primary mb-6 tracking-tight group-hover:text-secondary transition-colors leading-tight">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-500 text-base font-light leading-relaxed mb-10">{post.desc}</p>
                                    <div className="mt-auto flex items-center gap-3 text-primary font-bold uppercase text-[10px] tracking-[0.4em] group-hover:gap-6 transition-all cursor-pointer">
                                        Full Briefing <ArrowRight size={16} className="text-secondary" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

const ContactPage = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [solutionType, setSolutionType] = useState(solutionTypes[0]);
    const [projectBrief, setProjectBrief] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [statusMessage, setStatusMessage] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus('sending');
        setStatusMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.trim(),
                    phone: phone.trim(),
                    email: email.trim(),
                    solutionType,
                    projectBrief: projectBrief.trim(),
                }),
            });

            const payload = await response.json().catch(() => null);

            if (!response.ok) {
                throw new Error(payload?.error ?? 'We could not send your enquiry right now.');
            }

            setStatus('success');
            setStatusMessage('Thanks. Your enquiry has been sent and we will review it shortly.');
            setName('');
            setPhone('');
            setEmail('');
            setSolutionType(solutionTypes[0]);
            setProjectBrief('');
        } catch (error) {
            setStatus('error');
            const fallback =
              'We could not send your enquiry right now. If you are using onboarding@resend.dev, Resend only allows sending to your own verified email address. For sales@vajraenergies.info, verify your domain in Resend and use a sender from that domain.';
            setStatusMessage(error instanceof Error ? error.message : fallback);
        }
    };

    return (
        <div className="pt-0 bg-white min-h-screen">
            <section className="pt-6 md:pt-10 pb-12 md:pb-24 text-primary">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-24 items-start">
                        <div className="lg:col-span-5 text-left">
                            <span className="text-secondary font-bold text-[10px] uppercase tracking-[0.5em] mb-10 block underline decoration-secondary decoration-4 underline-offset-8">Engagement</span>
                            <h1 className="text-4xl md:text-6xl font-display font-bold mb-10 md:mb-14 leading-[0.9] tracking-tighter">
                                Begin Your <br /> <span className="text-primary italic">Transition.</span>
                            </h1>
                            <p className="text-xl text-gray-400 font-light mb-16 leading-relaxed max-w-md">Our engineering consultants are ready to provide a full structural and energy audit for your infrastructure.</p>
                            
                            <div className="space-y-12">
                                {[
                                    { icon: Phone, title: 'Expert Line', detail: phoneNumber },
                                    { icon: MessageCircle, title: 'WhatsApp', detail: phoneNumber },
                                    { icon: Mail, title: 'Sales Email', detail: salesEmail },
                                    { icon: MapPin, title: 'Main HQ', detail: 'Flat 101, Vajra Residency, Hyderabad' }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-8 group">
                                        <div className="w-20 h-20 bg-surface rounded-3xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 border border-gray-100">
                                            <item.icon size={28} />
                                        </div>
                                        <div className="text-left">
                                            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-2">{item.title}</h4>
                                            <p className="text-2xl font-bold text-gray-900 tracking-tight">{item.detail}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-7">
                            <div className="bg-white p-12 lg:p-20 rounded-[4.5rem] border border-gray-100 shadow-[0_80px_160px_rgba(0,0,0,0.06)] relative overflow-hidden">
                                {/* Decor */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                                
                                <form className="space-y-10 relative z-10" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-4 text-left">
                                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 ml-2">Name</label>
                                            <input
                                                type="text"
                                                placeholder="Full Name"
                                                value={name}
                                                onChange={(event) => setName(event.target.value)}
                                                required
                                                className="w-full bg-surface border-b-2 border-gray-100 px-8 py-6 rounded-2xl focus:outline-none focus:border-primary transition-all font-bold text-primary placeholder:font-light"
                                            />
                                        </div>
                                        <div className="space-y-4 text-left">
                                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 ml-2">Connect</label>
                                            <input
                                                type="tel"
                                                placeholder="Phone Number"
                                                value={phone}
                                                onChange={(event) => setPhone(event.target.value)}
                                                required
                                                className="w-full bg-surface border-b-2 border-gray-100 px-8 py-6 rounded-2xl focus:outline-none focus:border-primary transition-all font-bold text-primary placeholder:font-light"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4 text-left">
                                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 ml-2">Solution Type</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                            {solutionTypes.map((type) => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => setSolutionType(type)}
                                                    aria-pressed={solutionType === type}
                                                    className={`py-4 border-2 rounded-xl font-bold uppercase text-[9px] tracking-widest transition-all ${
                                                        solutionType === type
                                                            ? 'border-primary bg-primary text-white'
                                                            : 'border-gray-100 hover:border-primary focus:border-primary'
                                                    }`}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4 text-left">
                                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 ml-2">Email</label>
                                        <input
                                            type="email"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            required
                                            className="w-full bg-surface border-b-2 border-gray-100 px-8 py-6 rounded-2xl focus:outline-none focus:border-primary transition-all font-bold text-primary placeholder:font-light"
                                        />
                                    </div>
                                    
                                    <div className="space-y-4 text-left">
                                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 ml-2">Project Brief</label>
                                        <textarea
                                            placeholder="Describe your energy requirements..."
                                            rows={5}
                                            value={projectBrief}
                                            onChange={(event) => setProjectBrief(event.target.value)}
                                            required
                                            className="w-full bg-surface border-b-2 border-gray-100 px-8 py-6 rounded-2xl focus:outline-none focus:border-primary transition-all font-bold text-primary placeholder:font-light resize-none"
                                        />
                                    </div>
                                    
                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className="btn-primary w-full py-8 text-sm group flex items-center justify-center gap-4 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {status === 'sending' ? 'Sending enquiry...' : 'Authorize Consultation'}
                                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                    </button>

                                    {statusMessage && (
                                      <p
                                        className={`rounded-2xl px-6 py-4 text-sm font-medium ${
                                          status === 'success'
                                            ? 'bg-emerald-50 text-emerald-700'
                                            : 'bg-rose-50 text-rose-700'
                                        }`}
                                      >
                                        {statusMessage}
                                      </p>
                                    )}

                                    <a
                                      href={whatsappLink}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-primary/15 bg-primary/5 px-8 py-6 text-[11px] font-bold uppercase tracking-[0.25em] text-primary transition hover:bg-primary hover:text-white"
                                    >
                                      <MessageCircle size={16} />
                                      Chat on WhatsApp
                                    </a>
                                    
                                    <p className="text-center text-[9px] font-bold text-gray-400 uppercase tracking-[0.5em] pt-6">Confidential Data Protocol Protected</p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

// --- APP ---

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const handleNavigate = (page: Page) => {
    setActivePage(page);
    if (page !== 'service-detail') {
      setSelectedService(null);
    }
    if (page !== 'project-detail') {
      setSelectedProject(null);
    }
  };

  const openServiceDetail = (service: ServiceItem) => {
    setSelectedService(service);
    setActivePage('service-detail');
  };

  const openProjectDetail = (project: ProjectItem) => {
    setSelectedProject(project);
    setActivePage('project-detail');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage, selectedService]);

  return (
    <div className="min-h-screen">
      <Navbar activePage={activePage} onNavigate={handleNavigate} />
      
      <main>
        {activePage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'services' && <ServicesPage onOpenDetail={openServiceDetail} onNavigate={handleNavigate} />}
        {activePage === 'service-detail' && <ServiceDetailPage service={selectedService} onNavigate={handleNavigate} />}
        {activePage === 'projects' && <ProjectsPage onOpenDetail={openProjectDetail} onNavigate={handleNavigate} />}
        {activePage === 'project-detail' && <ProjectDetailPage project={selectedProject} onNavigate={handleNavigate} />}
        {activePage === 'blog' && <BlogPage />}
        {activePage === 'contact' && <ContactPage />}
      </main>

      <Footer onNavigate={handleNavigate} />

      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-[90] flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_45px_rgba(37,211,102,0.35)] transition-transform hover:scale-105"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}


