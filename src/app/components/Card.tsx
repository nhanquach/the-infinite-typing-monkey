import React from "react";

import Form from "./Form";
import Result from "./Result";

interface ICardProps {
  time?: string;
  quote: string;
  monkeys: number;
  isExecuting: boolean;
  genNo: number;
  totalStringCount: number;
  bestFit: number;
  bestGuess: string;
  setQuote: (newQuote: string) => void;
  setPopulation: (e: React.FormEvent<HTMLInputElement>) => void;
  handleExecute: () => void;
}

const Card: React.FC<ICardProps> = ({
  quote,
  setQuote,
  monkeys,
  isExecuting,
  genNo,
  totalStringCount,
  time,
  setPopulation,
  handleExecute,
  bestFit,
  bestGuess,
}) => {
  return (
    <div
      className={`mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8 z-10 absolute top-0 left-0 right-0 max-h-screen overflow-auto rounded-2xl`}
    >
      <div className="relative isolate overflow-hidden px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-300 via-purple-300 to-indigo-400">
        <Form
          isExecuting={isExecuting}
          setPopulation={setPopulation}
          quote={quote}
          monkeys={monkeys}
          handleExecute={handleExecute}
          setQuote={setQuote}
        />

        <Result
          bestGuess={bestGuess}
          bestFit={bestFit}
          genNo={genNo}
          isExecuting={isExecuting}
          time={time}
          totalStringCount={totalStringCount}
        />
      </div>
    </div>
  );
};

export default Card;
