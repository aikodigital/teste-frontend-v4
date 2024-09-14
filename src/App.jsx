import { Provider } from 'react-redux';
import MainContainer from './components/MainContainer';
import GlobalStyle from './styles';

import store from './store';


function App() {
  return (
    <Provider store={store}>


        <GlobalStyle />
        <MainContainer/>


    </Provider>
  );
}

export default App;
