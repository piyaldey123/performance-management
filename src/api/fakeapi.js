import axios from "axios";

const studentsList = () => async () => {
  const student = await axios.get(`https://localhost:9091/student`);
};

export const getStudents = (students) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (students?.length > 0) {
        resolve(students);
      } else {
        resolve(studentsList);
      }
    }, 2000);
  });
};

export const getStudentByuser_id = (user_id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(studentsList.find((student) => student.user_id == user_id));
    }, 2000);
  });
};

export const addStudent = async (student) => {
  return await getStudents([...studentsList, student], 2000);
};

const teacherList = () => async () => {
  const teachers = await axios.get(`https://localhost:9091`);
};

export const getTeachers = (teachers) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (teachers?.length > 0) {
        resolve(teachers);
      } else {
        resolve(teacherList);
      }
    }, 2000);
  });
};
/*export const getTeacherByEmail = (email) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(teachers.find((teacher) => teacher.email == email));
    }, 2000);
  });
};*/



const users = [
];

export function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        ...users.find(
          (user) => user.username === username && user.password === password
        ),
        token: 'faketoken:::',
      });
    }, 2000);
  });
}
