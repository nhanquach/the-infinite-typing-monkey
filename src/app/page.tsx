"use client";
import { useState } from "react";
import execute from "../../utils/executeGA";
import StringBackground from "./components/StringBackground";
import Form from "./components/Form";
import Result from "./components/Result";

export default function Home() {
  const [quote, setQuote] = useState("To be or not to be.");

  const [isExecuting, setIsExecuting] = useState(false);
  const [genNo, setGenNo] = useState(0);
  const [bestFit, setBestFit] = useState(0);
  const [monkeys, setMonkeys] = useState(1000);
  const [bestGuess, setBestGuess] = useState("N/A");
  const [currentPopulation, setCurrentPopulation] = useState<string[]>([]);

  const [time, setTime] = useState<string>();
  const [totalStringCount, settotalStringCount] = useState(0);

  const handleExecute = async () => {
    const { time: takenTime, totalStrings } = (await execute(
      quote,
      monkeys,
      setIsExecuting,
      setGenNo,
      setBestFit,
      setBestGuess,
      setCurrentPopulation
    )) as any;

    setTime((takenTime / 1000).toFixed(2));
    settotalStringCount(totalStrings);
  };

  const setPopulation = (e: React.FormEvent<HTMLInputElement>) => {
    setMonkeys(Number.parseInt(e.currentTarget.value));
  };

  return (
    <main className="flex flex-col lg:flex-row min-h-screen w-full bg-white text-black font-mono">
      {/* Left Panel: Controls - Pastel Green */}
      <section className="w-full lg:w-1/2 bg-[#C4E4C5] border-b-4 lg:border-b-0 lg:border-r-4 border-black p-8 lg:p-16 flex flex-col justify-center relative z-10">
        <Form
          isExecuting={isExecuting}
          setPopulation={setPopulation}
          quote={quote}
          monkeys={monkeys}
          handleExecute={handleExecute}
          setQuote={setQuote}
        />
      </section>

      {/* Right Panel: Results & Visualization - White */}
      <section className="w-full lg:w-1/2 relative bg-white flex flex-col justify-center p-8 lg:p-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <StringBackground quote={quote} population={currentPopulation} />
        </div>
        <div className="z-10 relative pointer-events-none">
          <Result
            bestGuess={bestGuess}
            bestFit={bestFit}
            genNo={genNo}
            isExecuting={isExecuting}
            time={time}
            totalStringCount={totalStringCount}
          />
        </div>
      </section>
    </main>
  );
}
