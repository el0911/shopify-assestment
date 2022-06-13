import './App.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Dashboard from './components/dashboard';
import Login from './routes/login';
import Validate from './routes/validate';
import PopUpProvider from './providers/popUp.provider';


const PrivateRoute = ({ children, lost }) => {
  const authed = localStorage.getItem('accessToken')

  if (lost) {
    window.location.href = '/app';
  }

  if (!authed) {
    window.location.href = '/login';
  }
  return authed ? children : <div></div>

}


const NotPrivateRoute = ({ children, lost }) => {
  const authed = localStorage.getItem('accessToken')


  if (authed) {
    window.location.href = '/app';
  }
  else {
    return children
  }


}


function App() {


  return (
    <div className="App">

      <PopUpProvider>
        <Router>

          <Routes>
            <Route exact path="/app" element={
              <PrivateRoute >
                <Dashboard />
              </PrivateRoute>
            } />
            <Route exact path="/login" element={
              <NotPrivateRoute>
                <Login />
              </NotPrivateRoute>
            } />
            <Route
              exact
              path="*"
              element={
                <PrivateRoute lost >
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>

        </Router>
      </PopUpProvider>


    </div >
  );
}

export default App;
