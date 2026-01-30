"use client";
import { useState, useEffect } from "react";
import execute from "../../utils/executeGA";
import StringBackground from "./components/StringBackground";
import Form from "./components/Form";
import Result from "./components/Result";
import Leaderboard from "./components/Leaderboard";
import Modal from "./components/Modal";
import { LeaderboardEntry } from "../types";

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

  const [userName, setUserName] = useState("");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  useEffect(() => {
    const storedLeaderboard = localStorage.getItem("monkeyLeaderboard");
    if (storedLeaderboard) {
      setLeaderboard(JSON.parse(storedLeaderboard));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("monkeyLeaderboard", JSON.stringify(leaderboard));
    }
  }, [leaderboard, isLoaded]);

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

    const timeInSeconds = parseFloat((takenTime / 1000).toFixed(2));
    setTime(timeInSeconds.toString());
    settotalStringCount(totalStrings);

    const newEntry: LeaderboardEntry = {
      id: Date.now().toString(),
      username: userName,
      targetPhrase: quote,
      timeTaken: timeInSeconds,
      generations: Math.floor(totalStrings / monkeys),
      populationSize: monkeys,
      timestamp: Date.now(),
    };

    setLeaderboard((prev) => [...prev, newEntry]);
  };

  const setPopulation = (e: React.FormEvent<HTMLInputElement>) => {
    setMonkeys(Number.parseInt(e.currentTarget.value));
  };

  return (
    <main className="flex flex-col lg:flex-row min-h-screen w-full bg-white dark:bg-black text-black dark:text-[#C4E4C5] font-mono transition-colors duration-300">
      {/* Left Panel: Controls - Pastel Green (Light) / Zinc 900 (Dark) */}
      <section className="w-full lg:w-1/2 bg-[#C4E4C5] dark:bg-zinc-900 border-b-4 lg:border-b-0 lg:border-r-4 border-black dark:border-[#C4E4C5] p-8 lg:p-16 flex flex-col justify-center relative z-10 transition-colors duration-300">
        <Form
          isExecuting={isExecuting}
          setPopulation={setPopulation}
          quote={quote}
          monkeys={monkeys}
          handleExecute={handleExecute}
          setQuote={setQuote}
          userName={userName}
          setUserName={setUserName}
          onViewLeaderboard={() => setIsLeaderboardOpen(true)}
        />
      </section>

      {/* Right Panel: Results & Visualization - White (Light) / Black (Dark) */}
      <section className="w-full lg:w-1/2 relative bg-white dark:bg-black flex flex-col items-center p-8 lg:p-16 overflow-y-auto transition-colors duration-300 h-screen lg:h-auto">
        <div className="absolute inset-0 z-0">
          <StringBackground quote={quote} population={currentPopulation} />
        </div>
        <div className="z-10 relative w-full max-w-xl">
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

      <Modal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        title="LEADERBOARD 🏆"
      >
        <Leaderboard entries={leaderboard} />
      </Modal>
    </main>
  );
}
