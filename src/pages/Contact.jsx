import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "info", message: "Sending message..." });

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ type: "success", message: "Message sent successfully! We'll get back to you soon." });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Something went wrong. Please try again." });
    }
  };

  return (
    <div className="bg-black text-white">

      {/* HERO / BANNER */}
      <section className="relative h-[30vh] md:h-[40vh]">

        {/* BACKGROUND */}
        <img
          src="/03.jpg"
          alt="Contact Banner"
          className="absolute w-full h-full object-cover object-center"
        />

        {/* OVERLAY */}
        <div className="absolute w-full h-full bg-black/60"></div>

        {/* NAVBAR */}
        <Navbar />

        {/* TEXT */}
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <Reveal>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold">
                Get in Touch
              </h1>
              <p className="text-gray-300 mt-3 max-w-lg mx-auto text-sm md:text-base">
                We'd love to hear from you. Contact us for your next AV project.
              </p>
            </div>
          </Reveal>
        </div>

      </section>

      {/* CONTACT SECTION */}
      <section className="py-32 px-6">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              {/* LEFT SIDE: CONTACT INFORMATION */}
              <div className="space-y-12">
                <div>
                  <h2 className="text-4xl font-bold mb-6">Contact Information</h2>
                  <p className="text-zinc-400 text-lg">
                    Have a project in mind or just want to say hello? We're here to help you bring your vision to life.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-zinc-500 text-sm uppercase tracking-widest mb-2">
                        Email Us
                      </h3>
                      <p className="text-xl font-medium hover:text-white transition-colors">
                        <a
                          href="mailto:projects@hiconceptavsolutions.com"
                          className="underline decoration-zinc-700 underline-offset-4 break-all"
                        >
                          projects@hiconceptavsolutions.com
                        </a>
                      </p>
                    </div>

                    <div>
                      <h3 className="text-zinc-500 text-sm uppercase tracking-widest mb-2">
                        Call Us
                      </h3>
                      <p className="text-xl font-medium">
                        +91 9663647270 <br />
                        +91 8496939951
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-zinc-500 text-sm uppercase tracking-widest mb-2">
                        Our Office
                      </h3>
                      <p className="text-zinc-300 leading-relaxed">
                        No4, Karthik Illam, Mudala ENT <br />
                        Clinic road, Devatha Layout, <br />
                        Bangalore - 560043
                      </p>
                    </div>

                    <div>
                      <h3 className="text-zinc-500 text-sm uppercase tracking-widest mb-2">
                        Working Hours
                      </h3>
                      <p className="text-zinc-300">
                        Mon - Fri: 9:00 AM - 6:00 PM <br />
                        Sat: 10:00 AM - 2:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: CONTACT FORM */}
              <div className="bg-zinc-900 p-8 md:p-12 rounded-3xl border border-zinc-800">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm text-zinc-400 ml-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-zinc-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-zinc-400 ml-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-zinc-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-zinc-400 ml-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 00000 00000"
                      className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-zinc-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-zinc-400 ml-1">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about your project..."
                      rows="5"
                      className="w-full bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-zinc-600 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status.type === "info"}
                    className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors disabled:bg-zinc-600 disabled:cursor-not-allowed"
                  >
                    {status.type === "info" ? "Sending..." : "Send Message"}
                  </button>

                  {status.message && (
                    <div className={`text-center p-3 rounded-lg text-sm ${
                      status.type === "success" ? "text-green-400 bg-green-400/10" :
                      status.type === "error" ? "text-red-400 bg-red-400/10" :
                      "text-zinc-400 bg-zinc-800"
                    }`}>
                      {status.message}
                    </div>
                  )}
                </form>
              </div>

            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

    </div>
  );
};

export default Contact;