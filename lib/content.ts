import fs from "node:fs/promises";
import path from "node:path";

export type ContentFile = {
  slug: string;
  source: string;
};

const contentDirectory = path.join(process.cwd(), "content");

export async function readContentFile(...segments: string[]): Promise<ContentFile> {
  const filePath = path.join(contentDirectory, ...segments);
  const source = await fs.readFile(filePath, "utf8");
  const slug = segments.join("/").replace(/\.mdx?$/, "");

  return { slug, source };
}

export async function listContentFiles(section: string) {
  const sectionPath = path.join(contentDirectory, section);
  const entries = await fs.readdir(sectionPath, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => ({
      slug: entry.name.replace(/\.mdx$/, ""),
      path: path.join(section, entry.name),
    }));
}
