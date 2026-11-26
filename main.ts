import { chmodSync, copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const POSTS_FILE = "POSTS.json";

function repoRoot(): string {
  return dirname(fileURLToPath(import.meta.url));
}

function outputDir(): string {
  const configured = process.env.MAKEFUN_OUTPUT_DIR?.trim();
  return configured && configured.length > 0 ? configured : "/output";
}

function main(): void {
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
