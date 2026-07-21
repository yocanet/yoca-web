/** Yoca — route transition loading state (brand squares pulse). */

export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-black" role="status" aria-label="Loading">
      <div className="flex items-end gap-2" aria-hidden="true">
        <span className="h-4 w-4 animate-pulse bg-yoca-lime" style={{ animationDelay: '0ms' }} />
        <span className="h-4 w-4 animate-pulse bg-yoca-green" style={{ animationDelay: '150ms' }} />
        <span
          className="h-4 w-4 animate-pulse bg-surface-elevated"
          style={{ animationDelay: '300ms' }}
        />
      </div>
    </div>
  );
}
