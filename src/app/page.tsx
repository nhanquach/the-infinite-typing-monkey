"use client";
import { useState } from "react";
import execute from "../../utils/executeGA";
import StringBackground from "./components/StringBackground";
import Card from "./components/Card";

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
    <div className="font-lexend">
      <Card
        quote={quote}
        setQuote={setQuote}
        monkeys={monkeys}
        isExecuting={isExecuting}
        genNo={genNo}
        totalStringCount={totalStringCount}
        time={time}
        setPopulation={setPopulation}
        handleExecute={handleExecute}
        bestFit={bestFit}
        bestGuess={bestGuess}
      />

      <StringBackground quote={quote} population={currentPopulation} />
    </div>
  );
}
