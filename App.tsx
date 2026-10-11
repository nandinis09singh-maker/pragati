import { useMemo, useState, type ReactNode } from "react";

type Screen =
  | "home"
  | "details"
  | "market"
  | "loans"
  | "simulator"
  | "compare"
  | "report"
  | "advisor"
  | "dashboard";

type IconName =
  | "home"
  | "map"
  | "wallet"
  | "chart"
  | "file"
  | "chat"
  | "arrow"
  | "check"
  | "spark"
  | "shop"
  | "cow"
  | "scissors"
  | "bird"
  | "food"
  | "briefcase"
  | "menu"
  | "download"
  | "share"
  | "mic"
  | "send"
  | "chevron";

const navItems: { id: Screen; label: string; icon: IconName }[] = [
  { id: "dashboard", label: "Overview", icon: "home" },
  { id: "market", label: "Market analysis", icon: "map" },
  { id: "loans", label: "Loan planner", icon: "wallet" },
  { id: "compare", label: "Compare ideas", icon: "chart" },
  { id: "report", label: "My reports", icon: "file" },
  { id: "advisor", label: "AI advisor", icon: "chat" },
];

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></>,
    map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z"/><path d="M9 3v15M15 6v15"/></>,
    wallet: <><path d="M3 6h15a2 2 0 0 1 2 2v11H5a2 2 0 0 1-2-2Z"/><path d="M3 7V5a2 2 0 0 1 2-2h12v3M15 12h5"/></>,
    chart: <><path d="M4 19V9M10 19V4M16 19v-7M22 19H2"/></>,
    file: <><path d="M6 2h8l4 4v16H6Z"/><path d="M14 2v5h5M9 12h6M9 16h6"/></>,
    chat: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3v-7a7 7 0 0 1-1-4V8a4 4 0 0 1 4-4h11a4 4 0 0 1 4 4Z"/><path d="M7 10h.01M12 10h.01M17 10h.01"/></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    spark: <><path d="m12 3 1.2 4.8L18 9l-4.8 1.2L12 15l-1.2-4.8L6 9l4.8-1.2Z"/><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7Z"/></>,
    shop: <><path d="M4 10v10h16V10M3 10l2-6h14l2 6"/><path d="M3 10c1 2 3 2 4 0 1 2 3 2 5 0 1 2 3 2 5 0 1 2 3 2 4 0M9 20v-6h6v6"/></>,
    cow: <><path d="M5 9C3 7 3 4 4 3l4 4h8l4-4c1 2 1 4-1 6v7c0 3-3 5-7 5s-7-2-7-5Z"/><path d="M8 12h.01M16 12h.01M9 17c2 1 4 1 6 0"/></>,
    scissors: <><circle cx="6" cy="7" r="3"/><circle cx="6" cy="17" r="3"/><path d="m8.5 8.5 12 8.5M8.5 15.5 20.5 7"/></>,
    bird: <><path d="M5 17c-2-4 0-9 5-10 4-1 8 1 9 5 1 5-4 9-9 8"/><path d="m19 11 4 2-4 2M7 7 5 3M11 20l-1 2"/></>,
    food: <><path d="M3 20h18M5 16h14l-1-7H6Z"/><path d="M9 9V5h6v4M12 5V2M4 16l-1 4M20 16l1 4"/></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V4h6v3M3 12h18M10 12v2h4v-2"/></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
    download: <><path d="M12 3v12m-5-5 5 5 5-5M4 20h16"/></>,
    share: <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m9 11 6-4M9 14l6 4"/></>,
    mic: <><rect x="8" y="3" width="8" height="12" rx="4"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/></>,
    send: <><path d="m3 3 19 9-19 9 4-9Z"/><path d="M7 12h15"/></>,
    chevron: <path d="m9 6 6 6-6 6"/>,
  };
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Button({ children, variant = "primary", onClick, icon, type = "button", className = "" }: {
  children: ReactNode; variant?: "primary" | "secondary" | "ghost" | "dark"; onClick?: () => void; icon?: IconName; type?: "button" | "submit"; className?: string;
}) {
  return <button type={type} className={`btn btn-${variant} ${className}`} onClick={onClick}>{children}{icon && <Icon name={icon} />}</button>;
}

function Field({ label, prefix, value, onChange, type = "text", placeholder }: {
  label: string; prefix?: string; value?: string | number; onChange?: (value: string) => void; type?: string; placeholder?: string;
}) {
  return <label className="field"><span>{label}</span><div className="input-wrap">{prefix && <b>{prefix}</b>}<input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange?.(e.target.value)} /></div></label>;
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return <label className="field"><span>{label}</span><select>{options.map((item) => <option key={item}>{item}</option>)}</select></label>;
}

function Badge({ children, tone = "green" }: { children: ReactNode; tone?: "green" | "amber" | "gray" | "red" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function Title({ eyebrow, children, subtitle }: { eyebrow?: string; children: ReactNode; subtitle?: string }) {
  return <div className="title-block">{eyebrow && <div className="eyebrow">{eyebrow}</div>}<h1>{children}</h1>{subtitle && <p>{subtitle}</p>}</div>;
}

function Donut({ value = 72, label }: { value?: number; label: string }) {
  return <div className="donut" style={{ "--value": `${value * 3.6}deg` } as React.CSSProperties}><div><strong>{value}%</strong><span>{label}</span></div></div>;
}

function MiniBars({ values = [34, 54, 42, 69, 82, 76, 92] }: { values?: number[] }) {
  return <div className="mini-bars">{values.map((v, i) => <div key={i} style={{ height: `${v}%` }}><span /></div>)}</div>;
}

function Header({ active, navigate, language, setLanguage, menu, setMenu }: {
  active: Screen; navigate: (s: Screen) => void; language: string; setLanguage: (s: string) => void; menu: boolean; setMenu: (v: boolean) => void;
}) {
  return <header className="topbar">
    <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Open menu"><Icon name="menu" /></button>
    <button className="brand brand-top" onClick={() => navigate("home")}><span className="logo-mark"><Icon name="spark" /></span><span>SE FinTech<small>Business & loan advisory</small></span></button>
    <div className="top-context"><span className="context-dot" /><span><small>Your plan</small>Dairy · Satara, MH</span></div>
    <div className="language"><Icon name="chat" size={17} /><select value={language} onChange={(e) => setLanguage(e.target.value)} aria-label="Language"><option>English</option><option>हिंदी</option><option>मराठी</option></select></div>
    <Button variant="dark" onClick={() => navigate("advisor")}>Ask AI <Icon name="spark" size={17} /></Button>
    <span className="avatar">AS</span>
  </header>;
}

function Sidebar({ active, navigate, open }: { active: Screen; navigate: (s: Screen) => void; open: boolean }) {
  return <aside className={`sidebar ${open ? "open" : ""}`}>
    <button className="brand" onClick={() => navigate("home")}><span className="logo-mark"><Icon name="spark" /></span><span>SE FinTech<small>Business & loan advisory</small></span></button>
    <nav>{navItems.map((item) => <button key={item.id} className={active === item.id ? "active" : ""} onClick={() => navigate(item.id)}><Icon name={item.icon} /><span>{item.label}</span>{item.id === "advisor" && <i>AI</i>}</button>)}</nav>
    <div className="side-help"><span className="help-icon">?</span><strong>Need a little help?</strong><p>Our advisor explains every step in simple words.</p><button onClick={() => navigate("advisor")}>Talk to advisor <Icon name="arrow" size={16} /></button></div>
    <div className="side-foot"><span className="avatar">AS</span><span><strong>Arjun Shinde</strong><small>Plan saved</small></span></div>
  </aside>;
}

function Home({ navigate }: { navigate: (s: Screen) => void }) {
  return <div className="home-page">
    <div className="home-nav"><div className="brand"><span className="logo-mark"><Icon name="spark" /></span><span>SE FinTech<small>Business & loan advisory</small></span></div><div className="language"><select><option>English</option><option>हिंदी</option><option>मराठी</option></select></div></div>
    <section className="hero">
      <div className="hero-copy"><Badge tone="amber"><Icon name="spark" size={15} /> Smart planning for rural entrepreneurs</Badge><h1>Start your business<br />with <em>confidence.</em></h1><p>Understand your local market, discover loan options, and build a practical business plan—all in simple steps.</p><div className="hero-actions"><Button onClick={() => navigate("details")} icon="arrow">Check my business idea</Button><Button variant="secondary" onClick={() => navigate("loans")}>Explore loan schemes</Button></div><div className="trust-row"><span className="avatar-group"><i>RK</i><i>SM</i><i>AP</i></span><span><b>12,500+</b> entrepreneurs planning smarter</span></div></div>
      <div className="hero-art">
        <div className="sun" /><div className="hill hill-one" /><div className="hill hill-two" />
        <div className="shop-illustration"><span className="shop-roof" /><span className="shop-body"><i /><b>सफल उद्यम</b><i /></span></div>
        <div className="person person-one"><span /><i /></div><div className="person person-two"><span /><i /></div>
        <Card className="floating-score"><span className="score-icon"><Icon name="chart" /></span><span><small>Business feasibility</small><strong>78 / 100</strong></span><Badge>Strong fit</Badge></Card>
        <Card className="floating-loan"><Icon name="check" /><span><strong>Loan options found</strong><small>3 schemes may suit your plan</small></span></Card>
      </div>
    </section>
    <section className="features-section"><div className="section-heading"><span>EVERYTHING YOU NEED</span><h2>From idea to action, we guide you</h2><p>Clear local insights and practical financial tools, built for first-time entrepreneurs.</p></div><div className="feature-grid">
      {[
        ["spark", "AI Business Advisor", "Ask questions in simple language and get clear, practical answers for your business.", "Ask a question"],
        ["map", "Local Market Analysis", "Understand demand, nearby competition, and opportunities in your own village.", "See how it works"],
        ["wallet", "Loan & EMI Planner", "Find suitable government schemes and plan repayments without any surprises.", "Explore schemes"],
      ].map(([icon, title, text, link]) => <Card key={title} className="feature-card"><span className="feature-icon"><Icon name={icon as IconName} size={26} /></span><h3>{title}</h3><p>{text}</p><button onClick={() => navigate(title.includes("Loan") ? "loans" : title.includes("Market") ? "market" : "advisor")}>{link} <Icon name="arrow" size={17} /></button></Card>)}
    </div></section>
    <section className="steps"><div><span>HOW IT WORKS</span><h2>A clear plan in three simple steps</h2></div>{[["1", "Tell us about your idea", "Share your village, business idea, and investment budget."], ["2", "Understand the opportunity", "See local demand, competition, costs, and possible risks."], ["3", "Make a confident decision", "Compare options, explore loans, and download your report."]].map(([n, t, d]) => <div className="step" key={n}><b>{n}</b><span><strong>{t}</strong><p>{d}</p></span></div>)}</section>
    <footer><div className="brand"><span className="logo-mark"><Icon name="spark" /></span><span>SE FinTech</span></div><p>Local insight + Government support + Smarter decisions = A stronger rural India.</p><span>Built with care for India’s entrepreneurs.</span></footer>
  </div>;
}

function Details({ navigate }: { navigate: (s: Screen) => void }) {
  const [step, setStep] = useState(1);
  const [business, setBusiness] = useState("Dairy");
  const businesses: [string, IconName, string][] = [["Dairy", "cow", "Milk & cattle"], ["Retail", "shop", "Daily needs shop"], ["Tailoring", "scissors", "Stitching service"], ["Poultry", "bird", "Eggs & chicken"], ["Food stall", "food", "Snacks & meals"], ["Other", "briefcase", "Your own idea"]];
  return <div className="content narrow">
    <Title eyebrow="BUSINESS FEASIBILITY CHECK" subtitle="Answer a few simple questions. You can save and return anytime.">Let’s understand your business idea</Title>
    <div className="progress-steps">{["Your location", "Business idea", "Financial details"].map((label, i) => <div className={step >= i + 1 ? "done" : ""} key={label}><span>{step > i + 1 ? <Icon name="check" size={15} /> : i + 1}</span><b>{label}</b></div>)}</div>
    <Card className="form-card">
      {step === 1 && <><div className="form-head"><span className="big-icon"><Icon name="map" /></span><div><h2>Where will your business be?</h2><p>This helps us understand local demand and nearby competition.</p></div></div><div className="form-grid"><SelectField label="State" options={["Maharashtra", "Gujarat", "Madhya Pradesh"]} /><SelectField label="District" options={["Satara", "Pune", "Kolhapur"]} /><SelectField label="Block / Taluka" options={["Karad", "Phaltan", "Wai"]} /><Field label="Village" value="Malkapur" /></div><div className="tip"><Icon name="spark" /><span><strong>Why do we ask this?</strong> Business demand can change from one village to another. Your location makes the advice more useful.</span></div></>}
      {step === 2 && <><div className="form-head"><span className="big-icon"><Icon name="shop" /></span><div><h2>What business are you planning?</h2><p>Select the closest option. You can add more details later.</p></div></div><div className="business-grid">{businesses.map(([name, icon, desc]) => <button className={business === name ? "selected" : ""} onClick={() => setBusiness(name)} key={name}><span><Icon name={icon} size={27} /></span><b>{name}</b><small>{desc}</small>{business === name && <i><Icon name="check" size={13} /></i>}</button>)}</div><Field label="Business name (optional)" placeholder="e.g. Shinde Dairy Farm" /></>}
      {step === 3 && <><div className="form-head"><span className="big-icon"><Icon name="wallet" /></span><div><h2>Let’s plan your investment</h2><p>Approximate figures are fine. You can change them later.</p></div></div><div className="form-grid"><Field label="Money you already have" prefix="₹" value="2,00,000" /><Field label="Total investment budget" prefix="₹" value="5,00,000" /></div><label className="range-field"><span><b>Available capital</b><strong>₹2,00,000</strong></span><input type="range" min="50000" max="1000000" defaultValue="200000" /><div><small>₹50,000</small><small>₹10,00,000</small></div></label><div className="funding-preview"><span><small>Estimated funding gap</small><strong>₹3,00,000</strong></span><span><small>Your contribution</small><strong>40%</strong></span><div><i style={{ width: "40%" }} /></div></div></>}
      <div className="form-actions"><Button variant="ghost" onClick={() => step === 1 ? navigate("home") : setStep(step - 1)}>← Back</Button><span>Step {step} of 3</span><Button onClick={() => step < 3 ? setStep(step + 1) : navigate("market")} icon={step === 3 ? "spark" : "arrow"}>{step === 3 ? "Analyze my business" : "Continue"}</Button></div>
    </Card>
    <p className="privacy-note">🔒 Your information is private and used only to prepare your business analysis.</p>
  </div>;
}

function Market({ navigate }: { navigate: (s: Screen) => void }) {
  return <div className="content">
    <div className="page-heading"><Title eyebrow="LOCAL MARKET SNAPSHOT" subtitle="Dairy farming · Malkapur, Satara">Your local opportunity looks promising</Title><Button onClick={() => navigate("loans")} icon="arrow">Continue to loan planner</Button></div>
    <div className="notice"><Icon name="spark" /><span><strong>AI-assisted estimate</strong> These insights combine available public data and local patterns. Actual conditions may vary.</span></div>
    <div className="metric-grid">
      <Card><span className="metric-icon amber"><Icon name="home" /></span><span><small>Monthly customers</small><strong>180–240</strong><em>Estimated households</em></span></Card>
      <Card><span className="metric-icon green"><Icon name="chart" /></span><span><small>Local demand</small><strong>High <Badge>↑ Growing</Badge></strong><em>Strong daily need</em></span></Card>
      <Card><span className="metric-icon blue"><Icon name="shop" /></span><span><small>Nearby competitors</small><strong>4</strong><em>Within 5 km</em></span></Card>
      <Card><span className="metric-icon red"><Icon name="wallet" /></span><span><small>Average local price</small><strong>₹58–64/L</strong><em>Retail cow milk</em></span></Card>
    </div>
    <div className="two-col">
      <Card className="demand-card"><div className="card-head"><div><h2>Demand through the year</h2><p>Estimated milk demand index</p></div><Badge>High demand</Badge></div><div className="chart-area"><div className="y-labels"><span>High</span><span>Medium</span><span>Low</span></div><svg viewBox="0 0 600 190" preserveAspectRatio="none"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#16a34a" stopOpacity=".28"/><stop offset="1" stopColor="#16a34a" stopOpacity="0"/></linearGradient></defs><path className="area" d="M0 150 C70 140 80 112 140 120 S220 70 290 90 S390 45 450 62 S540 35 600 28 V190 H0Z"/><path className="line" d="M0 150 C70 140 80 112 140 120 S220 70 290 90 S390 45 450 62 S540 35 600 28"/></svg><div className="x-labels"><span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span></div></div></Card>
      <Card className="map-card"><div className="card-head"><div><h2>Your business area</h2><p>Malkapur · 5 km radius</p></div><button>View map</button></div><div className="fake-map"><i className="road r1" /><i className="road r2" /><i className="road r3" /><span className="river" /><b className="pin main-pin"><Icon name="shop" /></b><b className="pin p1" /><b className="pin p2" /><b className="pin p3" /><em>Malkapur</em><small>Karad →</small></div><div className="map-legend"><span><i className="green-dot" />Your location</span><span><i />Competitor</span></div></Card>
    </div>
    <div className="three-col insights">
      <Card><div className="insight-title opportunity"><Icon name="spark" /><h3>Market opportunities</h3></div><ul className="check-list"><li>Home delivery is limited in your village</li><li>Growing demand from tea stalls and hotels</li><li>Customers value fresh, local milk</li></ul></Card>
      <Card><div className="insight-title"><Icon name="chart" /><h3>Competition nearby</h3></div><div className="competitors"><span><b>Local dairy collection</b><small>1.2 km · Established</small><Badge tone="amber">Medium</Badge></span><span><b>Shree Milk Center</b><small>3.1 km · Retail shop</small><Badge tone="gray">Low</Badge></span></div></Card>
      <Card><div className="insight-title risk"><Icon name="file" /><h3>Risks to plan for</h3></div><ul className="risk-list"><li><span>1</span><div><b>Fodder price changes</b><small>Build a 2-month reserve</small></div></li><li><span>2</span><div><b>Animal health</b><small>Budget for regular check-ups</small></div></li></ul></Card>
    </div>
  </div>;
}

function Loans({ navigate }: { navigate: (s: Screen) => void }) {
  const [loan, setLoan] = useState(300000);
  const [rate, setRate] = useState(10.5);
  const [years, setYears] = useState(5);
  const [open, setOpen] = useState("MUDRA");
  const monthly = rate / 1200;
  const months = years * 12;
  const emi = Math.round((loan * monthly * (1 + monthly) ** months) / ((1 + monthly) ** months - 1));
  return <div className="content">
    <div className="page-heading"><Title eyebrow="LOAN & SCHEME PLANNER" subtitle="Illustrative options based on your Dairy Farm plan">Plan your funding, without surprises</Title><Button onClick={() => navigate("simulator")} icon="arrow">Try what-if simulator</Button></div>
    <div className="metric-grid three"><Card><small>Total project cost</small><strong>₹5,00,000</strong><em>Equipment + setup</em></Card><Card><small>Your available capital</small><strong className="green-text">₹2,00,000</strong><em>40% of project cost</em></Card><Card><small>Funding required</small><strong className="amber-text">₹3,00,000</strong><em>60% of project cost</em></Card></div>
    <div className="loan-layout">
      <div><div className="section-row"><div><h2>Government schemes to explore</h2><p>Eligibility is indicative until verified by a lender.</p></div><Badge>3 possible matches</Badge></div>
        {[
          ["MUDRA", "Pradhan Mantri MUDRA Yojana", "For micro enterprises starting or growing a business.", "Up to ₹10 lakh", "Strong match"],
          ["PMEGP", "Prime Minister’s Employment Generation Programme", "Credit-linked support for new micro enterprises.", "Project-based", "May qualify"],
          ["Stand-Up", "Stand-Up India", "For eligible women and SC/ST entrepreneurs.", "₹10L–₹1Cr", "Check eligibility"],
        ].map(([id, name, desc, amount, fit]) => <Card className={`scheme-card ${open === id ? "scheme-open" : ""}`} key={id}><button className="scheme-summary" onClick={() => setOpen(open === id ? "" : id)}><span className="scheme-logo">{id.slice(0, 2)}</span><span><small>{id}</small><strong>{name}</strong><em>{desc}</em></span><span className="scheme-amount"><small>Potential amount</small><strong>{amount}</strong></span><Badge tone={fit === "Strong match" ? "green" : "amber"}>{fit}</Badge><Icon name="chevron" /></button>{open === id && <div className="scheme-detail"><div><small>Interest rate</small><strong>Check with lender</strong></div><div><small>Repayment tenure</small><strong>Typically 3–7 years*</strong></div><div><small>Moratorium</small><strong>Subject to lender</strong></div><div className="eligibility"><b><Icon name="check" /> Why this may suit you</b><span>Your funding need is within the scheme range, and dairy is commonly considered an eligible allied activity. Final approval depends on lender assessment.</span></div><button>View official details ↗</button></div>}</Card>)}
      </div>
      <Card className="calculator"><div className="calc-head"><span className="big-icon"><Icon name="wallet" /></span><div><h2>EMI calculator</h2><p>Adjust values to plan a comfortable payment.</p></div></div><Field label="Loan amount" prefix="₹" type="number" value={loan} onChange={(v) => setLoan(+v)} /><div className="split-fields"><Field label="Interest rate*" value={rate} type="number" onChange={(v) => setRate(+v)} /><Field label="Tenure (years)" value={years} type="number" onChange={(v) => setYears(+v)} /></div><div className="emi-result"><small>Estimated monthly EMI</small><strong>₹{emi.toLocaleString("en-IN")}<em>/month</em></strong><span>for {years} years · at {rate}% illustrative rate</span></div><div className="principal-chart"><div><i style={{ width: "74%" }} /><i /></div><span><b><i />Principal ₹{(loan / 100000).toFixed(1)}L</b><b><i />Interest ~₹{Math.round((emi * months - loan) / 1000)}K</b></span></div><p className="fineprint">*Rates are illustrative. Confirm current rates and terms directly with the lender.</p></Card>
    </div>
  </div>;
}

function Simulator({ navigate }: { navigate: (s: Screen) => void }) {
  const [capital, setCapital] = useState(200000);
  const [investment, setInvestment] = useState(500000);
  const [revenue, setRevenue] = useState(95000);
  const [expenses, setExpenses] = useState(61000);
  const gap = Math.max(investment - capital, 0);
  const emi = Math.round(gap * 0.0215);
  const surplus = revenue - expenses - emi;
  const score = Math.min(94, Math.max(35, Math.round(60 + surplus / 2000)));
  const Range = ({ label, value, min, max, step, set }: { label: string; value: number; min: number; max: number; step: number; set: (v: number) => void }) => <label className="range-field compact"><span><b>{label}</b><strong>₹{value.toLocaleString("en-IN")}</strong></span><input type="range" value={value} min={min} max={max} step={step} onChange={(e) => set(+e.target.value)} /></label>;
  return <div className="content">
    <div className="page-heading"><Title eyebrow="WHAT-IF SIMULATOR" subtitle="Move the sliders to see how different choices may affect your plan.">Test your plan before you invest</Title><Button variant="secondary" onClick={() => {setCapital(200000); setInvestment(500000); setRevenue(95000); setExpenses(61000);}}>Reset scenario</Button></div>
    <div className="sim-layout"><Card className="controls-card"><h2>Your scenario</h2><p>All values are monthly unless stated otherwise.</p><Range label="Available capital" value={capital} min={50000} max={500000} step={10000} set={setCapital} /><Range label="Total investment" value={investment} min={200000} max={1000000} step={25000} set={setInvestment} /><Range label="Expected revenue" value={revenue} min={30000} max={200000} step={5000} set={setRevenue} /><Range label="Estimated expenses" value={expenses} min={20000} max={150000} step={5000} set={setExpenses} /><div className="split-fields"><Field label="Interest rate" value="10.5%" /><Field label="Tenure" value="5 years" /></div></Card>
      <div className="sim-results"><div className="metric-grid two"><Card><small>Funding gap</small><strong>₹{gap.toLocaleString("en-IN")}</strong><em>Investment minus your capital</em></Card><Card><small>Estimated monthly EMI</small><strong>₹{emi.toLocaleString("en-IN")}</strong><em>Illustrative at 10.5%</em></Card><Card><small>Expected monthly surplus</small><strong className={surplus > 0 ? "green-text" : "red-text"}>₹{surplus.toLocaleString("en-IN")}</strong><em>After expenses and EMI</em></Card><Card className="score-card"><Donut value={score} label="Good" /><span><small>Feasibility score</small><strong>{score}/100</strong><em>Your plan has a healthy buffer</em></span></Card></div><Card className="scenario-chart"><div className="card-head"><div><h2>Compare investment scenarios</h2><p>Projected monthly surplus</p></div><Badge>Estimates</Badge></div><div className="bar-chart">{[["Lean", 48, "₹19K"], ["Your plan", Math.max(20, surplus / 500), `₹${Math.round(surplus / 1000)}K`], ["Growth", 76, "₹38K"]].map(([l, h, v]) => <div key={l}><span>{v}</span><i style={{ height: `${h}%` }} /><b>{l}</b></div>)}</div></Card><div className="sim-note"><Icon name="spark" /><span><b>Good to know</b> A monthly buffer of ₹10,000 or more can help you handle unexpected costs.</span></div><Button onClick={() => navigate("compare")} icon="arrow">Compare business options</Button></div>
    </div>
  </div>;
}

function Compare({ navigate }: { navigate: (s: Screen) => void }) {
  const rows = [
    ["Initial investment", "₹5.0 lakh", "₹3.5 lakh", "₹2.2 lakh"],
    ["Local demand", "High", "High", "Medium"],
    ["Monthly revenue", "₹95K–₹1.2L", "₹70K–₹1L", "₹45K–₹70K"],
    ["Monthly expenses", "₹55K–₹65K", "₹48K–₹62K", "₹20K–₹28K"],
    ["Profit potential", "High", "Medium", "High"],
    ["Funding needed", "₹3.0 lakh", "₹1.5 lakh", "₹20,000"],
    ["Risk level", "Medium", "Low–Medium", "Low"],
    ["Skills needed", "Animal care", "Stock management", "Stitching"],
  ];
  return <div className="content">
    <div className="page-heading"><Title eyebrow="BUSINESS COMPARISON" subtitle="Compared using your ₹2 lakh capital and Malkapur location.">Choose the idea that fits you best</Title><Button onClick={() => navigate("report")} icon="arrow">View feasibility report</Button></div>
    <div className="comparison">
      <div className="comparison-head"><div><span>Compare by</span></div><div className="recommended"><Badge>Best fit</Badge><span className="business-avatar"><Icon name="cow" /></span><h3>Dairy farming</h3><p>Strong local demand</p><b>78<small>/100</small></b></div><div><button className="remove">×</button><span className="business-avatar amber"><Icon name="shop" /></span><h3>Retail shop</h3><p>Lower setup complexity</p><b>71<small>/100</small></b></div><div><button className="remove">×</button><span className="business-avatar blue"><Icon name="scissors" /></span><h3>Tailoring</h3><p>Lowest funding need</p><b>69<small>/100</small></b></div></div>
      {rows.map((row, i) => <div className="comparison-row" key={row[0]}><strong>{row[0]}</strong>{row.slice(1).map((v, j) => <span key={j} className={j === 0 ? "recommended" : ""}>{i === 1 || i === 4 || i === 6 ? <Badge tone={v.includes("High") ? "green" : v.includes("Low") ? "gray" : "amber"}>{v}</Badge> : v}</span>)}</div>)}
    </div>
    <Card className="recommendation"><span className="feature-icon"><Icon name="spark" /></span><div><Badge>OUR RECOMMENDATION</Badge><h2>Dairy farming is your strongest fit</h2><p>Your village shows strong daily demand, you have relevant experience, and your capital covers 40% of setup costs. The main challenge is managing animal care and feed costs.</p></div><Button onClick={() => navigate("report")}>See full reasoning <Icon name="arrow" /></Button></Card>
  </div>;
}

function Report({ navigate }: { navigate: (s: Screen) => void }) {
  return <div className="content report-wrap">
    <div className="page-heading report-actions"><Title eyebrow="FEASIBILITY REPORT" subtitle="Prepared 24 June 2025 · AI-assisted analysis">Your business plan, explained clearly</Title><div><Button variant="secondary"><Icon name="share" /> Share on WhatsApp</Button><Button><Icon name="download" /> Download PDF</Button></div></div>
    <div className="report-paper">
      <div className="report-cover"><div><Badge>DAIRY FARMING · MALKAPUR</Badge><h1>Shinde Dairy Farm</h1><p>A practical feasibility report for starting a small dairy enterprise in Satara district, Maharashtra.</p><div className="report-meta"><span><small>Prepared for</small><b>Arjun Shinde</b></span><span><small>Estimated project cost</small><b>₹5,00,000</b></span><span><small>Available capital</small><b>₹2,00,000</b></span></div></div><div className="score-gauge"><svg viewBox="0 0 130 75"><path d="M10 68a55 55 0 0 1 110 0" pathLength="100"/><path className="score-path" d="M10 68a55 55 0 0 1 110 0" pathLength="100"/></svg><strong>78<small>/100</small></strong><Badge>SUITABLE</Badge></div></div>
      <div className="report-summary"><span className="feature-icon"><Icon name="spark" /></span><div><h2>What this score means</h2><p>Your plan looks practical because local demand is strong and your own capital covers a meaningful part of the cost. Success will depend on controlling feed costs and building regular customers.</p></div></div>
      <section className="report-section"><span className="section-num">01</span><div><h2>Executive summary</h2><p>A small dairy business in Malkapur has a good chance of becoming sustainable. Households, tea stalls, and nearby food businesses create steady demand for fresh milk. Starting with 4–5 animals keeps the investment manageable while allowing room to learn and grow.</p><div className="highlight-grid"><span><small>Demand outlook</small><b>High & growing</b></span><span><small>Break-even estimate</small><b>18–24 months</b></span><span><small>Expected monthly surplus</small><b>₹27,500</b></span></div></div></section>
      <section className="report-section"><span className="section-num">02</span><div><h2>Local market opportunity</h2><div className="report-two"><div><p>Fresh, reliable home delivery is the clearest market gap. Start by serving 30–40 nearby families and 3–5 tea stalls.</p><ul className="check-list"><li>Estimated 180–240 customer households</li><li>Only 4 visible competitors within 5 km</li><li>Typical local retail price ₹58–64 per litre</li></ul></div><Card className="report-chart"><span><b>Local demand index</b><small>Next 12 months</small></span><MiniBars /></Card></div></div></section>
      <section className="report-section"><span className="section-num">03</span><div><h2>SWOT analysis</h2><div className="swot"><div><b>Strengths</b><p>Daily demand, local trust, recurring customers</p></div><div><b>Weaknesses</b><p>High daily involvement, limited starting capital</p></div><div><b>Opportunities</b><p>Home delivery, value-added products, hotel supply</p></div><div><b>Risks</b><p>Feed prices, animal health, seasonal yields</p></div></div></div></section>
      <section className="report-section"><span className="section-num">04</span><div><h2>Startup costs & funding</h2><div className="report-two"><div className="cost-donut"><Donut value={60} label="Livestock" /><ul><li><i />Livestock <b>₹3.0L</b></li><li><i />Shed & equipment <b>₹1.2L</b></li><li><i />Working capital <b>₹80K</b></li></ul></div><div className="funding-box"><span><small>Your capital</small><b>₹2,00,000</b></span><span><small>Funding gap</small><b>₹3,00,000</b></span><p><Icon name="check" /> MUDRA may be worth exploring first. Confirm current terms with an approved lender.</p></div></div></div></section>
      <section className="report-section"><span className="section-num">05</span><div><h2>Your recommended next steps</h2><div className="next-steps">{["Visit 10 local households and 3 tea stalls", "Get written quotations for cattle and equipment", "Speak with a veterinarian about animal health costs", "Take this report to two banks and compare terms"].map((x, i) => <label key={x}><input type="checkbox" /><span><b>Step {i + 1}</b>{x}</span></label>)}</div></div></section>
      <div className="disclaimer"><b>Important disclaimer</b><p>This report uses estimates and available data, which may be incomplete. Scores and forecasts are not guarantees of business success or loan approval. Verify costs, demand, eligibility, and loan terms before investing.</p></div>
    </div>
    <div className="report-bottom"><Button variant="secondary" onClick={() => navigate("compare")}>← Back to comparison</Button><Button onClick={() => navigate("dashboard")} icon="arrow">Go to my dashboard</Button></div>
  </div>;
}

function Advisor() {
  const [messages, setMessages] = useState<{ from: "ai" | "user"; text: string }[]>([
    { from: "ai", text: "Namaste, Arjun! I’ve reviewed your dairy plan for Malkapur. What would you like help with today?" },
  ]);
  const [text, setText] = useState("");
  const ask = (question: string) => {
    if (!question.trim()) return;
    setMessages((m) => [...m, { from: "user", text: question }, { from: "ai", text: "For your current plan, keep at least ₹10,000–₹15,000 as a monthly safety buffer. This means money left after feed, care, household needs, and your EMI. I can also show you how this was calculated." }]);
    setText("");
  };
  return <div className="chat-page">
    <div className="chat-context"><div><Badge>ACTIVE PLAN</Badge><h2>Shinde Dairy Farm</h2><p><Icon name="map" size={15} /> Malkapur, Satara</p></div><div><span><small>Available capital</small><b>₹2,00,000</b></span><span><small>Funding gap</small><b>₹3,00,000</b></span><span><small>Score</small><b className="green-text">78/100</b></span></div></div>
    <div className="chat-main"><div className="chat-title"><span className="ai-avatar"><Icon name="spark" /></span><div><h1>SE Business Advisor</h1><p><i /> Online · Explains things simply</p></div><Badge>AI ASSISTANT</Badge></div>
      <div className="messages">{messages.map((m, i) => <div className={`message ${m.from}`} key={i}>{m.from === "ai" && <span className="ai-avatar"><Icon name="spark" /></span>}<div><p>{m.text}</p>{m.from === "ai" && <small>AI-generated guidance · Please verify important financial decisions</small>}</div></div>)}</div>
      <div className="suggestions"><small>TRY ASKING</small><div>{["What price should I charge?", "What are the main risks?", "Which loan scheme suits me?", "How much profit can I make?"].map((q) => <button key={q} onClick={() => ask(q)}>{q}</button>)}</div></div>
      <form className="chat-input" onSubmit={(e) => {e.preventDefault(); ask(text);}}><button type="button" aria-label="Voice input"><Icon name="mic" /></button><input value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask anything about your business…" /><span>English</span><button type="submit" aria-label="Send"><Icon name="send" /></button></form>
      <p className="chat-footnote">The advisor can make mistakes. Verify loan terms and important decisions with official sources.</p>
    </div>
  </div>;
}

function Dashboard({ navigate }: { navigate: (s: Screen) => void }) {
  return <div className="content">
    <div className="page-heading"><Title eyebrow="TUESDAY, 24 JUNE" subtitle="Your dairy business plan is 80% complete.">Good morning, Arjun</Title><Button onClick={() => navigate("market")} icon="arrow">Continue analysis</Button></div>
    <Card className="plan-banner"><div><Badge>YOUR ACTIVE BUSINESS PLAN</Badge><h2>Shinde Dairy Farm</h2><p><Icon name="map" size={16} /> Malkapur, Satara · Last updated today</p><div className="plan-progress"><span><i /></span><b>80% complete</b></div></div><div className="plan-score"><Donut value={78} label="Suitable" /><span><small>Feasibility score</small><strong>78 / 100</strong><em>Strong local demand</em></span></div><Button variant="secondary" onClick={() => navigate("report")}>View full report <Icon name="chevron" /></Button></Card>
    <div className="metric-grid dashboard-metrics"><Card><span className="metric-icon amber"><Icon name="wallet" /></span><span><small>Project cost</small><strong>₹5,00,000</strong><em>Estimated total</em></span></Card><Card><span className="metric-icon green"><Icon name="chart" /></span><span><small>Funding gap</small><strong>₹3,00,000</strong><em>60% of project</em></span></Card><Card><span className="metric-icon blue"><Icon name="wallet" /></span><span><small>Estimated EMI</small><strong>₹6,448</strong><em>Monthly · 5 years</em></span></Card><Card><span className="metric-icon green"><Icon name="home" /></span><span><small>Local demand</small><strong>High</strong><em>↑ Growing</em></span></Card></div>
    <div className="dashboard-grid">
      <Card className="breakdown"><div className="card-head"><div><h2>Project cost breakdown</h2><p>Where your ₹5 lakh investment goes</p></div><button>Details</button></div><div className="cost-donut"><Donut value={60} label="Livestock" /><ul><li><i />Livestock <b>₹3.0L</b></li><li><i />Shed & equipment <b>₹1.2L</b></li><li><i />Working capital <b>₹80K</b></li></ul></div></Card>
      <Card><div className="card-head"><div><h2>Repayment timeline</h2><p>Principal balance over 5 years</p></div><Badge>₹6,448 / mo</Badge></div><div className="chart-area small"><svg viewBox="0 0 600 170" preserveAspectRatio="none"><path className="area amber-area" d="M0 25 C120 35 190 65 280 78 S430 120 600 155 V170H0Z"/><path className="line amber-line" d="M0 25 C120 35 190 65 280 78 S430 120 600 155"/></svg><div className="x-labels"><span>Now</span><span>Year 1</span><span>Year 2</span><span>Year 3</span><span>Year 4</span><span>Year 5</span></div></div></Card>
      <Card className="quick-access"><div className="card-head"><div><h2>Quick access</h2><p>Pick up where you left off</p></div></div><div>{[["map", "Market analysis", "See local demand", "market"], ["wallet", "Loan calculator", "Adjust your EMI", "loans"], ["file", "Feasibility report", "View or download", "report"], ["chat", "AI advisor", "Ask a question", "advisor"]].map(([icon, title, sub, screen]) => <button key={title} onClick={() => navigate(screen as Screen)}><span className="metric-icon"><Icon name={icon as IconName} /></span><span><b>{title}</b><small>{sub}</small></span><Icon name="chevron" /></button>)}</div></Card>
      <Card className="saved-schemes"><div className="card-head"><div><h2>Saved loan schemes</h2><p>Options you want to explore</p></div><button onClick={() => navigate("loans")}>View all</button></div><div><span className="scheme-logo">MU</span><span><b>MUDRA Yojana</b><small>Up to ₹10 lakh · Terms vary</small></span><Badge>Strong match</Badge></div><div><span className="scheme-logo orange">PM</span><span><b>PMEGP</b><small>Project-based support</small></span><Badge tone="amber">May qualify</Badge></div></Card>
    </div>
  </div>;
}

function BottomNav({ active, navigate }: { active: Screen; navigate: (s: Screen) => void }) {
  return <nav className="bottom-nav">{[["dashboard", "home", "Home"], ["market", "map", "Market"], ["loans", "wallet", "Loans"], ["report", "file", "Reports"], ["advisor", "chat", "Advisor"]].map(([id, icon, label]) => <button className={active === id ? "active" : ""} onClick={() => navigate(id as Screen)} key={id}><Icon name={icon as IconName} /><span>{label}</span></button>)}</nav>;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [language, setLanguage] = useState("English");
  const [menu, setMenu] = useState(false);
  const navigate = (next: Screen) => { setScreen(next); setMenu(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const page = useMemo(() => {
    if (screen === "home") return <Home navigate={navigate} />;
    if (screen === "details") return <Details navigate={navigate} />;
    if (screen === "market") return <Market navigate={navigate} />;
    if (screen === "loans") return <Loans navigate={navigate} />;
    if (screen === "simulator") return <Simulator navigate={navigate} />;
    if (screen === "compare") return <Compare navigate={navigate} />;
    if (screen === "report") return <Report navigate={navigate} />;
    if (screen === "advisor") return <Advisor />;
    return <Dashboard navigate={navigate} />;
  }, [screen]);
  if (screen === "home") return page;
  return <div className="app-shell"><Sidebar active={screen} navigate={navigate} open={menu} /><Header active={screen} navigate={navigate} language={language} setLanguage={setLanguage} menu={menu} setMenu={setMenu} /><main>{page}</main><BottomNav active={screen} navigate={navigate} /></div>;
}
