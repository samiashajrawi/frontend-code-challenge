import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import './styles/App.scss';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import {ConfigureStore} from './redux/configureStore';
import { Provider } from 'react-redux';

const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App d-flex mx-auto flex-column justify-content-center p-sm-1 p-md-2">
          <Main />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
