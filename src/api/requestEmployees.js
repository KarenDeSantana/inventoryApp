const HIApi = 'http://88.99.170.42:3000';

export const getEmployees = async () => {
  const res = await fetch(`${HIApi}/employees`);
  return res.json();
};
export const addEmployee = async data => {
  const response = await fetch(`${HIApi}/employees`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
export const editEmployee = async data => {
  const response = await fetch(`${HIApi}/employees/${data.id}`, {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
export const deleteEmployee = async id => {
  const response = fetch(`${HIApi}/employees/${id}`, {
    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
  });
  return response;
};
