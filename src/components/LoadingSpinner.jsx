export default function LoadingSpinner({ size = 'md', label }) {
  const sizes = {
    sm: 'h-5 w-5 border-2',
    md: 'h-8 w-8 border-[3px]',
    lg: 'h-12 w-12 border-[3px]',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`spinner rounded-full border-brand-200 border-t-brand-600 ${sizes[size]}`}
        role="status"
        aria-label={label || 'Loading'}
      />
      {label && <p className="text-sm text-stone-500 animate-pulse-soft">{label}</p>}
    </div>
  );
}
