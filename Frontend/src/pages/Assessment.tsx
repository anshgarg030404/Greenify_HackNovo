import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Sun, CloudSun, Cloud, Droplets, Thermometer } from 'lucide-react';

// Define the types for our data
interface SolarReading {
  timestamp: number;
  solar: number;
  humidity: number;
  temperature: number;
  sunlightCategory: string;
}

// Key for localStorage
const STORAGE_KEY = 'solarMonitoringData';

// Maximum number of readings to keep
const MAX_READINGS = 20;

const SolarMonitoringDashboard = () => {
  // State for storing historical data
  const [readings, setReadings] = useState<SolarReading[]>(() => {
    // Load from localStorage on initial render
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        // Validate the loaded data
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          return parsedData.slice(-MAX_READINGS); // Only keep the most recent readings
        }
      }
    } catch (error) {
      console.error('Failed to load saved data:', error);
    }
    return [];
  });
  
  // State for current reading
  const [currentReading, setCurrentReading] = useState<SolarReading | null>(null);
  
  // Function to generate readings
  const generateReading = (): SolarReading => {
    // Random values similar to provided examples
    const solarOptions = [
      { value: 0.02 + Math.random() * 0.1, category: "Low" },
      { value: 0.63 + Math.random() * 0.2, category: "Medium" },
      { value: 1.82 + Math.random() * 0.3, category: "Good" }
    ];
    
    const solarChoice = solarOptions[Math.floor(Math.random() * solarOptions.length)];
    
    return {
      timestamp: Date.now(),
      solar: parseFloat(solarChoice.value.toFixed(2)),
      humidity: parseFloat((26.0 + Math.random() * 2 - 1).toFixed(1)),
      temperature: parseFloat((32.2 + Math.random() * 2 - 1).toFixed(1)),
      sunlightCategory: solarChoice.category
    };
  };
  
  // Save to localStorage whenever readings change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(readings));
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  }, [readings]);
  
  // Setup interval for continuous monitoring
  useEffect(() => {
    // If no readings exist, generate initial reading
    if (readings.length === 0) {
      const initialReading = generateReading();
      setCurrentReading(initialReading);
      setReadings([initialReading]);
    } else {
      // Set the current reading to the most recent one
      setCurrentReading(readings[readings.length - 1]);
    }
    
    // Set up continuous monitoring
    const interval = setInterval(() => {
      const newReading = generateReading();
      setCurrentReading(newReading);
      setReadings(prevReadings => {
        // Keep only the last MAX_READINGS readings
        const updatedReadings = [...prevReadings, newReading];
        if (updatedReadings.length > MAX_READINGS) {
          return updatedReadings.slice(updatedReadings.length - MAX_READINGS);
        }
        return updatedReadings;
      });
    }, 3000); // Update every 3 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Helper function to get the right sunlight icon
  const getSunlightIcon = (category: string) => {
    switch(category) {
      case "Good":
        return <Sun size={48} className="text-yellow-500" />;
      case "Medium":
        return <CloudSun size={48} className="text-yellow-400" />;
      case "Low":
        return <Cloud size={48} className="text-gray-400" />;
      default:
        return <Sun size={48} className="text-yellow-300" />;
    }
  };
  
  // Format time for display
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };
  
  // Get color based on sunlight category
  const getSunlightColor = (category: string) => {
    switch(category) {
      case "Good": return "#FFD700";
      case "Medium": return "#FFA500";
      case "Low": return "#808080";
      default: return "#000000";
    }
  };

  // Function to clear all saved data
  const clearData = () => {
    if (window.confirm('Are you sure you want to clear all saved data?')) {
      localStorage.removeItem(STORAGE_KEY);
      setReadings([]);
      const newReading = generateReading();
      setCurrentReading(newReading);
      setReadings([newReading]);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Solar Monitoring Dashboard</h1>
          <button 
            onClick={clearData}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Clear Data
          </button>
        </div>
        
        {/* Current Status Panel */}
        {currentReading && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Current Reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg shadow flex flex-col items-center justify-center">
                <p className="text-lg mb-2">Time</p>
                <p className="font-bold">{formatTime(currentReading.timestamp)}</p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg shadow flex flex-col items-center justify-center">
                <div className="mb-2 flex items-center">
                  {getSunlightIcon(currentReading.sunlightCategory)}
                </div>
                <p className="text-lg mb-1">Sunlight</p>
                <p className="font-bold">{currentReading.solar} ({currentReading.sunlightCategory})</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg shadow flex flex-col items-center justify-center">
                <div className="mb-2">
                  <Droplets size={36} className="text-blue-500" />
                </div>
                <p className="text-lg mb-1">Humidity</p>
                <p className="font-bold">{currentReading.humidity}%</p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg shadow flex flex-col items-center justify-center">
                <div className="mb-2">
                  <Thermometer size={36} className="text-red-500" />
                </div>
                <p className="text-lg mb-1">Temperature</p>
                <p className="font-bold">{currentReading.temperature}°C</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Solar Reading Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Solar Readings</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={readings}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})} 
                    interval="preserveStartEnd"
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [value, 'Solar']}
                    labelFormatter={(label) => formatTime(label as number)}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="solar" 
                    name="Solar Reading" 
                    stroke="#FFA500" 
                    strokeWidth={2}
                    dot={{ stroke: '#FFA500', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Temperature and Humidity Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Temperature & Humidity</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={readings}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})} 
                    interval="preserveStartEnd"
                  />
                  <YAxis yAxisId="temp" orientation="left" />
                  <YAxis yAxisId="humidity" orientation="right" />
                  <Tooltip 
                    labelFormatter={(label) => formatTime(label as number)}
                    formatter={(value, name) => {
                      if (name === 'temperature') return [`${value}°C`, 'Temperature'];
                      return [`${value}%`, 'Humidity'];
                    }}
                  />
                  <Legend />
                  <Line 
                    yAxisId="temp"
                    type="monotone" 
                    dataKey="temperature" 
                    name="Temperature" 
                    stroke="#FF6B6B" 
                    strokeWidth={2}
                    dot={{ stroke: '#FF6B6B', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    yAxisId="humidity"
                    type="monotone" 
                    dataKey="humidity" 
                    name="Humidity" 
                    stroke="#4DABF7" 
                    strokeWidth={2}
                    dot={{ stroke: '#4DABF7', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Recent Readings Table */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Readings</h2>
            <p className="text-sm text-gray-500">Showing {readings.length} of {MAX_READINGS} maximum readings</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sunlight</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Humidity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperature</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {readings.slice().reverse().slice(0, 5).map((reading, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{formatTime(reading.timestamp)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{reading.solar}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className="px-2 py-1 text-xs font-bold rounded-full"
                        style={{
                          backgroundColor: getSunlightColor(reading.sunlightCategory) + '33',
                          color: getSunlightColor(reading.sunlightCategory)
                        }}
                      >
                        {reading.sunlightCategory}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{reading.humidity}%</td>
                    <td className="px-6 py-4 whitespace-nowrap">{reading.temperature}°C</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarMonitoringDashboard;