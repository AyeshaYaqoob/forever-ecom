import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { updateProfile } from '../store/slices/authSlice';
import { User, Mail, Phone, MapPin, Edit2, Check, X, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || ''
  });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    isDefault: false
  });

  const handleSave = () => {
    dispatch(updateProfile(formData));
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const handleAddAddress = () => {
    // In a real app, this would call an API to add the address
    toast.success('Address added (demo)');
    setShowAddressForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
              <div className="w-24 h-24 bg-[#8b6d4b] text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user?.name}</h2>
              <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-[#8b6d4b]/10 text-[#8b6d4b] text-sm rounded-full capitalize">
                {user?.role}
              </span>
            </div>
          </div>

          {/* Profile Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Personal Information
                </h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1 text-[#8b6d4b] hover:underline"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-1 text-green-600 hover:underline"
                    >
                      <Check size={16} />
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({ name: user?.name || '', phone: user?.phone || '' });
                      }}
                      className="flex items-center gap-1 text-red-500 hover:underline"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <User className="text-gray-400" size={20} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{user?.name}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Mail className="text-gray-400" size={20} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-gray-900 dark:text-white">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="text-gray-400" size={20} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
                        placeholder="Add phone number"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{user?.phone || 'Not added'}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Addresses */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Saved Addresses
                </h3>
                <button
                  onClick={() => setShowAddressForm(!showAddressForm)}
                  className="flex items-center gap-1 text-[#8b6d4b] hover:underline"
                >
                  <Plus size={16} />
                  Add Address
                </button>
              </div>

              {showAddressForm && (
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Street"
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                      className="col-span-2 px-3 py-2 border dark:border-gray-700 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      className="px-3 py-2 border dark:border-gray-700 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                      className="px-3 py-2 border dark:border-gray-700 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      value={newAddress.zipCode}
                      onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                      className="px-3 py-2 border dark:border-gray-700 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      value={newAddress.country}
                      onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                      className="px-3 py-2 border dark:border-gray-700 rounded-lg"
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <button
                      onClick={handleAddAddress}
                      className="px-4 py-2 bg-[#8b6d4b] text-white rounded-lg hover:bg-[#7a5f41]"
                    >
                      Save Address
                    </button>
                    <button
                      onClick={() => setShowAddressForm(false)}
                      className="px-4 py-2 border dark:border-gray-700 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {user?.addresses && user.addresses.length > 0 ? (
                <div className="space-y-4">
                  {user.addresses.map((address, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 border dark:border-gray-700 rounded-lg"
                    >
                      <MapPin className="text-[#8b6d4b] flex-shrink-0" size={20} />
                      <div className="flex-1">
                        <p className="text-gray-900 dark:text-white">
                          {address.street}, {address.city}, {address.state} {address.zipCode}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">{address.country}</p>
                        {address.isDefault && (
                          <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                            Default
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No saved addresses
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
