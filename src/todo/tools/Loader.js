import Loader from "react-loader-spinner";
import styled from 'styled-components';

export default function TaskLoader() {
  return (
    <LoaderContainer>
      <Loader
        type="Rings"
        color="#004080"
        height={80}
        width={80}
        timeout={3000}
      />
    </LoaderContainer>
  );
};

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;