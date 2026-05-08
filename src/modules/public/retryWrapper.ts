const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

const generateWithRetry = async (fn: any, retries = 2) => {
  try {
    return await fn();
  } catch (err) {
    if (retries === 0) throw err;

    await sleep(2000);
    return generateWithRetry(fn, retries - 1);
  }
};

export default generateWithRetry;
