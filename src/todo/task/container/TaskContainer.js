import styled from 'styled-components';
import PropTypes from 'prop-types';

import Task from '../components/Task';
import TaskForm from '../components/TaskForm';

export default function TaskContainer({ setTasksList, tasksList, setOpenAddForm, openAddForm }) {

    return (
        <Container>
            {openAddForm ? (   
                <TaskForm setTasksList={setTasksList} tasksList={tasksList} setOpenAddForm={setOpenAddForm} />
            ) : (
                null
            )}
            {tasksList && tasksList.map(item => (
                <Task key={item.id} taskId={item.id} taskName={item.task} taskIsDone={item.is_completed} setTasksList={setTasksList} tasksList={tasksList} />
            ))}
        </Container>
    );
}

const Container = styled.div`
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

TaskContainer.propTypes = {
    setTasksList: PropTypes.func.isRequired,
    tasksList: PropTypes.array.isRequired,
    setOpenAddForm: PropTypes.func.isRequired,
    openAddForm: PropTypes.bool.isRequired
};
