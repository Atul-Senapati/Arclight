export const IMG = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const photos = {
  hero: "photo-1497366216548-37526070297c",
  workshop: "photo-1552664730-d307ca884978",
  desk: "photo-1519389950473-47ba0277781c",
  towers: "photo-1486406146926-c627a92ad1ab",
  strategy: "photo-1454165804606-c3d57bc86b40",
  team: "photo-1556761175-b413da4baf72",
  studio: "photo-1497215728101-856f4ea42174",
  meeting: "photo-1542744173-8e7e53415bb0",
  focus: "photo-1531482615713-2afd69097998",
  loft: "photo-1541746972996-4e0b0f43e02a",
  build: "photo-1517245386807-bb43f82c33c4",
  data: "photo-1543269865-cbf427effbad",
  portrait: "photo-1590650153855-d9e808231d41",
  faceA: "photo-1560250097-0b93528c311a",
  faceB: "photo-1573496359142-b8d87734a5a2",
  faceC: "photo-1506794778202-cad84cf45f1d",
} as const;

export const services = [
  {
    no: "01",
    title: "Strategy",
    blurb:
      "Positioning, market entry and the unglamorous arithmetic that decides whether a bet is worth taking.",
    tags: ["Research", "Positioning", "Modelling"],
    img: photos.strategy,
  },
  {
    no: "02",
    title: "Brand",
    blurb:
      "Identity systems built to survive contact with reality — every touchpoint, every quarter, every market.",
    tags: ["Identity", "Narrative", "Design systems"],
    img: photos.studio,
  },
  {
    no: "03",
    title: "Product",
    blurb:
      "From the first whiteboard to a shipped release. We embed with your team and write the code with them.",
    tags: ["Discovery", "UX", "Engineering"],
    img: photos.build,
  },
  {
    no: "04",
    title: "Growth",
    blurb:
      "Acquisition loops, pricing and retention mechanics, instrumented so you can see what actually moved.",
    tags: ["Pricing", "Lifecycle", "Analytics"],
    img: photos.data,
  },
  {
    no: "05",
    title: "AI Systems",
    blurb:
      "Practical automation and applied models — deployed into your workflow, not into a slide deck.",
    tags: ["Automation", "Evals", "Deployment"],
    img: photos.focus,
  },
] as const;

export const steps = [
  {
    no: "01",
    kicker: "Week 01–02",
    title: "Diagnose",
    body: "We go quiet and read everything — the numbers, the org chart, the churn calls. You get the uncomfortable version, not the flattering one.",
    img: photos.strategy,
  },
  {
    no: "02",
    kicker: "Week 03–05",
    title: "Design",
    body: "Three routes, costed and stress-tested against your constraints. We argue them with your team until one is obviously right.",
    img: photos.workshop,
  },
  {
    no: "03",
    kicker: "Week 06–14",
    title: "Build",
    body: "Our people sit inside your team. Same standups, same repo, same deadlines. The work ships while we are still in the room.",
    img: photos.desk,
  },
  {
    no: "04",
    kicker: "Ongoing",
    title: "Scale",
    body: "We hand over the keys, the documentation and the dashboards — then stay on call while your team takes the wheel.",
    img: photos.towers,
  },
] as const;

export const work = [
  {
    client: "Northwind Freight",
    sector: "Logistics",
    year: "2025",
    title: "Repricing a 40-year-old freight network",
    metric: "+38%",
    metricLabel: "margin per lane",
    img: photos.towers,
    size: "tall" as const,
  },
  {
    client: "Kestrel Health",
    sector: "Healthcare",
    year: "2025",
    title: "One patient record, eleven legacy systems",
    metric: "−62%",
    metricLabel: "admin hours",
    img: photos.meeting,
    size: "wide" as const,
  },
  {
    client: "Halden & Co.",
    sector: "Finance",
    year: "2024",
    title: "A private bank that finally feels private",
    metric: "4.2×",
    metricLabel: "onboarding speed",
    img: photos.loft,
    size: "wide" as const,
  },
  {
    client: "Terrace Foods",
    sector: "Retail",
    year: "2024",
    title: "Rebuilt the shelf, then rebuilt the supply chain",
    metric: "+£24m",
    metricLabel: "annual revenue",
    img: photos.team,
    size: "tall" as const,
  },
] as const;

export const faqs = [
  {
    q: "How quickly can you start?",
    a: "Two weeks from signature, usually sooner. We hold one squad unallocated at all times so a diagnostic never waits on a hiring cycle.",
  },
  {
    q: "Who actually does the work?",
    a: "The partner who pitched. We run no pyramid and staff no juniors on client work — the fourteen names on the masthead are the fourteen people you get.",
  },
  {
    q: "Do you work inside our team, or beside it?",
    a: "Inside. Same standups, same repo, same deadlines. Our engineers open pull requests against your main branch from week three.",
  },
  {
    q: "What does an engagement cost?",
    a: "From £9,900 a month for a single squad on one workstream. Everything is fixed-scope and quoted before we start — no day rates, no change orders.",
  },
  {
    q: "Who owns what you build?",
    a: "You do, from the first commit. Every repository, dashboard, design file and document is yours, licence-free, whether or not we finish together.",
  },
  {
    q: "What if it isn't working?",
    a: "Thirty days' notice, no exit fee. You keep every artefact produced up to that point. In eleven years we have been asked twice.",
  },
] as const;

export const heroProof = {
  rating: 4.8,
  count: 214,
  quote: "Two weeks telling us what we did not want to hear.",
  name: "Marta Ellison",
  role: "Northwind Freight",
  faces: [photos.faceA, photos.faceB, photos.faceC],
  extra: "+34",
} as const;

export const testimonials = [
  {
    quote:
      "They spent two weeks telling us things we did not want to hear, and then eight weeks fixing them. No other firm we hired got past the first part.",
    name: "Marta Ellison",
    role: "Chief Executive, Northwind Freight",
    img: photos.meeting,
  },
  {
    quote:
      "The difference is that they stayed. When the migration went sideways at 2am, two of their engineers were already in the channel.",
    name: "Devan Roy",
    role: "CTO, Kestrel Health",
    img: photos.desk,
  },
  {
    quote:
      "We have a board deck full of consultants' recommendations from the last decade. Arclight is the only one where the recommendations became a product.",
    name: "Priya Raman",
    role: "Managing Partner, Halden & Co.",
    img: photos.workshop,
  },
] as const;

export const plans = [
  {
    name: "Starter Plan",
    audience: "For startups",
    tone: "light" as const,
    monthly: 9900,
    annual: 99000,
    blurb:
      "Prove value in eight weeks with a costed route, a clickable prototype and a clear go/no-go.",
    features: [
      "Discovery workshop",
      "Opportunity brief",
      "Clickable prototype",
      "1 squad, 1 workstream",
    ],
  },
  {
    name: "Enterprise Plan",
    audience: "For organisations",
    tone: "dark" as const,
    monthly: 19900,
    annual: 199000,
    blurb:
      "Delivery for complex orgs — parallel squads, a partner on site weekly, and incident cover.",
    features: [
      "Everything in Starter",
      "2 squads in parallel",
      "Partner on site weekly",
      "Priority incident cover",
    ],
  },
] as const;

/* Abstract marks for the fictional client roster. Single-path, even-odd
   filled, drawn on a 24 grid so they sit on one optical baseline. */
export const clients = [
  { name: "Northwind", glyph: "M3 6l6 6-6 6V6Zm8 0l6 6-6 6V6Z" },
  {
    name: "Kestrel",
    glyph: "M3.5 19C7 9.5 12.8 5.2 20.5 4.5c-1.4 8.2-7.3 13-17 14.5Z",
  },
  {
    name: "Halden & Co.",
    glyph: "M3.5 3.5h9.5V13H3.5V3.5Zm7.5 7.5h9.5v9.5H11V11Z",
  },
  {
    name: "Terrace",
    glyph: "M3 5h18v3.2H3V5Zm0 5.4h13v3.2H3v-3.2ZM3 15.8h8v3.2H3v-3.2Z",
  },
  {
    name: "Meridian",
    glyph:
      "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 4.2a5.8 5.8 0 1 1 0 11.6 5.8 5.8 0 0 1 0-11.6Z",
  },
  {
    name: "Vantage",
    glyph: "M12 3l9.2 16.5H2.8L12 3Zm0 6.6-4.4 8h8.8l-4.4-8Z",
  },
  {
    name: "Orbit Labs",
    glyph:
      "M12 3.4v3.4a5.2 5.2 0 1 0 3.7 8.9l2.4 2.4A8.6 8.6 0 1 1 12 3.4Zm4.6 3.2a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4Z",
  },
  {
    name: "Ashgrove",
    glyph: "M12 2l6.4 10L12 22 5.6 12 12 2Zm0 5.6L9 12l3 4.6L15 12l-3-4.4Z",
  },
] as const;

export const reachNote = {
  line: "Trusted by 34 clients across four continents — from first workshop to production in eight to ten weeks.",
  quote:
    "Good consulting looks obvious afterwards. The hard work is that it stays shipped.",
  name: "James Halden",
  role: "Managing Partner, Halden & Co.",
  // A finished duotone piece, not a raw photo — rendered as-is, no further processing.
  img: "/quote-portrait.png",
} as const;

export const results = [
  {
    value: 214,
    suffix: "",
    label: "Engagements delivered since 2014",
    icon: "stack" as const,
  },
  {
    value: 38,
    suffix: "%",
    label: "Median margin lift in year one",
    icon: "trend" as const,
  },
  {
    value: 96,
    suffix: "%",
    label: "Clients who hire us a second time",
    icon: "repeat" as const,
  },
] as const;

export const stats = [
  { value: 214, suffix: "", label: "Engagements delivered" },
  { value: 38, suffix: "%", label: "Median margin lift" },
  { value: 96, suffix: "%", label: "Clients who re-hire" },
  { value: 11, suffix: "yrs", label: "Average partner tenure" },
] as const;
