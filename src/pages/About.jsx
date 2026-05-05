import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";

const About = () => {
  return (
    <div className="bg-black text-white">

      {/* HERO / BANNER SECTION */}
      <section className="relative h-[30vh] md:h-[40vh]">

        {/* BACKGROUND IMAGE */}
        <img
          src="/01.jpg"
          alt="About Banner"
          className="absolute w-full h-full object-cover object-center"
        />

        {/* DARK OVERLAY */}
        <div className="absolute w-full h-full bg-black/60"></div>

        {/* NAVBAR */}
        <Navbar />

        {/* HERO TEXT */}
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <Reveal>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold">
                About Us
              </h1>
              <p className="text-gray-300 mt-3 max-w-lg mx-auto text-sm md:text-base">
                Crafting intelligent AV experiences with precision and innovation
              </p>
            </div>
          </Reveal>
        </div>

      </section>

      {/* CONTENT SECTION */}
      <section className="py-32 px-6">
        <div className="max-w-[1200px] mx-auto space-y-20">

          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* TEXT */}
            <Reveal className="space-y-8 text-gray-300 text-lg md:text-xl leading-relaxed">
              <p>
                Hi-Concept AV Solutions is an Audio, Video, and Lighting integration company focused on delivering reliable and well-designed solutions. Our approach combines technical expertise with a clear understanding of how spaces are used, ensuring every system is practical, efficient, and easy to operate.
              </p>

              <p>
                We work closely with clients to design solutions that align with their vision, whether it’s enhancing guest experiences, improving learning environments, or creating memorable live events. With experience across hospitality, educational institutions, and event production, we aim to provide systems that perform consistently and add long-term value.
              </p>
            </Reveal>

            {/* IMAGE */}
            <Reveal className="flex justify-center">
              <img
                src="/logo2.png"
                alt="Hi-Concept Logo"
                className="w-72 md:w-96 opacity-90"
              />
            </Reveal>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <Footer />

    </div>
  );
};

export default About;