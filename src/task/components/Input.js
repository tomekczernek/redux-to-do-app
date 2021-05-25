import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { updateTask, deleteTask } from '../redux';
import { ImBin2, ImCheckmark } from 'react-icons/im';

function Input({ taskId, taskName, taskIsCompleted, tasksList, updateTask, deleteTask }) {

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
        data.append('is_completed', taskIsCompleted);

        updateTask(taskId, data, tasksList);
        setToggle(true);

        event.preventDefault();
        event.stopPropagation();
    };

    const handleRemoveTask = () => {
        deleteTask(taskId, tasksList);
    };

    return (
        <TaskNameContainer>
            {toggle ? (
                <TaskName value={taskName} className={taskIsCompleted ? 'doneTask' : ''} onClick={() => { setToggle(false); }}>
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
                            <ImBin2 className="pointer" onClick={handleRemoveTask} />
                        </TaskImageContainer>
                    </TaskActionContainer>
                </TaskNameInputContainer>
            )}
        </TaskNameContainer>
    );
}

function mapStateToProps(state) {
    return {
        tasksList: state.task.tasksList,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateTask: (taskId, data, tasksList) => dispatch(updateTask(taskId, data, tasksList)),
        deleteTask: (taskId, tasksList) => dispatch(deleteTask(taskId, tasksList)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Input);

Input.propTypes = {
    taskId: PropTypes.string.isRequired,
    taskName: PropTypes.string.isRequired,
    taskIsCompleted: PropTypes.number.isRequired,
    tasksList: PropTypes.array.isRequired,
    updateTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired
};

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


