import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router';

import './App.css';
import NavBar from './components/common/NavBar/NavBar';
import Login from './views/Auth/Login/Login';
import StudentDetails from './views/student/StudentDetails/StudentDetails';
import StudentList from './views/student/StudentList/studentList';
//import TeacherDetails from './views/teacher/TeacherDetails/TeacherDetails';
//import TeacherList from './views/teacher/TeacherList/teacherList';
import Axios from './Axios';

function RequireAuth({ children }) {
  let location = useLocation();
  const user = localStorage.getItem('user');
  console.log(user);
  if (!user) {
    console.log('here');
    return (
      <Redirect
        to={{
          pathname: '/auth/login',
          state: { from: location },
        }}
      />
    );
  }

  return children;
}

const App = () => {
  const [user, setUser] = useState(null);

  const history = useHistory();

  const checkAuth = () => {
    try {
      const userStr = localStorage.getItem('user');
      const userObj = userStr && JSON.parse(userStr);
      if (userObj) {
        setUser(userObj);
      }
    } catch (e) {}
  };
  const Home = () => {

    return (

      <>
        <section className="hero-section" text-allign= "center">
          <p>Welcome to </p>
          <h2>Student Performance Management System</h2>
        </section>
      </>
    );
  };

  const onLogin = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const onLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    history.push('/auth/login');
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div>
      <NavBar user={user} onLogout={onLogout} />
      <Container>
        <Switch>
        <Route
        path='/home'
           //exact component={() => <Redirect to='/home' />} 
           render={() => (
            <Home/>
            
          )}
/>
          <Route
            exact
            path='/Admin'
            render={() => (
              <RequireAuth>
                <StudentList />
              </RequireAuth>
            )}
          />
          <Route
            path='/students/details/:rollNo'
            render={() => (
              <RequireAuth>
                <StudentDetails />
              </RequireAuth>
            )}
          />
          <Route
            exact
            path='/Student'
            render={() => (
              <RequireAuth>
          
              </RequireAuth>
            )}
          />
          <Route
            path='/auth/login'
            component={(props) => <Login {...props} onLogin={onLogin} />}
          />
        </Switch>
      </Container>
    </div>
  );
};

export default App;
