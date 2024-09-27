const url = import.meta.env.VITE_URL;

// get all jobs
export const getAllJobs = async (token) => {
  const res = await fetch(`${url}/job/getJobByUser`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  const jobData = data.allJobs;
  return jobData;
};

// add new job

export const addNewJob = async (token, title) => {
  const res = await fetch(`${url}/job/addJob`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
    }),
  });

  const data = await res.json();
  return data;
};

// get users and job details by id

export const getJobDetils = async (jobId, token) => {
  const res = await fetch(`${url}/job/getJobDetails`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jobId: jobId,
    }),
  });

  const data = await res.json();
  return data;
};
