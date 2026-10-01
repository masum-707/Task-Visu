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
  // console.log("before format", date);
  if (!date || date.length < 6) return "";
  const fdate = new Date(date);
  if (isNaN(fdate.getTime())) return "";
  // console.log("after format", fdate.toISOString().slice(0, 10));
  return fdate.toISOString().slice(0, 10);
}
