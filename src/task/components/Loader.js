import styled from 'styled-components';

export default function Loader() {
    return (
        <LoaderContainer>
            <LoaderMessage>
                Daj mi chwilę...
            </LoaderMessage>
        </LoaderContainer>
    );
}

const LoaderContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #004080;
    opacity: 0.95;
    z-index: 1;
`;

const LoaderMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFF;
    height: 100%;
    z-index: 2;
`;