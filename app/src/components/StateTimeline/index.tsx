import React from "react";
import { formatDate, formatHours } from "@/helpers/formatters";
import { AggregatedEquipment } from "@/helpers/types";
import { TimlineItem } from "./TimlineItem";

interface Props {
  data: Partial<AggregatedEquipment["stateHistory"]>
}

type Activity = {
  [key: string]: {
    time: string
    text: string
    color: string
    key: number
  }[]
}

function getFormattedData({ data }: Props): Activity {
  if (!data) return {}
  const activities: Activity = {};
  data.forEach((item, index) => {
    const formattedDate = formatDate(item?.date)
    const list = activities[formattedDate] || [];
    list.push({
      time: formatHours(item?.date),
      text: item?.state?.name ?? '',
      color: item?.state?.color ?? '',
      key: index,
    });
    activities[formattedDate] = list;
  });
  return activities;
}

export function StateTimeline({ data }: Props) {
  const activities = getFormattedData({ data });
  const dates = Object.keys(activities);

  return (
    <div className="relative">
      {dates.map(date => (
        <ul className="relative list-none p-0 mb-6" key={date}>
          <li className="mb-4">
            <span className="font-semibold bg-blue-900 text-white text-sm py-1 px-2 rounded relative z-20">
              {date}
            </span>
          </li>
          {activities?.[date].map(({ time, text, color, key }) => (
            <TimlineItem time={time} text={text} color={color} key={key} />
          ))}
        </ul>
      ))}
      <div className="absolute top-0 bottom-0 left-8 w-0.5 bg-blue-900 rounded z-10"></div>
    </div>
  )
}
