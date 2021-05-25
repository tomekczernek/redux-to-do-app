import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchCompleted, toggleOpenForm, fetchTasks } from '../redux';
import { ImPlus, ImCog } from 'react-icons/im';

function HeaderContainer({ tasksList, showDoneTasks, fetchCompleted, toggleOpenForm, fetchTasks }) {

    const handleShowDoneTasks = () => {

        if (showDoneTasks) {
            fetchTasks();
        }
        else {
            fetchCompleted(tasksList);
        }
    };

    return (
        <Container tasksList={tasksList}>
            <HeaderBtn onClick={() => toggleOpenForm(true)}>
                <ImPlus />
            </HeaderBtn>
            <HeaderTitle>To-do-app</HeaderTitle>
            <HeaderBtnGear showDoneTasks={showDoneTasks} >
                <ImCog onClick={handleShowDoneTasks} />
            </HeaderBtnGear>
        </Container>
    );
}

function mapStateToProps(state) {
    return {
        tasksList: state.task.tasksList,
        showDoneTasks: state.task.showDoneTasks
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchCompleted: (data) => dispatch(fetchCompleted(data)),
        toggleOpenForm: (data) => dispatch(toggleOpenForm(data)),
        fetchTasks: () => dispatch(fetchTasks())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderContainer);

HeaderContainer.propTypes = {
    tasksList: PropTypes.array.isRequired,
    showDoneTasks: PropTypes.bool.isRequired,
    fetchCompleted: PropTypes.func.isRequired,
    toggleOpenForm: PropTypes.func.isRequired,
    fetchTasks: PropTypes.func.isRequired
};

const Container = styled.div`
    background-color: #004080;
    display: flex;
    height: 80px;
    justify-content: space-between;
    align-items: center;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: ${props => props.tasksList.length ? 'none' : '5px'};
    border-bottom-right-radius: ${props => props.tasksList.length ? 'none' : '5px'};
    @media (max-width: 768px) {
        height: 60px;
    }
`;

const HeaderTitle = styled.p`
    font-weight: bold;
    font-size: 1.5rem;
    @media (max-width: 768px) {
        font-size: 1.25rem;
    }
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
    color: ${props => props.showDoneTasks ? '#ff3399' : '#FFF'}; 
    border-color: ${props => props.showDoneTasks ? '#ff3399' : '#FFF'};
    &:hover{
        background-color: ${props => props.showDoneTasks ? '#ff3399' : '#FFF'};
    }
`;