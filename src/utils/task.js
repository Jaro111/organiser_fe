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

// update task

export const updateTask = async (
  jobId,
  taskId,
  whatToUpdate,
  update,
  token
) => {
  const res = await fetch(`${url}/task/updateTask`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jobId: jobId,
      taskId: taskId,
      whatToUpdate: whatToUpdate,
      update: update,
    }),
  });

  const data = await res.json();
  return data;
};

// {
//   "jobId": "66f4432e931adb1ebccf3ea2",
//   "taskId": "66f570678759a29dc146d24b",
//   "whatToUpdate": "userId",
//   "update": "66f2ec7ccebaa7a5a11d8680"
// }
