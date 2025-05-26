"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from 'zod';  
import axios from "axios";
import LoadingModal from "@/components/load";




const signupSchema = z.object({
  email: z.string().min(1, 'Email required').email('enter a valid email'),
  password: z.string().min(8, 'password can not be less than 8'),
  username: z.string().min(3, ' username must be at least 3 characters').max(20, 'username can not be more than 20 characters')
});
    
  export type SignupSchema = z.infer<typeof signupSchema>;


export default function SignupPage() {
  const router = useRouter();
  const [error, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true)
    const formData = new FormData(event.currentTarget);
    const result = signupSchema.safeParse(Object.fromEntries(formData));
  
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
      const data = result.data;
      console.log(data)
    try {
      const response = await axios.post('/api/signup', data );
      if (response.status >= 200 && response.status < 300) { 
        console.log('Signup successful', response.data);     
         router.push('/login');
      }
      setLoading(false)

    } catch (error: any ) {
       setLoading(false)
       setErrors({ form: error.response?.data.message || 'An error occurred' });
       console.error('Signup failed', error);
    } finally {
       setLoading(false)
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-10" />

      {
        loading ? <LoadingModal/> : null
      }

      <motion.div
        className="relative z-20 flex items-center justify-center h-full px-3"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.form
          className="bg-white/10 backdrop-blur-md p-3 md:p-10 rounded-2xl shadow-lg w-[300px] md:w-[400px] text-white space-y-6"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
        >
          <motion.h2 
            className="text-xl md:text-3xl font-bold text-center"
            variants={itemVariants}
          >
           Create an Account
            
          </motion.h2>
          {error.form && (
                  <span className="text-red-400 bg-red-900 block w-full   text-lg mt-3 text-center">{error.form}</span>
             )}

          <motion.div variants={itemVariants}>

            <input
              name="username"
              type="text"
              placeholder="Username"
              className="w-full py-2 px-3 md:px-4 md:py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-red-700"
              
            />
            {error.username && (
              <span className="text-red-500 text-sm">{error.username}</span>
            )}

          </motion.div>

          <motion.div variants={itemVariants}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full py-2 px-3 md:px-4 md:py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-red-700"
              
            />

            {error.email && (
                  <span className="text-red-500 text-sm">{error.email}</span>
             )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full py-2 px-3 md:px-4 md:py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-red-700"
              
            />
              {error.password && (
                  <span className="text-red-500 text-sm">{error.password}</span>
             )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.button
              type="submit"
              className="w-full bg-red-900 hover:bg-red-700 transition-all text-white font-semibold py-2 md:py-3 rounded-md"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
             
            >
             Sign Up
            </motion.button>
          </motion.div>

          <motion.p 
            className="text-center text-sm"
            variants={itemVariants}
          >
            Already have an account?{" "}
            <Link href="/login" className="text-red-400 hover:text-red-200 underline">
              Login
            </Link>
          </motion.p>

          <motion.p 
            className="text-center text-xs mt-4 text-white/70"
            variants={itemVariants}
          >
            <Link href="/" className="underline hover:text-white">← Back to Home</Link>
          </motion.p>
        </motion.form>
      </motion.div>
    </div>
  );
}
