import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import api from '../../../api';

import { ImBin, ImCheckmark } from 'react-icons/im';

export default function Input({ taskId, taskName, taskIsDone, setTasksList, tasksList }) {

    const [name, setName] = useState(taskName);
    const [toggle, setToggle] = useState(name ? true : false);

    const handleChangeTaskName = (event) => {
        setName(event.target.value);
    };

    const handleSaveTask = (event) => {
        if (name) {
            setToggle(true);
        }

        const data = new FormData();
        data.append('id', taskId);
        data.append('task', name);
        data.append('is_completed', taskIsDone);

        api.post(`/${taskId}`, data).then(response => {
            const updatedTasksList = tasksList.map(item =>
                item.id === taskId
                    ? response.data.data[0]
                    : item
            );
            setTasksList(updatedTasksList);
            setToggle(true);
        }).catch(error => {
            console.log(error.response);
        });

        event.preventDefault();
        event.stopPropagation();
    };

    const handleRemoveTask = () => {
        api.delete(`/${taskId}`).then(response => {
            const updatedTasksList = tasksList.filter(item => item.id !== response.data.data.id);
            setTasksList(updatedTasksList);
        }).catch(error => {
            console.log(error.response);
        });
    };

    return (
        <TaskNameContainer>
            {toggle ? (
                <TaskName value={taskName} className={taskIsDone ? 'doneTask' : ''} onClick={() => { setToggle(false); }}>
                    {name}
                </TaskName>
            ) : (
                <TaskNameInputContainer>
                    <TaskNameInput
                        type="text"
                        value={name}
                        onChange={handleChangeTaskName}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleSaveTask(event);
                            }
                        }}
                    />
                    <TaskActionContainer>
                        <TaskImageContainer>
                            <ImCheckmark className="pointer" onClick={handleSaveTask} />
                        </TaskImageContainer>
                        <TaskImageContainer>
                            <ImBin className="pointer" onClick={handleRemoveTask} />
                        </TaskImageContainer>
                    </TaskActionContainer>
                </TaskNameInputContainer>
            )}
        </TaskNameContainer>
    );
}

const TaskNameContainer = styled.div`
    width: 80%;
    text-align: left;
`;

const TaskName = styled.p`  
    padding: 0.5rem;
    margin: 0.5rem 0;
    font-size: 1.25rem;
    cursor: pointer;
    transition: 0.25s;
`;

const TaskNameInputContainer = styled.div`
    display: flex;
    align-items: center;
`;

const TaskNameInput = styled.input`
    border: solid 2px black;
    border-radius: 5px;
    font-size: 1.25rem;
    padding: 0.5rem;
    margin: 0.5rem 0;
    width: calc(60% - 1rem);
`;

const TaskActionContainer = styled.div`
    display: flex;
    width: 40%;
    align-items: center;
    justify-content: space-evenly;
`;

const TaskImageContainer = styled.div`
    /* border: solid 2px black;
    border-radius: 5px; */
    padding: 6px 12px;
    cursor: pointer;
    transition: 0.1s;
    /* &:hover{
        background-color: black;
        color: white;
        border-color: transparent;
    } */
`;

Input.propTypes = {
    taskId: PropTypes.string.isRequired,
    taskName: PropTypes.string.isRequired,
    taskIsDone: PropTypes.number.isRequired,
    setTasksList: PropTypes.func.isRequired,
    tasksList: PropTypes.array.isRequired
};
