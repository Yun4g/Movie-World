"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import  zod  from 'zod';
import { useRouter } from "next/navigation";
import axios from "axios";
import LoadingModal from "@/components/load";



const LoginSchema = zod.object({
  email: zod.string().min(1, 'Email required').email('enter a valid email'),
  password: zod.string().min(8, 'password can not be less than 8'),
})

export default function LoginPage() {
  const [error, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = LoginSchema.safeParse(Object.fromEntries(formData));


    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    const data = result.data;
    console.log(data); 

    try {
      const res = await axios.post('/api/login', data);
      if (res.status >= 200 && res.status < 300) {
        console.log('Login successful', res.data);
        router.push('/Dashboard');
       localStorage.setItem('userId', res.data.user.id);
       localStorage.setItem('token', res.data.token);
     

      } else {
        console.log('Login failed', res.data);
        setErrors({ form: res.data.message || 'An error occurred' }); 
      }
    } catch (error : any) {
      setErrors({ form: error.response?.data.message || 'An error occurred' });
      console.error('Login failed', error);    
    } finally {
      setLoading(false);  
    }
    
  }

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
      boxShadow: "0 0 10px rgba(185, 28, 28, 0.5)",
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
        className="relative z-20 flex items-center px-3 justify-center h-full  "
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.form
          className="bg-white/10 backdrop-blur-md p-3 md:p-10 rounded-2xl shadow-lg  max-w-md w-full text-white space-y-6"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          onSubmit={handleSubmit}
        >
          <motion.h2 
            className=" text-xl md:text-3xl font-bold text-center"
            variants={itemVariants}
          >
           Login to Movie World
          </motion.h2>
          {error.form && (
            <p className="text-red-500 text-sm mt-1">{error.form}</p>
          )}

          <motion.div variants={itemVariants}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full py-2 px-3 md:px-4 md:py-3 rounded-full md:rounded-md bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-red-700"
              
            />
             {error.email && (
              <p className="text-red-400 bg-red-900 block w-full   text-lg mt-3 text-center">{error.email}</p>
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full py-2 px-3 md:px-4 md:py-3 rounded-full md:rounded-md bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-red-700"
              
            />
             {error.password && (
              <p className="text-red-500 text-sm mt-1">{error.password}</p>
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
             Login
            </motion.button>
          </motion.div>

          <motion.p 
            className="text-center text-sm"
            variants={itemVariants}
          >
            Dont have an account?{" "}
            <Link href="/signup" className="text-red-400 hover:text-red-200 underline">
              Sign Up
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