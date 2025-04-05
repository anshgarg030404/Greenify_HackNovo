import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import CommunityImpact from '../components/home/CommunityImpact';
import EducationalResources from '../components/home/EducationalResources';
import InstallationProcess from '../components/home/InstallationProcess';
import CalculatorSection from '../components/CalculationSection';
import ProductCatalog from '../components/home/ProductCatalog';

const slides = [
  {
    id: 1,
    image: "/more.png",
    title: "Appointment Booking & Site Visit",
    description: "Users schedule a visit through our platform. A certified technician visits the location to assess the existing housing infrastructure, ensuring it's suitable for solar installation—no need for new construction."
  },
  {
    id: 2,
    image: "/bg-2.png",
    title: "LiDAR Scanning & 3D Mapping",
    description: "Using LiDAR scanning, the technician captures a high-resolution 3D model of the installation site (typically the roof). This allows us to evaluate sun exposure, shading, and optimal panel placement with precision and inclusivity in mind."
  },
  {
    id: 3,
    image: "/bg-3.png",
    title: "Proposal & Visualization",
    description: "We generate a 3D visualization of the property with the proposed solar panel layout and provide a detailed cost estimate. This step makes solar adoption transparent and user-friendly, especially for communities unfamiliar with the technology."
  },
  {
    id: 4,
    image: "/bg-4.png",
    title: "Client Approval",
    description: "Once the client approves the visual plan and cost, we proceed to the next steps. Flexible financing options can be discussed here to ensure accessibility for low-income users."
  },
  {
    id: 5,
    image: "/bg-5.png",
    title: "Mounting Structure Installation",
    description: "Technicians install the mounting hardware on the roof using data from the 3D scan for maximum efficiency and safety. Our platform ensures eco-friendly and locally sourced materials whenever possible."
  },
  {
    id: 6,
    image: "/bg-6.png",
    title: "Solar Panel & Electrical Integration",
    description: "Solar panels are installed and connected to the inverter and existing electrical system (on-grid or off-grid). If the user opts for it, battery storage or net metering solutions are integrated."
  },
  {
    id: 7,
    image: "/bg-7.png",
    title: "System Testing, Monitoring Setup & Maintenance Plan",
    description: "After thorough testing, the system goes live. The user is given access to a dashboard for real-time energy monitoring. Our membership plans offer affordable long-term maintenance, ensuring sustainability beyond installation."
  }
];

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50 && !hasScrolled) {
      setHasScrolled(true);
      const nextSection = document.getElementById('next-section');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="flex flex-col">
      <section className='bg-[#718E62] flex justify-center'>
        <div
          style={{
            backgroundImage: `url("/SRM_Builds.png")`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            height: "94vh",
            width: "90vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <div className='flex flex-col justify-end h-screen'>
            <div className="grid grid-cols-2 mb-[9vh] gap-8">
              <Link to="/assessment" className="mx-auto bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-200 text-lg">
                Get Started
              </Link>
              <Link to="/calculator" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-600 font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-200 text-lg">
                Calculate Savings
              </Link>
            </div>
          </div>
        </div>
      </section>
      <ProductCatalog />
      <CalculatorSection />
      <InstallationProcess />
      <EducationalResources />
      <CommunityImpact />
      
      {/* Added Carousel Section as the last section */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Main Carousel */}
        <div className="relative h-full w-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute h-full w-full transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center text-white mx-48 bg-black p-4 rounded-lg bg-opacity-25">
                    <h1 className="mb-4 text-5xl font-bold">{slide.title}</h1>
                    <p className="text-2xl text-justify ">{slide.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Left Side Navigation */}
        <div className="absolute left-8 top-1/2 flex -translate-y-1/2 flex-col gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-10 w-10 rounded-full border-2 border-white text-sm font-medium transition-all duration-300 ${
                index === currentSlide
                  ? 'scale-110 bg-white text-gray-900'
                  : 'bg-black/30 text-white hover:bg-white/30 backdrop-blur-sm'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Home;