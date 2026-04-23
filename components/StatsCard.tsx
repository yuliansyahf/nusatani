import { 
  MdOutlineMail, 
  MdHandshake, 
  MdOutlineLocalShipping, 
  MdOutlineInventory 
} from 'react-icons/md';

interface StatsCardProps {
  icon: string;
  value: number | string;
  label: string;
  color?: 'green' | 'orange' | 'blue';
}

const iconMap = {
  '📨': <MdOutlineMail className="text-xl md:text-2xl" />,
  '🤝': <MdHandshake className="text-xl md:text-2xl" />,
  '🚜': <MdOutlineLocalShipping className="text-xl md:text-2xl" />,
  '📦': <MdOutlineInventory className="text-xl md:text-2xl" />,
};

const colors = {
  green: 'bg-green-50 text-green-600',
  orange: 'bg-orange-50 text-orange-600',
  blue: 'bg-blue-50 text-blue-600',
};

export default function StatsCard({ icon, value, label, color = 'green' }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-5 shadow-sm border border-green-100 hover:shadow-md transition cursor-pointer">
      <div className="flex items-center gap-2 md:gap-4">
        <div className={`w-8 h-8 md:w-12 md:h-12 rounded-xl md:rounded-2xl ${colors[color]} flex items-center justify-center`}>
          {iconMap[icon as keyof typeof iconMap] || <MdOutlineMail className="text-xl md:text-2xl" />}
        </div>
        <div>
          <p className="text-lg md:text-2xl font-bold text-gray-800">{value}</p>
          <p className="text-[10px] md:text-sm text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  );
}