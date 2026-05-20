import { useState } from "react";
import Reveal from "./Reveal";

const ContactForm = () => {
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
      const response = await fetch("https://formspree.io/f/mykvezye", {
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
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    }
  };

  return (
    <section className="py-20 px-6 bg-black border-t border-zinc-800">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get in Touch</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Have a question or a project in mind? Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="max-w-[700px] mx-auto bg-zinc-900 p-8 md:p-12 rounded-3xl border border-zinc-800">
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
                  rows="4"
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
        </Reveal>
      </div>
    </section>
  );
};

export default ContactForm;
