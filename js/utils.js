export function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export function formatDate(date) {
  if (!date || date.length < 6) return "";
  const fdate = new Date(date);
  if (isNaN(fdate.getTime())) return "";
  return fdate.toISOString().slice(0, 10);
}
