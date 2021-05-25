import api from '../api';

const FETCH_TASKS_REQUESTED = "task/FETCH_TASKS_REQUESTED";
const FETCH_TASKS_SUCCEDED = "task/FETCH_TASKS_SUCCEDED";
const FETCH_TASKS_FAILED = "task/FETCH_TASKS_FAILED";

const UPDATE_TASK_REQUESTED = "task/UPDATE_TASK_REQUESTED";
const UPDATE_TASK_SUCCEDED = "task/UPDATE_TASK_SUCCEDED";
const UPDATE_TASK_FAILED = "task/UPDATE_TASK_FAILED";

const DELETE_TASK_REQUESTED = "task/DELETE_TASK_REQUESTED";
const DELETE_TASK_SUCCEDED = "task/DELETE_TASK_SUCCEDED";
const DELETE_TASK_FAILED = "task/DELETE_TASK_FAILED";

const CREATE_TASK_REQUESTED = "task/CREATE_TASK_REQUESTED";
const CREATE_TASK_SUCCEDED = "task/CREATE_TASK_SUCCEDED";
const CREATE_TASK_FAILED = "task/CREATE_TASK_FAILED";

const INITIAL_STATE = {
  tasksList: [],
  isLoading: false,
  isError: false,
  openTaskForm: false,
  showDoneTasks: false
};

const fetchTasksRequested = () => ({ type: FETCH_TASKS_REQUESTED });
const fetchTasksSucceded = data => ({ type: FETCH_TASKS_SUCCEDED, payload: data });
const fetchTasksFailed = () => ({ type: FETCH_TASKS_FAILED });

export const fetchTasks = () => {
  return function (dispatch) {
    dispatch(fetchTasksRequested());
    api.get().then(response => {
      dispatch(fetchTasksSucceded(response.data.data));
    })
      .catch(error => {
        dispatch(fetchTasksFailed());
      });
  };
};

const updateTaskRequested = () => ({ type: UPDATE_TASK_REQUESTED });
const updateTaskSucceded = data => ({ type: UPDATE_TASK_SUCCEDED, payload: data });
const updateTaskFailed = () => ({ type: UPDATE_TASK_FAILED });

export const updateTask = (id, data, tasksList) => {
  return function (dispatch) {
    dispatch(updateTaskRequested());
    api.post(`/${id}`, data).then(response => {
      const updatedTasksList = tasksList.map(item =>
        item.id === id
          ? response.data.data[0]
          : item
      );
      dispatch(updateTaskSucceded(updatedTasksList));
    })
      .catch(error => {
        dispatch(updateTaskFailed());
      });
  };
};

const deleteTaskRequested = () => ({ type: DELETE_TASK_REQUESTED });
const deleteTaskSucceded = data => ({ type: DELETE_TASK_SUCCEDED, payload: data });
const deleteTaskFailed = () => ({ type: DELETE_TASK_FAILED });

export const deleteTask = (id, tasksList) => {
  return function (dispatch) {
    dispatch(deleteTaskRequested());
    api.delete(`/${id}`).then(response => {
      const updatedTasksList = tasksList.filter(item => item.id !== response.data.data.id);
      dispatch(deleteTaskSucceded(updatedTasksList));
    })
      .catch(error => {
        dispatch(deleteTaskFailed());
      });
  };
};

const createTaskRequested = () => ({ type: CREATE_TASK_REQUESTED });
const createTaskSucceded = data => ({ type: CREATE_TASK_SUCCEDED, payload: data });
const createTaskFailed = () => ({ type: CREATE_TASK_FAILED });

export const createTask = (data, tasksList) => {
  return function (dispatch) {
    dispatch(createTaskRequested());
    api.post(`/`, data).then(response => {
      tasksList.push(response.data.data[0]);
      dispatch(createTaskSucceded(tasksList));
    })
      .catch(error => {
        dispatch(createTaskFailed());
      });
  };
};

const TOGGLE_OPEN_TASK_FORM = "task/TOGGLE_OPEN_TASK_FORM";

export const toggleOpenForm = (data) => ({
  type: TOGGLE_OPEN_TASK_FORM,
  payload: data
});

const TOGGLE_TASKS_COMPLETED = "task/TOGGLE_TASKS_COMPLETED";

export const toggleTasksCompeted = (data) => ({
  type: TOGGLE_TASKS_COMPLETED,
  payload: data
});

const FETCH_TASKS_COMPLETED = "task/FETCH_TASKS_COMPLETED";

export const fetchCompleted = (tasksList) => ({
  type: FETCH_TASKS_COMPLETED,
  payload: tasksList.filter(item => item.is_completed === 1)
});

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TASKS_REQUESTED:
      return {
        ...state,
        isLoading: true,
        isError: false,
        showDoneTasks: false
      };
    case FETCH_TASKS_SUCCEDED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        tasksList: action.payload,
        showDoneTasks: false
      };
    case FETCH_TASKS_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        showDoneTasks: false
      };
    case UPDATE_TASK_REQUESTED:
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case UPDATE_TASK_SUCCEDED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        tasksList: action.payload
      };
    case UPDATE_TASK_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    case DELETE_TASK_REQUESTED:
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case DELETE_TASK_SUCCEDED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        tasksList: action.payload
      };
    case DELETE_TASK_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    case CREATE_TASK_REQUESTED:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case CREATE_TASK_SUCCEDED:
      return {
        ...state,
        isLoading: false,
        isError: false,
        tasksList: action.payload
      };
    case CREATE_TASK_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    case TOGGLE_OPEN_TASK_FORM:
      return {
        ...state,
        openTaskForm: action.payload
      };
    case FETCH_TASKS_COMPLETED:
      return {
        ...state,
        tasksList: action.payload,
        showDoneTasks: true
      };
    default:
      return state;
  }
};