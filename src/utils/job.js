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

// invite user to job
export const inViteToJob = async (jobId, invitedUserId, token) => {
  const res = await fetch(`${url}/job/inviteToJob`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jobId: jobId,
      invitedUserId: invitedUserId,
    }),
  });

  const data = await res.json();
  return data;
};

// get all user invitations
export const getInvitations = async (token, userId) => {
  const res = await fetch(`${url}/job/checkInvitations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
    }),
  });

  const data = await res.json();
  const jobData = data.job;
  return jobData;
};

// accept invitation

export const acceptInvitation = async (token, jobId) => {
  const res = await fetch(`${url}/job/acceptInvitation`, {
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

// add editShopingList
export const editShopingList = async (token, jobId, action, title) => {
  const res = await fetch(`${url}/editList`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: action,
      jobId: jobId,
      title: title,
    }),
  });

  const data = res.json();
  return data;
};

// export const getAllJobs = async (token) => {
//   const res = await fetch(`${url}/job/getJobByUser`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   });

//   const data = await res.json();
//   const jobData = data.allJobs;
//   return jobData;
// };
