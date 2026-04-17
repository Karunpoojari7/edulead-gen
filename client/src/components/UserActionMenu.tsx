import React, { useState, useRef, useEffect } from 'react';
import { 
  MoreVertical, 
  ShieldAlert, 
  Zap, 
  Eye, 
  Power,
  UserX
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UserActionMenuProps {
  onEditAuthority?: () => void;
  onAllocateUnit?: () => void;
  onViewActivity?: () => void;
  onToggleStatus?: () => void;
  onDelete?: () => void;
}

export const UserActionMenu: React.FC<UserActionMenuProps> = ({
  onEditAuthority,
  onAllocateUnit,
  onViewActivity,
  onToggleStatus,
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
    { icon: ShieldAlert, label: 'Edit Authority', onClick: onEditAuthority, color: 'hover:text-accent' },
    { icon: Zap, label: 'Unit Allocation', onClick: onAllocateUnit, color: 'hover:text-emerald-400' },
    { icon: Eye, label: 'View Activity', onClick: onViewActivity, color: 'hover:text-blue-400' },
    { icon: Power, label: 'Temporal Suspension', onClick: onToggleStatus, color: 'hover:text-amber-400' },
    { icon: UserX, label: 'Revoke Access', onClick: onDelete, color: 'hover:text-rose-500' },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-2 text-slate-700 hover:text-accent transition-all hover:bg-white/5 rounded-xl"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 mt-2 w-60 rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl z-[100] overflow-hidden p-2"
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
                  className={`flex items-center gap-3 w-full px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-white/5 transition-all text-left rounded-xl ${item.color}`}
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
