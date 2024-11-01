


export function caller(): string {
  const err = new Error();
  return /\/api([^.])*/.exec(err.stack!.split("\n")[2])?.[0]!;
}