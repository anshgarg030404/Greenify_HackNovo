import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const items = [
    { icon: "📞", label: "Call", link: "/installation" },
    { icon: "🧮", label: "Calculator", link: "/calculator" },
    { icon: "💡", label: "Resources", link: "/resources" },
    { icon: "🔋⚡", label: "Energy", link: "/energy" },
    
  ];

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50 ">
      {items.map((item, index) => (
        <Link
          to={item.link}
          key={index}
          className="relative w-14 h-14 block shadow-xl"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div
            className={`absolute top-0 right-0 h-full  rounded-lg px-2 text-black flex items-center justify-center shadow-xl transition-all duration-300 overflow-hidden ${
              hoveredIndex === index ? "w-28 px-3" : "w-14"
            }`}
          >
            <span className="whitespace-nowrap text-xl px-2 font-medium transition-opacity duration-200 ">
              {hoveredIndex === index ? item.label : item.icon}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
