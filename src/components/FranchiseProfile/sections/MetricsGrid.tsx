import React from 'react';

interface MetricsGridProps {
  isDesktop: boolean;
}

const MetricsGrid: React.FC<MetricsGridProps> = ({ isDesktop }) => {
  const metrics = [
    { value: '₹25L - ₹40L', label: 'Investment Range' },
    { value: '₹5L', label: 'Franchise Fee' },
    { value: '45+', label: 'Total Outlets', gold: true },
    { value: '12', label: 'Cities Present' },
  ];

  return (
    <div className="w-full flex justify-center">
      <div className={`w-full max-w-[80rem] grid ${isDesktop ? 'grid-cols-4 py-4' : 'grid-cols-2 py-2'}`}>
        {metrics.map((metric, i) => (
          <div
            key={i}
            className={`flex flex-col items-center justify-center text-center ${
              isDesktop ? 'py-2' : 'py-4'
            } ${
              isDesktop && i < 3 ? 'border-r border-white/20' : ''
            } ${
              !isDesktop && i % 2 === 0 ? 'border-r border-white/20' : ''
            } ${
              !isDesktop && i < 2 ? 'border-b border-white/20' : ''
            }`}
          >
            <span
              className={`font-bold leading-none tracking-tight drop-shadow-md ${metric.gold ? 'text-[#c9a34e]' : 'text-white'} ${
                isDesktop ? 'text-[1.6rem]' : 'text-[1.3rem]'
              }`}
            >
              {metric.value}
            </span>
            <span
              className={`text-white/90 drop-shadow-sm mt-2.5 leading-none font-medium ${
                isDesktop ? 'text-[0.95rem]' : 'text-[0.8rem]'
              }`}
            >
              {metric.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricsGrid;