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
  const formatDate = new Date(date);
  if (isNaN(formatDate.getTime())) return "";
  return formatDate.toISOString().slice(0, 10);
}
