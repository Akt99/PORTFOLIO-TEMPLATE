// src/components/about.jsx
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import TechIcons from "./tech-icons.jsx";

export default function About() {
  const reduce = useReducedMotion();

  // Scroll containers for progress bars
  const expRef = useRef(null);
  const eduRef = useRef(null);
  const sectionRef = useRef(null);

  // Parent controls the section reveal + sets up a stagger for its children
  const parent = {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        when: "beforeChildren",
        staggerChildren: 0.14,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  // Alternating item motion (L/R)
  const itemVariant = (i) => ({
    hidden: { opacity: 0, x: reduce ? 0 : (i % 2 === 0 ? -18 : 18) },
    show: { opacity: 1, x: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
  });

  // Timeline dot pulse on enter
  const dotVariant = {
    hidden: { scale: 0.8, opacity: 0.6 },
    show: { scale: [0.8, 1.15, 1], opacity: 1, transition: { duration: 2, ease: [0.16, 1, 0.3, 1] } },
  };

  // Scroll-linked progress bars
  const { scrollYProgress: expProg } = useScroll({ target: expRef, offset: ["start 80%", "end 10%"] });
  const { scrollYProgress: eduProg } = useScroll({ target: eduRef, offset: ["start 80%", "end 10%"] });
  const expScale = useTransform(expProg, [0, 1], [0, 1]);
  const eduScale = useTransform(eduProg, [0, 1], [0, 1]);

  // ---------------- DATA ----------------
  const experience = [
    {
      org: "Verzeo",
      role: "Web Development Trainee · Remote",
      dates: "Mar 2021 – Apr 2021",
      logo: "/logos/verzeo.png",
      points: [
        "Basics of HTML, CSS, JavaScript; Web APIs; Networking; Databases.",
        "Subnetting / supernetting; OSI layers; TCP vs UDP.",
        "Understanding Angular vs React for scalable apps; serverless Node.js.",
        "Built responsive, enterprise-style web apps using the learned stack.",
      ],
      certificates: [
        { label: "View Certificate", href: "https://drive.google.com/file/d/1kmUUIqVPVmS-QxMZLLJWlrKGXqwtqTiW/view?usp=sharing" },
      ],
    },
    {
      org: "Eve Healthcare",
      role: "Python Developer Trainee · Hybrid",
      dates: "Mar 2023 – Apr 2023",
      logo: "/logos/evehealth.png",
      points: [
        "Web-scraped hospital inventory prices; alerting for lowest values.",
        "Built messaging web apps & REST APIs in Flask/Django.",
        "Dashboards for resources, patient history, and diagnostic images.",
      ],
      certificates: [
        { label: "View Certificate", href: "https://drive.google.com/file/d/1-Bq-c4oe9wBxCheepKQNXtKs40_2z0cT/view?usp=sharing" },
      ],
    },
    {
      org: "Larsen & Toubro – Precision Engineering (Powai, Mumbai)",
      role: "Graduate Engineer Trainee",
      dates: "Jul 2023 – Jun 2024",
      logo: "/logos/lnt.png",
      points: [
        "Enterprise app dev: Angular (UI) + .NET (server-side).",
        "Worked within Zero-Trust network architecture for defense/aerospace.",
      ],
      certificates: [
        { label: "View Letter of Employment", href: "https://drive.google.com/file/d/11XZ1_SozTgHClO_UqW1jO3DRLuZUkm8H/view?usp=sharing" },
      ],
    },
    {
      org: "Larsen & Toubro – Precision Engineering (Powai, Mumbai)",
      role: "Senior Engineer",
      dates: "Jun 2024 – Feb 2025",
      logo: "/logos/lnt.png",
      points: [
        "Designed transaction software covering order→dispatch; Infor LN; 3GL/4GL/ABAP/SQL.",
        "E-commerce + automated ticketing in .NET; full lifecycle on cloud.",
        "SSRS reporting across dev/QA/prod for high-volume ERP data.",
        "Automated approvals & tech requests via Selenium (cross-platform).",
      ],
      certificates: [
        { label: "View Appointment Letter", href: "https://drive.google.com/file/d/1rw6YZuHj73S6oX0m-_GKldU602_vyXe3/view?usp=sharing" },
      ],
    },
  ];

  const education = [
    {
      school: "St. Vincent De Paul, Berhampur (ICSE)",
      degree: "Class X",
      dates: "2016",
      logo: "/logos/depaul.jpeg",
      details: "94.5% aggregate; NCC; literature & one-act play enthusiast.",
      certificates: [{ label: "Marksheet", href: "https://drive.google.com/file/d/1s4mCMAsLfvf_USY6Buc2Qi07MqV4jFKz/view?usp=sharing" }],
    },
    {
      school: "St. Xavier’s Sr. Secondary, Berhampur (CBSE)",
      degree: "Class XII (PCM + Biology)",
      dates: "2018",
      logo: "/logos/xaviers.jpeg",
      details: "88.6% aggregate; Mathematics, Physics, Chemistry, Biology.",
      certificates: [{ label: "Marksheet", href: "https://drive.google.com/file/d/1Fg1asXcBwAVRIWSbwC8W-8oPBOXwCQhT/view?usp=sharing" }],
    },
    {
      school: "Odisha University of Technology & Research, Bhubaneswar",
      degree: "B.Tech — Information Technology (CGPA 9.17)",
      dates: "2023",
      logo: "/logos/outrlogo.png",
      details: "Active learner; tech enthusiast; acting, dancing, team-building. Secured 9.17 cgpa.",
      certificates: [{ label: "Degree", href: "https://drive.google.com/file/d/1viO3skXXb4l77yf6oJ33VykNziQWTlXl/view?usp=sharing" }],
    },
  ];

  const CertLinks = ({ certs }) => (
    <div className="flex flex-wrap gap-2">
      {certs?.map((c, i) => (
        <motion.a
          key={`${c.label}-${i}`}
          href={c.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-900"
          whileTap={{ scale: 0.98 }}
        >
          {c.label}
          <svg className="ml-1 h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M13 3h4v4h-2V6.41l-7.29 7.3-1.42-1.42 7.3-7.29H13V3z"></path>
            <path d="M5 5h4V3H3v6h2V5z"></path>
          </svg>
        </motion.a>
      ))}
    </div>
  );

  const LogoImg = (props) => (
    <motion.img
      {...props}
      className={`mt-0.5 h-8 w-8 aspect-square rounded object-contain ${props.className || ""}`}
      whileInView={{ filter: ["grayscale(100%)", "grayscale(0%)"] }}
      viewport={{ once: false, amount: 0.6 }}
      transition={{ duration: 0.8 }}
      onError={(e) => {
        const img = e.currentTarget;
        if (!img.dataset.fallback) {
          img.dataset.fallback = "1";
          img.srcset = "";
          img.src = "/logos/fallback.svg";
        }
      }}
    />
  );

  const ExperienceItem = ({ item, index }) => (
    <motion.li
      layout
      variants={itemVariant(index)}
      whileHover={{ y: -2 }}
      className="relative z-0 pl-10 py-3 rounded-lg transform-gpu hover:bg-gray-50/5 dark:hover:bg-white/5 hover:shadow-sm hover:z-10"
    >
      <motion.span
        variants={dotVariant}
        className="absolute left-0 top-1.5 inline-block h-2.5 w-2.5 rounded-full bg-gray-400 dark:bg-gray-600"
      />
      <div className="flex items-start gap-3">
        <LogoImg src={item.logo} alt={`${item.org} logo`} />
        <div className="flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <h4 className="font-semibold">{item.org}</h4>
            <span className="text-sm text-gray-500 dark:text-gray-400">• {item.role}</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{item.dates}</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-gray-700 dark:text-gray-300">
            {item.points.map((p, idx) => <li key={idx}>{p}</li>)}
          </ul>
          <div className="mt-3">
            <CertLinks certs={item.certificates} />
          </div>
        </div>
      </div>
    </motion.li>
  );

  const EducationItem = ({ item, index }) => (
    <motion.li
      layout
      variants={itemVariant(index)}
      whileHover={{ y: -2 }}
      className="relative z-0 pl-10 py-3 rounded-lg transform-gpu hover:bg-gray-50/5 dark:hover:bg-white/5 hover:shadow-sm hover:z-10"
    >
      <motion.span
        variants={dotVariant}
        className="absolute left-0 top-1.5 inline-block h-2.5 w-2.5 rounded-full bg-gray-400 dark:bg-gray-600"
      />
      <div className="flex items-start gap-3">
        <LogoImg src={item.logo} alt={`${item.school} logo`} />
        <div className="flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <h4 className="font-semibold">{item.school}</h4>
            <span className="text-sm text-gray-500 dark:text-gray-400">• {item.degree}</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{item.dates}</div>
          <p className="mt-2 text-gray-700 dark:text-gray-300">{item.details}</p>
          <div className="mt-3">
            <CertLinks certs={item.certificates} />
          </div>
        </div>
      </div>
    </motion.li>
  );

  return (
    <section id="about" className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="text-3xl font-bold tracking-tight">About</h2>

      <div className="mt-4 grid gap-6 md:grid-cols-3">
        <p className="md:col-span-2 text-gray-700 dark:text-gray-300">
          I’m a seasoned digital soldier with hands-on experience across both legacy
          enterprise systems and the latest emerging technologies. Having started my
          journey at Larsen & Toubro, I’ve built a strong foundation in enterprise
          applications, automation and scalable digital solutions. I’m a developer
          focused on building accessible, performant interfaces. I enjoy clean design
          systems, component architecture, and shipping value fast. <br></br><br></br>Swipe down ⬇️⬇️ to know more...

          
        </p>
        

        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>• React | Next.js | Vite</li>
          <li>• Tailwind | shadcn/ui</li>
          <li>• Node | Express</li>
          <li>• Firebase | Supabase</li>
          <li>• Flask | Django | Selenium | BeautifulSoup</li>
        </ul>
      </div>

      {/* Animated block — parent starts hidden and reveals when in view */}
      <motion.div
        ref={sectionRef}
        variants={parent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.18, margin: "240px 0px -120px 0px" }}
        className="mt-12"
      >
        <motion.h3 className="mb-4 text-xl font-semibold" variants={child}>
          TECH STACK :
        </motion.h3>
        <TechIcons listVariants={child} />

        {/* EXPERIENCE (rendered in reverse) */}
        <motion.h3 className="mt-12 mb-2 text-xl font-semibold" variants={child}>
          EXPERIENCE :
        </motion.h3>
        <motion.div
          variants={child}
          className="mb-4 h-0.5 w-16 rounded bg-gradient-to-r from-gray-400 to-transparent dark:from-gray-600"
        />
        <div ref={expRef} className="relative">
          <motion.div
            style={{ scaleY: expScale }}
            className="absolute left-0 top-0 h-full w-px origin-top bg-gray-300 dark:bg-gray-800"
          />
          <motion.ol layout variants={child} className="relative border-l pl-6 dark:border-gray-800">
            {[...experience].reverse().map((ex, i) => (
              <ExperienceItem key={`${ex.org}-${ex.dates}`} item={ex} index={i} />
            ))}
          </motion.ol>
        </div>

        {/* EDUCATION (rendered in reverse: B.Tech → XII → X) */}
        <motion.h3 className="mt-12 mb-2 text-xl font-semibold" variants={child}>
          EDUCATION :
        </motion.h3>
        <motion.div
          variants={child}
          className="mb-4 h-0.5 w-16 rounded bg-gradient-to-r from-gray-400 to-transparent dark:from-gray-600"
        />
        <div ref={eduRef} className="relative">
          <motion.div
            style={{ scaleY: eduScale }}
            className="absolute left-0 top-0 h-full w-px origin-top bg-gray-300 dark:bg-gray-800"
          />
          <motion.ol layout variants={child} className="relative border-l pl-6 dark:border-gray-800">
            {[...education].reverse().map((ed, i) => (
              <EducationItem key={`${ed.school}-${ed.dates}`} item={ed} index={i} />
            ))}
          </motion.ol>
        </div>
      </motion.div>
    </section>
  );
}
