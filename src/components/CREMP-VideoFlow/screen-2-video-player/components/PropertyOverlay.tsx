import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import type { PropertyVideo } from '../../shared/theme/videoflow.types';
import { slideUp } from '../../shared/animations/videoflow.animations';

interface PropertyOverlayProps {
  video: PropertyVideo;
  agentName: string;
  agentAvatarUrl: string;
  highlights: string[];
  onViewProperty: () => void;
}

export default function PropertyOverlay({
  video,
  agentName,
  agentAvatarUrl,
  highlights,
  onViewProperty,
}: PropertyOverlayProps) {
  
  const getButtonColor = (category: string) => {
    if (category === 'Franchise') return 'bg-emerald-600 hover:bg-emerald-700';
    if (category === 'Commercial' || category === 'Pre-Leased') return 'bg-blue-600 hover:bg-blue-700';
    return 'bg-violet-600 hover:bg-violet-700';
  };

  return (
    <motion.div
      className="flex flex-col gap-3 font-sans w-full max-w-[400px]"
      variants={slideUp}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center gap-2 mb-1">
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 backdrop-blur-md">
           <img src={agentAvatarUrl} alt="Agent Icon" className="w-4 h-4" />
        </div>
        <h2 className="text-[20px] font-bold text-white leading-tight drop-shadow-md">
          {video.title}
        </h2>
      </div>

      <div className="flex flex-col gap-1.5 mb-1 text-[13px] font-medium text-slate-200">
        <p className="drop-shadow-sm">{highlights[0] || 'Prime Location'} • High rental yield • {highlights[1] || 'Grade A Construction'}</p>
        <div className="flex items-center gap-1.5 mt-1">
            <span className="text-slate-300">By</span>
            <span className="font-bold text-white">{agentName}</span>
            <CheckCircle2 size={14} className="text-blue-500" fill="currentColor" />
        </div>
      </div>

      <button
        className={`flex items-center justify-center gap-2 w-full py-3.5 mt-2 rounded-xl text-[15px] font-bold text-white transition-colors shadow-lg ${getButtonColor(video.category)}`}
        onClick={onViewProperty}
      >
        View Property
        <ArrowRight size={18} />
      </button>

    </motion.div>
  );
}