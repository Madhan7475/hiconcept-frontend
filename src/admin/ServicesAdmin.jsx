import React, { useState, useEffect } from "react";
import { api } from "../api/client";

const ServicesAdmin = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    offerings: ""
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await api.getServices();
      setServices(res.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = currentService?.image_url || "";

      if (formData.image) {
        const uploadRes = await api.uploadImage(formData.image);
        imageUrl = uploadRes.url;
      }

      const serviceData = {
        title: formData.title,
        description: formData.description,
        image_url: imageUrl,
        offerings: formData.offerings.split("\n").filter(item => item.trim() !== ""),
        order: services.length + 1,
      };

      if (isEditing && currentService) {
        await api.updateService(currentService._id, serviceData);
      } else {
        await api.createService(serviceData);
      }

      setFormData({ title: "", description: "", image: null, offerings: "" });
      setIsEditing(false);
      setCurrentService(null);
      await fetchServices();
      alert("Service saved successfully!");
    } catch (error) {
      console.error("Error saving service:", error);
      alert("Failed to save service.");
    }
  };

  const handleEdit = (service) => {
    setIsEditing(true);
    setCurrentService(service);
    setFormData({
      title: service.title,
      description: service.description,
      image: null,
      offerings: service.offerings.join("\n")
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await api.deleteService(id);
        await fetchServices();
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold">Manage Services</h1>
            <p className="text-zinc-400">Update your AV service offerings</p>
          </div>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors text-sm"
          >
            Back to Dashboard
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <form onSubmit={handleSubmit} className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 sticky top-8">
              <h2 className="text-xl font-semibold mb-6">
                {isEditing ? "Edit Service" : "Add New Service"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Service Title</label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-zinc-600"
                    placeholder="e.g. Sound System Design"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-zinc-600 h-32"
                    placeholder="Enter detailed description..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Key Offerings (One per line)</label>
                  <textarea
                    name="offerings"
                    value={formData.offerings}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-zinc-600 h-32"
                    placeholder="Feature 1&#10;Feature 2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-zinc-400 mb-1">Service Image</label>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-700 file:text-white hover:file:bg-zinc-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-white text-black font-bold hover:bg-zinc-200 transition-colors mt-4"
                >
                  {isEditing ? "Update Service" : "Create Service"}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map(service => (
                <div key={service._id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 group hover:border-zinc-600 transition-all">
                  <div className="flex gap-4">
                    <img
                      src={service.image_url || 'https://via.placeholder.com/150'}
                      alt={service.title}
                      className="w-20 h-20 rounded-lg object-cover bg-zinc-800"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{service.title}</h3>
                      <p className="text-zinc-500 text-xs line-clamp-2">{service.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={() => handleEdit(service)}
                      className="text-xs text-zinc-400 hover:text-white transition-colors px-3 py-1 rounded bg-zinc-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="text-xs text-red-400 hover:text-red-300 transition-colors px-3 py-1 rounded bg-zinc-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesAdmin;
