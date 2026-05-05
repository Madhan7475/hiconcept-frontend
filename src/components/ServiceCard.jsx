import React from 'react';

const ServiceCard = ({ title, desc }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl hover:border-white transition-all duration-300 group cursor-pointer">
      <div className="space-y-4">
        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
          <div className="w-6 h-6 bg-black rounded-full"></div>
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-gray-400 leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
