import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Login from './pages/login/login'
import Admin from './pages/admin/admin'

function App() {
  return (
    <BrowserRouter>
      {/*只配置其中一个*/}
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/' component={Admin}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
