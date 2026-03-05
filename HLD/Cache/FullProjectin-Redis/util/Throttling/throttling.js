const userLastCall = new Map();

export default function formThrottle(key, delay) {
  const now = Date.now();
  const lastCall = userLastCall.get(key) || 0;

  if (now - lastCall < delay) {
    return false;
  }

  userLastCall.set(key, now);
  return true;
}
