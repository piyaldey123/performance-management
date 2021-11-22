import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { addStudent } from '../../../api/fakeapi';
import { checkValidity } from '../../../utility';

export default function AddStudentForm(props) {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    user_name: {
      value: '',
      valid: undefined,
      rules: {
        required: true,
        minLength: 3,
      },
    },
    email_id: {
      value: '',
      valid: undefined,
      rules: {
        required: true,
        minLength: 3,
      },
    },
    user_id: {
      value: '',
      valid: undefined,
      rules: {
        isNumeric: true,
        minLength: 3,
      },
    },
    role: {
      value: '',
      valid: undefined,
      rules: {
        required: true,
        isNumeric: true,
      },
    },
    contact_no: {
      value: '',
      valid: undefined,
      rules: {
        required: true,
        isNumeric: true,
      },
    },
    password: {
      value: '',
      valid: undefined,
      rules: {
        required: true,
        minLength: 8,

      },
      
    }, 
  });

  const onChangeHandler = (e, formKey) => {
    setState({
      ...state,
      [formKey]: {
        ...state[formKey],
        value: e.target.value,
        valid: checkValidity(e.target.value),
      },
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newStudentList = await addStudent({
        name: state.user_name.value,
        email_id: state.email_id.value,
        role: state.role.value,
        phone: state.contact_no.value,
        rollNo: state.user_id.value,
        password: state.password.value,
      });
      setLoading(false);
      props.onAdd(newStudentList);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <Form>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label className='mt-2'>User Name</Form.Label>
        <Form.Control
          value={state.user_name.value}
          isValid={state.user_name.valid}
          name='user_name'
          onChange={(e) => onChangeHandler(e, 'user_name')}
          placeholder='Enter user name'
        />
        <Form.Label className='mt-2'>email id</Form.Label>
        <Form.Control
          value={state.email_id.value}
          isValid={state.email_id.valid}
          name='email_id'
          onChange={(e) => onChangeHandler(e, 'email_id')}
          placeholder='Enter email_id'
        />
         <Form.Select
          value={state.role.value}
          isValid={state.role.valid}
          onChange={(e) => onChangeHandler(e, 'role')}
          name='role'
          className='mt-2'
          aria-label='Default select example'
        >
          <option>Select Role</option>
          <option value='Admin'>Admin</option>
          <option value='Student'>Student</option>
        </Form.Select>
        <Form.Label className='mt-2'>Contact Number</Form.Label>
        <Form.Control
          value={state.contact_no.value}
          isValid={state.contact_no.valid}
          name='phno'
          onChange={(e) => onChangeHandler(e, 'contact_no')}
          placeholder='Enter Contact number'
        />
        <Form.Label className='mt-2'>User ID</Form.Label>
        <Form.Control
          value={state.user_id.value}
          isValid={state.user_id.valid}
          name='rno'
          onChange={(e) => onChangeHandler(e, 'user_id')}
          placeholder='Enter user id'
        />
        <Form.Label className='mt-2'>Password</Form.Label>
        <Form.Control
          value={state.password.value}
          isValid={state.password.valid}
          name='password'
          onChange={(e) => onChangeHandler(e, 'password')}
          placeholder='Enter password'
        />
     
       

      </Form.Group>

      <Button
        disabled={loading}
        onClick={onSubmit}
        variant='primary'
        type='submit'
      >
        Submit
        {loading && (
          <Spinner
            className={'ms-2'}
            size='sm'
            animation='border'
            role='status'
          >
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        )}
      </Button>
    </Form>
  );
}
