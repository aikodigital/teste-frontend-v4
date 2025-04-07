import React from "react";
import { Timeline } from "antd";
import { Equipment } from "../../../types/equipment";
import { ClockCircleOutlined } from "@ant-design/icons";
import { getGroupedHistoryItems } from "../../../utils/equipment";

interface TimelineSectionProps {
  equipment: Equipment;
  setActivePathStartIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const TimelineSection: React.FC<TimelineSectionProps> = ({
  equipment,
  setActivePathStartIndex,
}) => {
  const grouped = getGroupedHistoryItems(equipment);

  const timelineItems = Object.entries(grouped)
    .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
    .map(([date, events]) => ({
      color: "gray",
      dot: <ClockCircleOutlined />,
      children: (
        <div>
          <strong>{new Date(date).toLocaleDateString()}</strong>
          <ul>
            {events
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .map((e, idx) => (
                <li
                  key={idx}
                  style={{ color: e.color }}
                  onMouseEnter={() => {
                    if (
                      e.type === "position" &&
                      typeof e.positionIndex === "number"
                    ) {
                      setActivePathStartIndex(e.positionIndex);
                    }
                  }}
                  onMouseLeave={() => setActivePathStartIndex(null)}
                >
                  {e.icon} {e.text}{" "}
                  <em style={{ color: "#999" }}>({e.hourStr})</em>
                </li>
              ))}
          </ul>
        </div>
      ),
    }));

  return (
    <div style={{ padding: "1em 0 1em 0.2em", overflowY: "auto" }}>
      <Timeline items={timelineItems} />
    </div>
  );
};

export default TimelineSection;
