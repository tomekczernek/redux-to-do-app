import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import api from '../../../api';
import { objectToArray } from '../../../utils';

import { ImPlus, ImCog } from 'react-icons/im';

export default function HeaderContainer({ setTasksList, tasksList, setOpenAddForm }) {

    const [showDoneTask, setShowDoneTask] = useState(false);

    const handleShowDoneTasks = () => {
        if (showDoneTask) {
            api.get().then(response => {
                setTasksList(objectToArray(response.data.data));
                setShowDoneTask(false);
            }).catch(error => {
                console.log(error.response);
            });
        }
        else {
            const doneTasksList = tasksList.filter(item => item.is_completed === 1);
            setTasksList(doneTasksList);
            setShowDoneTask(true);
        }
    };

    return (
        <Container tasksList={tasksList}>
            <HeaderBtn onClick={() => setOpenAddForm(true)}>
                <ImPlus />
            </HeaderBtn>
            <HeaderTitle>To-do list</HeaderTitle>
            <HeaderBtnGear showDoneTask={showDoneTask} >
                <ImCog onClick={handleShowDoneTasks} />
            </HeaderBtnGear>
        </Container>
    );
}

const Container = styled.div`
    background-color: #004080;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: ${props => props.tasksList.length ? 'none' : '5px'};
    border-bottom-right-radius: ${props => props.tasksList.length ? 'none' : '5px'};
`;

const HeaderTitle = styled.p`
    font-weight: bold;
    font-size: 1.5rem;
`;

const HeaderBtn = styled.div`
    color: #FFF;
    border: solid 2px #FFF;
    border-radius: 5px; 
    padding: 0.5rem 1rem;
    margin: 0.5rem 1rem;
    cursor: pointer;
    transition: 0.1s;
    &:hover{
        color: #004080;
        background-color: #FFF;
        border-color: #004080;
    }
`;

const HeaderBtnGear = styled(HeaderBtn)`
    color: ${props => props.showDoneTask ? 'red' : '#FFF'}; 
    border-color: ${props => props.showDoneTask ? 'red' : '#FFF'};
    &:hover{
        background-color: ${props => props.showDoneTask ? 'red' : '#FFF'};
    }
`;


HeaderContainer.propTypes = {
    setTasksList: PropTypes.func.isRequired,
    tasksList: PropTypes.array.isRequired,
    setOpenAddForm: PropTypes.func.isRequired
};