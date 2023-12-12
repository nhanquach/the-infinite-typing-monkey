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
      config: { duration: 200 },
      from: { opacity: 0, transform: "translateX(10%)" },
      enter: { opacity: 1, transform: "translateX(0%)" },
      leave: { opacity: 0 },
    };
  });

  useEffect(() => {
    transRef.start();
  }, [bestGuess, transRef]);

  return (
    <div className="relative mt-16 pt-16 h-80 lg:mt-8 ml-8 mx-auto max-w-md lg:py-32 md:py-12 sm:py-4 z-10">
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Generation: #{genNo}
      </h1>
      <p className="mt-6 text-lg">
        Best score in generation: {Math.round(bestFit * 100)}%
      </p>
      <p className="text-lg">
        Best guess in generation:{" "}
        {transitions((style, item) => (
          <animated.span style={style} className="text-lg">
            {item}
          </animated.span>
        ))}
      </p>
      {!isExecuting && totalStringCount > 0 && (
        <CardAnalytics
          isExecuting={isExecuting}
          time={time}
          totalStringCount={totalStringCount}
        />
      )}
    </div>
  );
};

export default Result;
