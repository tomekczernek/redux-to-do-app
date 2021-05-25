import { useState, useEffect }  from 'react';
import styled from 'styled-components';
import api from '../api';
import { objectToArray } from '../utils';

import HeaderContainer from './header/container/HeaderContainer';
import TaskContainer from './task/container/TaskContainer';

export default function ToDo() {

    const [tasksList, setTasksList] = useState([]);
    const [openAddForm, setOpenAddForm] = useState(false);

    useEffect(() => {
        api.get().then(response => {
            setTasksList( objectToArray(response.data.data) );
        }).catch(error => {
            console.log(error.response);
        });
    }, []);

    return (
        <ToDoContainer>
            <HeaderContainer setTasksList={setTasksList} tasksList={tasksList} setOpenAddForm={setOpenAddForm} />
            <TaskContainer setTasksList={setTasksList} tasksList={tasksList} setOpenAddForm={setOpenAddForm} openAddForm={openAddForm} />
        </ToDoContainer>
    );
}

const ToDoContainer = styled.div`
    overflow-y: auto;
    max-height: 90vh;
    width: min( 90vw, 600px);
`;