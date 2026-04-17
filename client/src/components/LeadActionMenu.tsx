import React, { useState, useRef, useEffect } from 'react';
import { 
  MoreVertical, 
  UserPlus, 
  Eye, 
  Trash2, 
  PhoneCall,
  Edit2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LeadActionMenuProps {
  onEdit?: () => void;
  onView?: () => void;
  onAssign?: () => void;
  onDelete?: () => void;
  onCall?: () => void;
}

export const LeadActionMenu: React.FC<LeadActionMenuProps> = ({
  onEdit,
  onView,
  onAssign,
  onDelete,
  onCall
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const menuItems = [
    { icon: PhoneCall, label: 'Immediate Call', onClick: onCall, color: 'hover:text-emerald-400' },
    { icon: Eye, label: 'Lead Intelligence', onClick: onView, color: 'hover:text-blue-400' },
    { icon: Edit2, label: 'Edit Parameters', onClick: onEdit, color: 'hover:text-accent' },
    { icon: UserPlus, label: 'Assign Agent', onClick: onAssign, color: 'hover:text-orange-400' },
    { icon: Trash2, label: 'Purge Record', onClick: onDelete, color: 'hover:text-red-500' },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-2 hover:bg-white/10 rounded-xl transition-all text-slate-600 group-hover:text-accent"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl z-[100] overflow-hidden p-2"
          >
            <div className="flex flex-col gap-1">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    item.onClick?.();
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-400 hover:bg-white/5 transition-all text-left rounded-xl ${item.color}`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
