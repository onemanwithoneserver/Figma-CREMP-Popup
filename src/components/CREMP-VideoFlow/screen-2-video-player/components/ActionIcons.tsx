import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Bookmark, Send, MessageCircle } from 'lucide-react';
import { slideUp } from '../../shared/animations/videoflow.animations';
import type { PropertyVideo } from '../../shared/theme/videoflow.types';

interface ActionIconsProps {
  video: PropertyVideo;
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

export default function ActionIcons({ video }: ActionIconsProps) {
  const [liked, setLiked] = useState(video.isLiked ?? false);
  const [bookmarked, setBookmarked] = useState(video.isBookmarked ?? false);
  const [likeCount, setLikeCount] = useState(video.likes);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const actions = [
    {
      key: 'like',
      icon: <Heart size={28} fill={liked ? '#EF4444' : 'none'} className={liked ? 'text-red-500' : 'text-white'} />,
      text: formatCount(likeCount),
      onClick: handleLike,
    },
    {
      key: 'comment',
      icon: <MessageCircle size={28} className="text-white" />,
      text: formatCount(video.comments),
      onClick: () => {},
    },
    {
      key: 'share',
      icon: <Send size={28} className="text-white -ml-1" />,
      text: formatCount(video.shares),
      onClick: () => {},
    },
    {
      key: 'bookmark',
      icon: <Bookmark size={28} fill={bookmarked ? 'white' : 'none'} className="text-white" />,
      text: 'Save',
      onClick: () => setBookmarked((p) => !p),
    },
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      {actions.map((action, i) => (
        <motion.div
          key={action.key}
          className="flex flex-col items-center gap-1.5 cursor-pointer group drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          variants={slideUp}
          custom={i}
          initial="hidden"
          animate="visible"
          onClick={action.onClick}
        >
          <motion.div
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.1 }}
            className="flex items-center justify-center transition-transform"
          >
            {action.icon}
          </motion.div>
          <span className="text-[12px] font-semibold text-white font-sans tracking-wide">
            {action.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
}