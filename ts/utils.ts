export function debounce(fn: Function, delay: number) {
  let timer: number;
  return function (...args: any) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export function formatDate(date: string): string {
  if (!date || date.length < 6) return "";
  const formatDate = new Date(date);
  if (isNaN(formatDate.getTime())) return "";
  return formatDate.toISOString().slice(0, 10);
}
