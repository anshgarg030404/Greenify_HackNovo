import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const EnergyAssessment: React.FC = () => {
  return (
    <section className="py-16 bg-[#dde8cf]">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Energy Assessment Tool</h2>
        <p className="section-subtitle text-center">
          Find out which green energy solutions are best for your home with our quick assessment tool.
        </p>
        
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Property Type</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option>Select property type</option>
                  <option>Single-family home</option>
                  <option>Apartment/Condo</option>
                  <option>Townhouse</option>
                  <option>Commercial building</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Average Monthly Energy Bill (₹)</label>
                <input 
                  type="number" 
                  placeholder="e.g., 150"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Roof Type</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option>Select roof type</option>
                  <option>Asphalt shingles</option>
                  <option>Metal</option>
                  <option>Tile</option>
                  <option>Flat</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Location (Zip Code)</label>
                <input 
                  type="text" 
                  placeholder="e.g., 90210"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Home Size (sq ft)</label>
                <input 
                  type="number" 
                  placeholder="e.g., 2000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Interested In (Select all that apply)</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="solar" className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded" />
                    <label htmlFor="solar" className="ml-2 text-gray-700">Solar Panels</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="battery" className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded" />
                    <label htmlFor="battery" className="ml-2 text-gray-700">Battery Storage</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="heatpump" className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded" />
                    <label htmlFor="heatpump" className="ml-2 text-gray-700">Heat Pumps</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="ev" className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded" />
                    <label htmlFor="ev" className="ml-2 text-gray-700">EV Charging</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/assessment" className="btn-primary inline-flex items-center bg-[#718f63]">
              Get Recommendations
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnergyAssessment;