let hasRun = false;
// Does nothing in prod. File names are relative to the package root.
export default async function connectGenkitUI(
  opts: { location: string } = { location: "/flows" }
) {
  if (hasRun) {
    return;
  }
  hasRun = true;
  if (process.env.NODE_ENV !== "development") {
    return;
  }
  if ("context" in require) {
    (require as any).context(opts.location, true, /\.(js|ts)$/);
  }
}
