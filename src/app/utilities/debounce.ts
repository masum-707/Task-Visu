export class Debounce {
  debounce(fn: Function, delay: number) {
    let timer: number;
    return function (...args: any) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  }
}
