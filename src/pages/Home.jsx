import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { api } from "../api/client";
import Reveal from "../components/Reveal";
import { motion } from "framer-motion";

const Home = () => {
  const [content, setContent] = useState(null);
  const [globalContent, setGlobalContent] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [homeRes, globalRes, servicesRes] = await Promise.all([
          api.getContent("home"),
          api.getContent("global"),
          api.getServices(),
        ]);

        setContent(homeRes.data);
        setGlobalContent(globalRes.data);
        setServices(servicesRes.data);
      } catch (error) {
        console.error("Error fetching home content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  const heroTitle = content?.hero_title || "Hi-Concept AV Solutions";
  const heroBanner = content?.hero_banner_url || "/banner.jpeg";
  const aboutLogo = content?.about_logo_url || "/logo2.png";

  const aboutText =
    content?.about_text || "Company description will appear here...";

  const whyTitle =
    content?.why_choose_us_title || "Why Choose Us";

  const whyList =
    content?.why_choose_us_list || [
      "Expertise in AVL Integration",
    ];

  const divider =
    globalContent?.divider_url || "/divider.svg";

  return (
    <div className="bg-black text-white">

      {/* HERO */}
      <section className="relative h-screen">
        <img
          src={heroBanner}
          alt="banner"
          className="absolute w-full h-full object-cover object-center"
        />

        <div className="absolute w-full h-full bg-black/40"></div>

        <Navbar />

        <div className="relative z-10 h-full flex items-center">
          <Reveal className="max-w-[1200px] mx-auto w-full px-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {heroTitle}
            </h1>
          </Reveal>
        </div>
      </section>

      {/* ABOUT */}
      <section className="text-white py-12 md:py-24 relative overflow-hidden">

        <div className="absolute right-0 bottom-0 opacity-20">
          <div className="w-80 h-80 bg-[radial-gradient(circle,_white_1px,_transparent_1px)] bg-[size:12px_12px]" />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

          <Reveal className="flex justify-center md:justify-start">
            <img
              src={aboutLogo}
              alt="Hi-Concept Logo"
              className="w-60 md:w-72 opacity-90"
            />
          </Reveal>

          <Reveal className="space-y-6 text-gray-300 leading-relaxed text-base md:text-lg">
            {aboutText.split("\n\n").map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </Reveal>

        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-black text-white py-28 relative overflow-hidden">

        <Reveal className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-wide">
            Services We Provide
          </h2>
        </Reveal>

        <div className="max-w-[1300px] mx-auto px-6 space-y-32">

          {services.map((service, index) => (
            <div
              key={service._id}
              className={`flex flex-col md:flex-row items-center gap-12 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >

              {/* IMAGE */}
              <Link to="/Services" className="group w-full md:w-1/2">
                <div className="relative overflow-hidden rounded-2xl border border-white/20">

                  <motion.img
                    src={
                      service.image_url ||
                      "https://via.placeholder.com/1200"
                    }
                    alt={service.title}
                    className="w-full h-[300px] md:h-[420px] object-cover"
                    initial={{ scale: 1.15 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      duration: 1.2,
                      ease: "easeOut",
                    }}
                  />

                  {/* GRADIENT */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  {/* HOVER GLOW */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500
                    shadow-[0_0_80px_rgba(255,255,255,0.20)]"
                  ></div>

                </div>
              </Link>

              {/* CONTENT */}
              <div className="w-full md:w-1/2 text-left">

                <h3 className="text-2xl md:text-4xl font-semibold text-white mb-6 leading-tight">
                  {service.title}
                </h3>

                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  {service.description ||
                    "We deliver high-performance AV solutions designed for clarity, scalability, and immersive experience."}
                </p>

              </div>

            </div>
          ))}

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-black text-white py-20 relative overflow-hidden">

        <Reveal className="max-w-[1000px] mx-auto px-6">

          <h2 className="text-center text-3xl md:text-4xl font-semibold mb-10">
            {whyTitle}
          </h2>

          <ul className="space-y-4 text-gray-300 text-base md:text-lg leading-relaxed">

            {whyList.map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                • {item}
              </motion.li>
            ))}

          </ul>

        </Reveal>
      </section>
    </div>
  );
};

export default Home;