import './styles.scss';

export function TagBadge({ tag }: { tag: string }) {
  return (
    <span className='rounded-full inline-block py-1 px-4 text-xs border italic text-stone-700 bg-white/80 border-stone-600 text-center'>
      {tag}
    </span>
  );
}
