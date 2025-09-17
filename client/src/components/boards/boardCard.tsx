"use client";

import { Star } from "lucide-react";

interface BoardCardProps {
  board: {
    id: string;
    name?: string;
    pinned?: boolean;
    background?: {
      type: "color" | "preset" | "upload";
      value: string;
    };
  };
  togglePin: (id: string) => void;
  openBoard: (id: string) => void;
}

export default function BoardCard({
  board,
  togglePin,
  openBoard,
}: BoardCardProps) {
  return (
    <div
      onClick={() => openBoard(board.id)}
      className="relative min-w-[250px] h-36 rounded-2xl shadow-lg
  bg-white/10 backdrop-blur-xl hover:bg-white/20 transition-all duration-300
  cursor-pointer flex flex-col group overflow-hidden"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          togglePin(board.id);
        }}
        className={`absolute top-2 right-2 p-2 rounded-xl
   backdrop-blur-md inner-border shadow-sm
    transition-all duration-200 z-10
    ${board.pinned ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
      >
        {board.pinned ? (
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 drop-shadow" />
        ) : (
          <Star className="w-5 h-5 text-gray-300 hover:text-yellow-300 transition-colors" />
        )}
      </button>

      {/* Background wrapper */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden">
        {board.background ? (
          board.background.type === "color" ? (
            <div
              className="absolute inset-0"
              style={{ background: board.background.value }}
            />
          ) : (
            <img
              src={board.background.value}
              alt={board.name || "Board preview"}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )
        ) : (
          <img
            src="/default-board.jpg"
            alt={board.name || "Board preview"}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* 👇 inner-border overlay goes ABOVE background */}
        <div className="inner-border-overlay rounded-2xl" />

        {/* Gradient + title bar */}
        <div className="absolute inset-x-0 bottom-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="relative bg-white/20 backdrop-blur-md px-3 py-2">
            <p className="font-semibold text-lg text-white truncate drop-shadow">
              {board.name || "Untitled Board"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
