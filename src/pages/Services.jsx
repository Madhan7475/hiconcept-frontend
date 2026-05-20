import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { api } from "../api/client";
import Reveal from "../components/Reveal";

const Services = () => {
  const [services, setServices] = useState([]);
  const [content, setContent] = useState(null);
  const [globalContent, setGlobalContent] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ FIX: sanitize image paths from API
  const fixPath = (url) => {
    if (!url) return null;

    // remove /public if backend sends it
    let fixed = url.replace("/public", "");

    // if backend accidentally sends localhost
    if (fixed.includes("localhost")) {
      return fixed.replace("http://localhost:5000", "");
    }

    return fixed;
  };

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const [servicesRes, contentRes, globalRes] = await Promise.all([
          api.getServices(),
          api.getContent("services_page"),
          api.getContent("global"),
        ]);

        setServices(servicesRes.data);
        setContent(contentRes.data);
        setGlobalContent(globalRes.data);
      } catch (error) {
        console.error("Error fetching services data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServicesData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  // ✅ Apply fixPath everywhere
  const heroBanner = fixPath(content?.banner_url) || "/02.jpg";
  const heroTitle = content?.hero_title || "Our Services";
  const heroSubtitle =
    content?.hero_subtitle ||
    "Tailored AV solutions designed to enhance every interaction";
  const divider = fixPath(globalContent?.divider_url) || "/divider.svg";

  return (
    <div className="bg-black text-white">

      {/* HERO */}
      <section className="relative h-[30vh] md:h-[40vh]">
        <img
          src={heroBanner}
          alt="Services Banner"
          className="absolute w-full h-full object-cover object-center"
        />

        <div className="absolute w-full h-full bg-black/60"></div>

        <Navbar />

        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <Reveal>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold">
                {heroTitle}
              </h1>
              <p className="text-gray-300 mt-3 max-w-lg mx-auto text-sm md:text-base">
                {heroSubtitle}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES CONTENT */}
      <section className="bg-black text-white py-20 md:py-24 relative">

        <Reveal className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Our Expertise
          </h2>
        </Reveal>

        {/* DIVIDER TOP */}
        <Reveal className="w-full mb-10 flex justify-center">
          <img
            src={divider}
            alt="divider"
            className="w-1/2 md:w-1/3 opacity-70"
          />
        </Reveal>

        {/* DOT PATTERN */}
        <div className="absolute right-0 top-0 opacity-20">
          <div className="w-80 h-80 bg-[radial-gradient(circle,_white_1px,_transparent_1px)] bg-[size:12px_12px]"></div>
        </div>

        <div className="max-w-[900px] mx-auto px-6 space-y-5">

          {services.map((service) => {
            const serviceId = service.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            return (
            <Reveal key={service._id} id={serviceId} className="text-center scroll-mt-24">

              {/* ✅ FIXED IMAGE */}
              <img
                src={fixPath(service.image_url) || "/01.jpg"}
                alt={service.title}
                className="rounded-2xl w-full h-[320px] md:h-[440px] object-cover border border-gray-700"
              />

              <p className="mt-4 text-lg font-medium">
                {service.title}
              </p>

              <p className="mt-3 text-gray-400 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
                {service.description}
              </p>

              <div className="mt-4 text-left max-w-3xl mx-auto text-gray-400 text-sm md:text-base">
                <p className="mb-2 font-medium text-white">
                  Key offerings:
                </p>

                <ul className="space-y-1 list-disc list-inside">
                  {service.offerings?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* DIVIDER */}
              <div className="w-full mt-10 flex justify-center">
                <img
                  src={divider}
                  alt="divider"
                  className="w-1/2 md:w-1/3 opacity-70"
                />
              </div>

            </Reveal>
            );
          })}

        </div>
      </section>
    </div>
  );
};

export default Services;