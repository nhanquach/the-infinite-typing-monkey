import React, { useEffect } from "react";

import { animated, useSpringRef, useTransition } from "@react-spring/web";

import CardAnalytics from "./CardAnalytics";

interface IResultProps {
  time?: string;
  bestGuess: string;
  bestFit: number;
  genNo: number;
  isExecuting: boolean;
  totalStringCount: number;
}

const Result: React.FC<IResultProps> = ({
  bestGuess,
  genNo,
  bestFit,
  isExecuting,
  totalStringCount,
  time,
}) => {
  const transRef = useSpringRef();

  const [transitions] = useTransition([bestGuess], () => {
    return {
      ref: transRef,
      config: { duration: 100 }, // Faster transition for "typewriter" feel
      from: { opacity: 0, transform: "translateX(5px)" },
      enter: { opacity: 1, transform: "translateX(0%)" },
      leave: { opacity: 0, position: "absolute" }, // Avoid layout shift if possible, or just standard fade
    };
  });

  useEffect(() => {
    transRef.start();
  }, [bestGuess, transRef]);

  return (
    <div className="w-full max-w-xl mx-auto text-black z-10 relative">
      <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
        <div className="flex justify-between items-center border-b-4 border-black pb-2 mb-4">
          <h3 className="text-xl font-bold uppercase">Generation #{genNo}</h3>
          <span className="font-bold bg-black text-white px-2 py-1 text-sm">
            {Math.round(bestFit * 100)}% FIT
          </span>
        </div>

        <div className="min-h-[8rem] flex flex-col justify-center">
          <p className="text-sm uppercase font-bold text-gray-500 mb-1">Best Guess:</p>
          <div className="text-3xl md:text-4xl font-mono font-bold break-all leading-tight">
             {transitions((style, item) => (
              <animated.span style={style} className="inline-block">
                {item}
              </animated.span>
            ))}
          </div>
        </div>
      </div>

      {!isExecuting && totalStringCount > 0 && (
        <div className="bg-[#C4E4C5] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
             <CardAnalytics
              isExecuting={isExecuting}
              time={time}
              totalStringCount={totalStringCount}
            />
        </div>
      )}
    </div>
  );
};

export default Result;
