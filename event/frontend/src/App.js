import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventList from './components/screens/EventList';
import UserRegistration from './components/screens/UserRegistration';
import UserLogin from './components/screens/UserLogin';
import UserLogout from './components/screens/UserLogout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user/register/" component={UserRegistration} />
        <Route path="/user/login/" component={UserLogin} />
        <Route path="/user/logout/" component={UserLogout} />
        <Route path="/" component={EventList} />
      </Routes>
    </Router>
  );
}

export default App;
