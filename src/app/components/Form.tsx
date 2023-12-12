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
      className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left z-10"
      onSubmit={(e) => {
        e.preventDefault();
        handleExecute();
      }}
    >
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        The Infinite Typing Monkey Theorem ⌨️ 🐒
      </h2>
      <p className="mt-6 text-lg leading-8">
        Given infinite time, a monkey on a typewriter can, theoretically,
        produce any text through random key presses.
      </p>
      <label className="block text-gray-200 text-sm my-2">Try it</label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="quote"
        type="text"
        value={quote}
        onChange={(e) => {
          setQuote(e.target.value?.toString());
        }}
      />

      <div className="mt-4 ">
        <label className="block text-gray-200 text-sm mb-2">
          Number of Monkeys: {monkeys}
        </label>
        <input
          id="minmax-range"
          type="range"
          min="100"
          max="10000"
          step={100}
          value={monkeys}
          onChange={setPopulation}
          className="w-full h-6 bg-white rounded-2xl appearance-none cursor-pointer"
        />
      </div>
      <button
        className="mt-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:bg-gray-300"
        type="submit"
        disabled={isExecuting}
        onClick={handleExecute}
      >
        {isExecuting ? "Typing..." : "Go, Monkeys Go!"}
      </button>
    </form>
  );
};

export default Form;
