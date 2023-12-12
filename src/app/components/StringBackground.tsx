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
    <div
      className={`population min-h-screen min-w-full max-h-screen overflow-auto top-0 left-0 z-0 grid grid-cols-6 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-violet-300 to-violet-400`}
    >
      {population.map((item, index) => {
        if (item === quote) {
          return (
            <div
              key={item + index}
              className="bg-purple-200 text-xs flex justify-center items-center text-center rounded-md overflow-auto max-h-12 animate-pulse"
            >
              {item}
            </div>
          );
        }
        return (
          <div
            key={item + index}
            className="text-center text-xs overflow-auto max-h-12 text-purple-100"
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default StringBackground;
