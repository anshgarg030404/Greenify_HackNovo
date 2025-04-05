import React from "react";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";

const educationalResources = [
  {
    title: "Introduction to Solar Energy",
    description: "Learn the basics of solar energy, how it works, and its benefits.",
    link: "#",
  },
  {
    title: "Types of Solar Panels",
    description: "Explore different types of solar panels and their applications.",
    link: "#",
  },
  {
    title: "Solar Energy and Sustainability",
    description: "Discover how solar energy contributes to a sustainable future.",
    link: "#",
  }
];

const stats = [
  { label: "Households Using Green Energy", value: "1.2M+" },
  { label: "Total Cost Saved", value: "$500M+" },
  { label: "Green Energy Produced", value: "750GWh" },
];

const GreenifyEducation: React.FC = () => {
  return (
    <div className="p-6 md:p-12 bg-gradient-to-br bg-[#718e62] min-h-screen text-white flex flex-col items-center">
      <motion.h1
        className="text-5xl font-extrabold text-center mb-10 drop-shadow-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Greenify Educational Hub
      </motion.h1>
      <p className="text-lg text-center max-w-3xl mb-12 opacity-80">
        Explore the world of solar energy with expertly curated resources, in-depth guides, and interactive learning experiences.
      </p>
      <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl mb-12">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white text-green-800 shadow-lg rounded-xl p-6 text-center"
          >
            <h2 className="text-4xl font-bold mb-2">{stat.value}</h2>
            <p className="text-lg font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {educationalResources.map((resource, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white text-black shadow-xl rounded-3xl overflow-hidden p-6 flex flex-col justify-between transform transition-all duration-300"
          >
            <h2 className="text-2xl font-bold mb-3 text-green-700">{resource.title}</h2>
            <p className="text-gray-700 mb-4">{resource.description}</p>
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className=" text-white bg-[#17803d] hover:bg-green-700 px-5 py-3 rounded-lg text-center block font-semibold transition-all duration-300"
            >
              Learn More
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GreenifyEducation;