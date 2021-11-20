const studentsList = [

];

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

export const getStudentByRollNo = (rollNo) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(studentsList.find((student) => student.rollNo == rollNo));
    }, 2000);
  });
};

export const addStudent = async (student) => {
  return await getStudents([...studentsList, student], 2000);
};

const teacherList = [
  
];

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
export const getTeacherByEmail = (email) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(teacherList.find((teacher) => teacher.email == email));
    }, 2000);
  });
};

export const addTeacher = async (teacher) => {
  return await getTeachers([...teacherList, teacher], 2000);
};

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
