import { chmodSync, copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const POSTS_FILE = "POSTS.json";
const POST_URL = /^https:\/\/x\.com\/[^/]+\/status\/\d+$/;

function repoRoot(): string {
  return dirname(fileURLToPath(import.meta.url));
}

function outputDir(): string {
  const configured = process.env.MAKEFUN_OUTPUT_DIR?.trim();
  return configured && configured.length > 0 ? configured : "/output";
}

function validatePosts(): void {
  const raw = readFileSync(join(repoRoot(), POSTS_FILE), "utf8");
  const data: unknown = JSON.parse(raw);
  if (typeof data !== "object" || data === null || !Array.isArray((data as { posts?: unknown }).posts)) {
    throw new Error(`${POSTS_FILE} must be an object with a "posts" array`);
  }
  const posts = (data as { posts: unknown[] }).posts;
  if (posts.length < 1 || posts.length > 15) {
    throw new Error(`${POSTS_FILE} must list 1 to 15 posts, found ${posts.length}`);
  }
  for (const post of posts) {
    if (typeof post !== "string" || !POST_URL.test(post)) {
      throw new Error(`${POSTS_FILE} has a bad post URL: ${String(post)}`);
    }
  }
}

function main(): void {
  validatePosts();
  const targetDir = outputDir();
  const targetPath = join(targetDir, POSTS_FILE);
  mkdirSync(targetDir, { recursive: true, mode: 0o755 });
  copyFileSync(join(repoRoot(), POSTS_FILE), targetPath);
  chmodSync(targetPath, 0o644);
}

try {
  main();
} catch (err: unknown) {
  const message = err instanceof Error ? err.message : String(err);
  process.stderr.write(`Failed to copy ${POSTS_FILE} to output: ${message}\n`);
  process.exit(1);
}
