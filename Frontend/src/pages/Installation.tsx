import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface InstallationData {
  fullName: string;
  phone: string;
  address: string;
  location: string;
  systemType: string;
  systemSize: string;
  roofSize: number;
  energyConsumption: number;
  notes?: string;
}

const InstallationRequestPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<InstallationData>({
    fullName: '',
    phone: '',
    address: '',
    location: '',
    systemType: 'Solar Panel System',
    systemSize: '5',
    roofSize: 500,
    energyConsumption: 1000,
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pre-fill user data if available
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get('http://localhost:3000/api/v1/user', {
          headers: { Authorization: `${token}` }
        });

        // @ts-expect-error data 
        const user = response.data.user;
        setFormData(prev => ({
          ...prev,
          fullName: user.name || '',
          phone: user.phone || '',
          address: user.address || '',
          location: user.location || ''
        }));
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'roofSize' || name === 'energyConsumption' 
        ? Number(value) 
        : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required. Please login.");
      }

      await axios.post('http://localhost:3000/api/v1/installation', formData, {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json'
        }
      });

      alert('Installation request submitted successfully!');
      navigate('/dashboard');
    } catch (err : any) {
      console.error('Submission error:', err);
      setError(err.response?.data?.message || 'Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Request Green Energy Installation</h1>
          <p className="text-green-600">Fill out the form below to request your sustainable energy solution</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-green-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full   rounded-md  shadow-md p-1 focus:border-green-500 "
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-green-700">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md p-1 shadow-md focus:border-green-500 "
                />
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-green-700">
                  Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md p-1 shadow-md focus:border-green-500"
                />
              </div>

              {/* Location */}
              <div className="sm:col-span-2">
                <label htmlFor="location" className="block text-sm font-medium text-green-700">
                  Location (City/Region) *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md p-1 shadow-md focus:border-green-500"
                />
              </div>

              {/* System Type */}
              <div>
                <label htmlFor="systemType" className="block text-sm font-medium text-green-700">
                  System Type *
                </label>
                <select
                  id="systemType"
                  name="systemType"
                  value={formData.systemType}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md p-1 shadow-md focus:border-green-500"
                >
                  <option>Solar Panel System</option>
                  <option>Solar + Battery Storage</option>
                  <option>Wind Turbine</option>
                  <option>Hybrid System</option>
                </select>
              </div>

              {/* System Size */}
              <div>
                <label htmlFor="systemSize" className="block text-sm font-medium text-green-700">
                  System Size (kW) *
                </label>
                <input
                  type="text"
                  id="systemSize"
                  name="systemSize"
                  value={formData.systemSize}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md p-1 shadow-md focus:border-green-500"
                />
              </div>

              {/* Roof Size */}
              <div>
                <label htmlFor="roofSize" className="block text-sm font-medium text-green-700">
                  Roof Size (sq ft) *
                </label>
                <input
                  type="number"
                  id="roofSize"
                  name="roofSize"
                  value={formData.roofSize}
                  onChange={handleChange}
                  min="100"
                  required
                  className="mt-1 block w-full rounded-md p-1 shadow-md focus:border-green-500"
                />
              </div>

              {/* Energy Consumption */}
              <div>
                <label htmlFor="energyConsumption" className="block text-sm font-medium text-green-700">
                  Monthly Energy Consumption (kWh) *
                </label>
                <input
                  type="number"
                  id="energyConsumption"
                  name="energyConsumption"
                  value={formData.energyConsumption}
                  onChange={handleChange}
                  min="100"
                  required
                  className="mt-1 block w-full rounded-md p-1 shadow-md focus:border-green-500"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-green-700">
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md p-1 shadow-md focus:border-green-500"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InstallationRequestPage;