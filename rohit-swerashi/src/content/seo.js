// Everything search engines read about each page. RouteMeta uses it in the browser, scripts/prerender.mjs at build time.
export const SITE_URL = "https://www.rohitswerashi.com";
export const SITE_NAME = "Rohit Swerashi";
export const OG_IMAGE = `${SITE_URL}/assets/og.png`;

const page = (name, desc, extra = {}) => ({ title: `${name} | ${SITE_NAME}`, name, desc, ...extra });

export const PAGES = {
  "/": {
    title: "Rohit Swerashi | Founder of GeniOS, the Autonomous Company",
    name: "Welcome",
    desc: "Rohit Swerashi is the founder of GeniOS, software that thinks for your company. Six startups since 2018, from Varanasi to San Francisco.",
    keywords: "Rohit Swerashi, Rohit Swerashi GeniOS, founder of GeniOS, autonomous company, AI founder India",
  },
  "/experience": page("Experience", "Rohit Swerashi's work: GeniOS, Hustlers Fellowship, The Moronss, Homians, Mr. Elite and Smart ATS Builder. What shipped, and the story behind each.", { keywords: "Rohit Swerashi experience, Rohit Swerashi startups, product consultant, GeniOS, Homians, The Moronss" }),
  "/expertise": page("Expertise", "The problems Rohit Swerashi faced in product, design, sales, people and AI, how he solved each one, and what it adds up to for an executive role.", { keywords: "Rohit Swerashi expertise, product management, team management, growth management, vision management" }),
  "/recognition": page("Recognition", "Shark Tank India, Stanford ASES, Harvard HPAIR, Founders, Inc., NSRCEL IIM Bangalore and Top 60 Startups of Delhi NCR. Rohit Swerashi's full list, year by year.", { keywords: "Rohit Swerashi Shark Tank India, Rohit Swerashi Stanford ASES, Rohit Swerashi Harvard HPAIR, Top 60 Startups Delhi NCR" }),
  "/ai": page("AI", "How Rohit Swerashi built eight AI products, from an AI mentor to GeniOS, why memory is not the product, and how he sees the autonomous company.", { keywords: "Rohit Swerashi AI, AI agents, company brain, memory vs intelligence, autonomous company" }),
  "/about": page("Profile", "Rohit Swerashi is a founder from Varanasi with no connections and no capital. Six startups since 2018, 10,000+ students mentored, and what he believes.", { keywords: "Rohit Swerashi, who is Rohit Swerashi, Rohit Swerashi profile, The Failed Entrepreneur, Rohit Swerashi Varanasi", profile: true }),
  "/contact": page("Contact", "Reach Rohit Swerashi by email, LinkedIn, X or YouTube, or book a 30 minute call. Always open for a conversation over a good chai.", { keywords: "contact Rohit Swerashi, Rohit Swerashi email, Rohit Swerashi LinkedIn" }),
  "/privacy": page("Privacy", "What this site records while you read it. It is a portfolio, so the answer is short.", { noindex: true }),
  "/experience/genios": page("GeniOS", "GeniOS is the autonomous company: software that thinks for your company, founded by Rohit Swerashi. Why memory is not enough, and how the loop works.", { keywords: "GeniOS, GeniOS founder, Rohit Swerashi GeniOS, autonomous company, software that thinks for your company", parent: "Experience", about: { "@type": "Organization", name: "GeniOS", url: "https://thegenios.com" }, image: "/assets/rohit/film-launch.webp" }),
  "/experience/hustlers-fellowship": page("Hustlers Fellowship", "Hustlers Fellowship by Rohit Swerashi: build-first AI courses on building live products and AI product management, from six years of startups.", { keywords: "Hustlers Fellowship, Rohit Swerashi courses, AI product management course, Build Live Products", parent: "Experience", about: { "@type": "Organization", name: "Hustlers Fellowship", url: "https://hustlersfellowship.com" }, image: "/assets/rohit/card-hustlers-1.webp" }),
  "/experience/the-moronss": page("The Moronss", "The Moronss, founded by Rohit Swerashi: an AI mentorship company. 10,000+ students mentored, 500+ MBA students guided, Shark Tank India S4 audition finalist.", { keywords: "The Moronss, Moronss founder, Rohit Swerashi The Moronss, AI mentor, Shark Tank India Season 4", parent: "Experience", about: { "@type": "Organization", name: "The Moronss" }, image: "/assets/rohit/stage-moronss.webp" }),
  "/experience/homians": page("Homians", "Homians, founded by Rohit Swerashi in a PG room: a home food business with $40k revenue, zero funding, 100+ jobs and 50+ house moms earning every month.", { keywords: "Homians, Homians founder, Rohit Swerashi Homians, home food startup, Shark Tank India Season 2", parent: "Experience", about: { "@type": "Organization", name: "Homians" }, image: "/assets/rohit/card-homians-1.webp" }),
  "/experience/agents": page("Mr. Elite", "Mr. Elite by Rohit Swerashi: a multi-agent orchestrator with five agents on one shared brain. The high-level design, system design and architecture.", { keywords: "Mr. Elite, multi-agent orchestrator, Rohit Swerashi AI agents, AI employee, LangGraph", parent: "Experience", image: "/assets/rohit/card-elite-1.webp" }),
  "/experience/smart-ats": page("Smart ATS", "Smart ATS Builder by Rohit Swerashi: a fill-in-the-blanks resume builder that turned hours into five minutes. 1,500+ users across IITs and NITs.", { keywords: "Smart ATS Builder, ATS resume builder, Rohit Swerashi resume agent", parent: "Experience", image: "/assets/rohit/card-ats-1.webp" }),
};

export const NOT_FOUND = {
  title: `Page not found | ${SITE_NAME}`,
  name: "Not found",
  desc: "Nothing is filed under that address. The robot is going through the drawers.",
  noindex: true,
};

export const PERSON = {
  "@type": "Person",
  "@id": `${SITE_URL}/#rohit`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/assets/rohit/portrait-brown.webp`,
  jobTitle: "Founder & CEO",
  description: "Rohit Swerashi is the founder and CEO of GeniOS, software that thinks for your company. He has founded six startups since 2018.",
  worksFor: { "@type": "Organization", "@id": "https://thegenios.com/#org", name: "GeniOS", url: "https://thegenios.com" },
  homeLocation: { "@type": "Place", name: "New Delhi, India" },
  knowsAbout: ["Company building", "AI products", "AI agents", "Product management", "Mentorship"],
  award: ["Shark Tank India audition finalist, Season 2 and Season 4", "Horses Stable Season 5 finalist", "Top 60 Startups, Delhi NCR"],
  sameAs: [
    "https://www.linkedin.com/in/rohitswerashi",
    "https://x.com/rohit_swerashi",
    "https://www.youtube.com/@TheRohitSwerashi",
    "https://github.com/therohitji",
    "https://topmate.io/rohitswerashi",
    "https://thegenios.com",
    "https://hustlersfellowship.com",
  ],
};

// The structured data for one page.
export function jsonLd(path) {
  const p = PAGES[path];
  const url = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  const graph = [PERSON];
  const type = p.profile ? "ProfilePage" : "WebPage";
  const web = { "@type": type, "@id": `${url}#page`, url, name: p.title, description: p.desc, isPartOf: { "@id": `${SITE_URL}/#site` } };
  if (p.profile) web.mainEntity = { "@id": PERSON["@id"] };
  else web.about = p.about ?? { "@id": PERSON["@id"] };
  if (p.image) web.primaryImageOfPage = `${SITE_URL}${p.image}`;
  graph.push(web);
  if (path === "/") graph.push({ "@type": "WebSite", "@id": `${SITE_URL}/#site`, url: `${SITE_URL}/`, name: SITE_NAME, publisher: { "@id": PERSON["@id"] }, inLanguage: "en" });
  else {
    const items = [{ "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` }];
    if (p.parent) items.push({ "@type": "ListItem", position: 2, name: p.parent, item: `${SITE_URL}/experience` });
    items.push({ "@type": "ListItem", position: items.length + 1, name: p.name, item: url });
    graph.push({ "@type": "BreadcrumbList", itemListElement: items });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
