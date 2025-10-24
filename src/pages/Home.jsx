// src/pages/Home.jsx
import BackgroundVideo from "../components/background-video.jsx";
import { motion, useReducedMotion } from "framer-motion";
import ThreeHero from "../components/ThreeHero.jsx";

export default function Home() {
  const reduce = useReducedMotion();

  const parent = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.08,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative overflow-hidden">
      {/* Video only on Home; includes readability overlay & masks */}
      <BackgroundVideo />

      {/* Content above the video */}
      <motion.div
        variants={parent}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 py-16 text-center sm:py-20"
      >
        <motion.h1
          variants={child}
          className="text-3xl font-semibold text-white drop-shadow"
        >
          Namaste 🙏 I’m Arnab
        </motion.h1>

        <motion.h3
          variants={child}
          className="mt-3 text-5xl font-extrabold tracking-tight text-white drop-shadow sm:text-6xl"
        >
          Welcome to my World !
        </motion.h3>

        <motion.p
          variants={child}
          className="mt-4 max-w-2xl text-white/85 drop-shadow"
        >
          Hope you have a good time here !
        </motion.p>

        <motion.div variants={child} className="mt-6 flex gap-3">
          <a
            href="/#/about"
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
          >
            About me
          </a>
          <a
            href="/#/projects"
            className="rounded-xl border border-white/25 bg-white/10 px-5 py-2.5 text-white backdrop-blur hover:bg-white/15 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/15 backdrop-blur"
          >
            View projects
          </a>
        </motion.div>

        {/* 3D portrait */}
        <div className="relative mx-auto mt-10 h-[520px] w-full max-w-4xl">
          <ThreeHero />
        </div>
      </motion.div>
    </section>
  );
}
