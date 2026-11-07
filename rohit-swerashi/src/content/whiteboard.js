// The four whiteboards on the Welcome page. x, y and w are in stage units; `at` is the step a card appears on.
const launch = (x, y, at, n, year, title, body, status, tone) => ({
  id: `l${n}`, x, y, w: 300, at, chip: `Launch ${n} · ${year}`, title, body, status, tone,
});
const lesson = (x, y, at, n, text) => ({ id: `n${n}`, x, y, w: 180, at, kind: "note", label: "What it taught me", body: text });
const agent = (x, y, at, n, title, what, how, proof, hub) => ({
  id: `a${n}`, x, y, w: 340, at, chip: `Build ${n}`, title, hub,
  rows: [["What", what], ["How", how], ["Proof", proof]],
});
const skill = (x, y, at, n, title, body) => ({ id: `s${n}`, x, y, w: 270, at, chip: String(n).padStart(2, "0"), title, body });

export const WHITEBOARDS = [
  {
    id: "loop",
    tab: "Founder Loop",
    sub: "Six launches, in order",
    w: 3010,
    h: 560,
    ms: 1500,
    nodes: [
      launch(30, 345, 0, 1, "2018", "Scholarship startup", "Quiz contests for school students, with scholarships as the prize.", "Shut down before launch", "bad"),
      lesson(380, 330, 1, 1, "Never rely on a single source."),
      launch(570, 295, 2, 2, "2019", "Logistics startup", "Hyper-local delivery for Tier 2 and Tier 3 cities, starting in Varanasi.", "Closed at the prototype", "bad"),
      lesson(920, 280, 3, 2, "Execution matters more than the idea."),
      launch(1110, 245, 4, 3, "2020", "Leasing startup", "A rental marketplace for bikes, luggage and dresses, launched in Covid.", "Paused by Covid", "bad"),
      lesson(1460, 225, 5, 3, "Timing can kill a good idea."),
      launch(1650, 180, 6, 4, "2021 to 23", "Homians", "A bad PG meal became a home food platform, with 50+ house moms earning every month.", "$40k revenue, zero funding", "good"),
      lesson(2000, 165, 7, 4, "Kindness is attention paid to the right people."),
      launch(2190, 115, 8, 5, "2022 to 25", "The Moronss", "An AI mentor for students, rebuilt version after version.", "10,000+ mentored, $15k revenue", "good"),
      lesson(2540, 100, 9, 5, "The scoreboard only counts if you stop playing."),
      { ...launch(2700, 40, 10, 6, "2025 to now", "GeniOS", "The autonomous company. Software that thinks for your company.", "$250k ARR", "good"), hub: true },
    ],
    wires: [["l1", "n1"], ["n1", "l2"], ["l2", "n2"], ["n2", "l3"], ["l3", "n3"], ["n3", "l4"], ["l4", "n4"], ["n4", "l5"], ["l5", "n5"], ["n5", "l6"]],
  },
  {
    id: "agents",
    tab: "AI Agents",
    sub: "Eight builds, what and how",
    w: 2560,
    h: 560,
    ms: 2400,
    nodes: [
      agent(30, 30, 0, 1, "AI mentor", "Personal roadmaps from your level to your goal.", "RAG, Gemini and Supabase, tracking progress as you go.", "50 early users."),
      agent(320, 300, 1, 2, "Resume agent", "Fill in the blanks, get an ATS-ready resume with a score.", "Guided inputs and optimisation logic, no rules to learn.", "1,500 students from Tier 1, 2 and 3 colleges in 30 days."),
      agent(640, 30, 2, 3, "Multi-agent orchestrator", "Turns one sentence into a policy-checked plan across agents.", "Python, FastAPI and LangGraph: intent, tasks, context, policy, execution.", "Runs every agent after it."),
      agent(960, 300, 3, 4, "AI employee", "An employee that handles email and calendar.", "LangGraph agents for drafting, scheduling and follow-ups.", "Piloted with 5 startups."),
      agent(1280, 30, 4, 5, "Admin AI employee", "Email, calendar, writing and documentation in one place.", "Four agents, coordinated by the orchestrator.", "Ran it myself, then piloted with 1 company."),
      agent(1600, 300, 5, 6, "Chief of staff", "Follows the work across agents and says what needs attention.", "LangGraph, on top of everything before it.", "Showed us agents need to know the company."),
      agent(1890, 30, 6, 7, "Context brain", "Persistent memory, so agents remember the company.", "A shared layer every agent reads from.", "200+ managers and executives spoken to."),
      agent(2190, 300, 7, 8, "GeniOS, the autonomous company", "Software that thinks for your company.", "Reads, reasons, delegates, checks the proof, learns.", "500+ people spoken to. 30+ enterprises piloting. $250k ARR.", true),
    ],
    wires: [["a1", "a2"], ["a2", "a3"], ["a3", "a4"], ["a4", "a5"], ["a5", "a6"], ["a6", "a7"], ["a7", "a8"]],
  },
  {
    id: "stack",
    tab: "Building Stack",
    sub: "How I build, end to end",
    w: 1180,
    h: 560,
    ms: 1300,
    nodes: [
      skill(16, 14, 0, 1, "Product building", "Took six products from idea to launch, and sold them myself."),
      skill(16, 194, 1, 2, "Product design", "Designed and built the whole GeniOS website, every page."),
      skill(16, 374, 2, 3, "Prototyping", "Working prototypes across multiple projects, before any team."),
      skill(314, 14, 3, 4, "System design", "The whole of GeniOS and The Moronss."),
      skill(314, 194, 4, 5, "High-level design", "The whole of GeniOS and The Moronss, on paper first."),
      skill(314, 374, 5, 6, "Architecture", "GeniOS: how reading, reasoning and delegating fit together."),
      skill(612, 14, 6, 7, "Coding with AI agents", "All of The Moronss, the multi-agent orchestrator and GeniOS."),
      skill(612, 194, 7, 8, "Optimization", "A multi-hour resume task down to 5 minutes. Seven versions of one product."),
      skill(612, 374, 8, 9, "Guardrails", "Policy checks, prompt injection protection, rate limits. A human approves."),
      { id: "out", x: 930, y: 150, w: 236, at: 9, hub: true, chip: "What came out", title: "Shipped", list: ["GeniOS", "The Moronss", "Mr. Elite orchestrator", "Smart ATS Builder"] },
    ],
    wires: [["s1", "s2", "v"], ["s2", "s3", "v"], ["s3", "s4"], ["s4", "s5", "v"], ["s5", "s6", "v"], ["s6", "s7"], ["s7", "s8", "v"], ["s8", "s9", "v"], ["s9", "out"]],
  },
  {
    id: "company",
    tab: "Company Building",
    sub: "What I ran, and where it led",
    w: 1180,
    h: 560,
    ms: 3400,
    nodes: [
      { id: "c1", x: 20, y: 150, w: 340, at: 0, chip: "2021 to 23", title: "Homians", role: "I ran operations", list: ["Sold door to door and onboarded 50+ home chefs", "Handled delivery partners and vendors", "Built a team of 30+"], proof: "$40k", proofSub: "Revenue, zero funding, 100+ jobs" },
      { id: "c2", x: 420, y: 85, w: 340, at: 1, chip: "2022 to 25", title: "The Moronss", role: "I ran mentorship, team and guidance", list: ["Led a cross-functional team of 50+", "Designed the curriculum, taught product and program management", "Guided 500+ MBA students into placements"], proof: "10,000+", proofSub: "Mentored, $15k revenue" },
      { id: "c3", x: 820, y: 20, w: 340, at: 2, hub: true, chip: "2025 to now", title: "GeniOS", role: "I run sales", list: ["Sell to founders and executives myself", "500+ conversations with executives", "Took design partners from first call to contract"], proof: "$250k", proofSub: "ARR" },
    ],
    wires: [["c1", "c2"], ["c2", "c3"]],
  },
];
