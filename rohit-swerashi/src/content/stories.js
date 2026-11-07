// The long reads behind "Read the full story". Written from his resume and applications, and from what thegenios.com already says in public.
const h = (t, kick) => ({ k: "h", t, kick });
const p = (text) => ({ k: "p", text });
const bullets = (...items) => ({ k: "bullets", items });
const fig = (src, cap) => ({ k: "fig", src: `/assets/rohit/${src}.webp`, cap });
const duo = (a, ac, b, bc) => ({ k: "duo", items: [{ src: `/assets/rohit/${a}.webp`, cap: ac }, { src: `/assets/rohit/${b}.webp`, cap: bc }] });
const link = (label, href) => ({ k: "link", label, href });
const note = (text) => ({ k: "note", text });
const say = (text, who) => ({ k: "pull", text, who });

const GITHUB = "https://github.com/therohitji/mr-elite-orchestrator";
const POST = "https://www.linkedin.com/posts/aakritiaggarwal13_resumebuilder-latexresume-webdev-activity-7357028589369769986-lH2B";

export const STORIES = {
  genios: {
    read: "9 min read",
    lead: "GeniOS is the autonomous company: software that reads everything a company runs on, works out what is going wrong, and tells the right person or agent what to do next. It is my sixth startup, and everything the first five taught me went into it.",
    stats: [
      { v: "$250k", l: "ARR", hot: true },
      { v: "30+", l: "Enterprises piloting GeniOS" },
      { v: "500+", l: "People spoken to before and while building" },
      { v: "Top 60", l: "Startups in Delhi NCR" },
    ],
    take: [
      "Backed by Founders, Inc. and NSRCEL IIM Bangalore, incubated at IIIT Delhi.",
      "Automation runs steps, memory stores and agents do tasks. Nobody decides what matters today. GeniOS does.",
      "It closes an item only when the email, the calendar or the CRM shows it happened.",
      "People stay at the centre. Nothing goes out until a human approves it.",
    ],
    blocks: [
      h("What is breaking inside companies", "The work lives in the tools. The thinking still lives in people's heads."),
      p("A company today runs on Gmail, Slack, WhatsApp, the calendar, a CRM, docs, sheets and meeting notes. It now runs AI agents too, each doing one job in one place. None of these systems knows what the others hold, so people carry the links between them."),
      p("In most companies, every goal lives in someone's head and every follow-up waits for someone to remember. The deal that went cold, the investor nobody followed up, the renewal that slipped: none of it looked big when it happened."),
      { k: "stats", items: [
        { v: "88%", l: "of organisations now use AI. Adoption is no longer the hard part.", src: "Stanford HAI, AI Index 2026" },
        { v: "275", l: "interruptions a day from meetings, emails and chats.", src: "Microsoft Work Trend Index, 2025" },
        { v: "81%", l: "of leaders expect agents in their AI strategy within 12 to 18 months.", src: "Microsoft Work Trend Index, 2025" },
        { v: "21%", l: "of companies planning agentic AI report mature agent governance.", src: "Deloitte, State of AI in the Enterprise, 2026" },
      ] },
      say("More tools gave us more places to look. Nobody got more time to look."),
      p("I heard the same thing in more than 500 conversations with founders, COOs, CFOs and heads of AI. The tools are in place. The thinking is still done by hand."),

      h("How we see the future", "A company that remembers every goal and closes every loop."),
      p("We believe the next great companies will run themselves, in a concrete sense. The company knows its own goals and sees the work moving toward them. It notices when something slips, works out why, and sends the next step to the right owner, a person or an agent. When the step is done, it checks the proof and learns from the result."),
      { k: "loops", a: { t: "Open loop, today", steps: ["Signal", "One person's memory", "Maybe someone acts", "Nobody checks"], lossy: true }, b: { t: "Closed loop, with GeniOS", steps: ["Signal", "Reason", "Owner acts", "Proof", "Learn"] } },
      p("Today the loop runs through one person's memory and leaks wherever that person is busy. In an autonomous company it closes inside the company, every day, for every team. Autonomous does not mean empty. People set direction, make the judgement calls and approve what goes out. They stop reading five tools every morning to learn what is going on."),
      link("Read the full manifesto", "https://thegenios.com/manifesto/"),
      fig("genios-manifesto", "The Autonomous Company manifesto, on thegenios.com"),

      h("Why the usual answers fall short", "Each of these is useful. None of them sees the company."),
      { k: "table", head: ["", "What it does well", "Where it breaks"], rows: [
        ["Automation", "Runs the steps somebody already chose", "Choosing which step matters today is still manual"],
        ["AI agents", "Send 40 follow-ups in a minute", "They do what you say, not what the company needs"],
        ["Skills and playbooks", "Run one defined process well", "Built for one goal, on a state that keeps changing"],
        ["More people", "Bring judgement to the hard calls", "Every hire adds handoffs, and context leaves with them"],
        ["GeniOS", "Decides what matters and hands it to the right owner", "Still asks a human before anything goes out"],
      ], hot: 4 },

      h("Why not a company brain", "A brain remembers. GeniOS decides."),
      p("A memory layer holds every message and answers when asked. Someone still has to know what to ask. That is the difference between memory and intelligence, and it is why we rebuilt the product after building a context brain ourselves."),
      p("GeniOS does not wait for the question. It notices that a quote promised on WhatsApp never reached the buyer, that a delivery date never reached production, that the review is on Friday, and it says so before anyone thinks to look."),
      link("Read GeniOS vs GBrain", "https://www.linkedin.com/pulse/genios-vs-gbrain-yc-ceo-rohit-swerashi-2jgnc"),
      link("Read Memory vs Intelligence", "https://www.linkedin.com/pulse/memory-vs-intelligence-company-brain-yc-s26-rfs-rohit-swerashi-tcpoc"),

      h("How GeniOS works", "One loop, for every goal, every day."),
      { k: "steps", items: [
        ["Read", "Gmail, Slack, WhatsApp, calendar, CRM, docs, sheets and meeting notes. Read-only to start."],
        ["Goals", "It forms the company's goals from its own emails, decks and meetings."],
        ["Reason", "What happened, what the pattern is, what the company context says."],
        ["Check teams", "Every team's pending work, so it knows who is on it and who is blocked."],
        ["Intelligence", "One situation, what to do, why, one owner and a date."],
        ["Delegate", "To a person or an agent. Nothing is sent until a human approves."],
        ["Proof", "An item closes only when the email, calendar or CRM shows it happened."],
        ["Learn", "Every outcome and every answer changes what it sends next."],
      ] },
      fig("genios-product", "How it looks on a real thread"),
      note("An illustration from thegenios.com: a buyer asks for a quote for 12,000 pairs of safety shoes, about $144,000. Sales promises it on WhatsApp and never emails it. Every inbox shows the thread as handled. GeniOS sees the gap, names the owner and the date, and hands the draft to an agent for approval."),

      h("How we got here", "Built, pivoted, rebuilt."),
      { k: "timeline", items: [
        ["First", "AI employees", "Mr. Elite for orchestration, with email and calendar agents. They worked, and they were blind to the company they served."],
        ["Then", "Context brain", "Persistent memory for agents, after talking to 200+ managers and executives. Better, and it still waited to be asked."],
        ["Now", "The autonomous company", "Software that decides what matters. 500+ conversations in, with V2 live and 30+ enterprises piloting."],
      ] },
      p("Every day is architecture, product decisions, engineering calls, sales calls and late nights asking if the vision is sharp enough to survive contact with the real world. I still sell it myself."),

      h("Where it stands today", "The numbers, and who is behind it."),
      { k: "stats", items: [
        { v: "$250k", l: "ARR" },
        { v: "30+", l: "Enterprises piloting" },
        { v: "V2", l: "Live" },
        { v: "Top 60", l: "Startups in Delhi NCR" },
      ] },
      bullets(
        ["Backed by", "Founders, Inc. and NSRCEL IIM Bangalore."],
        ["Incubated at", "IIIT Delhi Innovation & Incubation."],
        ["Supported by", "NVIDIA Inception and Microsoft for Startups."],
        ["Advised by", "senior engineers from Google, IBM and Adobe."],
        ["Used by", "founders from Y Combinator, Antler, Shark Tank India and Founders, Inc."],
      ),
      say("Rohit is one of the most talented and inspiring leaders I've come across. When he first shared GeniOS with me, I immediately knew he was onto something groundbreaking.", "Aakriti Aggarwal, AI Research Engineer at IBM"),

      h("What the investors are describing", "The people funding the next companies describe the same shape."),
      { k: "quotes", items: [
        { q: "Building this today requires brutal integration work, and there's no product that connects all this context into a single layer that can reason across it.", who: "Diana Hu, Y Combinator", role: "The AI Operating System for Companies, Summer 2026" },
        { q: "The leverage is not in the weights, it's in how you wire the work.", who: "Garry Tan, Y Combinator", role: "AI Engineer World's Fair, July 2026" },
      ] },

      h("From India, for the world"),
      p("India did not invent the internet; we built its software. India did not invent the cloud; we ran it. I want the next chapter of intelligent companies to be built from here."),
      duo("top-60-ncr", "Top 60 Startups, Delhi NCR", "genios-poster", "What if it works?"),
      fig("film-launch", "The GeniOS launch film"),
      link("Visit thegenios.com", "https://thegenios.com"),
      link("Book a call", "https://cal.com/rohitswerashi/genios"),
    ],
  },
  "hustlers-fellowship": {
    read: "5 min read",
    lead: "Hustlers Fellowship is what came after The Moronss: everything I learned from six years of building and from 500+ conversations, turned into build-first field guides. Reading sharpens you. A shipped artifact gets you hired.",
    stats: [
      { v: "500+", l: "People have read and studied it", hot: true },
      { v: "20+", l: "Professionals validated it and suggested improvements" },
      { v: "6 years", l: "Of building behind it" },
      { v: "2", l: "Field guides live, 2 more coming" },
    ],
    take: [
      "Build-first AI courses, not theory. Every lesson ends with something you do yourself.",
      "Free to start, with no signup.",
      "You leave with a portfolio artifact and real users, not a folder of notes.",
      "Built on 6 years of my own startups and 500+ conversations.",
    ],
    blocks: [
      h("Why I built it", "The people I mentored kept asking the same question."),
      p("After mentoring 10,000+ students, I knew what stopped them. They had watched every course and still had nothing to show. Interviews reward proof that you can ship, and almost nobody teaches that way."),
      p("So I wrote down everything I had learned from six years of failing and rebuilding, from the conversations behind GeniOS, and from teaching people in rooms. Then I made it into something you can follow and do."),

      h("The field guides", "Open instantly, no signup."),
      { k: "table", head: ["Guide", "What you get", "Size"], rows: [
        ["Build Live Products", "The full 0 to 1 loop, from a raw problem to a live product with real users, in 4 weeks.", "16 chapters, 63 lessons, 10 real teardowns"],
        ["AI Product Management", "The technical spine, the PM craft and the get-hired playbook for AI roles.", "15 chapters, 45 lessons, 10 real teardowns"],
        ["AI Program Manager", "Delivery, risk, evals as gates, and cross-team execution when the model keeps changing.", "Coming soon"],
        ["AI Full-Stack", "From model and retrieval to the interface users actually touch.", "Coming soon"],
      ] },
      p("Both guides open instantly, with no signup and no paywall in front of the first lesson. Build Live Products follows GeniOS through every step, so you can watch a real company make each decision and then run the same rep on your own product. AI Product Management ends with a portfolio artifact, because that is what an interviewer actually wants to see."),
      link("Open Hustlers Fellowship", "https://hustlersfellowship.com"),

      h("How it teaches", "Every lesson ends with a rep."),
      { k: "steps", items: [
        ["What", "Exactly what the chapter is for, in plain words."],
        ["Why", "Why it matters in a real job or a real product."],
        ["How", "Follow GeniOS through every step, as a live example."],
        ["Teardowns", "Real companies taken apart, so patterns have faces."],
        ["Reps", "Something you attempt yourself, the way a real AI PM works."],
        ["Artifact", "You finish with something shipped that you can show."],
      ] },
      fig("room-students-2", "Where the material was tested first: in rooms, with students"),

      h("Who has looked at it"),
      { k: "stats", items: [
        { v: "500+", l: "People read and studied it" },
        { v: "20+", l: "Professionals validated it, suggested improvements and appreciated it" },
        { v: "6 years", l: "Of experience and 500+ conversations distilled" },
      ] },
      p("The community around it came first. As a growth mentor I guided a team of 30+, mentored 1,000+ technical community members on careers and building with AI, and led 15+ events on networking, industry exposure and mentorship."),

      h("What it taught me"),
      p("Writing something down so that a stranger can act on it is the hardest test of whether you understood it. It sharpened how I think about product, and it is how a lot of people first find out what GeniOS is."),
      link("Read the GeniOS story", "/experience/genios"),
    ],
  },
  "the-moronss": {
    read: "8 min read",
    lead: "The Moronss was an AI-powered mentorship company for students and early professionals. I'm from Varanasi. I know exactly what it means to have no network, no mentor and no map, so we built all three, in classrooms first and in software after.",
    stats: [
      { v: "10,000+", l: "Students mentored", hot: true },
      { v: "100,000+", l: "Engagement" },
      { v: "500+", l: "MBA students guided" },
      { v: "$15k", l: "Revenue" },
    ],
    take: [
      "User research with 10,000+ young people before and during every version.",
      "Multiple curriculums and cohort programs for BTech and MBA students, designed by me.",
      "Practical skills first: sales calls, pitching, storytelling and professional speaking.",
      "Shark Tank India Season 4 audition finalist. Mentees went on to BlackRock, AMD, Zscaler, PayPal, Google, EY and Cvent.",
    ],
    blocks: [
      h("The problem", "The youth no one was building for."),
      p("Colleges teach syllabus. Careers run on something else: knowing what to learn next, having someone honest look at your work, and having a portfolio that shows it. Students from Tier 2 and Tier 3 colleges rarely get any of that."),
      p("We started by listening. We ran user research with 10,000+ young people before deciding what to build, and kept doing it as the products changed. Over the years the work reached 100,000+ in engagement."),
      fig("team-table", "The Moronss team"),

      h("The programs I built", "Multiple curriculums, each designed for who was in the room."),
      p("I designed and ran the programs myself, from the curriculum to the slides to the session. BTech and MBA students needed different things, so they got different programs."),
      { k: "steps", items: [
        ["MBA programs", "Personalised programs built around each student's goal, with guidance through to placement."],
        ["BTech programs", "Personal and professional development for engineering students who were never taught either."],
        ["E-Cell curriculum", "Designed the E-Cell curriculum, and ran discussions and sessions around it."],
        ["Training programs", "Multiple training programs, run as cohorts with real execution in them."],
        ["Women empowerment", "Dedicated training programs for women, on skills and on confidence."],
        ["Management programs", "Training programs like product management, program management and founder's office work."],
      ] },
      { k: "stats", items: [
        { v: "500+", l: "MBA students guided" },
        { v: "$15k", l: "Revenue from training programs and events" },
        { v: "100+", l: "Keynotes, workshops and seminars, online and offline" },
      ] },
      duo("stage-bw", "On stage", "session-hall", "A full hall, in a college session"),
      duo("room-students", "A session with students", "room-students-3", "Teaching in a cohort"),

      h("What I actually taught", "Skills you can use on Monday, taught in cohorts to college students."),
      p("I did not want anyone to leave with notes. Every session ended with someone doing the thing in front of the room."),
      { k: "table", head: ["Skill", "What they learned to do"], rows: [
        ["Sales calls", "How to run a sales call, open it, handle a no and ask for the next step."],
        ["Pitching", "How to pitch an idea or themselves to someone who has no time."],
        ["Storytelling", "How to make people care before asking them for anything."],
        ["Articulation", "How to say a complicated thing simply."],
        ["Professional speaking", "How to speak in a room without reading from a slide."],
        ["Product and program management", "How products get decided and shipped, on real product problems."],
      ] },

      h("Placements and profiles", "Getting hired is a skill too."),
      p("I sat with students on the parts nobody teaches, for both MBA and BTech students, until the work showed what they could do."),
      bullets(
        ["Portfolios.", "Built and improved them, project by project."],
        ["LinkedIn and public profile.", "Rewrote how they showed up when a recruiter searched for them."],
        ["Placement guidance.", "Stayed with them through the process, and helped them get placed."],
        ["Design.", "I made the designs, layouts and prototypes the students learned from."],
      ),
      say("Mentees went on to work at BlackRock, AMD, Zscaler, PayPal, Google, EY and Cvent."),

      h("The products", "Version after version."),
      { k: "timeline", items: [
        ["Early", "Mentorship and community", "Sessions, programs and communities that taught us what students actually needed."],
        ["Then", "AI mentor", "Personalised roadmaps from your level to your goal, built with RAG, Gemini and Supabase, with 50 early users."],
        ["V7", "AI recruitment marketplace", "The version that reached the Shark Tank India Season 4 audition finals at MVP stage."],
      ] },
      p("We rebuilt it again and again, and each version was built on what the last one got wrong. Leading a cross-functional team of 50+ through that meant keeping people moving through pivots, not just through a plan."),

      h("What came of it"),
      bullets(
        ["Shark Tank India.", "Season 4 audition finalist, top 1,500 of 80,000+."],
        ["Fellowships.", "Selected for WSP5 at IIM Bangalore NSRCEL and the Wadhwani Fellowship."],
        ["In front of the Governor.", "Presented to the Governor of Uttar Pradesh at Startup Samvaad 2.0."],
        ["IIT Roorkee.", "Top Startup Exhibitor at E-Summit 2025."],
      ),
      duo("shark-tank-team", "At Shark Tank India, Season 4", "expo-stall", "Showing the product, in person"),
      duo("stage-panel", "Panel, The Moronss event", "session-sofa", "Between sessions"),
      say("From bootstrapping HOMIANS to shaping the future of AI, he has consistently shown the ability to build from scratch, pivot with clarity, and lead with empathy.", "Pratiksha Aggarwal, Software Engineer at Google"),

      h("What it taught me"),
      p("The scoreboard only counts if you stop playing. Mentoring thousands of people also showed me what they could not do alone, which is how the resume agent and the first AI employees started."),
    ],
  },
  homians: {
    read: "6 min read",
    lead: "Homians started from a PG room. The food was bad, nearby house moms could cook far better, and nobody was paying them. I connected the two, and a bad meal became a business. It came after three failed startups, and it was the first one that paid anyone.",
    stats: [
      { v: "$40k", l: "Revenue, zero funding", hot: true },
      { v: "100+", l: "Local jobs created" },
      { v: "50+", l: "House moms earning every month" },
      { v: "$200", l: "A month, on average, for each of them" },
    ],
    take: [
      "Built and first run single-handedly, sold offline and door to door.",
      "$40k in revenue in 15 months, without a dollar of outside capital.",
      "50+ home chefs earned around $200 a month with dignity.",
      "Shark Tank India S2 audition finalist and Horses Stable S5 finalist.",
    ],
    blocks: [
      h("Where it started", "After three failures, and one bad meal."),
      p("By the time I got to Noida I had already failed three times: a scholarship startup that shut down before launch, a logistics startup that closed at the prototype, and a leasing startup that Covid paused. I had no money, no team and no reason to believe the next one would work."),
      p("Then there was the food. I was living in a PG room, and it was poor and inconsistent. Meanwhile, the house moms next door were cooking the food I wanted to eat, with no way to earn from it. So I partnered with them and turned them into micro food providers. We delivered hundreds of meals before Homians even had a name."),

      h("Selling it by hand", "Offline, door to door, and on cold calls."),
      p("There was no marketing budget, so there was no marketing. Everything Homians sold in the beginning, I sold in person."),
      bullets(
        ["Door to door.", "I went house to house and sold meals one customer at a time."],
        ["Offline, every day.", "I stood in front of people and asked. Most said no."],
        ["Cold calls.", "20 to 30 calls, again and again, until someone picked up and listened."],
        ["Supply.", "I also went house to house on the other side, and onboarded home chefs one at a time."],
      ),
      duo("homians-team", "The early team", "homians-event", "Showing up in person"),
      say("I got scolded to my face, dealt with grey collar and white collar, got cheated, and learned more on the ground than any classroom taught me."),

      h("Running it", "Operations with nothing."),
      { k: "steps", items: [
        ["Orders", "Took them, tracked them, and fixed every one that went wrong."],
        ["Home chefs", "Onboarded 50+ house moms and kept quality consistent across kitchens."],
        ["Delivery", "Handled delivery partners and vendors with no system at first."],
        ["Team", "Grew to a team of 30+, with no outside money to hire them."],
        ["Numbers", "Taught myself unit economics and pricing, because the business needed them."],
        ["Tools", "Learned LinkedIn, Canva and Figma when the people who knew them left."],
      ] },

      h("What it became"),
      { k: "stats", items: [
        { v: "$40k", l: "Revenue in 15 months" },
        { v: "10x", l: "Business growth" },
        { v: "100+", l: "Jobs: house moms, delivery partners, vendors" },
        { v: "$200", l: "A month, on average, for 50+ home chefs" },
      ] },
      p("For many of these women it was the first money they had earned on their own terms. That mattered more to me than the revenue, and it is still the part I talk about first."),
      say("Kindness is just attention paid to the right people."),

      h("Where it failed", "COVID closed it."),
      p("Homians shut down because of COVID. Three things hit at once, and any one of them we might have survived."),
      bullets(
        ["No funding.", "We had built everything on revenue, so there was no cushion when orders stopped."],
        ["The second wave.", "People stopped ordering food cooked in someone else's home, almost overnight."],
        ["A crowded market.", "Safety rules for food got much stricter, and the market filled up with players who could absorb that cost."],
      ),
      p("I do not count it as a failure anymore. It was the syllabus for everything after it."),
      duo("homians-mothers-day", "With the Homians family, Mother's Day 2022", "homians-award", "Being recognised for the work"),

      h("Recognition"),
      bullets(
        ["Shark Tank India Season 2.", "Audition finalist, top 1,500 of 80,000."],
        ["Horses Stable Season 5.", "Finalist on national TV, top 50 of 20,000+."],
        ["Aawishkar Bhoomi Grant.", "College startup grant from NIET."],
        ["Pitching.", "Winner of multiple pitch competitions, including at IIIT Delhi."],
      ),
      duo("shark-tank-s2", "At Shark Tank India, Season 2", "iiitd-pitch-cafe", "IIIT Delhi Pitch Cafe"),
      say("Identifies real market opportunities. Builds scalable solutions. A founder who understands growth, positioning, and value creation simultaneously.", "Jatin Chaudhary, Software Engineer at Extramarks"),

      h("What it taught me"),
      p("How to sell, how to run operations with nothing, and how to learn the numbers because the business needed them. Unit economics stopped being a chapter and became rent."),
    ],
  },
  agents: {
    read: "9 min read",
    lead: "Before GeniOS became what it is today, we built AI employees: an Admin AI Employee to automate email, calendar, documentation and writing, on a multi-agent orchestrator I designed. I did the system design, the high-level design and the architecture myself, before the recent LLM advances made any of this simple.",
    stats: [
      { v: "5", l: "Working agents", hot: true },
      { v: "1", l: "Shared brain" },
      { v: "5", l: "Startups piloted the AI employee" },
      { v: "1", l: "Company piloted the Admin AI employee" },
    ],
    take: [
      "AI employee, then Admin AI employee, then chief of staff, all on one orchestrator.",
      "Natural language goes in, policy-validated execution flows come out.",
      "A seven-stage pipeline, a reasoning layer, a control layer, five agents, one memory.",
      "The lesson that came out of it is what GeniOS is built on.",
    ],
    blocks: [
      h("What we were building", "An employee, not a chatbot."),
      p("A chatbot answers. An employee takes the work off your plate. We wanted the second one, and the hard part was never the model. Agents could act, but nobody had taught them to think in order. So the first thing I designed was not an agent. It was the thing that sits above them."),
      { k: "timeline", items: [
        ["1", "AI employee", "Email and calendar handled by agents. Piloted with 5 startups."],
        ["2", "Admin AI employee", "Email, calendar, writing and documentation in one place. I ran it myself first, then piloted it with 1 company."],
        ["3", "Chief of staff", "An AI chief of staff on LangGraph, following the work across agents."],
      ] },

      h("The high-level design", "Mr. Elite, layer by layer."),
      p("I started with the HLD on paper: what a request touches on its way in, what has to be true before anything runs, and where memory lives. Mr. Elite is built with Python and FastAPI, routes through LangGraph, and thinks with Gemini. It has six layers, and each one has one job."),
      { k: "layers", items: [
        ["Interface", "Python and FastAPI. Takes a request in plain language."],
        ["Pipeline", "Seven stages that turn the request into an ordered plan."],
        ["Reasoning", "Runs in parallel: policy enforcement, memory retrieval, resource validation."],
        ["Control", "Prompt injection protection and rate limiting, before anything executes."],
        ["Agents", "Email, Calendar, Writing, Documentation and Mr. Happy, routed through LangGraph."],
        ["Memory", "One shared brain on Supabase, so no agent starts from zero."],
      ] },
      link("View the code on GitHub", GITHUB),

      h("The system design", "Seven stages, in order, every time."),
      p("Every request goes through the same pipeline. The order is the point: an agent should never act on something that has not been understood, broken down, given context and checked."),
      { k: "steps", items: [
        ["Intent classification", "Work out what the person actually asked for."],
        ["Task atomization", "Break it into the smallest pieces that can each be done and checked."],
        ["Context retrieval", "Pull what each piece needs to know from shared memory."],
        ["Policy validation", "Check every step against the rules before it runs."],
        ["Agent execution", "Route each piece to the right agent through LangGraph."],
        ["Result aggregation", "Bring the results back together into one answer."],
        ["Learning updates", "Write what happened back to memory for next time."],
      ] },
      note("Say someone writes: move my call with the investor to Friday and tell them why. Intent: reschedule and notify. Tasks: find the call, find a free slot, draft a note. Context: the thread and the calendar. Policy: is this allowed to send on its own? Execution: Calendar moves it and resolves any conflict, Email drafts the note. Aggregation: one reply back. Learning: the preference is saved."),

      h("The architecture decisions", "Why it is built this way."),
      { k: "table", head: ["Decision", "Why"], rows: [
        ["One central orchestrator", "Agents that call each other directly lose track of why they are running."],
        ["Policy before execution", "A wrong email cannot be unsent, so checks come first, not after."],
        ["Reasoning in parallel", "Policy, memory and resources can be checked together without slowing the plan."],
        ["A separate control layer", "Prompt injection and rate limits should not depend on any one agent behaving."],
        ["One shared memory", "Context stays with the company, not inside one conversation."],
      ] },

      h("Five agents, one brain", "Coordinated through one orchestrator, on one shared memory."),
      { k: "table", head: ["Agent", "What it does"], rows: [
        ["Email", "Summarises threads, drafts replies, extracts actions and prioritises."],
        ["Calendar", "Schedules, detects conflicts, slots by priority and follows up."],
        ["Writing", "Drafts the work around the inbox."],
        ["Documentation", "Keeps the documents up to date."],
        ["Mr. Happy", "A personal assistant on OpenClaw for reminders, suggestions and action tracking."],
      ] },
      duo("card-elite-2", "Five agents, one brain", "card-elite-3", "Data 2 JSON, a converter built for RAG pipelines"),
      p("We also built Data 2 JSON along the way, which turns multi-source inputs into structured datasets for RAG pipelines, using Gemini, Supabase and prompt-based validation."),

      h("Who looked at it"),
      p("Senior AI engineers at IBM, Adobe and Google reviewed the work and validated it, and several stayed on as advisors. Then it went to real users: 5 startups on the AI employee, and 1 company on the Admin AI employee."),

      h("What it taught me", "The missing piece was never the agent."),
      p("The agents worked. What they lacked was an understanding of the company they served. They did what you said, not what the company needed. That lesson led to the context brain, and then to GeniOS."),
      link("Read the GeniOS story", "/experience/genios"),
    ],
  },
  "smart-ats": {
    read: "5 min read",
    lead: "While mentoring students, I saw that an ATS-friendly resume meant learning complex rules, formats and keywords. It was slow and confusing, and it stopped good students before they even applied. So I removed the process.",
    stats: [
      { v: "1,500+", l: "Users", hot: true },
      { v: "3,000+", l: "Resumes created" },
      { v: "5 min", l: "Per resume, down from hours" },
      { v: "30 days", l: "To get there, organically" },
    ],
    take: [
      "A fill-in-the-blanks system that generates an ATS-optimised resume with a score.",
      "A multi-hour task became a five-minute one.",
      "1,500+ users within a month across IITs and NITs, with no marketing spend.",
      "Acknowledged by AI engineers, software engineers and an engineer at IBM Research.",
    ],
    blocks: [
      h("The problem", "Nobody should need to learn LaTeX to apply for a job."),
      p("Students spent hours nudging margins, fighting font bugs and breaking things that were working two minutes ago. Then they still did not know if the resume would pass the software reading it before any human did."),
      p("I kept seeing it in mentoring sessions. We would sit down to talk about a career, and the session would stop at the resume. Good students were getting filtered out by formatting."),

      h("What it is", "Fill in the blanks, get a resume."),
      p("Smart ATS Builder takes away everything a student should not have to know. No rules to learn, no template to wrestle with, no Overleaf. You answer simple questions and get a clean resume that is built for applicant tracking systems."),
      { k: "steps", items: [
        ["Fill", "A simple form: education, experience, skills, projects."],
        ["Generate", "A clean, ATS-optimised resume, instantly."],
        ["Score", "A score that shows how it reads to the system."],
        ["Download", "Ready to send, with nothing to learn."],
      ] },

      h("How it works", "The rules live in the system, not in your head."),
      bullets(
        ["Guided inputs.", "The form asks for what a recruiter and a parser both need, in the order they need it."],
        ["Optimisation logic.", "Formats and keywords are handled by the system, so the output stays consistent."],
        ["A LaTeX result.", "Students get a properly formatted LaTeX resume without ever touching LaTeX."],
        ["A score.", "So they know where it stands instead of guessing."],
      ),
      fig("card-ats-2", "Adoption across IITs and NITs"),

      h("What happened", "1,500+ users in a month."),
      { k: "stats", items: [
        { v: "1,500+", l: "Users" },
        { v: "3,000+", l: "Resumes created" },
        { v: "30 days", l: "No marketing spend" },
      ] },
      p("On average every user made two resumes, one for each kind of role they were going after. It spread on its own across IITs and NITs, with students sending it to each other. Then engineers started recommending it publicly, including an AI research engineer at IBM."),
      say("Say goodbye to Overleaf formatting stress. Meet the fastest way to build a LaTeX resume, without ever touching LaTeX.", "Aakriti Aggarwal, AI Research Engineer at IBM, on LinkedIn"),
      link("Read the appreciation post", POST),
      say("A tech geek who always thinks ahead in time. His vision always leads to solutions that make users come back.", "Pranjal Mishra, SWE Intern at BlackRock, NIT Jamshedpur"),

      h("Why it spread", "No campaign. Just a problem everyone already hated."),
      bullets(
        ["A shared pain.", "Every student applying for placements was fighting the same formatting, in the same week."],
        ["A result in five minutes.", "It worked the first time, so people showed it to a friend while they still had it open."],
        ["Built where they were.", "It started inside the mentoring community, so the first users already trusted the person who built it."],
        ["Free of ceremony.", "No course to take, no rules to learn, nothing to install."],
      ),

      h("What it taught me"),
      p("Remove the process and people come on their own. It also became the second agent on the road to GeniOS, right after the AI mentor."),
      link("Read the GeniOS story", "/experience/genios"),
    ],
  },
};
