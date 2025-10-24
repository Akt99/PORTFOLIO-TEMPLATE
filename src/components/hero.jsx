import { motion, useReducedMotion } from "framer-motion";
import TechIcons from "./tech-icons.jsx";
export default function Hero() {
  const reduce = useReducedMotion();
  const parent = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.08 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.section 
    id="home" 
    className="mx-auto max-w-5xl px-4 pt-24 pb-16"
    initial="hidden"
    animate="show"
    variants={parent}>
      <div className="text-center">

        <motion.div 
        variants={item}
        className="mx-auto mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-500/10">
          <span></span>
        </motion.div>
        <motion.h1 
        variants={item}
        className="text-5xl font-extrabold tracking-tight sm:text-6xl">
          Namaste 🙏🏼 ! I am Arnab 

        </motion.h1>
        <motion.p 
        variants={item}
        className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-300">
        </motion.p>
        <motion.div 
        variants={item}
        className="mt-8 flex items-center justify-center gap-3">
          <motion.a 
          whileHover={{y: -2}}
          whileTap={{ scale:0.98 }}
          href="#projects" 
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">View Projects</motion.a>
          <motion.a 
          whileHover={{y:-2}}
          whileTap={{ scale:0.98}}


          href="#contact" className="rounded-md border px-4 py-2 hover:bg-gray-50 dark:hover:bg-white/10">Contact</motion.a>
        </motion.div>
       
      </div>
    </motion.section>
  );
}
