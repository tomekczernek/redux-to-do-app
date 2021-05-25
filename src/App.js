import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import styled from 'styled-components';

import TasksContainer from './task/container/TasksContainer';
import HeaderContainer from './task/container/HeaderContainer';
import rootReducer from './rootReducer';

function App() {

  const store = createStore(rootReducer, applyMiddleware(thunk));

  return (
    <Provider store={store}>
      <AppContainer>
        <AppBody>
          <HeaderContainer />
          <TasksContainer />
        </AppBody>
      </AppContainer>
    </Provider>
  );
}

const AppContainer = styled.div`
  background-color: #282c34;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 1.25rem;
  color: white;
`;

const AppBody = styled.div`
  width: 50vw;
  margin: 3rem 0;
  @media (max-width: 768px) {
    width: 90vw;
    margin: 1rem 0;
    font-size: 1rem;
  }
`;

export default App;
