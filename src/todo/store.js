const GET_DATA = 'todo/GET_ADTA';
const CHANGE_TO_DONE = 'todo/CHANGE_TO_DONE';
const CHANGE_TO_NOT_DONE = 'todo/CHANGE_TO_NOT_DONE';
const CHANGE_NAME = 'todo/CHANGE_NAME';
const ADD_NEW = 'todo/ADD_NEW';
const REMOVE = 'todo/REMOVE';

export function getData(payload) {
    return {
        type: GET_DATA,
        payload
    };
};

export function changeToDone() {
    return {
        type: CHANGE_TO_DONE
    };
};

export function changeToNotDone() {
    return {
        type: CHANGE_TO_NOT_DONE
    };
};

export function changeName() {
    return {
        type: CHANGE_NAME
    };
};

export function addNew() {
    return {
        type: REMOVE
    };
};

export function remove() {
    return {
        type: ADD_NEW
    };
};

const INITIAL_STATE = {};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_DATA:
            return {};
        case CHANGE_TO_DONE:
            return {};
        default:
            return state;
    }
};