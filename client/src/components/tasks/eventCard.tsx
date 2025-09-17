"use client";

import { Calendar } from "lucide-react";

export default function EventCard({ eventName }: { eventName?: string }) {
  // Dummy data for template preview
  const events = [
    {
      name: "Design Review",
      boardName: "Marketing Launch",
      deadlineStart: new Date("2025-09-20"),
      deadlineEnd: new Date("2025-09-22"),
    },
    {
      name: "Sprint Planning",
      boardName: "Product Roadmap",
      deadlineStart: new Date("2025-10-01"),
      deadlineEnd: new Date("2025-10-01"),
    },
  ];

  //   const event = events[0];
  const event = events.find((e) => e.name === eventName) ?? events[0];

  const formatDate = (date: Date) =>
    date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const formatDeadline = (start?: Date, end?: Date) => {
    if (!start && !end) return "No deadline";
    if (start && !end) return formatDate(start);
    if (!start && end) return formatDate(end);
    if (start && end && start.getTime() !== end.getTime()) {
      return `${formatDate(start)} – ${formatDate(end)}`;
    }
    return start ? formatDate(start) : "No deadline";
  };

  return (
    <div
      className="relative min-w-[250px] rounded-xl shadow-md 
    bg-background-alt hover:bg-border-hover transition cursor-pointer 
    flex flex-col group"
    >
      <div className="p-3 pb-1 w-full">
        <p className="font-semibold text-lg text-white whitespace-normal break-words">
          {event.name}
        </p>
      </div>
      <div className="px-3 pb-1 w-full">
        <div className="inline-block bg-white text-background-alt group-hover:text-border-hover font-bold text-xs rounded-md px-2 py-1 max-w-full whitespace-normal break-words">
          {event.boardName}
        </div>
      </div>
      <div className="px-3 pt-1 pb-3 flex items-center justify-between gap-3 w-full">
        <div className="flex items-center gap-1 text-xs text-white/80">
          <Calendar className="w-4 h-4 opacity-90" />
          <span className="truncate">
            {formatDeadline(event.deadlineStart, event.deadlineEnd)}
          </span>
        </div>
      </div>
    </div>
  );
}
