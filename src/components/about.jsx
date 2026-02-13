// src/components/about.jsx
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import TechIcons from "./tech-icons.jsx";

export default function About() {
  const reduce = useReducedMotion();

  // Scroll containers for progress bars
  const expRef = useRef(null);
  const eduRef = useRef(null);
  const certRef = useRef(null);
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
    hidden: { opacity: 0, y: reduce ? 0 : 14, filter: reduce ? "none" : "blur(3px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Alternating item motion (L/R)
  const itemVariant = (i) => ({
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 14,
      x: reduce ? 0 : i % 2 === 0 ? -22 : 22,
      scale: reduce ? 1 : 0.985,
      filter: reduce ? "none" : "blur(3px)",
    },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.78, ease: [0.16, 1, 0.3, 1] },
    },
  });

  // Timeline dot pulse on enter
  const dotVariant = {
    hidden: { scale: 0.8, opacity: 0.6 },
    show: {
      scale: [0.8, 1.2, 1],
      opacity: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Scroll-linked progress bars
  const { scrollYProgress: aboutProg } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: expProg } = useScroll({ target: expRef, offset: ["start 80%", "end 10%"] });
  const { scrollYProgress: eduProg } = useScroll({ target: eduRef, offset: ["start 80%", "end 10%"] });
  const { scrollYProgress: certProg } = useScroll({ target: certRef, offset: ["start 80%", "end 10%"] });
  const expScaleRaw = useTransform(expProg, [0, 1], [0, 1]);
  const eduScaleRaw = useTransform(eduProg, [0, 1], [0, 1]);
  const certScaleRaw = useTransform(certProg, [0, 1], [0, 1]);
  const expScale = useSpring(expScaleRaw, { stiffness: 120, damping: 22, mass: 0.35 });
  const eduScale = useSpring(eduScaleRaw, { stiffness: 120, damping: 22, mass: 0.35 });
  const certScale = useSpring(certScaleRaw, { stiffness: 120, damping: 22, mass: 0.35 });
  const introY = useTransform(aboutProg, [0, 1], [reduce ? 0 : 18, reduce ? 0 : -18]);
  const introOpacity = useTransform(aboutProg, [0, 0.18, 0.84, 1], [0.75, 1, 1, 0.9]);

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

  const certifications = [
    {
      issuer: "Udemy",
      title: "Python (100 Days of Code)",
      logo: "/logos/udemy.svg",
      certificates: [
        { label: "View Certificate", href: "https://www.udemy.com/certificate/UC-44cf7070-1712-451a-a861-dfc6eb8e9d9e/" },
      ],
    },
    {
      issuer: "Google Cloud Skills Boost",
      title: "Generative AI",
      logo: "/logos/google.svg",
      certificates: [
        {
          label: "View Badge",
          href: "https://www.skills.google/public_profiles/7e327ec4-e477-4896-976e-8414f0f5e7d8/badges/16366110?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share",
        },
      ],
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
      whileHover={reduce ? undefined : { y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
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
          <ul className="mt-2 space-y-1.5 text-gray-700 dark:text-gray-300">
            {item.points.map((p, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-6">
                <span
                  aria-hidden="true"
                  className="mt-2.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gray-500 dark:bg-gray-400"
                />
                <span>{p}</span>
              </li>
            ))}
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
      whileHover={reduce ? undefined : { y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
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

  const CertificationItem = ({ item, index }) => (
    <motion.li
      layout
      variants={itemVariant(index)}
      whileHover={reduce ? undefined : { y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="relative z-0 pl-10 py-3 rounded-lg transform-gpu hover:bg-gray-50/5 dark:hover:bg-white/5 hover:shadow-sm hover:z-10"
    >
      <motion.span
        variants={dotVariant}
        className="absolute left-0 top-1.5 inline-block h-2.5 w-2.5 rounded-full bg-gray-400 dark:bg-gray-600"
      />
      <div className="flex items-start gap-3">
        {item.issuer?.toLowerCase().includes("udemy") ? (
          <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded bg-[#a435f0]" aria-hidden="true">
            <svg viewBox="0 0 64 64" width="20" height="20" fill="none">
              <path d="M17 20c0 11 6.4 20 15 20s15-9 15-20" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
              <circle cx="32" cy="42.5" r="3.5" fill="#fff" />
            </svg>
          </span>
        ) : item.issuer?.toLowerCase().includes("google") ? (
          <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded bg-white ring-1 ring-gray-200 dark:ring-gray-700" aria-hidden="true">
            <svg viewBox="0 0 64 64" width="20" height="20">
              <path d="M52 32.7c0-1.5-.1-2.6-.4-3.8H32v7.3h11.5c-.2 1.9-1.6 4.8-4.8 6.8l-.1.5 7 5.4.5.1c4.4-4.1 6.9-10 6.9-16.3z" fill="#4285F4" />
              <path d="M32 53c5.6 0 10.3-1.8 13.7-5l-7.4-5.7c-2 1.4-4.6 2.4-8.2 2.4-5.5 0-10.1-3.6-11.8-8.6l-.5.1-7.3 5.6-.2.5C13.8 48.8 22.3 53 32 53z" fill="#34A853" />
              <path d="M20.2 36.1c-.4-1.1-.6-2.3-.6-3.6 0-1.3.2-2.5.6-3.6l0-.5-7.5-5.7-.2.1A21 21 0 0 0 10 32.5c0 3.4.8 6.6 2.4 9.4l7.8-5.8z" fill="#FBBC05" />
              <path d="M32 20.3c4.5 0 7.5 1.9 9.3 3.5l6.8-6.6C44.2 13.6 37.6 11 32 11c-9.7 0-18.2 5.3-21.8 13.2l7.7 6c1.7-5 6.4-8.9 12.1-8.9z" fill="#EA4335" />
            </svg>
          </span>
        ) : (
          <LogoImg src={item.logo} alt={`${item.issuer} logo`} />
        )}
        <div className="flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <h4 className="font-semibold">{item.title}</h4>
            <span className="text-sm text-gray-500 dark:text-gray-400">• {item.issuer}</span>
          </div>
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

      <motion.div className="mt-4 grid gap-6 md:grid-cols-3" style={{ y: introY, opacity: introOpacity }}>
        <div className="md:col-span-2">
          <p className="text-gray-700 dark:text-gray-300">
            I’m an AI-Literate seasoned digital soldier with hands-on experience across both legacy
            enterprise systems and the latest emerging technologies. Strong in core CS fundamentals, APIs, automation, and scalable architecture. Currently sharpening system design while shipping AI-driven enterprise-grade projects. Ready to work | Ready to build.
          </p>

          <motion.div
            className="mt-4 inline-flex w-fit flex-col gap-2 rounded-xl border border-gray-200/70 bg-white/60 px-3 py-2 backdrop-blur dark:border-gray-700/70 dark:bg-gray-900/50"
            initial={{ opacity: 0, y: reduce ? 0 : 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.7 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gray-600 dark:text-gray-300">
              <span>keep on scrolling down</span>
              <motion.span
                animate={reduce ? undefined : { y: [0, 2, 0] }}
                transition={reduce ? undefined : { duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              >
                ↓
              </motion.span>
              <motion.span
                animate={reduce ? undefined : { y: [0, 2, 0] }}
                transition={reduce ? undefined : { duration: 0.8, delay: 0.15, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              >
                ↓
              </motion.span>
            </div>
            <div className="h-1.5 w-56 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <motion.div
                className="h-full w-24 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500"
                animate={reduce ? undefined : { x: ["-35%", "145%"] }}
                transition={reduce ? undefined : { duration: 1.8, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300">Swipe down to know more...</p>
          </motion.div>
        </div>

        <ul className="list-disc space-y-2 pl-5 text-gray-700 marker:text-gray-500 dark:text-gray-300 dark:marker:text-gray-400">
          <li>React | Next.js | Vite</li>
          <li>Tailwind | shadcn/ui</li>
          <li>Node | Express</li>
          <li>Firebase | Supabase</li>
          <li>Flask | Django | Selenium | BeautifulSoup</li>
        </ul>
      </motion.div>

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
        <motion.div
          variants={child}
          className="mb-5 h-0.5 w-69 rounded bg-gradient-to-r from-blue-500/70 via-cyan-400/60 to-transparent"
          animate={reduce ? undefined : { x: [0, 10, 0], opacity: [0.9, 1, 0.9] }}
          transition={reduce ? undefined : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <TechIcons listVariants={child} />

        {/* EXPERIENCE (rendered in reverse) */}
        <motion.h3 className="mt-12 mb-4 text-xl font-semibold" variants={child}>
          EXPERIENCE :
        </motion.h3>
        <motion.div
          variants={child}
          className="mb-5 h-0.5 w-69 rounded bg-gradient-to-r from-blue-500/70 via-cyan-400/60 to-transparent"
          animate={reduce ? undefined : { x: [0, 10, 0], opacity: [0.9, 1, 0.9] }}
          transition={reduce ? undefined : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
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
          className="mb-5 h-0.5 w-69 rounded bg-gradient-to-r from-blue-500/70 via-cyan-400/60 to-transparent"
          animate={reduce ? undefined : { x: [0, 10, 0], opacity: [0.9, 1, 0.9] }}
          transition={reduce ? undefined : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
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

        {/* CERTIFICATIONS */}
        <motion.h3 className="mt-12 mb-2 text-xl font-semibold" variants={child}>
          CERTIFICATIONS :
        </motion.h3>
        <motion.div
          variants={child}
          className="mb-5 h-0.5 w-69 rounded bg-gradient-to-r from-blue-500/70 via-cyan-400/60 to-transparent"
          animate={reduce ? undefined : { x: [0, 10, 0], opacity: [0.9, 1, 0.9] }}
          transition={reduce ? undefined : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div ref={certRef} className="relative">
          <motion.div
            style={{ scaleY: certScale }}
            className="absolute left-0 top-0 h-full w-px origin-top bg-gray-300 dark:bg-gray-800"
          />
          <motion.ol layout variants={child} className="relative border-l pl-6 dark:border-gray-800">
            {certifications.map((cert, i) => (
              <CertificationItem key={`${cert.issuer}-${cert.title}`} item={cert} index={i} />
            ))}
          </motion.ol>
        </div>
      </motion.div>
    </section>
  );
}
