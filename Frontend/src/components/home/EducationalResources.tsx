import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Video, HelpCircle, ArrowRight } from 'lucide-react';

const EducationalResources: React.FC = () => {
  return (
    <section className="py-16 bg-[#708f61]">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center text-white">Educational Resources</h2>
        <p className="section-subtitle text-center text-white">
          Learn more about green energy solutions and how they can benefit your home and the environment.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden " >
            <div className="p-6 bg-[#dde8cf] hover:bg-[#f4fde7] hover:duration-500">
              <div className="flex items-center mb-4">
                <BookOpen className="h-6 w-6 text-black mr-2" />
                <h3 className="text-xl font-bold text-black">Articles</h3>
              </div>
              <p className="text-black mb-4">
                Read our informative articles about renewable energy technologies, benefits, and best practices.
              </p>
              <Link to="/resources" className="text-black font-medium hover:text-green-700 inline-flex items-center">
                Browse Articles
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
          
          <div className="bg-[#dce8cf] rounded-xl shadow-md overflow-hidden hover:bg-[#f4fde7] hover:duration-500">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Video className="h-6 w-6 text-black mr-2" />
                <h3 className="text-xl font-bold text-black">Videos</h3>
              </div>
              <p className="text-black mb-4">
                Watch our educational videos explaining green energy concepts, installation processes, and more.
              </p>
              <Link to="/resources" className="text-black font-medium hover:text-green-700 inline-flex items-center">
                Watch Videos
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
          
          <div className="bg-[#dce8cf] rounded-xl shadow-md overflow-hidden hover:bg-[#f4fde7] hover:duration-500">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <HelpCircle className="h-6 w-6 text-black mr-2" />
                <h3 className="text-xl font-bold text-black">FAQs</h3>
              </div>
              <p className="text-black mb-4">
                Find answers to commonly asked questions about green energy solutions and our services.
              </p>
              <Link to="/resources" className="text-black font-medium hover:text-green-700 inline-flex items-center">
                View FAQs
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationalResources;