import React from 'react';
import find from 'lodash/find';
import omit from 'lodash/omit';
import * as Validators from '../../../untils/validation';

function ValidateForm(data) {
  return function FormData(Form) {
    return class RenderForm extends React.Component {
      constructor() {
        super();
        this.state = {
          valueForm: data,
          validated: false,
          form: {
            value: {},
            error: {}
          }
        };
      }
      onChange = (event) => {
        const { form } = this.state;
        const valueForm = {
          ...form,
          value: { ...form.value, [event.target.name]: event.target.value }
        };
        this.setState({ form: valueForm });
      };
      handleValidate = (event) => {
        const label = find(data, item => item.type === event.target.name);
        const { form } = this.state;
        if (label.validate.length) {
          const validateResult = this.validateField(label, event.target.value);
          form.error = validateResult[event.target.name].length
            ? Object.assign(form.error, validateResult)
            : omit(form.error, [event.target.name]);
        }
        this.setState(form);
      };
      validateField = (label, value) => {
        const error = [];
        label.validate.forEach((t) => {
          if (Validators[t](value)) error.push(Validators[t](value));
        });
        return { [label.type]: error };
      };
      validateForm = (callback: Function) => {
        const { form } = this.state;
        form.error = {};
        Object.keys(data).forEach((key) => {
          if (data[key].validate && data[key].validate.length) {
            form.error = (
              this.validateField(data[key], form.value[data[key].type])[data[key].type].length
              &&
              Object.assign(form.error, this.validateField(data[key], form.value[data[key].type])))
              || {};
          }
        });
        this.setState(form);
        return callback(form);
      };
      render() {
        return (
          <Form
            onChange={this.onChange}
            form={this.state.form}
            validated={this.state.validated}
            handleValidate={this.handleValidate}
            validateForm={this.validateForm}
            {...this.props}
          />
        );
      }
    };
  };
}
export default ValidateForm;
