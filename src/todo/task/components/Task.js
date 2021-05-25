import PropTypes from 'prop-types';
import styled from 'styled-components';

import CheckBox from './CheckBox';
import Input from './Input';
import api from '../../../api';

export default function Task({ taskId, taskName, taskIsDone, setTasksList, tasksList }) {

    const toogleIsDoneTask = () => {
        if (taskName) {
            const data = new FormData();
            data.append('id', taskId);
            data.append('task', taskName);
            data.append('is_completed', taskIsDone === 1 ? 0 : 1);

            api.post(`/${taskId}`, data).then(response => {
                const updatedTasksList = tasksList.map(item =>
                    item.id === taskId
                        ? response.data.data[0]
                        : item
                );
                setTasksList(updatedTasksList);
            }).catch(error => {
                console.log(error.response);
            });
        }
    };

    return (
        <Container taskIsDone={taskIsDone}>
            <CheckBox toogleIsDoneTask={toogleIsDoneTask} taskIsDone={taskIsDone} />
            <Input taskId={taskId} taskName={taskName} taskIsDone={taskIsDone} setTasksList={setTasksList} tasksList={tasksList} />
        </Container>
    );
}

const Container = styled.div`
    background-color: ${props => props.taskIsDone ? '#b3b3b3' : '#f2f2f2'};
    transition: 0.25s;
    display: flex;
    align-items: center;
    width: 100%;
    border-top: 1px solid black;
    &:last-child {
        border-bottom-right-radius:5px;
        border-bottom-left-radius:5px;
    }
`;

Task.propTypes = {
    taskId: PropTypes.string.isRequired,
    taskName: PropTypes.string.isRequired,
    taskIsDone: PropTypes.number.isRequired,
    setTasksList: PropTypes.func.isRequired,
    tasksList: PropTypes.array.isRequired
};
