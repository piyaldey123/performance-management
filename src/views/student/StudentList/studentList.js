import React, { useEffect, useState } from 'react';
import Customtable from '../../../components/common/customTable';
import { getStudents } from '../../../api/fakeapi';
import { Button, FormControl, Form, Row, Col, Badge } from 'react-bootstrap';
import './studentList.css';
import AppModal from '../../../components/common/Modal/Modal';
import Registration from '../../../components/student/AddStudentForm/AddStudentForm';

const StudentList = () => {
  const [showAddStudent, setShowAddStudent] = useState(false);

  const [attendence, setAttendence] = useState({});
  const [result, setResult] = useState({});

  const [state, setState] = useState({
    studentList: [],
    allStudents: [],
    studentLoading: false,
    headingArray: [
      'User_name',
      'email_id',
      'Role',
      'contact Number',
      'User_id',
      'password',
    ],
  });

  useEffect(() => {
    console.log('componentDidMount called');
    setState({ ...state, studentLoading: true });

    getStudents().then((stdList) => {
      setState({
        ...state,
        studentLoading: false,
        studentList: stdList,
        allStudents: stdList,
        showAttendance: false,
      });
      // ** first we create empty object then we filter each studernt on the base of roll number and store it in attendanceObj
      /*const attendenceObj = {};
      stdList.forEach((std) => {
        attendenceObj[std.user_id] = '';
      });
      console.log(attendenceObj);
      setAttendence(attendenceObj);*/
    });
  }, []);

  const onDeleteHandler = (user_id) => {
    let reformedStudentList = [...state.studentList];
    reformedStudentList = reformedStudentList.filter((student) => {
      return student.user_id != user_id;
    });
    setState({ ...state, studentList: reformedStudentList });
  };
  const getMaximumuser_id = () => {
    let maximum = 0;

    for (let i = 0; i < state.studentList.length; i++) {
      const student = state.studentList[i];
      if (student.user_id > maximum) {
        maximum = student.user_id;
      }
    }
    return maximum;
  };
  const addNewStudent = () => {
    let maximumRollNumber = getMaximumuser_id();
    let newStudentuser_id = maximumRollNumber + 1;
    let newStudentList = [...state.studentList];
    newStudentList.push({
      name: 'Umer',
      DOB: 'Akram',
      section: '2',
      phone: '03224563212',
      user_id: newStudentuser_id,
    });
    setState({ ...state, studentList: newStudentList });
  };
  const onChangeHandler = (e) => {
    const query = e.target.value;

    if (!e.target.value) {
      setState({ ...state, studentList: state.allStudents });
      return;
    }

    let filteredStdList = [...state.allStudents];
    filteredStdList = filteredStdList.filter(
      (student) =>
        student.name.toLowerCase().includes(query.toLowerCase()) ||
        student.phone.includes(query.toLowerCase())
    );

    setState({ ...state, studentList: filteredStdList });
  };

  const onResetHandler = () => {
    setState({ ...state, studentList: state.allStudents });
  };

  const onSectionChange = (e) => {
    if (!e.target.value) {
      setState({ ...state, studentList: state.allStudents });
      return;
    }
    let filteredStdList = [...state.allStudents];
    filteredStdList = filteredStdList.filter(
      (student) => student.section == e.target.value
    );

    setState({ ...state, studentList: filteredStdList });
  };

  return (
    <div>
      <div className='mt-3'>
        <div className='d-flex flex-row justify-content-between'>
          <Button size='sm' variant='warning' onClick={onResetHandler}>
            Reset Button
          </Button>
          <Button
            className='float-end'
            variant='primary'
            onClick={() => setShowAddStudent(true)}
          >
            Add New Student
          </Button>
        </div>
        <Row className='mt-4'>
          <Col>
            <FormControl
              placeholder='Username'
              aria-label='Username'
              aria-describedby='basic-addon1'
              className='search-bar'
              placeholder='Enter here for search'
              onChange={onChangeHandler}
            />
          </Col>
          
        </Row>
      </div>
      <div>
        <Customtable
          headingArray={state.headingArray}
          list={state.studentList}
          linkKey={'name'}
          link={{
            to: '/students/details',
          }}
          uniqueTrait='user_id'
          onDeleteHandler={onDeleteHandler}
          addNewStudent={addNewStudent}
          renderActions={(user_id) => {
            return (
              <>
                {/* <ButtonGroup aria-label='Basic example'> */}
                {/* if one has already marked attendence then it will show as present or absent otherwise button will be shown */}
                {attendence[user_id] === 'present' ? (
                  <Badge bg='success' text='light'>
                    Present
                  </Badge>
                ) : (
                  <Button
                    className='mx-2'
                    onClick={() => {
                      setAttendence({
                        ...attendence,
                        // there we do not want to change the whole attendance list that was in attendanceObj we only want to change that is clicked
                        [user_id]: 'present',
                      });
                    }}
                    variant='primary'
                  >
                    Present
                  </Button>
                )}
                {attendence[user_id] === 'absent' ? (
                  <Badge bg='warning' text='dark'>
                    Absent
                  </Badge>
                ) : (
                  <Button
                    className='mx-2'
                    onClick={() => {
                      setAttendence({
                        ...attendence,
                        [user_id]: 'absent',
                      });
                    }}
                    variant='secondary'
                  >
                    Absent
                  </Button>
                )}



                {result[user_id] === 'pass' ? (
                  <Badge bg='success' text='light'>
                    pass
                  </Badge>
                ) : (
                  <Button
                    className='mx-2'
                    onClick={() => {
                      setResult({
                        ...result,
                        // there we do not want to change the whole attendance list that was in attendanceObj we only want to change that is clicked
                        [user_id]: 'pass',
                      });
                    }}
                    variant='primary'
                  >
                    Pass
                  </Button>
                )}
                {result[user_id] === 'fail' ? (
                  <Badge bg='warning' text='dark'>
                    Fail
                  </Badge>
                ) : (
                  <Button
                    className='mx-2'
                    onClick={() => {
                      setResult({
                        ...result,
                        [user_id]: 'fail',
                      });
                    }}
                    variant='secondary'
                  >
                    Fail
                  </Button>
                )}
                {/* </ButtonGroup> */}
              </>
            );
          }}
        />
      </div>
      <AppModal
        heading={'Add new student'}
        show={showAddStudent}
        onHide={() => setShowAddStudent(false)}
      >
        <Registration
          onAdd={(studentList) => {
            setState({
              ...state,
              studentList: studentList,
              allStudents: studentList,
            });
            setShowAddStudent(false);
          }}
        />
      </AppModal>
    </div>
  );
};

export default StudentList;
