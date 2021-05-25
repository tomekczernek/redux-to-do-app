import { Fragment, useEffect } from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import CheckBox from '../components/CheckBox';
import Input from '../components/Input';
import TaskForm from '../components/TaskForm';
import Loader from '../components/Loader';
import { fetchTasks } from '../redux';

function TasksContainer({ tasksList, isLoading, isError, openTaskForm, fetchTasks }) {

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <Fragment>
            {isLoading && <Loader />}
            <Container>
                {openTaskForm ? (
                    <TaskForm />
                ) : (
                    null
                )}
                <TasksBody openTaskForm={openTaskForm}>
                    {tasksList && tasksList.map(item => (
                        <TaskContainer key={item.id} taskIsCompleted={item.is_completed}>
                            <CheckBox taskId={item.id} taskName={item.task} taskIsCompleted={item.is_completed} />
                            <Input taskId={item.id} taskName={item.task} taskIsCompleted={item.is_completed} />
                        </TaskContainer>
                    ))}
                </TasksBody>
            </Container>
        </Fragment>
    );
}

function mapStateToProps(state) {
    return {
        tasksList: state.task.tasksList,
        isLoading: state.task.isLoading,
        isError: state.task.isError,
        openTaskForm: state.task.openTaskForm
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchTasks: () => dispatch(fetchTasks())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TasksContainer);

TasksContainer.propTypes = {
    tasksList: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    openTaskForm: PropTypes.bool.isRequired,
    fetchTasks: PropTypes.func.isRequired
};

const Container = styled.div`
    color: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TasksBody = styled.div`
    height: ${props => props.openTaskForm ? 'calc(100vh - 6rem - 80px - 82px)' : 'calc(100vh - 6rem - 80px )'};
    width: 100%;
    overflow-y: auto;
    @media (max-width: 768px) {
        height: ${props => props.openTaskForm ? 'calc(100vh - 2rem - 60px - 62px)' : 'calc(100vh - 2rem - 60px )'};
    }
`;

const TaskContainer = styled.div`
    background-color: ${props => props.taskIsCompleted ? '#b3b3b3' : '#f2f2f2'};
    transition: 0.25s;
    display: flex;
    align-items: center;
    width: 100%;
    border-top: 1px solid black;
    &:last-child {
        border-bottom-right-radius:5px;
        border-bottom-left-radius:5px;
    }
    &:hover{
        background-color: ${props => props.taskIsCompleted ? '#a6a6a6' : '#e6e6e6'};
    }
`;
