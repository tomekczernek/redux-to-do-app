import PropTypes from 'prop-types';
import styled from 'styled-components';

import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im';

export default function CheckBox({ toogleIsDoneTask, taskIsDone}) {

    return (
        <TaskCheckBoxContainer>
            <TaskCheckBox onClick={toogleIsDoneTask}>
                {taskIsDone ? (
                    <ImCheckboxChecked />
                ) : (
                    <ImCheckboxUnchecked />
                )}
            </TaskCheckBox>
        </TaskCheckBoxContainer>
    );
}

const TaskCheckBoxContainer = styled.div`
    width: 20%;
    text-align: center;
`;

const TaskCheckBox = styled.div`
    cursor: pointer;
`;

CheckBox.propTypes = {
    toogleIsDoneTask: PropTypes.func.isRequired,
    taskIsDone: PropTypes.number.isRequired
};
