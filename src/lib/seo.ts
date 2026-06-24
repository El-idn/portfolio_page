export type SeoMeta = {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
};

export function setPageMeta({
  title,
  description,
  url,
  image = "/og-image.svg",
  type = "website",
}: SeoMeta) {
  document.title = title;

  const setMeta = (name: string, content: string, property = false) => {
    const attr = property ? "property" : "name";
    let element = document.querySelector(`meta[${attr}="${name}"]`);
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute(attr, name);
      document.head.appendChild(element);
    }
    element.setAttribute("content", content);
  };

  setMeta("description", description);
  setMeta("og:title", title, true);
  setMeta("og:description", description, true);
  setMeta("og:type", type, true);
  setMeta("og:image", image, true);
  if (url) setMeta("og:url", url, true);
  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:title", title);
  setMeta("twitter:description", description);
  setMeta("twitter:image", image);
}
