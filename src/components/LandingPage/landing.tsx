"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

function LandingPage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };
  
  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };
  

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Image
        src="/imageMovie1.jpg"
        alt="Movie background"
        fill
        className="object-cover z-0"
        priority
      />

      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Animated Content */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="text-white mb-8" variants={itemVariants}>
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Welcome to Movie World
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Browse and discover your favorite films
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row items-center w-full max-w-2xl space-y-4 md:space-y-0 md:space-x-4"
          variants={itemVariants}
        >
          <motion.input
            type="text"
            placeholder="Search for movies..."
            className="w-full px-4 py-3 rounded-full text-white bg-transparent border-2 border-white placeholder-white text-lg outline-none"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </motion.div>

        <motion.div className="mt-8" variants={itemVariants}>
          <motion.p
            className="text-white text-lg md:text-xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Ready to explore? Click below to get started!
          </motion.p>
          <motion.div
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <Link
              href="/signup"
              className="bg-red-900 text-white px-12 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-all"
            >
              Get Started
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default LandingPage;
