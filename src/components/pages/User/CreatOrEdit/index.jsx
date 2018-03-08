import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';
import MyForm from '../../../common/FormValidate';
import { getUsers } from '../../../../actions/register';
import './styles.less';

const userDefault = {
  name: '',
  email: '',
  username: ''
};

const formData = [
  {
    type: 'name',
    validate: ['required']
  },
  {
    type: 'username',
    validate: ['required']
  },
  {
    type: 'email',
    validate: ['emailAddress']
  }
];

class CreateOrEditUser extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.validateForm((validate) => {
    });
  }
  fieldGroup = ({ id, label, help, ...props }) =>
    (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    )
  render() {
    const { users, form, onChange } = this.props;
    const { id } = this.props.match.params;
    const user = id ? users.find(u => u.id.toString() === id) : userDefault;
    return (
      <form onSubmit={this.handleSubmit} >
        <this.fieldGroup
          id="formControlsText"
          type="text"
          label="Name"
          placeholder="Enter name"
          value={form.value.name || user.name}
          onChange={onChange}
          name="name"
        />
        <this.fieldGroup
          id="formControlsEmail"
          type="text"
          label="Username"
          placeholder="Enter username"
          value={form.value.username || user.username}
          onChange={onChange}
          name="username"
        />
        <this.fieldGroup
          id="formControlsPassword"
          label="Email Address"
          placeholder="Enter email"
          type="email"
          value={form.value.password || user.email}
          onChange={onChange}
          name="email"
        />
        <FormGroup>
          <Button bsStyle="primary" type="submit">Save</Button>
        </FormGroup>
        <FormGroup>
          <Button bsStyle="info"><Link to="/">Cancel</Link></Button>
        </FormGroup>
      </form>
    );
  }
}


const createOrEditUserForm = MyForm(formData)(CreateOrEditUser);

export default connect(state => state.register)(createOrEditUserForm);
