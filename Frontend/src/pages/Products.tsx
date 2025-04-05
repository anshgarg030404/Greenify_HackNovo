import { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, X } from 'lucide-react';
import { Dialog } from '@headlessui/react';

// Define the Product interface
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  location: string;
}

const ProductCatalogPage = () => {
  const [products, setProducts] = useState<Product[]>([]); // State to store fetched products
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState<string | null>(null); // State to handle errors
  const [isOpen, setIsOpen] = useState(false); // State to control popover visibility
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // State to store the selected product

  // State for form inputs
  const [formData, setFormData] = useState({
    name: '', // Maps to `fullName` in the backend
    email: '',
    phone: '',
    address: '',
    location: '', // Add this field
    systemType: 'Solar Panel System',
    systemSize: '5', // Ensure it's a string
    roofSize: 500,
    energyConsumption: 1000, // Add this field
    additionalNotes: '', // Maps to `notes` in the backend
  });

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('http://localhost:3000/api/v1/products'); // Fetch products using axios
        setProducts(response.data); // Update state with fetched products
      } catch (error) {
        // @ts-expect-error error
        if (axios.isAxiosError(error)) {
        // @ts-expect-error error
          setError(error.message); // Set error message if something goes wrong
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Fetch user information
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<{ user: User }>('http://localhost:3000/api/v1/user');
        const userData = response.data.user; // Access the nested `user` object
        setFormData((prevData) => ({
          ...prevData,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          address: userData.address,
          location: userData.location, // Auto-fill location if available
        }));
      } catch (error) {
        console.error('Failed to fetch user information:', error);
      }
    };

    fetchUser();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Combine user information and form data
    const installationRequest = {
      userId: '0412e867-f4e7-4037-9dcf-cfb6c4736657', // Replace with actual user ID
      fullName: formData.name, // Map `name` to `fullName`
      phone: formData.phone,
      address: formData.address,
      location: formData.location, // Add this field
      systemType: formData.systemType,
      systemSize: formData.systemSize, // Ensure it's a string
      roofSize: formData.roofSize,
      energyConsumption: formData.energyConsumption, // Add this field
      notes: formData.additionalNotes, // Map `additionalNotes` to `notes`
    };

    console.log('Installation Request:', installationRequest); // Log the request body

    try {
      // Send the installation request to the backend
      await axios.post('http://localhost:3000/api/v1/installation', installationRequest);
      alert('Thank you for your request! We will contact you shortly.');
      setIsOpen(false); // Close the popover after submission
    } catch (error) {
      console.error('Error submitting installation request:', error);
      alert('Failed to submit the request. Please try again.');
    }
  };

  // Display loading state
  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <Loader2 color="#10B981" size={50} className="grid place-content-center" />
          <p className="text-lg text-gray-600">Loading products...</p>
        </div>
      </section>
    );
  }

  // Display error state
  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-red-600">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#DCE9CF]">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Product Catalog</h1>
        <p className="text-lg text-gray-600 mb-12 text-center">
          Browse our selection of high-quality green energy products for your home.
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />

              {/* Product Details */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{product.description}</p>
                <p className="text-lg font-bold text-green-600 mb-4">₹{product.price.toLocaleString()} Per SQ/FT</p>

                {/* Add to Cart Button */}
                <button
                  className="w-full bg-[#718F63] text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  onClick={() => {
                    setSelectedProduct(product); // Set the selected product
                    setIsOpen(true); // Open the popover
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popover for Installation Form */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          
          {/* <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" /> */}
          <div className="fixed inset-0 bg-black opacity-30" />
          <div className="relative bg-white rounded-lg max-w-2xl mx-auto p-6 md:p-8">
            <Dialog.Title className="text-2xl font-bold text-gray-800 mb-4">Installation Request</Dialog.Title>
            <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <X size={24} /> {/* Close icon */}
              </button>
            <Dialog.Description className="text-lg text-gray-600 mb-6">
              Please provide this for installation of {selectedProduct?.name}.
            </Dialog.Description>

            {/* Installation Request Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Phone */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              {/* System Size */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">System Size (kW)</label>
                <input
                  type="text"
                  name="systemSize"
                  value={formData.systemSize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>

              {/* Roof Size */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Roof Size (sq ft)</label>
                <input
                  type="number"
                  name="roofSize"
                  value={formData.roofSize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  min="100"
                  max="5000"
                  required
                />
              </div>

              {/* Energy Consumption */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Monthly Energy Consumption (kWh)</label>
                <input
                  type="number"
                  name="energyConsumption"
                  value={formData.energyConsumption}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  min="100"
                  max="10000"
                  required
                />
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Additional Notes</label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </section>
  );
};

export default ProductCatalogPage;