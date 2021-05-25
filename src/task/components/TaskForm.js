import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { createTask, toggleOpenForm } from '../redux';
import { ImCheckmark, ImMinus } from 'react-icons/im';

function TaskForm({ tasksList, openTaskForm, createTask, toggleOpenForm }) {

    const [taskName, setTaskName] = useState('');

    const handleChangeTaskName = (event) => {
        setTaskName(event.target.value);
    };

    const handleSaveTaskForm = (event) => {

        if (taskName) {
            const data = new FormData();
            data.append('id', '');
            data.append('task', taskName);
            data.append('is_completed', 0);

            createTask(data, tasksList);
            setTaskName('');
        }
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <Fragment>
            {openTaskForm &&
                <FormContainer>
                    <ImageFormContainer>
                        <ImMinus className="pointer" onClick={() => toggleOpenForm(false)} />
                    </ImageFormContainer>
                    <FormInput
                        type="text"
                        value={taskName}
                        onChange={handleChangeTaskName}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleSaveTaskForm(event);
                            }
                        }}
                    />
                    <ImageFormContainer>
                        <ImCheckmark className="pointer" onClick={handleSaveTaskForm} />
                    </ImageFormContainer>
                </FormContainer>
            }
        </Fragment>
    );
}

function mapStateToProps(state) {
    return {
        tasksList: state.task.tasksList,
        openTaskForm: state.task.openTaskForm
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createTask: (data, tasksList) => dispatch(createTask(data, tasksList)),
        toggleOpenForm: (d) => dispatch(toggleOpenForm(d))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskForm);

TaskForm.propTypes = {
    tasksList: PropTypes.array.isRequired,
    openTaskForm: PropTypes.bool.isRequired,
    createTask: PropTypes.func.isRequired,
    toggleOpenForm: PropTypes.func.isRequired
};

const FormContainer = styled.div`
    background-color: #004080;
    display: flex;
    height: 80px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-top: solid 2px white;
    @media (max-width: 768px) {
        height: 60px;
    }
`;

const FormInput = styled.input`
    border: solid 2px white;
    border-radius: 5px;
    font-size: 1.25rem;
    padding: 0.5rem;
    margin: 1rem;
    width: calc(60% - 2rem);
`;

const ImageFormContainer = styled.div`
    color: #fff;
    border: solid 2px #fff;
    border-radius: 5px; 
    padding: 0.5rem 1rem;
    margin: 0.5rem 1rem;
    cursor: pointer;
    transition: 0.1s;
    &:hover{
        color: #004080;
        background-color: #fff;
        border-color: #004080;
    }
`;