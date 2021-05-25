import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { updateTask } from '../redux';
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im';

function CheckBox({ taskId, taskName, taskIsCompleted, tasksList, updateTask }) {

    const toogleIsDoneTask = () => {

        const data = new FormData();
        data.append('id', taskId);
        data.append('task', taskName);
        data.append('is_completed', taskIsCompleted === 1 ? 0 : 1);

        updateTask(taskId, data, tasksList);
    };

    return (
        <TaskCheckBoxContainer>
            <TaskCheckBox onClick={toogleIsDoneTask}>
                {taskIsCompleted ? (
                    <ImCheckboxChecked />
                ) : (
                    <ImCheckboxUnchecked />
                )}
            </TaskCheckBox>
        </TaskCheckBoxContainer>
    );
}

function mapStateToProps(state) {
    return {
        tasksList: state.task.tasksList,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateTask: (taskId, data, tasksList) => dispatch(updateTask(taskId, data, tasksList))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckBox);

CheckBox.propTypes = {
    taskId: PropTypes.string.isRequired,
    taskName: PropTypes.string.isRequired,
    taskIsCompleted: PropTypes.number.isRequired,
    tasksList: PropTypes.array.isRequired,
    updateTask: PropTypes.func.isRequired
};

const TaskCheckBoxContainer = styled.div`
    width: 20%;
    text-align: center;
`;

const TaskCheckBox = styled.div`
    cursor: pointer;
`;