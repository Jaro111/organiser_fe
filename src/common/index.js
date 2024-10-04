const url = import.meta.env.VITE_URL;

// submit on enter
export const pressEnter = (e, submitFunc) => {
  if (e.key === "Enter") {
    submitFunc();
  }
};
