import React from "react";

interface IFromProps {
  isExecuting: boolean;
  quote: string;
  monkeys: number;
  setQuote: (newQuote: string) => void;
  setPopulation: (e: React.FormEvent<HTMLInputElement>) => void;
  handleExecute: () => void;
}

const Form: React.FC<IFromProps> = ({
  quote,
  setQuote,
  monkeys,
  setPopulation,
  isExecuting,
  handleExecute,
}) => {
  return (
    <form
      className="mx-auto max-w-lg w-full text-left z-10"
      onSubmit={(e) => {
        e.preventDefault();
        handleExecute();
      }}
    >
      <h2 className="text-4xl font-bold tracking-tighter text-black dark:text-[#C4E4C5] mb-6 border-b-4 border-black dark:border-[#C4E4C5] pb-2 inline-block transition-colors duration-300">
        Infinite Monkey ⌨️ 🐒
      </h2>
      <p className="mb-8 text-lg font-medium leading-relaxed border-l-4 border-black dark:border-[#C4E4C5] pl-4 text-black dark:text-[#C4E4C5] transition-colors duration-300">
        Given infinite time, a monkey on a typewriter can, theoretically,
        produce any text through random key presses.
      </p>

      <div className="mb-6">
        <label className="block text-black dark:text-[#C4E4C5] font-bold text-lg mb-2 uppercase tracking-wide transition-colors duration-300">
          Target Text
        </label>
        <input
          className="w-full bg-white dark:bg-black border-4 border-black dark:border-[#C4E4C5] p-4 text-black dark:text-[#C4E4C5] font-mono text-lg focus:outline-none focus:bg-yellow-100 dark:focus:bg-zinc-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#C4E4C5] transition-all focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none placeholder-gray-500 dark:placeholder-zinc-600"
          id="quote"
          type="text"
          value={quote}
          placeholder="Enter text..."
          onChange={(e) => {
            setQuote(e.target.value?.toString());
          }}
        />
      </div>

      <div className="mb-8">
        <label className="block text-black dark:text-[#C4E4C5] font-bold text-lg mb-2 uppercase tracking-wide transition-colors duration-300">
          Monkey Population: {monkeys}
        </label>
        <input
          id="minmax-range"
          type="range"
          min="100"
          max="10000"
          step={100}
          value={monkeys}
          onChange={setPopulation}
          className="w-full h-4 bg-white dark:bg-black border-2 border-black dark:border-[#C4E4C5] appearance-none cursor-pointer accent-black dark:accent-[#C4E4C5] transition-colors duration-300"
        />
      </div>

      <button
        className="w-full bg-white dark:bg-black text-black dark:text-[#C4E4C5] font-bold text-xl py-4 px-6 border-4 border-black dark:border-[#C4E4C5] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#C4E4C5] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_#C4E4C5] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all disabled:bg-gray-300 dark:disabled:bg-zinc-800 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        type="submit"
        disabled={isExecuting}
        onClick={handleExecute}
      >
        {isExecuting ? "SIMULATING..." : "START SIMULATION"}
      </button>
    </form>
  );
};

export default Form;
