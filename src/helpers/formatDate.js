export const formatDate = function (date) {
  if (!date) return;
  return date.replaceAll("/", ".");
};
