import { Link } from 'react-router-dom';
import { Leaf, Home, AlertCircle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-green-600 p-6 flex items-center space-x-4">
          <Leaf className="h-10 w-10 text-white" />
          <div>
            <h1 className="text-2xl font-bold text-white">Page Not Found</h1>
            <p className="text-green-100">Error 404 - The page you're looking for doesn't exist</p>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <AlertCircle className="h-10 w-10 text-green-600" />
          </div>
          
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Oops! Lost in the greenery?</h2>
          <p className="text-gray-600 mb-6">
            The page you're trying to reach seems to have vanished into the forest. 
            Don't worry, we'll help you find your way back home.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
            >
              <Home className="mr-2 h-5 w-5" />
              Return Home
            </Link>
          </div>
        </div>
        
        {/* Footer */}
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-green-200 opacity-20 -z-10"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-green-300 opacity-20 -z-10"></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-green-400 opacity-15 -z-10"></div>
    </div>
    </div>
  );
};

export default NotFoundPage;