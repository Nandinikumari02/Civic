import { type IssueCategory, CATEGORY_LABELS } from '@/types';
import { cn } from '@/lib/utils';
import { Droplets, Zap, Car, Trash2, Lightbulb, Waves } from 'lucide-react';

interface CategoryBadgeProps {
  category: IssueCategory;
  showLabel?: boolean;
  className?: string;
}

const categoryIcons: Record<IssueCategory, React.ElementType> = {
  water: Droplets,
  electricity: Zap,
  roads: Car,
  sanitation: Trash2,
  streetlights: Lightbulb,
  drainage: Waves,
};

const categoryColors: Record<IssueCategory, string> = {
  water: 'bg-blue-100 text-blue-700',
  electricity: 'bg-yellow-100 text-yellow-700',
  roads: 'bg-slate-100 text-slate-700',
  sanitation: 'bg-green-100 text-green-700',
  streetlights: 'bg-amber-100 text-amber-700',
  drainage: 'bg-cyan-100 text-cyan-700',
};

export function CategoryBadge({ category, showLabel = true, className }: CategoryBadgeProps) {
  const Icon = categoryIcons[category];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium',
        categoryColors[category],
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {showLabel && CATEGORY_LABELS[category]}
    </span>
  );
}
