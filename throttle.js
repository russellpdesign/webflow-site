function throttle(func, delay) {
  let timeoutId;
  let lastArgs;
  let lastThis;
  let lastExecTime = 0;

  return function(...args) {
    lastArgs = args;
    lastThis = this;
    const currentTime = Date.now();

    if (currentTime - lastExecTime >= delay) {
      lastExecTime = currentTime;
      func.apply(lastThis, lastArgs);
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastExecTime = Date.now();
        func.apply(lastThis, lastArgs);
        timeoutId = null;
      }, delay - (currentTime - lastExecTime));
    }
  };
}