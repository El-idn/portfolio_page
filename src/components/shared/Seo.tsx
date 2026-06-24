import { useEffect } from "react";
import type { SeoMeta } from "@/lib/seo";
import { setPageMeta } from "@/lib/seo";

type SeoProps = SeoMeta;

export function Seo({ title, description, url, image, type }: SeoProps) {
  useEffect(() => {
    setPageMeta({ title, description, url, image, type });
  }, [title, description, url, image, type]);

  return null;
}
