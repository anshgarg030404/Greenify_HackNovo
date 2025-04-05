import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

const CalculatorPage = () => {
  // State for user inputs
  const [systemType, setSystemType] = useState('Select'); // Default value is "Select"
  const [systemSize, setSystemSize] = useState(5);
  const [zipCode, setZipCode] = useState('');
  const [energyUsage, setEnergyUsage] = useState(1000); // Monthly energy usage in kWh
  const [roofSize, setRoofSize] = useState(500); // Roof size in square feet
  const [incentives, setIncentives] = useState(0); // Government incentives in dollars

  // State for calculated results
  const [installationCost, setInstallationCost] = useState(0);
  const [annualSavings, setAnnualSavings] = useState(0);
  const [paybackPeriod, setPaybackPeriod] = useState(0);
  const [co2Reduction, setCo2Reduction] = useState(0);
  const [energyProduction, setEnergyProduction] = useState(0);

  // State for sun rise effect
  const [showSun, setShowSun] = useState(false);

  // State for water effect
  const [showWater, setShowWater] = useState(false);

  // Effect to handle sun and water effects based on systemType
  useEffect(() => {
    if (systemType === 'Solar Panel System') {
      setShowSun(true); // Show sun
      setShowWater(false); // Hide rain
    } else if (systemType === 'Solar + Battery Storage') {
      setShowWater(true); // Show rain
      setShowSun(false); // Hide sun
    } else {
      setShowSun(false); // Hide sun
      setShowWater(false); // Hide rain
    }
  }, [systemType]);

  // Calculation logic
  const calculateDetails = () => {
    // Constants (replace with real-world data or API calls)
    const costPerKw = 3000; // $3,000 per kW
    const savingsPerKw = 240; // $240 savings per kW annually
    const co2ReductionPerKw = 0.84; // 0.84 tons of CO₂ reduction per kW annually
    const energyProductionPerKw = 1500; // 1,500 kWh per kW annually

    // Calculations
    const totalCost = systemSize * costPerKw - incentives;
    const totalSavings = systemSize * savingsPerKw;
    const totalCo2Reduction = systemSize * co2ReductionPerKw;
    const totalEnergyProduction = systemSize * energyProductionPerKw;
    const payback = totalCost / totalSavings;

    // Update state
    setInstallationCost(totalCost);
    setAnnualSavings(totalSavings);
    setPaybackPeriod(payback);
    setCo2Reduction(totalCo2Reduction);
    setEnergyProduction(totalEnergyProduction);
  };

  // Handle input changes
  const handleSystemTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSystemType(e.target.value);
    calculateDetails();
  };

  const handleSystemSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    setSystemSize(newValue);
    calculateDetails();
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(e.target.value);
    calculateDetails();
  };

  const handleEnergyUsageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnergyUsage(Number(e.target.value));
    calculateDetails();
  };

  const handleRoofSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoofSize(Number(e.target.value));
    calculateDetails();
  };

  const handleIncentivesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncentives(Number(e.target.value));
    calculateDetails();
  };

  // Determine the color based on the slider value
  const getColor = (value: number): string => {
    if (value < 5) return 'red';
    if (value < 15) return 'yellow';
    return 'green';
  };

 

  return (
    <section className="py-16 bg-[#dde8cf] relative overflow-hidden">
      {/* Sun Rise Effect */}
      {showSun && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex justify-center pointer-events-none">
          {/* Gradient Rays */}
          <div
            className="absolute -top-36 -translate-x-1/2 flex justify-center w-[400px] h-[400px] bg-gradient-to-b from-yellow-300/80 via-yellow-200/60 to-transparent animate-rays"
            style={{
              clipPath: 'polygon(50% 50%, -50% 150%, 150% 150%)', // Ensuring full screen rays
              filter: 'blur(10px)', // Smooth glow
            }}
          />
          {/* Sun */}
          <div className="text-6xl animate-sunrise" role="img" aria-label="sun">
            ☀️
          </div>
        </div>
      )}

      {/* Water Effect */}
      {showWater && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, index) => (
            <div
              key={index}
              className="absolute w-1 h-10 bg-blue-300 opacity-50 animate-rain"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 ">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Cost Calculator</h1>
        <p className="text-lg text-gray-600 mb-12 text-center">
          Calculate the cost, savings, and environmental impact of installing green energy solutions.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Calculator Form</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">System Type</label>
                <select
                  value={systemType}
                  onChange={handleSystemTypeChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="Select">Select</option>
                  <option>Solar Panel System</option>
                  <option>Solar + Battery Storage</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">System Size (kW)</label>
                {/* Custom Slider with Background */}
                <div className="relative w-full">
                  <div
                    className="absolute top-0 left-0 h-full bg-gray-200 rounded-lg"
                    style={{
                      width: `${(systemSize / 20) * 100}%`,
                      backgroundColor: getColor(systemSize),
                      transition: 'width 0.3s ease, background-color 0.3s ease',
                    }}
                  >
                    <div
                      className="absolute inset-0 flex items-center justify-center text-white font-bold"
                      style={{
                        opacity: systemSize > 0 ? 1 : 0,
                        transition: 'opacity 0.3s ease',
                      }}
                    >
                      {'*'.repeat(Math.ceil(systemSize / 2))}
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={systemSize}
                    onChange={handleSystemSizeChange}
                    className="relative w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer z-10"
                  />
                </div>
                <span className="block text-center text-gray-700 mt-2">{systemSize} kW</span>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Your Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter your state"
                    value={zipCode}
                    onChange={handleZipCodeChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Monthly Energy Usage (kWh)</label>
                <input
                  type="number"
                  value={energyUsage}
                  onChange={handleEnergyUsageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Roof Size (sq ft)</label>
                <input
                  type="number"
                  value={roofSize}
                  onChange={handleRoofSizeChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Government Incentives ($)</label>
                <input
                  type="number"
                  value={incentives}
                  onChange={handleIncentivesChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Estimated Results</h2>
            <div className="space-y-6">
              <div className="bg-[#dde8cf] p-6 rounded-lg border border-green-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Financial Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Installation Cost</p>
                    <p className="font-bold text-gray-800">&#8377;{installationCost.toLocaleString()}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Annual Savings</p>
                    <p className="font-bold text-green-600">&#8377;{annualSavings.toLocaleString()}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Payback Period</p>
                    <p className="font-bold text-gray-800">{paybackPeriod.toFixed(1)} years</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#dde8cf] p-6 rounded-lg border border-green-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Environmental Impact</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <p className="text-gray-600">CO₂ Reduction</p>
                    <p className="font-bold text-green-600">{co2Reduction.toFixed(1)} tons/year</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Energy Production</p>
                    <p className="font-bold text-gray-800">{energyProduction.toLocaleString()} kWh/year</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for Sun Rise, Rays, and Rain Animations */}
      <style>
        {`
          @keyframes sunrise {
            0% { transform: scale(0); opacity: 0; }
            30% { transform: scale(1.3); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }

          @keyframes rays {
            0% { transform: scale(0.5); opacity: 0; }
            10% { transform: scale(1); opacity: 1; }
            100% { transform: scale(1.5); opacity: 0; }
          }

          @keyframes rain {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100vh); }
          }

          .animate-sunrise {
            animation: sunrise 1s ease-out;
          }

          .animate-rays {
            animation: rays 4s ease-out forwards;
          }

          .animate-rain {
            animation: rain 1s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default CalculatorPage;