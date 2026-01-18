import React from "react";

interface IStringBackgroundProps {
  population: string[];
  quote: string;
}

const StringBackground: React.FC<IStringBackgroundProps> = ({
  population,
  quote,
}) => {
  return (
    <div className="w-full h-full overflow-hidden grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 content-start opacity-40">
      {population.map((item, index) => {
        if (item === quote) {
          return (
            <div
              key={item + index}
              className="bg-[#C4E4C5] dark:bg-[#C4E4C5] border-2 border-black dark:border-white text-black dark:text-black text-xs md:text-sm font-mono p-2 flex justify-center items-center text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_white] animate-pulse transition-all duration-300"
            >
              {item}
            </div>
          );
        }
        return (
          <div
            key={item + index}
            className="text-center text-xs md:text-sm font-mono p-2 text-gray-400 dark:text-zinc-500 border border-gray-200 dark:border-zinc-800 truncate transition-colors duration-300"
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default StringBackground;
