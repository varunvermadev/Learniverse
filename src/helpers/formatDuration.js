export const formatDuration = function (duration) {
  if (typeof duration !== "number") {
    duration = Number(duration);
  }
  if (isNaN(duration)) {
    duration = 0;
  }
  const hours = String(Math.floor(duration / 60)).padStart(2, "0");
  const minutes = String(duration % 60).padStart(2, "0");
  return hours + ":" + minutes;
};
