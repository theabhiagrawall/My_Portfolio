import { useState, useEffect, useRef } from "react";

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
    title: "Smart Contact Manager",
    subtitle: "Secure Contact Management",
    desc: "A secure, high-performance contact management application with fast data retrieval, authentication, and complete CRUD operations built on a robust Spring Boot backend.",
    tech: ["Java", "Spring MVC", "Spring Boot", "REST API", "MySQL"],
    features: ["Contact Management", "Authentication", "CRUD Operations", "Secure Storage"],
    color: "#a855f7",
    icon: "📇",
  },
];

const EDUCATION = [
  {
    degree: "Bachelor of Engineering",
    field: "Computer Science and Engineering",
    school: "Sipna College of Engineering and Technology",
    score: "CGPA: 8.56",
    year: "2024",
    icon: "🏛️",
  },
  {
    degree: "Diploma in Information Technology",
    field: "Information Technology",
    school: "Government Polytechnic Washim",
    score: "88%",
    year: "2021",
    icon: "📚",
  },
  {
    degree: "SSC",
    field: "Secondary Education",
    school: "Shree P.D. Jain Vidyalaya",
    score: "72.80%",
    year: "2017",
    icon: "🎒",
  },
];

const CERTS = [
  { name: "Programming in Java", provider: "Udemy", icon: "☕" },
  { name: "Web Development", provider: "Udemy", icon: "🌐" },
  { name: "JavaScript", provider: "Udemy", icon: "⚡" },
  { name: "Cisco Packet Tracer", provider: "Cisco", icon: "🔗" },
];

// Animated skill bar
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
        <span style={{ fontSize: 13, fontFamily: "'DM Mono', monospace", color: "#cbd5e1", letterSpacing: "0.02em" }}>{name}</span>
        <span style={{ fontSize: 12, color: color, fontFamily: "'DM Mono', monospace", fontWeight: 600 }}>{level}%</span>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 2,
          background: `linear-gradient(90deg, ${color}cc, ${color})`,
          width: `${width}%`,
          transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: `0 0 8px ${color}66`,
        }} />
      </div>
    </div>
  );
}

// Scroll reveal hook
function useReveal() {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Section({ id, children, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <section id={id} ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
      padding: "80px 0",
      ...style,
    }}>
      {children}
    </section>
  );
}

function SectionHeading({ label, title }) {
  return (
    <div style={{ marginBottom: 52 }}>
      <div style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 11,
        letterSpacing: "0.2em",
        color: "#00d4ff",
        textTransform: "uppercase",
        marginBottom: 10,
      }}>{label}</div>
      <h2 style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: "clamp(28px, 4vw, 42px)",
        fontWeight: 800,
        color: "#f1f5f9",
        lineHeight: 1.15,
        margin: 0,
      }}>{title}</h2>
      <div style={{ width: 48, height: 3, background: "linear-gradient(90deg, #00d4ff, #a855f7)", borderRadius: 2, marginTop: 14 }} />
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const handle = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = (e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000); setForm({ name: "", email: "", subject: "", message: "" }); };
  const inputStyle = {
    width: "100%", boxSizing: "border-box",
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8, padding: "12px 16px",
    color: "#f1f5f9", fontSize: 14, fontFamily: "inherit",
    outline: "none", transition: "border-color 0.2s",
  };
  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <input style={inputStyle} placeholder="Your Name" value={form.name} onChange={handle("name")} required />
        <input style={inputStyle} type="email" placeholder="Email Address" value={form.email} onChange={handle("email")} required />
      </div>
      <input style={inputStyle} placeholder="Subject" value={form.subject} onChange={handle("subject")} required />
      <textarea style={{ ...inputStyle, minHeight: 140, resize: "vertical" }} placeholder="Your Message" value={form.message} onChange={handle("message")} required />
      <button type="submit" style={{
        background: "linear-gradient(135deg, #00d4ff22, #a855f722)",
        border: "1px solid #00d4ff66",
        color: "#00d4ff", padding: "13px 32px",
        borderRadius: 8, fontSize: 14, fontWeight: 600,
        cursor: "pointer", letterSpacing: "0.05em",
        fontFamily: "'DM Mono', monospace",
        transition: "all 0.2s",
        alignSelf: "flex-start",
      }}>
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
    // Typing animation
    const tick = () => {
      const current = phrases[phraseIdx.current];
      if (!deleting.current) {
        setTypedText(current.slice(0, charIdx.current + 1));
        charIdx.current++;
        if (charIdx.current === current.length) { deleting.current = true; return setTimeout(tick, 1800); }
      } else {
        setTypedText(current.slice(0, charIdx.current - 1));
        charIdx.current--;
        if (charIdx.current === 0) {
          deleting.current = false;
          phraseIdx.current = (phraseIdx.current + 1) % phrases.length;
        }
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
      const sections = NAV_LINKS.map(n => n.toLowerCase());
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveSection(s); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const BG = {
    background: "#080c14",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
    color: "#cbd5e1",
    overflowX: "hidden",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400;500&family=Inter:wght@300;400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
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
        @keyframes grain { 0%,100%{transform:translate(0,0)} 10%{transform:translate(-2%,-3%)} 50%{transform:translate(2%,1%)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>

      {/* Noise texture overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px",
      }} />

      {/* Background grid */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div style={BG}>
        {/* ─── NAVBAR ─── */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: scrolled ? "rgba(8,12,20,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "all 0.3s",
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
              AA<span style={{ color: "#00d4ff" }}>.</span>
            </div>
            {/* Desktop nav */}
            <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
              {NAV_LINKS.map(l => (
                <span key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase())}
                  style={{ fontSize: 13, letterSpacing: "0.04em", fontFamily: "'DM Mono', monospace", color: activeSection === l.toLowerCase() ? "#00d4ff" : "#94a3b8" }}>
                  {l}
                </span>
              ))}
            </div>
            <button onClick={() => setMenuOpen(m => !m)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 22, display: "none" }} id="menu-btn">
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
          {/* Mobile menu */}
          {menuOpen && (
            <div style={{ background: "rgba(8,12,20,0.98)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
              {NAV_LINKS.map(l => (
                <span key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase())}
                  style={{ fontSize: 14, fontFamily: "'DM Mono', monospace", color: "#94a3b8" }}>{l}</span>
              ))}
            </div>
          )}
        </nav>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

          {/* ─── HERO ─── */}
          <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 80 }}>
            <div style={{ width: "100%" }}>
              {/* Availability badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: 100, padding: "6px 16px", marginBottom: 32 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 0 3px rgba(34,197,94,0.2)", animation: "pulse-ring 1.5s ease-out infinite" }} />
                <span style={{ fontSize: 12, color: "#94a3b8", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em" }}>OPEN TO OPPORTUNITIES</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 48, alignItems: "center" }}>
                <div>
                  <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "#00d4ff", letterSpacing: "0.12em", marginBottom: 16 }}>HEY, I'M</p>
                  <h1 style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "clamp(42px, 7vw, 80px)",
                    fontWeight: 800,
                    lineHeight: 1.0,
                    color: "#f1f5f9",
                    marginBottom: 8,
                  }}>Abhishek<br />Agrawal</h1>

                  <div style={{ height: 48, display: "flex", alignItems: "center", marginBottom: 24 }}>
                    <span style={{
                      fontFamily: "'Syne', sans-serif", fontSize: "clamp(18px, 3vw, 28px)",
                      color: "#00d4ff", fontWeight: 700,
                    }}>
                      {typedText}<span style={{ animation: "blink 1s infinite", color: "#a855f7" }}>|</span>
                    </span>
                  </div>

                  <p style={{ fontSize: 16, lineHeight: 1.8, color: "#64748b", maxWidth: 540, marginBottom: 40 }}>
                    Building scalable backend systems and full-stack applications with <span style={{ color: "#94a3b8" }}>Java & Spring Boot</span>. Passionate about clean architecture, performance optimization, and crafting elegant APIs.
                  </p>

                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 48 }}>
                    <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }} style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      background: "linear-gradient(135deg, #00d4ff, #0090b3)",
                      color: "#080c14", padding: "13px 28px", borderRadius: 8,
                      fontWeight: 700, fontSize: 14, letterSpacing: "0.04em",
                      fontFamily: "'DM Mono', monospace", transition: "opacity 0.2s",
                    }}>CONTACT ME →</a>
                    <a href="Abhishek_CV.pdf" style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
                      color: "#f1f5f9", padding: "13px 28px", borderRadius: 8,
                      fontWeight: 600, fontSize: 14, letterSpacing: "0.04em",
                      fontFamily: "'DM Mono', monospace", transition: "border-color 0.2s",
                    }}>↓ DOWNLOAD CV</a>
                  </div>

                  {/* Social links */}
                  <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                    {[
                      { label: "GitHub", icon: "⌥", url: "https://github.com/theabhiagrawall" },
                      { label: "LinkedIn", icon: "in", url: "https://linkedin.com" },
                      { label: "Email", icon: "✉", url: "mailto:abhishek1.aa2@gmail.com" },
                    ].map(s => (
                      <a key={s.label} href={s.url} style={{
                        width: 40, height: 40, borderRadius: 8,
                        border: "1px solid rgba(255,255,255,0.1)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#64748b", fontSize: 14, transition: "all 0.2s",
                        fontFamily: "'DM Mono', monospace", fontWeight: 600,
                      }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "#00d4ff66"; e.currentTarget.style.color = "#00d4ff"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#64748b"; }}
                      >{s.icon}</a>
                    ))}
                    <div style={{ height: 1, width: 40, background: "rgba(255,255,255,0.1)" }} />
                    <span style={{ fontSize: 12, color: "#475569", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em" }}>PUNE, MH</span>
                  </div>
                </div>

                {/* Avatar */}
                <div style={{ animation: "float 5s ease-in-out infinite", flexShrink: 0 }}>
                  <div style={{ width: 220, height: 220, borderRadius: "50%", position: "relative" }}>
                    <div style={{
                      position: "absolute", inset: -2,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #00d4ff, #a855f7, #00d4ff)",
                      padding: 2,
                    }}>
                      <div style={{
                        width: "100%", height: "100%", borderRadius: "50%",
                        background: "linear-gradient(135deg, #0f172a, #1e293b)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 64, fontWeight: 800, color: "#f1f5f9" }}>AA</span>
                      </div>
                    </div>
                    <div style={{
                      position: "absolute", inset: -20, borderRadius: "50%",
                      border: "1px solid rgba(0,212,255,0.12)",
                      animation: "pulse-ring 3s ease-out infinite",
                    }} />
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: "flex", gap: 48, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 36 }}>
                {[["2+", "Years Learning"], ["5+", "Projects Built"], ["8.56", "CGPA"], ["3+", "Certifications"]].map(([n, l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "#f1f5f9" }}>{n}</div>
                    <div style={{ fontSize: 12, color: "#475569", fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── ABOUT ─── */}
          <Section id="about">
            <SectionHeading label="01 / ABOUT" title="About Me" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
              <div>
                <p style={{ fontSize: 15, lineHeight: 1.9, color: "#94a3b8", marginBottom: 20 }}>
                  I'm a passionate Full Stack Java Developer with a strong foundation in backend development, specializing in building scalable and maintainable enterprise applications using <span style={{ color: "#00d4ff" }}>Java, Spring Boot, and MySQL</span>.
                </p>
                <p style={{ fontSize: 15, lineHeight: 1.9, color: "#94a3b8", marginBottom: 20 }}>
                  My journey in software development is driven by a deep curiosity for solving complex problems and a commitment to writing clean, efficient code. I thrive in collaborative environments and enjoy translating business requirements into robust technical solutions.
                </p>
                <p style={{ fontSize: 15, lineHeight: 1.9, color: "#94a3b8" }}>
                  I'm actively seeking full-time opportunities where I can apply my backend expertise and grow as an engineer, contributing to impactful products while continuously learning from experienced teams.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { label: "Name", value: "Abhishek Agrawal" },
                  { label: "Location", value: "Maharashtra, India" },
                  { label: "Email", value: "abhishek1.aa2@gmail.com.com" },
                  { label: "Education", value: "BE in CSE, Sipna College of Engineering and Technology, Amravati" },
                  { label: "Experience", value: "Application Developer Intern @ Soham Global" },
                  { label: "Interests", value: "Java, Spring Boot, Backend Arch, APIs, Microservices" },
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    display: "flex", gap: 16, alignItems: "baseline",
                    borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: 12,
                  }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#475569", letterSpacing: "0.08em", width: 90, flexShrink: 0 }}>{label.toUpperCase()}</span>
                    <span style={{ fontSize: 14, color: "#cbd5e1" }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* ─── SKILLS ─── */}
          <Section id="skills">
            <SectionHeading label="02 / SKILLS" title="Technical Skills" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {Object.entries(SKILLS).map(([cat, skills], i) => {
                const colors = ["#00d4ff", "#a855f7", "#22d3ee"];
                return (
                  <div key={cat} className="card-hover" style={{
                    background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 12, padding: 28,
                  }}>
                    <h3 style={{
                      fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16,
                      color: "#f1f5f9", marginBottom: 24,
                      paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}>{cat}</h3>
                    {skills.map(s => <SkillBar key={s.name} {...s} color={colors[i]} />)}
                  </div>
                );
              })}
            </div>
            {/* Tech chips */}
            <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["OOP", "DBMS", "REST APIs", "Microservices", "Postman", "VS Code", "STS", "Git", "GitHub", "JDBC"].map(t => (
                <span key={t} style={{
                  background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)",
                  borderRadius: 100, padding: "5px 14px",
                  fontSize: 12, color: "#a78bfa", fontFamily: "'DM Mono', monospace",
                }}>{t}</span>
              ))}
            </div>
          </Section>

          {/* ─── EXPERIENCE ─── */}
          <Section id="experience">
            <SectionHeading label="03 / EXPERIENCE" title="Work Experience" />
            <div style={{
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,212,255,0.15)",
              borderRadius: 16, padding: 40, position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: "linear-gradient(90deg, #00d4ff, #a855f7)",
              }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
                <div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, color: "#f1f5f9", marginBottom: 6 }}>Application Developer Intern</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 16, color: "#00d4ff", fontWeight: 600 }}>Soham Global</span>
                    <span style={{ fontSize: 12, color: "#475569" }}>•</span>
                    <span style={{ fontSize: 13, color: "#64748b" }}>Full-time Internship</span>
                  </div>
                </div>
                <div style={{
                  background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)",
                  borderRadius: 8, padding: "8px 16px",
                  fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#00d4ff",
                }}>JAN 2024 — MAR 2024</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[
                  "Developed backend features using Java and Spring Boot, improving system performance",
                  "Optimized complex database queries resulting in faster data retrieval times",
                  "Built and integrated RESTful APIs consumed by frontend and third-party clients",
                  "Collaborated within an agile development team, participating in code reviews",
                ].map((r, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      <span style={{ color: "#00d4ff", fontSize: 10 }}>✓</span>
                    </div>
                    <span style={{ fontSize: 14, lineHeight: 1.7, color: "#94a3b8" }}>{r}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap" }}>
                {["Java", "Spring Boot", "REST API", "MySQL", "Git"].map(t => (
                  <span key={t} style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.15)", borderRadius: 4, padding: "3px 10px", fontSize: 11, color: "#67e8f9", fontFamily: "'DM Mono', monospace" }}>{t}</span>
                ))}
              </div>
            </div>
          </Section>

          {/* ─── PROJECTS ─── */}
          <Section id="projects">
            <SectionHeading label="04 / PROJECTS" title="Featured Projects" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {PROJECTS.map((p, i) => (
                <div key={p.title} className="card-hover" style={{
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 16, padding: 32, position: "relative", overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 2,
                    background: `linear-gradient(90deg, ${p.color}88, ${p.color})`,
                  }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                    <div style={{ fontSize: 36 }}>{p.icon}</div>
                    <span style={{
                      fontFamily: "'DM Mono', monospace", fontSize: 11,
                      color: "#475569", letterSpacing: "0.1em",
                    }}>0{i + 1}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: "#f1f5f9", marginBottom: 4 }}>{p.title}</h3>
                  <p style={{ fontSize: 12, color: p.color, fontFamily: "'DM Mono', monospace", marginBottom: 16 }}>{p.subtitle}</p>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: "#64748b", marginBottom: 20 }}>{p.desc}</p>

                  {/* Features */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                    {p.features.map(f => (
                      <span key={f} style={{
                        fontSize: 12, padding: "4px 12px", borderRadius: 100,
                        background: `${p.color}10`, border: `1px solid ${p.color}30`,
                        color: p.color,
                      }}>{f}</span>
                    ))}
                  </div>

                  {/* Tech */}
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {p.tech.map(t => (
                        <span key={t} style={{ fontSize: 11, color: "#475569", fontFamily: "'DM Mono', monospace" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ─── EDUCATION ─── */}
          <Section id="education">
            <SectionHeading label="05 / EDUCATION" title="Education" />
            <div style={{ position: "relative" }}>
              {/* Timeline line */}
              <div style={{ position: "absolute", left: 19, top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.07)" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                {EDUCATION.map((e, i) => (
                  <div key={i} style={{ display: "flex", gap: 32 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                      background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 18, zIndex: 1,
                    }}>{e.icon}</div>
                    <div className="card-hover" style={{
                      flex: 1, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 12, padding: 24,
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: "#f1f5f9" }}>{e.degree}</h3>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#00d4ff" }}>{e.year}</span>
                      </div>
                      <p style={{ fontSize: 14, color: "#64748b", marginBottom: 4 }}>{e.field}</p>
                      <p style={{ fontSize: 13, color: "#475569", marginBottom: 12 }}>{e.school}</p>
                      <span style={{
                        background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)",
                        borderRadius: 4, padding: "3px 10px", fontSize: 12, color: "#4ade80",
                        fontFamily: "'DM Mono', monospace",
                      }}>{e.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* ─── CERTIFICATIONS ─── */}
          <Section id="certifications">
            <SectionHeading label="06 / CREDENTIALS" title="Certifications" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
              {CERTS.map(c => (
                <div key={c.name} className="card-hover" style={{
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 12, padding: 24, textAlign: "center",
                }}>
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{c.icon}</div>
                  <h4 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#f1f5f9", marginBottom: 8, lineHeight: 1.3 }}>{c.name}</h4>
                  <span style={{
                    fontFamily: "'DM Mono', monospace", fontSize: 11,
                    color: "#475569", letterSpacing: "0.06em",
                  }}>{c.provider.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* ─── CONTACT ─── */}
          <Section id="contact">
            <SectionHeading label="07 / CONTACT" title="Get In Touch" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 48, alignItems: "start" }}>
              <div>
                <p style={{ fontSize: 15, lineHeight: 1.9, color: "#64748b", marginBottom: 36 }}>
                  I'm currently open to new opportunities. Whether you have a question, a project idea, or just want to say hi — my inbox is always open.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {[
                    { label: "Email", value: "abhishek1.aa2@gmail.com.com", icon: "✉" },
                    { label: "Phone", value: "+91 XXXXX XXXXX", icon: "📞" },
                    { label: "Location", value: "Maharashtra, India", icon: "📍" },
                  ].map(({ label, value, icon }) => (
                    <div key={label} style={{ display: "flex", gap: 16, alignItems: "center" }}>
                      <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{icon}</div>
                      <div>
                        <div style={{ fontSize: 11, color: "#475569", fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", marginBottom: 2 }}>{label.toUpperCase()}</div>
                        <div style={{ fontSize: 14, color: "#94a3b8" }}>{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{
                background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16, padding: 32,
              }}>
                <ContactForm />
              </div>
            </div>
          </Section>

        </div>

        {/* ─── FOOTER ─── */}
        <footer style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "32px 24px",
          position: "relative", zIndex: 1,
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "#f1f5f9" }}>
              AA<span style={{ color: "#00d4ff" }}>.</span>
            </div>
            <div style={{ display: "flex", gap: 24 }}>
              {NAV_LINKS.map(l => (
                <span key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase())}
                  style={{ fontSize: 12, color: "#475569", fontFamily: "'DM Mono', monospace", letterSpacing: "0.04em" }}>
                  {l}
                </span>
              ))}
            </div>
            <span style={{ fontSize: 12, color: "#334155", fontFamily: "'DM Mono', monospace" }}>
              © 2024 ABHISHEK AGRAWAL
            </span>
          </div>
        </footer>

        {/* Scroll to top */}
        {showTop && (
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{
            position: "fixed", bottom: 32, right: 32, zIndex: 100,
            width: 44, height: 44, borderRadius: 10,
            background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)",
            color: "#00d4ff", fontSize: 18, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s", boxShadow: "0 0 20px rgba(0,212,255,0.1)",
          }}>↑</button>
        )}
      </div>
    </>
  );
}
