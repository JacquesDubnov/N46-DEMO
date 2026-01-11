import { Link } from 'react-router-dom';
import logoImage from '../../assets/N46 - LOGO.png';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showImage?: boolean;
  linkTo?: string | false;
}

export function Logo({ size = 'md', className = '', showImage = true, linkTo = '/' }: LogoProps) {
  // Logo sizes: xs for compact headers, sm/md/lg increased by 200% (2x), xl for dashboard (400% of original)
  const sizeClasses = {
    xs: { text: 'text-2xl', img: 'h-12' },      // 48px - compact size for headers
    sm: { text: 'text-4xl', img: 'h-36' },      // 144px (was 72px)
    md: { text: 'text-5xl', img: 'h-48' },      // 192px (was 96px)
    lg: { text: 'text-6xl', img: 'h-60' },      // 240px (was 120px)
    xl: { text: 'text-7xl', img: 'h-80' },      // 320px - 200% of lg, for dashboard
  };

  const logoContent = showImage ? (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoImage}
        alt="N46.ai"
        className={`${sizeClasses[size].img} w-auto object-contain`}
      />
    </div>
  ) : (
    <div className={`flex items-center gap-1 ${className}`}>
      <span className={`font-semibold text-n46-black tracking-tight ${sizeClasses[size].text}`}>
        N46
      </span>
      <span className={`font-medium text-n46-blue ${sizeClasses[size].text}`}>
        .ai
      </span>
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-n46-blue rounded-lg">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
