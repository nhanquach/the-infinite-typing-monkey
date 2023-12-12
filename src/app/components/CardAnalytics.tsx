import React, { useEffect } from "react";

import { animated, useTrail } from "@react-spring/web";

interface ICardAnalyticsProps {
  isExecuting: boolean;
  time?: string;
  totalStringCount: number;
}

const keys = ["time","total-string-count", "accuracy"]

const CardAnalytics: React.FC<ICardAnalyticsProps> = ({
  isExecuting,
  time,
  totalStringCount,
}) => {
  const components = [
    <span key="time" className="text-lg mt-4">
      Time taken {isExecuting || !time ? "⏲️" : `${time} seconds`}
    </span>,
    <span key="total-string-count" className="text-lg">
      Typed {totalStringCount} strings
    </span>,
    <span key="accuracy" className="text-lg">
      Accuracy: {(1 / totalStringCount) * 100}%
    </span>,
  ];

  const [trails, api] = useTrail(
    components.length,
    () => ({
      delay: 500,
      from: { opacity: 0, y: -20 },
      to: { opacity: 1, y: 0 },
    }),
    []
  );

  useEffect(() => {
    api.start({
      delay: 500,
      config: { mass: 5, tension: 2000, friction: 200 },
      from: { opacity: 0, y: -20 },
      to: { opacity: 1, y: 0 },
    });
  }, [api]);

  return (
    <div className="mt-6">
      {trails.map((props, index) => {
        return (
          <animated.div key={keys[index]} style={props}>
            {components[index]}
          </animated.div>
        );
      })}
    </div>
  );
};

export default CardAnalytics;
