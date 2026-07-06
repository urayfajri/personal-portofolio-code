export function getLoopCopyCount(itemCount: number): number {
  if (itemCount <= 3) return 4;
  if (itemCount <= 5) return 3;
  return 2;
}

export function getLoopCopiesClass(copies: number): string {
  return `tech-marquee-track--copies-${copies}`;
}
