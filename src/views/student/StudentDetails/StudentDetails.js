import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getStudentByuser_id } from '../../../api/fakeapi';
import StudendDetailsReport from '../../../components/student/StudentDetailsReport/StudentDetailsReport';

export default function StudentDetails() {
  const { user_id } = useParams();

  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user_id) {
      setLoading(true);
      getStudentByuser_id(user_id)
        .then((student) => {
          setStudent(student);
          setLoading(false);
        })
        .catch((err) => {
          console.log('get student by user id', user_id);
          setLoading(false);
        });
    }
  }, [user_id]);

  return (
    <div>
      <StudendDetailsReport loading={loading} student={student} />
    </div>
  );
}
