export const pressEnter = (e, submitFunc) => {
  if (e.key === "Enter") {
    submitFunc();
  }
};
