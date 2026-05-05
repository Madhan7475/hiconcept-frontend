import React, { useState, useEffect } from "react";
import { api } from "../api/client";

const ContentAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    heroTitle: "",
    heroBanner: null,
    aboutLogo: null,
    aboutText: "",
    whyChooseUsTitle: "",
    whyChooseUsList: "",
    dividerImage: null,
  });
  const [currentUrls, setCurrentUrls] = useState({});

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const [homeRes, globalRes] = await Promise.all([
        api.getContent('home'),
        api.getContent('global')
      ]);

      const homeData = homeRes.data;
      const globalData = globalRes.data;

      setFormData({
        heroTitle: homeData?.hero_title || "",
        aboutText: homeData?.about_text || "",
        whyChooseUsTitle: homeData?.why_choose_us_title || "",
        whyChooseUsList: (homeData?.why_choose_us_list || []).join("\n"),
        heroBanner: null,
        aboutLogo: null,
        dividerImage: null,
      });

      setCurrentUrls({
        heroBanner: homeData?.hero_banner_url,
        aboutLogo: homeData?.about_logo_url,
        dividerImage: globalData?.divider_url,
      });
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const homeUpdates = {};
      const globalUpdates = {};

      if (formData.heroBanner) {
        const res = await api.uploadImage(formData.heroBanner);
        homeUpdates.hero_banner_url = res.url;
      }
      if (formData.aboutLogo) {
        const res = await api.uploadImage(formData.aboutLogo);
        homeUpdates.about_logo_url = res.url;
      }
      if (formData.dividerImage) {
        const res = await api.uploadImage(formData.dividerImage);
        globalUpdates.divider_url = res.url;
      }

      homeUpdates.hero_title = formData.heroTitle;
      homeUpdates.about_text = formData.aboutText;
      homeUpdates.why_choose_us_title = formData.whyChooseUsTitle;
      homeUpdates.why_choose_us_list = formData.whyChooseUsList.split("\n").filter(i => i.trim() !== "");

      await api.updateContent('home', homeUpdates);
      await api.updateContent('global', globalUpdates);

      alert("Content updated successfully!");
      fetchContent();
    } catch (error) {
      console.error("Error updating content:", error);
      alert("Failed to update content.");
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
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold">Content Management</h1>
            <p className="text-zinc-400">Update home page text and global assets</p>
          </div>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors text-sm"
          >
            Back
          </button>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <h2 className="text-xl font-semibold mb-6">Hero Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Hero Title</label>
                <input
                  name="heroTitle"
                  value={formData.heroTitle}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-zinc-600"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Hero Banner Image</label>
                <div className="flex items-center gap-4">
                  <input type="file" name="heroBanner" onChange={handleImageChange} className="text-sm text-zinc-400" />
                  {currentUrls.heroBanner && <img src={currentUrls.heroBanner} className="w-12 h-12 object-cover rounded" alt="Current" />}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <h2 className="text-xl font-semibold mb-6">About Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">About Logo</label>
                <div className="flex items-center gap-4">
                  <input type="file" name="aboutLogo" onChange={handleImageChange} className="text-sm text-zinc-400" />
                  {currentUrls.aboutLogo && <img src={currentUrls.aboutLogo} className="w-12 h-12 object-cover rounded" alt="Current" />}
                </div>
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">About Text</label>
                <textarea
                  name="aboutText"
                  value={formData.aboutText}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white h-32"
                />
              </div>
            </div>
          </section>

          <section className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <h2 className="text-xl font-semibold mb-6">Why Choose Us</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Section Title</label>
                <input
                  name="whyChooseUsTitle"
                  value={formData.whyChooseUsTitle}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">List Items (One per line)</label>
                <textarea
                  name="whyChooseUsList"
                  value={formData.whyChooseUsList}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white h-48"
                />
              </div>
            </div>
          </section>

          <section className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <h2 className="text-xl font-semibold mb-6">Global Assets</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Site Divider Image</label>
                <div className="flex items-center gap-4">
                  <input type="file" name="dividerImage" onChange={handleImageChange} className="text-sm text-zinc-400" />
                  {currentUrls.dividerImage && <img src={currentUrls.dividerImage} className="w-12 h-12 object-cover rounded" alt="Current" />}
                </div>
              </div>
            </div>
          </section>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-white text-black font-bold text-lg hover:bg-zinc-200 transition-colors"
          >
            Save All Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContentAdmin;
