import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";

const Contact = () => {
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

      {/* CONTACT INFORMATION */}
      <section className="py-32 px-6">
        <div className="max-w-[1200px] mx-auto flex justify-center">
          <Reveal>
            <div className="w-full max-w-[800px] bg-zinc-900 p-12 rounded-3xl border border-zinc-800">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* EMAIL & PHONE */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-zinc-500 text-sm uppercase tracking-widest mb-2">
                      Email Us
                    </h3>
                    <p className="text-xl font-medium hover:text-white transition-colors">
                      <a
                        href="mailto:projects@hiconceptavsolutions.com"
                        className="underline decoration-zinc-700 underline-offset-4"
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

                {/* ADDRESS & OFFICE */}
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
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

    </div>
  );
};

export default Contact;