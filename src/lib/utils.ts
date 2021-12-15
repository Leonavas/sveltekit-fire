export default function promiseTimeout(ms, promise) {
  let timeout = new Promise((_, reject) => {
      let id = setTimeout(() => {
          clearTimeout(id);
          reject(`Timeout at ${ms}ms.`);
      }, ms);
  });

  return Promise.race([promise, timeout]);
};
