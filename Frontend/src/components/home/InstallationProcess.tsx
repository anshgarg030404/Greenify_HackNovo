import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Users, Zap, ArrowRight } from 'lucide-react';

const InstallationProcess: React.FC = () => {
  return (
    <section className="py-16 bg-[#dde8cf]">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center text-black">Simple Installation Process</h2>
        <p className="section-subtitle text-center text-black">
          We make going green easy with our streamlined installation process.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="text-center">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-black mb-3">1. Assessment</h3>
            <p className="text-black">
              Complete our energy assessment to get personalized recommendations for your home.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-black mb-3">2. Consultation</h3>
            <p className="text-black">
              Our experts will discuss your options and provide a detailed quote for installation.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-black mb-3">3. Installation</h3>
            <p className="text-black">
              Our certified technicians will install your system quickly and professionally.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-10">
          <Link to="/installation" className="btn-primary inline-flex items-center bg-[#708f62] text-white">
            Request Installation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InstallationProcess;