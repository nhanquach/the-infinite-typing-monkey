import React from "react";
import { LeaderboardEntry } from "../../types";

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ entries }) => {
  // Sort entries by timeTaken (ascending)
  const sortedEntries = [...entries].sort((a, b) => a.timeTaken - b.timeTaken);

  return (
    <div className="w-full mt-12 z-20 relative font-mono">
      <h2 className="text-3xl font-bold tracking-tighter text-black dark:text-[#C4E4C5] mb-6 border-b-4 border-black dark:border-[#C4E4C5] pb-2 inline-block transition-colors duration-300">
        LEADERBOARD 🏆
      </h2>

      {sortedEntries.length === 0 ? (
        <div className="bg-white dark:bg-black border-4 border-black dark:border-[#C4E4C5] p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#C4E4C5] transition-colors duration-300">
          <p className="text-lg text-black dark:text-[#C4E4C5]">
            No records yet. Be the first to join the simulation!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-black border-4 border-black dark:border-[#C4E4C5] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#C4E4C5] transition-colors duration-300">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#C4E4C5] dark:bg-zinc-900 border-b-4 border-black dark:border-[#C4E4C5] transition-colors duration-300">
                <th className="p-4 border-r-4 border-black dark:border-[#C4E4C5] font-bold text-black dark:text-[#C4E4C5] uppercase">Rank</th>
                <th className="p-4 border-r-4 border-black dark:border-[#C4E4C5] font-bold text-black dark:text-[#C4E4C5] uppercase">User</th>
                <th className="p-4 border-r-4 border-black dark:border-[#C4E4C5] font-bold text-black dark:text-[#C4E4C5] uppercase">Target</th>
                <th className="p-4 border-r-4 border-black dark:border-[#C4E4C5] font-bold text-black dark:text-[#C4E4C5] uppercase">Time (s)</th>
                <th className="p-4 border-r-4 border-black dark:border-[#C4E4C5] font-bold text-black dark:text-[#C4E4C5] uppercase">Gens</th>
                <th className="p-4 font-bold text-black dark:text-[#C4E4C5] uppercase">Pop.</th>
              </tr>
            </thead>
            <tbody>
              {sortedEntries.map((entry, index) => (
                <tr
                  key={entry.id}
                  className="border-b-2 border-black dark:border-[#C4E4C5] last:border-b-0 hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors"
                >
                  <td className="p-4 border-r-4 border-black dark:border-[#C4E4C5] font-bold text-black dark:text-[#C4E4C5]">
                    #{index + 1}
                  </td>
                  <td className="p-4 border-r-4 border-black dark:border-[#C4E4C5] text-black dark:text-[#C4E4C5]">
                    {entry.username || "Anonymous"}
                  </td>
                  <td className="p-4 border-r-4 border-black dark:border-[#C4E4C5] text-black dark:text-[#C4E4C5] italic break-all max-w-xs">
                    "{entry.targetPhrase}"
                  </td>
                  <td className="p-4 border-r-4 border-black dark:border-[#C4E4C5] text-black dark:text-[#C4E4C5] font-bold">
                    {entry.timeTaken}
                  </td>
                  <td className="p-4 border-r-4 border-black dark:border-[#C4E4C5] text-black dark:text-[#C4E4C5]">
                    {entry.generations}
                  </td>
                  <td className="p-4 text-black dark:text-[#C4E4C5]">
                    {entry.populationSize}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
