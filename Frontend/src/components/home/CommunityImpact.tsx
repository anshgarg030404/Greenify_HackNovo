import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CommunityImpact: React.FC = () => {
  return (
    <section className="py-16 bg-[#dee8d1]">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Community Impact</h2>
        <p className="section-subtitle text-center">
          See how our green energy solutions are making a difference in communities across the country.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="h-64 bg-gray-200 relative">
              <img 
                src="https://imgs.search.brave.com/A6LD6zg5HXT1phOn4gwm_EeYOMTd381QYkHE2lyLP2w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGVyY2hlbmVyZ3ku/Y29tL2Ntcy1hc3Nl/dHMvc29sYXJfZmFy/bV9hbWVyaWNhbl9w/dWJsaWNfcG93ZXJf/YXNzb2NpYXRpb25f/dW5zcGxhc2hfYmVi/NjM1MjYzYS5qcGc" 
                alt="Community Solar Project" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 bg-[#708f60]">
              <h3 className="text-xl font-bold text-gray-100 mb-3">Community Solar Project</h3>
              <p className="text-gray-100 mb-4">
                Our community solar project in Springfield has helped 250 families access clean energy, reducing carbon emissions by over 1,500 tons annually.
              </p>
              <Link to="/community" className="text-white font-medium hover:text-gray-200 inline-flex items-center">
                Read the Story
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
          
          <div className="bg-[#708f60] rounded-xl shadow-md overflow-hidden">
            <div className="h-64 bg-gray-200 relative">
              <img 
                src="https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="School Solar Installation" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-100 mb-3">School Solar Installation</h3>
              <p className="text-gray-100 mb-4">
                We installed solar panels at Riverside High School, saving the school ₹45,000 annually in energy costs while educating students about renewable energy.
              </p>
              <Link to="/community" className="text-white font-medium hover:text-gray-200 inline-flex items-center">
                Read the Story
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-10">
          <Link to="/community" className="btn-primary inline-flex items-center bg-[#708f65]">
            Explore Community Impact
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CommunityImpact;