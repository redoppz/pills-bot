export function isNull<T>(obj: T | null): obj is null {
  return obj === null;
}
