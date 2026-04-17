import React, { useState, useRef, useEffect } from 'react';
import { 
  MoreHorizontal, 
  CheckCircle2, 
  Calendar, 
  User, 
  Forward,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TaskActionMenuProps {
  onComplete?: () => void;
  onReschedule?: () => void;
  onAssign?: () => void;
  onTransfer?: () => void;
  onDelete?: () => void;
}

export const TaskActionMenu: React.FC<TaskActionMenuProps> = ({
  onComplete,
  onReschedule,
  onAssign,
  onTransfer,
  onDelete
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
    { icon: CheckCircle2, label: 'Complete Node', onClick: onComplete, color: 'hover:text-emerald-400' },
    { icon: Calendar, label: 'Reschedule', onClick: onReschedule, color: 'hover:text-blue-400' },
    { icon: User, label: 'Assign Lead', onClick: onAssign, color: 'hover:text-orange-400' },
    { icon: Forward, label: 'Transfer Task', onClick: onTransfer, color: 'hover:text-accent' },
    { icon: Trash2, label: 'Purge Node', onClick: onDelete, color: 'hover:text-red-500' },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-3 rounded-2xl bg-white/5 text-slate-600 hover:text-accent transition-all group-hover:bg-white/10"
      >
        <MoreHorizontal className="w-5 h-5" />
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
                  className={`flex items-center gap-3 w-full px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white/5 transition-all text-left rounded-xl ${item.color}`}
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
