import React from 'react';
import { connect } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getUsers } from '../../../../actions/register';

import './styles.less';

class UserList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch(getUsers());
  }
  render() {
    const { users } = this.props;
    return (
      <div>
        <h2>User Table</h2>
        <Button bsStyle="primary"><Link to="user/create">Create User</Link></Button>
        <Table striped bordered condensed hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(u =>
                (
                  <tr key={`${u.username}`}>
                    <td> {u.name} </td>
                    <td> {u.username} </td>
                    <td> {u.email} </td>
                    <td>
                      <Button bsStyle="success"><Link to={`user/${u.id}`}>Edit</Link></Button>
                      <Button bsStyle="danger">Delete</Button>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </Table>
      </div>
    );
  }
}

export default connect(state => state.register)(UserList);
