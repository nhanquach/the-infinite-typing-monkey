import React, { useState, useMemo } from "react";
import { LeaderboardEntry } from "../../types";

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

type SortKey =
  | "timeTaken"
  | "generations"
  | "populationSize"
  | "username"
  | "timestamp";
type SortDirection = "asc" | "desc";

interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ entries }) => {
  const [expandedTarget, setExpandedTarget] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "timeTaken",
    direction: "asc",
  });

  // Toggle expanded state for a target group
  const toggleExpand = (target: string) => {
    setExpandedTarget(expandedTarget === target ? null : target);
  };

  // Handle header click to update sort config
  const handleSort = (key: SortKey) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Group entries by target phrase
  const groupedEntries = useMemo(() => {
    const groups: { [key: string]: LeaderboardEntry[] } = {};
    entries.forEach((entry) => {
      if (!groups[entry.targetPhrase]) {
        groups[entry.targetPhrase] = [];
      }
      groups[entry.targetPhrase].push(entry);
    });
    return groups;
  }, [entries]);

  // Sort groups based on their best entry (fastest time)
  const sortedTargetPhrases = useMemo(() => {
    return Object.keys(groupedEntries).sort((a, b) => {
      const minTimeA = Math.min(...groupedEntries[a].map((e) => e.timeTaken));
      const minTimeB = Math.min(...groupedEntries[b].map((e) => e.timeTaken));
      return minTimeA - minTimeB;
    });
  }, [groupedEntries]);

  // Sort entries within each group based on sortConfig
  const getSortedGroupEntries = (entries: LeaderboardEntry[]) => {
    return [...entries].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }
      return 0;
    });
  };

  const getSortIcon = (key: SortKey) => {
    if (sortConfig.key !== key) return "↕";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  return (
    <div className="w-full relative font-mono">
      {Object.keys(groupedEntries).length === 0 ? (
        <div className="bg-white dark:bg-black border-4 border-black dark:border-[#C4E4C5] p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#C4E4C5] transition-colors duration-300">
          <p className="text-lg text-black dark:text-[#C4E4C5]">
            No records yet. Be the first to join the simulation!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {sortedTargetPhrases.map((target) => (
            <div
              key={target}
              className="bg-white dark:bg-black border-4 border-black dark:border-[#C4E4C5] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#C4E4C5] transition-colors duration-300"
            >
              {/* Group Header */}
              <div
                onClick={() => toggleExpand(target)}
                className="p-4 bg-[#C4E4C5] dark:bg-zinc-900 border-b-4 border-black dark:border-[#C4E4C5] cursor-pointer flex justify-between items-center transition-colors duration-300 hover:brightness-105"
              >
                <div>
                  <h3 className="text-xl font-bold text-black dark:text-[#C4E4C5] break-all">
                    "{target}"
                  </h3>
                  <p className="text-sm font-bold text-black dark:text-[#C4E4C5] opacity-70">
                    {groupedEntries[target].length} Entries
                  </p>
                </div>
                <span className="text-2xl text-black dark:text-[#C4E4C5]">
                  {expandedTarget === target ? "▲" : "▼"}
                </span>
              </div>

              {/* Group Content (Table) */}
              {expandedTarget === target && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-zinc-800 border-b-4 border-black dark:border-[#C4E4C5] transition-colors duration-300">
                        <th className="p-4 border-r-4 border-black dark:border-[#C4E4C5] font-bold text-black dark:text-[#C4E4C5] uppercase">
                          Rank
                        </th>
                        <th
                            className="p-4 border-r-4 border-black dark:border-[#C4E4C5] font-bold text-black dark:text-[#C4E4C5] uppercase cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700"
                            onClick={() => handleSort("username")}
                        >
                            User {getSortIcon("username")}
                        </th>
                        <th
                            className="p-4 border-r-4 border-black dark:border-[#C4E4C5] font-bold text-black dark:text-[#C4E4C5] uppercase cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700"
                            onClick={() => handleSort("timeTaken")}
                        >
                            Time (s) {getSortIcon("timeTaken")}
                        </th>
                        <th
                            className="p-4 border-r-4 border-black dark:border-[#C4E4C5] font-bold text-black dark:text-[#C4E4C5] uppercase cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700"
                            onClick={() => handleSort("generations")}
                        >
                            Gens {getSortIcon("generations")}
                        </th>
                        <th
                          className="p-4 border-r-4 border-black dark:border-[#C4E4C5] font-bold text-black dark:text-[#C4E4C5] uppercase cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700"
                          onClick={() => handleSort("populationSize")}
                        >
                          Pop. {getSortIcon("populationSize")}
                        </th>
                        <th
                          className="p-4 font-bold text-black dark:text-[#C4E4C5] uppercase cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700"
                          onClick={() => handleSort("timestamp")}
                        >
                          Date {getSortIcon("timestamp")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {getSortedGroupEntries(groupedEntries[target]).map(
                        (entry, index) => (
                          <tr
                            key={entry.id}
                            className="border-b-2 border-black dark:border-[#C4E4C5] last:border-b-0 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors"
                          >
                            <td className="p-4 border-r-4 border-black dark:border-[#C4E4C5] font-bold text-black dark:text-[#C4E4C5]">
                              #{index + 1}
                            </td>
                            <td className="p-4 border-r-4 border-black dark:border-[#C4E4C5] text-black dark:text-[#C4E4C5]">
                              {entry.username || "Anonymous"}
                            </td>
                            <td className="p-4 border-r-4 border-black dark:border-[#C4E4C5] text-black dark:text-[#C4E4C5] font-bold">
                              {entry.timeTaken}
                            </td>
                            <td className="p-4 border-r-4 border-black dark:border-[#C4E4C5] text-black dark:text-[#C4E4C5]">
                              {entry.generations}
                            </td>
                            <td className="p-4 border-r-4 border-black dark:border-[#C4E4C5] text-black dark:text-[#C4E4C5]">
                              {entry.populationSize}
                            </td>
                            <td className="p-4 text-black dark:text-[#C4E4C5] text-sm">
                              {new Date(entry.timestamp).toLocaleString()}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
