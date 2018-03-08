import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import UserList from '../../pages/User/List';
import CreateOrEditUser from '../../pages/User/CreatOrEdit';
import './styles.less';

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" component={UserList} />
          <Route exact path="/user" component={UserList} />
          <Route path="/user/create" component={CreateOrEditUser} />
          <Route path="/user/:id" component={CreateOrEditUser} />
          <Redirect exact from="/" to="/user" />
        </Switch>
      </div>
    );
  }
}
