"use client";

interface StateIndicatorProps {
  stateName: string;
  stateColor: string;
}

const StateIndicator = ({ stateName, stateColor }: StateIndicatorProps) => {
  return (
    <span
      className="flex items-center justify-center gap-2 px-3 py-1 text-white text-sm font-semibold rounded-full max-w-[50%] mx-auto"
      style={{ backgroundColor: stateColor }}
    >
      {stateName}
    </span>
  );
};

export default StateIndicator;
