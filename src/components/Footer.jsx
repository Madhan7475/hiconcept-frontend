const Footer = () => {
  return (
    <footer className="bg-[#e6e6e6] text-black py-10">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">

        {/* LEFT */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo_last.svg" alt="logo" className="w-24" />
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">
            No4, Karthik Illam, Mudala ENT <br />
            Clinic road, Devatha Layout, <br />
            Bangalore - 560043
          </p>
        </div>

        {/* RIGHT */}
        <div className="text-center md:text-right space-y-3">

        {/* SOCIAL */}
        <div className="flex justify-center md:justify-end gap-4">
          
          {/* Facebook */}
          <a
            href="https://facebook.com/your-page"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-black text-white hover:bg-white hover:text-black transition"
          >
            f
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/your-page"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-black text-white hover:bg-white hover:text-black transition"
          >
            i
          </a>

          {/* X (Twitter) */}
          <a
            href="https://x.com/your-page"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-black text-white hover:bg-white hover:text-black transition"
          >
            x
          </a>

        </div>

          <p className="text-sm">projects@hiconceptavsolutions.com</p>

          <p className="font-semibold">+91 9663647270</p>
          <p className="font-semibold">+91 8496939951</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
