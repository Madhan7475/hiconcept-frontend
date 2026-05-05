import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Admin Dashboard</h1>
          <p className="text-zinc-400">Manage your website content, services, and assets from one place.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/admin/services"
            className="group p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-zinc-800 text-zinc-300 group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600 group-hover:text-white transition-colors"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Manage Services</h2>
            <p className="text-zinc-500 text-sm">Add, edit, or remove professional AV services and their details.</p>
          </Link>

          <Link
            to="/admin/content"
            className="group p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-zinc-800 text-zinc-300 group-hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600 group-hover:text-white transition-colors"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Website Content</h2>
            <p className="text-zinc-500 text-sm">Update banners, hero text, about section, and global assets.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
