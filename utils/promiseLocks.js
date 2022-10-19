export default async function promiseLocks(promises) {
  let error = null;

  const unlocks = [];
  (await Promise.allSettled(promises)).forEach(({ status, value, reason }) => {
    if (status === 'fulfilled') unlocks.push(value);
    else error = reason;
  });

  if (error !== null) {
    unlocks.forEach(unlock => unlock());
    throw error;
  }

  return () => Promise.all(unlocks.map(unlock => unlock()));
}