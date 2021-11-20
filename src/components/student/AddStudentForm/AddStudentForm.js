import React, { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { addStudent } from '../../../api/fakeapi';
import { checkValidity } from '../../../utility';

export default function AddStudentForm(props) {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    fullName: {
      value: '',
      valid: undefined,
      rules: {
        required: true,
        minLength: 3,
      },
    },
    DOB: {
      value: '',
      valid: undefined,
      rules: {
        required: true,
        minLength: 3,
      },
    },
    rollNumber: {
      value: '',
      valid: undefined,
      rules: {
        isNumeric: true,
        minLength: 3,
      },
    },
    section: {
      value: '',
      valid: undefined,
      rules: {
        required: true,
        isNumeric: true,
      },
    },
    phoneNumber: {
      value: '',
      valid: undefined,
      rules: {
        required: true,
        isNumeric: true,
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
        name: state.fullName.value,
        DOB: state.DOB.value,
        section: state.section.value,
        phone: state.phoneNumber.value,
        rollNo: state.rollNumber.value,
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
        <Form.Label className='mt-2'>Full Name</Form.Label>
        <Form.Control
          value={state.fullName.value}
          isValid={state.fullName.valid}
          name='fullname'
          onChange={(e) => onChangeHandler(e, 'fullName')}
          placeholder='Enter full name'
        />
        <Form.Label className='mt-2'>Date of Birth</Form.Label>
        <Form.Control
          value={state.DOB.value}
          isValid={state.DOB.valid}
          name='DOB'
          onChange={(e) => onChangeHandler(e, 'DOB')}
          placeholder='Enter DOB'
        />
         <Form.Select
          value={state.section.value}
          isValid={state.section.valid}
          onChange={(e) => onChangeHandler(e, 'section')}
          name='section'
          className='mt-2'
          aria-label='Default select example'
        >
          <option>Select Gender</option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
          <option value='Others'>Others</option>
        </Form.Select>
        <Form.Label className='mt-2'>Phone Number</Form.Label>
        <Form.Control
          value={state.phoneNumber.value}
          isValid={state.phoneNumber.valid}
          name='phno'
          onChange={(e) => onChangeHandler(e, 'phoneNumber')}
          placeholder='Enter phone number'
        />
        <Form.Label className='mt-2'>Roll Number</Form.Label>
        <Form.Control
          value={state.rollNumber.value}
          isValid={state.rollNumber.valid}
          name='rno'
          onChange={(e) => onChangeHandler(e, 'rollNumber')}
          placeholder='Enter roll number'
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
