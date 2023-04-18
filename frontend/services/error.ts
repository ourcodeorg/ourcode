export function ErrorMessage(res?: string | string[]): string {
  if (!res) return "An Error Occurred";
  if (typeof res === "string") return res;
  if (Array.isArray(res)) return res[0];
  return "An Error Occurred";
}
