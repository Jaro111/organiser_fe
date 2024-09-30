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

// update task status

export const updateTaskStatus = async (jobId, taskId, token) => {
  const res = await fetch(`${url}/task/updateTaskStatus`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jobId: jobId,
      taskId: taskId,
    }),
  });

  const data = await res.json();
  return data;
};

// delete task

export const deleteTask = async (jobId, taskId, token) => {
  const res = await fetch(`${url}/task/deleteTask`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jobId: jobId,
      taskId: taskId,
    }),
  });

  const data = await res.json();
  return data;
};
