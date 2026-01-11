import { FileText, Calendar, Edit3 } from 'lucide-react';

interface StatsBarProps {
  total: number;
  thisWeek: number;
  drafts: number;
}

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
}

function StatItem({ icon, value, label }: StatItemProps) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-xl border border-n46-gray-100">
      <div className="text-n46-gray-400">
        {icon}
      </div>
      <div>
        <div className="text-lg font-medium text-n46-gray-900">{value}</div>
        <div className="text-xs text-n46-gray-500">{label}</div>
      </div>
    </div>
  );
}

export function StatsBar({ total, thisWeek, drafts }: StatsBarProps) {
  return (
    <div className="flex gap-4 flex-wrap">
      <StatItem
        icon={<FileText className="w-5 h-5" />}
        value={total}
        label="Total presentations"
      />
      <StatItem
        icon={<Calendar className="w-5 h-5" />}
        value={thisWeek}
        label="Created this week"
      />
      <StatItem
        icon={<Edit3 className="w-5 h-5" />}
        value={drafts}
        label="In progress"
      />
    </div>
  );
}
