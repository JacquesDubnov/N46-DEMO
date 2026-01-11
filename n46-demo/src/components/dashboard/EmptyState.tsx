import { Link } from 'react-router-dom';
import { Sparkles, Plus } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
      {/* Icon */}
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-n46-blue/10 to-n46-blue/5 flex items-center justify-center mb-6">
        <Sparkles className="w-10 h-10 text-n46-blue" />
      </div>

      {/* Text */}
      <h3 className="text-xl font-medium text-n46-gray-900 mb-2">
        No presentations yet
      </h3>
      <p className="text-n46-gray-500 text-center max-w-sm mb-8">
        Create your first AI-powered presentation in minutes.
        Just tell us who you are and what you need.
      </p>

      {/* CTA */}
      <Link
        to="/create"
        className="btn-primary inline-flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Create Presentation
      </Link>
    </div>
  );
}
