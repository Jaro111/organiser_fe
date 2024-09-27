const url = import.meta.env.VITE_URL;

export const addTask = async (userId, jobId, taskTitle, token) => {
  const res = await fetch(`${url}/task/addTask`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      jobId: jobId,
      taskTitle: taskTitle,
    }),
  });

  const data = await res.json();
  return data;
};
