export function CourseSkeleton() {
  return (
    <div className="col-span-1 lg:col-span-2 row-span-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-card border border-border rounded-3xl p-5 flex flex-col justify-between h-[160px]">
          <div className="flex justify-between items-start mb-6">
            <div className="w-10 h-10 rounded-xl bg-border/50 animate-pulse" />
            <div className="w-12 h-6 rounded-md bg-border/50 animate-pulse" />
          </div>
          <div className="space-y-4">
            <div className="h-4 w-3/4 bg-border/50 rounded-full animate-pulse" />
            <div className="h-1.5 w-full bg-border/30 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-border/50 animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
