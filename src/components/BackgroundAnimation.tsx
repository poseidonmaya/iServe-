import React from 'react';
import { motion } from 'motion/react';

export const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none bg-obsidian">
      {/* Atmospheric Gradients */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-midnight/10 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-steel/5 rounded-full blur-[100px]"
      />

      {/* Moving Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <motion.div
          animate={{
            x: [0, -40],
            y: [0, -40],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-[200%] h-[200%] flex flex-wrap"
          style={{
            backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Subtle Symbol Grid */}
      <div className="absolute inset-0 opacity-[0.02] flex flex-wrap justify-around p-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.2 }}
            animate={{ 
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="text-4xl font-bold text-white select-none"
          >
            +
          </motion.div>
        ))}
      </div>

      {/* Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};
