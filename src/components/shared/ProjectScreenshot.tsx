import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { TechBadges } from "@/components/shared/MetricBadge";
import { cn } from "@/lib/utils";

type ProjectScreenshotProps = {
  title: string;
  screenshot: string;
  domain: string;
  technologies: string[];
  className?: string;
};

export function ProjectScreenshot({
  title,
  screenshot,
  domain,
  technologies,
  className,
}: ProjectScreenshotProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className="border-border bg-card overflow-hidden rounded-2xl border shadow-sm"
        aria-hidden
      >
        <div className="border-border flex items-center gap-2 border-b px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-400/80" />
            <span className="size-2.5 rounded-full bg-yellow-400/80" />
            <span className="size-2.5 rounded-full bg-green-400/80" />
          </div>
          <span className="text-muted-foreground ml-2 truncate text-xs">{domain}</span>
        </div>
        <div className="bg-muted/30 aspect-[16/10] w-full overflow-hidden">
          {imageError ? (
            <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
              <ImageIcon className="size-8 opacity-50" />
              <p className="text-sm">Screenshot coming soon</p>
            </div>
          ) : (
            <img
              src={screenshot}
              alt={`${title} screenshot`}
              className="h-full w-full object-cover object-top"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          )}
        </div>
      </div>
      <TechBadges items={technologies} />
    </div>
  );
}
