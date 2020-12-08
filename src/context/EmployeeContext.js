import createDataContext from './createDataContext';
import HIApi from '../api/index';

const employeeReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_employees':
      return action.payload;
    case 'delete_employee':
      return state.filter(employee => employee.id !== action.payload);
    case 'edit_employee':
      return state.map(employee => {
        return employee.id === action.payload.id
          ? action.payload
          : employee;
      });
    default:
      return state;
  }
};

const fetchEmployees = dispatch => async () => {
  const response = await HIApi.get('/employees');
  dispatch({type: 'fetch_employees', payload: response.data});
};

const createEmployee = dispatch => async (
  firstname,
  lastname,
  hired_since,
  role,
  email,
  birthday,
  callback,
) => {
  await HIApi.post('/employees', {
    firstname,
    lastname,
    hired_since,
    role,
    email,
    birthday,
    callback,
  });
  if (callback) {
    callback();
  }
};

const deleteEmployee = dispatch => async id => {
  await HIApi.delete(`/employees/${id}`);
  dispatch({type: 'delete_employee', payload: id});
};

const editEmployee = dispatch => async (
  id,
  firstname,
  lastname,
  hired_since,
  role,
  email,
  birthday,
  callback,
) => {
  await HIApi.put(`/employees/${id}`, {
    firstname,
    lastname,
    hired_since,
    role,
    email,
    birthday,
    callback,
  });
  dispatch({
    type: 'edit_employee',
    payload: id,
    firstname,
    lastname,
    hired_since,
    role,
    email,
    birthday,
    callback,
  });
  if (callback) {
    callback();
  }
};

export const {Provider, Context} = createDataContext(
  employeeReducer,
  {fetchEmployees, createEmployee, deleteEmployee, editEmployee},
  [],
);
