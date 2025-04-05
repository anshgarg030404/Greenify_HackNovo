import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Calendar, Zap, ArrowRight, MapPin } from 'lucide-react';

const CalculatorSection = () => {
  // State for user inputs
  const [systemType, setSystemType] = useState('Solar Panel System');
  const [systemSize, setSystemSize] = useState(5);
  const [zipCode, setZipCode] = useState('');

  // State for calculated results
  const [installationCost, setInstallationCost] = useState(`₹15,000 - ₹18,000`);
  const [annualSavings, setAnnualSavings] = useState('₹1,200 - ₹1,500');
  const [paybackPeriod, setPaybackPeriod] = useState('8 - 10 years');
  const [co2Reduction, setCo2Reduction] = useState('4.2 tons/year');

  // Calculation logic
  const calculateSavings = () => {
    // Example calculation logic (replace with real calculations)
    const baseCost = systemSize * 3000; // $3,000 per kW
    const savings = systemSize * 240; // $240 savings per kW annually
    const payback = baseCost / savings; // Payback period in years

    setInstallationCost(`$${baseCost.toLocaleString()}`);
    setAnnualSavings(`$${savings.toLocaleString()}`);
    setPaybackPeriod(`${payback.toFixed(1)} years`);
    setCo2Reduction(`${(systemSize * 0.84).toFixed(1)} tons/year`);
  };

  // Handle input changes
  const handleSystemTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSystemType(e.target.value);
    calculateSavings();
  };

  const handleSystemSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSystemSize(Number(e.target.value));
    calculateSavings();
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(e.target.value);
    calculateSavings();
  };

  return (
    <section className="py-16 bg-[#718f63]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-100 mb-6">Calculate Your Savings</h2>
            <p className="text-lg text-gray-100 mb-6">
              Our advanced calculator helps you estimate the cost of installation, potential energy savings, and return on investment for your green energy solutions.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <div className="bg-gray-100 p-1 rounded-full mr-3 mt-1">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100">Accurate Cost Estimates</h3>
                  <p className="text-gray-100">Get detailed cost breakdowns based on your specific requirements.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-gray-100 p-1 rounded-full mr-3 mt-1">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100">Payback Period</h3>
                  <p className="text-gray-100">See how quickly your investment will pay for itself through energy savings.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-gray-100 p-1 rounded-full mr-3 mt-1">
                  <Zap className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100">Energy Production</h3>
                  <p className="text-gray-100">Estimate how much energy your system will generate annually.</p>
                </div>
              </li>
            </ul>
            <Link
              to="/calculator"
              className="btn-primary inline-flex items-center bg-[#dce8cf] text-black px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Try the Calculator
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="bg-[#dce8cf] rounded-xl shadow-lg p-6 md:p-8">
            <h3 className="text-xl font-bold text-black mb-6">Quick Estimate</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-black font-medium mb-2">System Type</label>
                <select
                  value={systemType}
                  onChange={handleSystemTypeChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option>Solar Panel System</option>
                  <option>Solar + Battery Storage</option>
                  <option>Heat Pump System</option>
                  <option>Complete Home Energy System</option>
                </select>
              </div>

              <div>
                <label className="block text-black font-medium mb-2">System Size</label>
                <div className="flex items-center">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={systemSize}
                    onChange={handleSystemSizeChange}
                    className="w-full h-2 bg-gray-500 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="ml-3 text-black font-medium">{systemSize} kW</span>
                </div>
              </div>

              <div>
                <label className="block text-black font-medium mb-2">Your Location</label>
                <div className="flex">
                  <div className="relative flex-grow">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter zip code"
                      value={zipCode}
                      onChange={handleZipCodeChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-100 mt-6">
                <h4 className="font-semibold text-gray-800 mb-2">Estimated Results</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Installation Cost</p>
                    <p className="text-lg font-bold text-gray-800">{installationCost}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Annual Savings</p>
                    <p className="text-lg font-bold text-green-600">{annualSavings}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payback Period</p>
                    <p className="text-lg font-bold text-gray-800">{paybackPeriod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">CO₂ Reduction</p>
                    <p className="text-lg font-bold text-green-600">{co2Reduction}</p>
                  </div>
                </div>
              </div>

              <div className="text-center mt-2">
                <Link
                  to="/calculator"
                  className="text-[#dde8cf] font-medium hover:text-green-700 inline-flex items-center"
                >
                  Get Detailed Calculation
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;