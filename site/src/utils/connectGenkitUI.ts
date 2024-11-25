import path from 'path';
import * as fs from "fs/promises";

const hasExtension = (extensions: string[]) => (file: string): boolean => {
  for (const e of extensions) {
    if (file.endsWith(e)) {
      return true;
    }
  }
  return false;
}

/*
async function getFilesRecursive(cwd: string, extensions: string[] = [".js", ".ts"]): Promise<string[]> {
  const files = await fs.readdir(cwd, { withFileTypes: true })
  const matches = files.filter(f => f.isFile() && hasExtension(extensions)).map(f => f.name);
  const submatches = await Promise.all(files.filter(f => f.isDirectory())
    .map((d) => getFilesRecursive(path.join(cwd, d.name), extensions)));
  return submatches.reduce<string[]>((prev, next) => [...prev, ...next], matches)
}

async function loadESM(location: string): Promise<void> {
  console.error("Loading flows with ESM loader");
  let files: string[];
  try {
    files = await getFilesRecursive(location);
  } catch (e) {
    console.error(`Failed to load files from ${location}`);
    return;
  }

  for (const file of files) {
    try {
      await import(path.join(location, file));
      console.log("Imported", path.join(location, file));
    } catch (e) {
      console.error(`Failed to import ${path.join(location, file)} with error ${e}`);
    }
  }
}

/*
async function loadWebpack(location: string): Promise<void> {
  console.error("Loading flows with webpack loader");
  const r = require as any;
  const context = r.context(location, true, /\.(js|ts)$/);
  context.keys().map((key: string) => context(key));
}
  */


let hasRun = false;
// Does nothing in prod. File names are relative to the package root.
export async function connectGenkitUI(opts: { location: string } = { location: "/flows" }) {
    if (hasRun) {
      console.error("HAS RUN");
        return;
    }
    hasRun = true;
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    const location = path.join(process.cwd(), opts.location);
    console.error("Would load", location);
    
    /*
    if ("context" in require) {
      loadWebpack(location);
    } else {
      loadESM(location);
    }
      */
  }