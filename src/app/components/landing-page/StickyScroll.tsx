"use client";
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export const StickyScroll = ({
  content,
  contentClassName,
  title,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
  title: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end end"],
  });
  
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isMobile) return;
    // Adjusted breakpoint calculation
    const cardsBreakpoints = content.map((_, index) => index / (cardLength - 1));
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = ["var(--white)"];
  const linearGradients = useMemo(
    () => [
      "linear-gradient(to bottom right, grey, white)",
      "linear-gradient(to bottom right, grey, white)",
      "linear-gradient(to bottom right, grey, white)",
      "linear-gradient(to bottom right, grey, white)",
    ],
    []
  );

  const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0]);

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard, linearGradients]);

  const featureIcons = [
    "/feature-icon1.png",
    "/feature-icon2.png",
    "/feature-icon3.png",
    "/feature-icon4.png",
  ];

  // Mobile view with fixed title
  if (isMobile) {
    return (
      <motion.div
        animate={{
          backgroundColor: backgroundColors[activeCard % backgroundColors.length],
        }}
        className="h-screen flex flex-col"
      >
        <div className="py-8 bg-white sticky top-0 z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-montserrat text-center font-bold text-black">
            {title}
          </h2>
        </div>
        <div className="space-y-8 px-4 h-[calc(100vh-180px)] overflow-y-auto">
          {content.map((item, index) => (
            <div 
              key={item.title + index} 
              className="bg-white rounded-lg p-6 shadow-md"
              onClick={() => setActiveCard(index)}
            >
              <div 
                className="mb-6 h-40 rounded-md relative"
                style={{ background: linearGradients[index % linearGradients.length] }}
              >
                <motion.img
                  src={featureIcons[index]}
                  alt={`Feature Icon ${index + 1}`}
                  className="absolute inset-0 m-auto h-24 w-24"
                />
              </div>
              <h2 className="text-xl font-bold text-black mb-4">{item.title}</h2>
              <p className="text-black">{item.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  // Original desktop view exactly as provided
  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      style={{ paddingTop: '100px' }}
      className="py-12 pt-20 font-montserrat"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-montserrat text-center font-bold text-black mb-8">{title}</h2>
      <div
        ref={ref}
        className="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10"
      >
        <div className="div relative flex items-start px-4">
          <div className="max-w-2xl">
            {content.map((item, index) => (
              <div key={item.title + index} className="my-20">
                <motion.h2
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.3,
                  }}
                  className="text-2xl font-bold text-black font-montserrat"
                >
                  {item.title}
                </motion.h2>
                <motion.p
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.3,
                  }}
                  className="text-kg text-black max-w-sm mt-10 font-montserrat"
                >
                  {item.description}
                </motion.p>
              </div>
            ))}
            <div className="h-40" />
          </div>
        </div>
        <div
          style={{ background: backgroundGradient, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
          className={cn(
            "hidden lg:block h-60 w-80 rounded-md bg-white sticky top-10 overflow-hidden",
            contentClassName
          )}
        >
          <motion.img
            key={featureIcons[activeCard]}
            src={featureIcons[activeCard]}
            alt={`Feature Icon ${activeCard + 1}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 m-auto h-24 w-24"
          />
          {content[activeCard].content ?? null}
        </div>
      </div>
    </motion.div>
  );
};

export default StickyScroll;