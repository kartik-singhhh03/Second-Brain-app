import { ReactElement } from "react";

interface SidebarItemProps {
    text: string;
    icon: ReactElement;
    active?: boolean;
    onClick?: () => void;
}

export function SidebarItem({ text, icon, active, onClick }: SidebarItemProps) {
    return (
        <button 
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                active
                    ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
        >
            <div className="w-5 h-5 flex items-center justify-center">
                {icon}
            </div>
            <span>{text}</span>
        </button>
    );
}