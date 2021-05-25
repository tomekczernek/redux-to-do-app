import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import api from '../../../api';

import { ImCheckmark, ImMinus } from 'react-icons/im';

export default function TaskForm({ setTasksList, tasksList, setOpenAddForm }) {

    const [taskName, setTaskName] = useState('');

    const handleChangeTaskName = (event) => {
        setTaskName(event.target.value);
    };

    const handleSaveTaskForm = (event) => {

        const data = new FormData();
        data.append('id', '');
        data.append('task', taskName);
        data.append('is_completed', 0);

        api.post('', data).then(response => {
            setTasksList([...tasksList, response.data.data[0]]);
            setOpenAddForm(false);
        }).catch(error => {
            console.log(error.response);
        });

        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <FormContainer>
            <ImageFormContainer>
                <ImMinus className="pointer" onClick={() => setOpenAddForm(false)} />
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
    );
}

const FormContainer = styled.div`
    background-color: #004080;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-top: solid 2px white;
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

TaskForm.propTypes = {
    setTasksList: PropTypes.func.isRequired,
    tasksList: PropTypes.array.isRequired,
    setOpenAddForm: PropTypes.func.isRequired
};
