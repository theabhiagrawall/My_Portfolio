import { useState, useEffect, useRef } from "react";
import { Analytics } from "@vercel/analytics/next";

const NAV_LINKS = ["About","Skills","Experience","Projects","Education","Certifications","Contact"];

const SKILLS = {
  "Languages": [
    { name: "Java", level: 90 },
    { name: "JavaScript", level: 75 },
    { name: "HTML", level: 88 },
    { name: "CSS", level: 82 },
  ],
  "Frameworks": [
    { name: "Spring Boot", level: 85 },
    { name: "Spring MVC", level: 80 },
    { name: "Hibernate", level: 75 },
  ],
  "Database & Tools": [
    { name: "MySQL", level: 82 },
    { name: "Git / GitHub", level: 85 },
    { name: "REST APIs", level: 88 },
    { name: "Microservices", level: 70 },
  ],
};

const PROJECTS = [
  {
    title: "Uni-Info Application",
    subtitle: "University Information Platform",
    desc: "A full-stack university information system helping students discover suitable universities, predict college admissions based on CET rank, and access brochures and academic notes seamlessly.",
    tech: ["Java", "Spring Boot", "MySQL", "JDBC", "HTML", "CSS", "Bootstrap", "JavaScript"],
    features: ["University Search", "College Prediction", "Notes Download", "Brochure Access"],
    color: "#00d4ff",
    icon: "🎓",
  },
  {
    title: "FlowFi",
    subtitle: "Online Banking System",
    desc: "A secure full-stack online banking application that enables users to manage accounts, transfer funds, track transactions, and access banking services through a modern and responsive interface.",
    tech: ["Java", "Spring MVC", "Spring Boot", "REST API", "MySQL"],
    features: ["Account Management", "Fund Transfer", "Transaction History", "Secure Authentication"],
    color: "#a855f7",
    icon: "🏦",
  },
];

const EDUCATION = [
  { degree: "Bachelor of Engineering", field: "Computer Science and Engineering", school: "Sipna College of Engineering and Technology", score: "CGPA: 8.56", year: "2024", icon: "🏛️" },
  { degree: "Diploma in Information Technology", field: "Information Technology", school: "Government Polytechnic Washim", score: "88%", year: "2021", icon: "📚" },
  { degree: "SSC", field: "Secondary Education", school: "Shree P.D. Jain Vidyalaya", score: "72.80%", year: "2017", icon: "🎒" },
];

const CERTS = [
  { name: "Programming in Java", provider: "Udemy", icon: "☕" },
  { name: "Web Development", provider: "Udemy", icon: "🌐" },
  { name: "JavaScript", provider: "Udemy", icon: "⚡" },
  { name: "Cisco Packet Tracer", provider: "Cisco", icon: "🔗" },
];

function SkillBar({ name, level, color }) {
  const [width, setWidth] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setWidth(level); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [level]);
  return (
    <div ref={ref} style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontFamily: "'DM Mono', monospace", color: "#cbd5e1" }}>{name}</span>
        <span style={{ fontSize: 12, color: color, fontFamily: "'DM Mono', monospace", fontWeight: 600 }}>{level}%</span>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ height: "100%", borderRadius: 2, background: `linear-gradient(90deg, ${color}cc, ${color})`, width: `${width}%`, transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)", boxShadow: `0 0 8px ${color}66` }} />
      </div>
    </div>
  );
}

function useReveal() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Section({ id, children, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <section id={id} ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.7s ease, transform 0.7s ease", padding: "60px 0", ...style }}>
      {children}
    </section>
  );
}

function SectionHeading({ label, title }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.2em", color: "#00d4ff", textTransform: "uppercase", marginBottom: 10 }}>{label}</div>
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.15, margin: 0 }}>{title}</h2>
      <div style={{ width: 48, height: 3, background: "linear-gradient(90deg, #00d4ff, #a855f7)", borderRadius: 2, marginTop: 14 }} />
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const handle = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = (e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000); setForm({ name: "", email: "", subject: "", message: "" }); };
  const inp = { width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "12px 16px", color: "#f1f5f9", fontSize: 14, fontFamily: "inherit", outline: "none" };
  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16 }}>
        <input style={inp} placeholder="Your Name" value={form.name} onChange={handle("name")} required />
        <input style={inp} type="email" placeholder="Email Address" value={form.email} onChange={handle("email")} required />
      </div>
      <input style={inp} placeholder="Subject" value={form.subject} onChange={handle("subject")} required />
      <textarea style={{ ...inp, minHeight: 120, resize: "vertical" }} placeholder="Your Message" value={form.message} onChange={handle("message")} required />
      <button type="submit" style={{ background: "linear-gradient(135deg, #00d4ff22, #a855f722)", border: "1px solid #00d4ff66", color: "#00d4ff", padding: "12px 28px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", letterSpacing: "0.05em", fontFamily: "'DM Mono', monospace", alignSelf: "flex-start" }}>
        {sent ? "✓ MESSAGE SENT" : "SEND MESSAGE →"}
      </button>
    </form>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [typedText, setTypedText] = useState("");
  const phrases = ["Full Stack Java Developer", "Spring Boot Specialist", "Backend Engineer"];
  const phraseIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const tick = () => {
      const current = phrases[phraseIdx.current];
      if (!deleting.current) {
        setTypedText(current.slice(0, charIdx.current + 1));
        charIdx.current++;
        if (charIdx.current === current.length) { deleting.current = true; return setTimeout(tick, 1800); }
      } else {
        setTypedText(current.slice(0, charIdx.current - 1));
        charIdx.current--;
        if (charIdx.current === 0) { deleting.current = false; phraseIdx.current = (phraseIdx.current + 1) % phrases.length; }
      }
      setTimeout(tick, deleting.current ? 50 : 80);
    };
    const t = setTimeout(tick, 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowTop(window.scrollY > 500);
      for (const s of [...NAV_LINKS.map(n => n.toLowerCase())].reverse()) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveSection(s); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400;500&family=Inter:wght@300;400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; background: #080c14; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080c14; }
        ::-webkit-scrollbar-thumb { background: #00d4ff44; border-radius: 2px; }
        a { color: inherit; text-decoration: none; }
        ::selection { background: #00d4ff33; color: #f1f5f9; }
        .card-hover { transition: transform 0.25s, border-color 0.25s; }
        .card-hover:hover { transform: translateY(-4px); border-color: rgba(0,212,255,0.3) !important; }
        .nav-link { transition: color 0.2s; cursor: pointer; }
        .nav-link:hover { color: #00d4ff; }
        input:focus, textarea:focus { border-color: rgba(0,212,255,0.4) !important; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.5} 100%{transform:scale(1.5);opacity:0} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        .desktop-nav { display: flex !important; }
        #menu-btn { display: none !important; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          #menu-btn { display: flex !important; align-items: center; justify-content: center; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-avatar { display: none !important; }
          .hero-social { justify-content: center !important; }
          .hero-btns { justify-content: center !important; }
          .hero-stats { gap: 20px !important; flex-wrap: wrap; justify-content: space-around; }
          .hero-text { text-align: center; }
          .about-grid { grid-template-columns: 1fr !important; }
          .skills-grid { grid-template-columns: 1fr !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .certs-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .exp-grid { grid-template-columns: 1fr !important; }
          .footer-inner { flex-direction: column !important; text-align: center; gap: 10px !important; }
          .footer-links { display: none !important; }
        }
      `}</style>

      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.025, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundSize: "200px" }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div style={{ background: "#080c14", minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: "#cbd5e1", overflowX: "hidden" }}>

        {/* NAVBAR */}
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(8,12,20,0.95)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none", transition: "all 0.3s" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: "#f1f5f9" }}>A<span style={{ color: "#00d4ff" }}>.</span></div>
            <div className="desktop-nav" style={{ gap: 28, alignItems: "center" }}>
              {NAV_LINKS.map(l => (
                <span key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase())} style={{ fontSize: 13, letterSpacing: "0.04em", fontFamily: "'DM Mono', monospace", color: activeSection === l.toLowerCase() ? "#00d4ff" : "#94a3b8" }}>{l}</span>
              ))}
            </div>
            <button id="menu-btn" onClick={() => setMenuOpen(m => !m)} style={{ background: "none", border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer", color: "#94a3b8", fontSize: 18, width: 40, height: 40, borderRadius: 8 }}>
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
          {menuOpen && (
            <div style={{ background: "rgba(8,12,20,0.98)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "16px 20px", display: "flex", flexDirection: "column" }}>
              {NAV_LINKS.map(l => (
                <span key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase())} style={{ fontSize: 14, fontFamily: "'DM Mono', monospace", color: "#94a3b8", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", letterSpacing: "0.06em" }}>{l}</span>
              ))}
            </div>
          )}
        </nav>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", position: "relative", zIndex: 1 }}>

          {/* HERO */}
          <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 80 }}>
            <div style={{ width: "100%" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 0 3px rgba(34,197,94,0.2)", animation: "pulse-ring 1.5s ease-out infinite" }} />
                <span style={{ fontSize: 12, color: "#94a3b8", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em" }}>OPEN TO OPPORTUNITIES</span>
              </div>
              <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center" }}>
                <div className="hero-text">
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#00d4ff", letterSpacing: "0.12em", marginBottom: 12 }}>HEY, I'M</p>
                  <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(38px, 7vw, 80px)", fontWeight: 800, lineHeight: 1.0, color: "#f1f5f9", marginBottom: 8 }}>Abhishek<br />Agrawal</h1>
                  <div style={{ height: 44, display: "flex", alignItems: "center", marginBottom: 20 }}>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(16px, 3vw, 28px)", color: "#00d4ff", fontWeight: 700 }}>
                      {typedText}<span style={{ animation: "blink 1s infinite", color: "#a855f7" }}>|</span>
                    </span>
                  </div>
                  <p style={{ fontSize: "clamp(14px, 2vw, 16px)", lineHeight: 1.8, color: "#64748b", maxWidth: 540, marginBottom: 32 }}>
                    Building scalable backend systems and full-stack applications with <span style={{ color: "#94a3b8" }}>Java & Spring Boot</span>. Passionate about clean architecture, performance optimization, and crafting elegant APIs.
                  </p>
                  <div className="hero-btns" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
                    <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg, #00d4ff, #0090b3)", color: "#080c14", padding: "12px 24px", borderRadius: 8, fontWeight: 700, fontSize: 13, letterSpacing: "0.04em", fontFamily: "'DM Mono', monospace" }}>CONTACT ME →</a>
                    <a href="Abhishek_CV.pdf" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "#f1f5f9", padding: "12px 24px", borderRadius: 8, fontWeight: 600, fontSize: 13, letterSpacing: "0.04em", fontFamily: "'DM Mono', monospace" }}>↓ DOWNLOAD CV</a>
                  </div>
                  <div className="hero-social" style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                    {[{ label: "GitHub", icon: "⌥", url: "https://github.com/theabhiagrawall" }, { label: "LinkedIn", icon: "in", url: "https://www.linkedin.com/in/abhishek-agrawall" }, { label: "Email", icon: "✉", url: "mailto:abhishek1.aa2@gmail.com" }].map(s => (
                      <a key={s.label} href={s.url} style={{ width: 40, height: 40, borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", fontSize: 14, fontFamily: "'DM Mono', monospace", fontWeight: 600 }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "#00d4ff66"; e.currentTarget.style.color = "#00d4ff"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#64748b"; }}
                      >{s.icon}</a>
                    ))}
                    <div style={{ height: 1, width: 32, background: "rgba(255,255,255,0.1)" }} />
                    <span style={{ fontSize: 12, color: "#475569", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em" }}>PUNE, MH</span>
                  </div>
                </div>
                <div className="hero-avatar" style={{ animation: "float 5s ease-in-out infinite", flexShrink: 0 }}>
                  <div style={{ width: 200, height: 200, borderRadius: "50%", position: "relative" }}>
                    <div style={{ position: "absolute", inset: -2, borderRadius: "50%", background: "linear-gradient(135deg, #00d4ff, #a855f7, #00d4ff)", padding: 2 }}>
                      <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "linear-gradient(135deg, #0f172a, #1e293b)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 56, fontWeight: 800, color: "#f1f5f9" }}>AA</span>
                      </div>
                    </div>
                    <div style={{ position: "absolute", inset: -20, borderRadius: "50%", border: "1px solid rgba(0,212,255,0.12)", animation: "pulse-ring 3s ease-out infinite" }} />
                  </div>
                </div>
              </div>
              <div className="hero-stats" style={{ display: "flex", gap: 40, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 32, marginTop: 16 }}>
                {[["2+", "Years Learning"], ["5+", "Projects Built"], ["8.56", "CGPA"], ["3+", "Certifications"]].map(([n, l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 800, color: "#f1f5f9" }}>{n}</div>
                    <div style={{ fontSize: 11, color: "#475569", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ABOUT */}
          <Section id="about">
            <SectionHeading label="01 / ABOUT" title="About Me" />
            <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
              <div>
                <p style={{ fontSize: 15, lineHeight: 1.9, color: "#94a3b8", marginBottom: 16 }}>I'm a passionate Full Stack Java Developer with a strong foundation in backend development, specializing in building scalable and maintainable enterprise applications using <span style={{ color: "#00d4ff" }}>Java, Spring Boot, and MySQL</span>.</p>
                <p style={{ fontSize: 15, lineHeight: 1.9, color: "#94a3b8", marginBottom: 16 }}>My journey in software development is driven by a deep curiosity for solving complex problems and a commitment to writing clean, efficient code.</p>
                <p style={{ fontSize: 15, lineHeight: 1.9, color: "#94a3b8" }}>I'm actively seeking full-time opportunities where I can apply my backend expertise and grow as an engineer.</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { label: "Name", value: "Abhishek Agrawal" },
                  { label: "Location", value: "Maharashtra, India" },
                  { label: "Email", value: "abhishek1.aa2@gmail.com" },
                  { label: "Education", value: "BE in CSE, Sipna College of Engineering and Technology" },
                  { label: "Experience", value: "Application Developer Intern @ Soham Global" },
                  { label: "Interests", value: "Java, Spring Boot, Backend Arch, APIs, Microservices" },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", gap: 12, alignItems: "flex-start", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 10 }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#475569", letterSpacing: "0.08em", width: 80, flexShrink: 0, paddingTop: 2 }}>{label.toUpperCase()}</span>
                    <span style={{ fontSize: 14, color: "#cbd5e1", lineHeight: 1.5 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* SKILLS */}
          <Section id="skills">
            <SectionHeading label="02 / SKILLS" title="Technical Skills" />
            <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {Object.entries(SKILLS).map(([cat, skills], i) => {
                const colors = ["#00d4ff", "#a855f7", "#22d3ee"];
                return (
                  <div key={cat} className="card-hover" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 24 }}>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#f1f5f9", marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{cat}</h3>
                    {skills.map(s => <SkillBar key={s.name} {...s} color={colors[i]} />)}
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["OOP", "DBMS", "REST APIs", "Microservices", "Postman", "VS Code", "STS", "Git", "GitHub", "JDBC"].map(t => (
                <span key={t} style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)", borderRadius: 100, padding: "5px 14px", fontSize: 12, color: "#a78bfa", fontFamily: "'DM Mono', monospace" }}>{t}</span>
              ))}
            </div>
          </Section>

          {/* EXPERIENCE */}
          <Section id="experience">
            <SectionHeading label="03 / EXPERIENCE" title="Work Experience" />
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.15)", borderRadius: 16, padding: "28px 24px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #00d4ff, #a855f7)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
                <div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(17px, 3vw, 22px)", color: "#f1f5f9", marginBottom: 6 }}>Application Developer Intern</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 15, color: "#00d4ff", fontWeight: 600 }}>Soham Global</span>
                    <span style={{ fontSize: 12, color: "#475569" }}>•</span>
                    <span style={{ fontSize: 13, color: "#64748b" }}>Full-time Internship</span>
                  </div>
                </div>
                <div style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: 8, padding: "8px 14px", fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#00d4ff" }}>JAN 2024 — MAR 2024</div>
              </div>
              <div className="exp-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {["Developed backend features using Java and Spring Boot, improving system performance", "Optimized complex database queries resulting in faster data retrieval times", "Built and integrated RESTful APIs consumed by frontend and third-party clients", "Collaborated within an agile development team, participating in code reviews"].map((r, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      <span style={{ color: "#00d4ff", fontSize: 10 }}>✓</span>
                    </div>
                    <span style={{ fontSize: 14, lineHeight: 1.7, color: "#94a3b8" }}>{r}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Java", "Spring Boot", "REST API", "MySQL", "Git"].map(t => (
                  <span key={t} style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.15)", borderRadius: 4, padding: "3px 10px", fontSize: 11, color: "#67e8f9", fontFamily: "'DM Mono', monospace" }}>{t}</span>
                ))}
              </div>
            </div>
          </Section>

          {/* PROJECTS */}
          <Section id="projects">
            <SectionHeading label="04 / PROJECTS" title="Featured Projects" />
            <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {PROJECTS.map((p, i) => (
                <div key={p.title} className="card-hover" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 24, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${p.color}88, ${p.color})` }} />
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                    <div style={{ fontSize: 30 }}>{p.icon}</div>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#475569" }}>0{i + 1}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "#f1f5f9", marginBottom: 4 }}>{p.title}</h3>
                  <p style={{ fontSize: 12, color: p.color, fontFamily: "'DM Mono', monospace", marginBottom: 12 }}>{p.subtitle}</p>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: "#64748b", marginBottom: 14 }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                    {p.features.map(f => <span key={f} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 100, background: `${p.color}10`, border: `1px solid ${p.color}30`, color: p.color }}>{f}</span>)}
                  </div>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {p.tech.map(t => <span key={t} style={{ fontSize: 11, color: "#475569", fontFamily: "'DM Mono', monospace" }}>{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* EDUCATION */}
          <Section id="education">
            <SectionHeading label="05 / EDUCATION" title="Education" />
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 19, top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.07)" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {EDUCATION.map((e, i) => (
                  <div key={i} style={{ display: "flex", gap: 16 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", flexShrink: 0, background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, zIndex: 1 }}>{e.icon}</div>
                    <div className="card-hover" style={{ flex: 1, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "16px 18px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6, marginBottom: 6 }}>
                        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#f1f5f9" }}>{e.degree}</h3>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#00d4ff" }}>{e.year}</span>
                      </div>
                      <p style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>{e.field}</p>
                      <p style={{ fontSize: 12, color: "#475569", marginBottom: 8 }}>{e.school}</p>
                      <span style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 4, padding: "3px 10px", fontSize: 12, color: "#4ade80", fontFamily: "'DM Mono', monospace" }}>{e.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* CERTIFICATIONS */}
          <Section id="certifications">
            <SectionHeading label="06 / CREDENTIALS" title="Certifications" />
            <div className="certs-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {CERTS.map(c => (
                <div key={c.name} className="card-hover" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: 20, textAlign: "center" }}>
                  <div style={{ fontSize: 30, marginBottom: 12 }}>{c.icon}</div>
                  <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: "#f1f5f9", marginBottom: 6, lineHeight: 1.3 }}>{c.name}</h4>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#475569", letterSpacing: "0.06em" }}>{c.provider.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* CONTACT */}
          <Section id="contact">
            <SectionHeading label="07 / CONTACT" title="Get In Touch" />
            <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 40 }}>
              <div>
                <p style={{ fontSize: 15, lineHeight: 1.9, color: "#64748b", marginBottom: 24 }}>I'm currently open to new opportunities. Whether you have a question, a project idea, or just want to say hi — my inbox is always open.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[{ label: "Email", value: "abhishek1.aa2@gmail.com", icon: "✉" }, { label: "Phone", value: "+91 82086 XXXXX", icon: "📞" }, { label: "Location", value: "Maharashtra, India", icon: "📍" }].map(({ label, value, icon }) => (
                    <div key={label} style={{ display: "flex", gap: 14, alignItems: "center" }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{icon}</div>
                      <div>
                        <div style={{ fontSize: 11, color: "#475569", fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", marginBottom: 2 }}>{label.toUpperCase()}</div>
                        <div style={{ fontSize: 13, color: "#94a3b8" }}>{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 24 }}>
                <ContactForm />
              </div>
            </div>
          </Section>
        </div>

        {/* FOOTER */}
        <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "24px 20px", position: "relative", zIndex: 1 }}>
          <div className="footer-inner" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
           {/* <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "#f1f5f9" }}>A<span style={{ color: "#00d4ff" }}>.</span></div> */}
            <div className="footer-links" style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {NAV_LINKS.map(l => <span key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase())} style={{ fontSize: 12, color: "#475569", fontFamily: "'DM Mono', monospace" }}>{l}</span>)}
            </div>
            <span style={{ fontSize: 12, color: "#334155", fontFamily: "'DM Mono', monospace" }}>© 2026 ABHISHEK AGRAWAL</span>
          </div>
        </footer>

        {showTop && (
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ position: "fixed", bottom: 24, right: 24, zIndex: 100, width: 44, height: 44, borderRadius: 10, background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00d4ff", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>↑</button>
        )}
      </div>
    </>
  );
}
