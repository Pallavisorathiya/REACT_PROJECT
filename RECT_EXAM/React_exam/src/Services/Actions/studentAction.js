import axios from "axios";

export const loading = () => ({ type: "LOADING" });

export const addStudentSUC = () => ({ type: "ADD_STUDENT_SUC" });
export const addStudentRej = (err) => ({ type: "ADD_STUDENT_REJ", payload: err });

export const getAllStudents = (data) => ({ type: "GET_ALL_STUDENTS_SUC", payload: data });
export const getStudentsRej = (err) => ({ type: "GET_ALL_STUDENTS_REJ", payload: err });

export const getStudent = (data) => ({ type: "GET_STUDENT", payload: data });

export const updateStudent = () => ({ type: "UPDATE_STUDENT" });

// ✅ async thunk
export const getAllStudentAsync = () => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const res = await axios.get("http://localhost:3000/students");
      dispatch(getAllStudents(res.data));
    } catch (error) {
      console.error(error);
      dispatch(getStudentsRej(error.message));
    }
  };
};

export const addStudentAsync = (data) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      await axios.post("http://localhost:3000/students", data);
      dispatch(addStudentSUC());
      dispatch(getAllStudentAsync());
    } catch (error) {
      console.error(error);
      dispatch(addStudentRej(error.message));
    }
  };
};

export const deleteStudentAsync = (id) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      await axios.delete(`http://localhost:3000/students/${id}`);
      dispatch(getAllStudentAsync());
    } catch (error) {
      console.error(error);
      dispatch(addStudentRej(error.message));
    }
  };
};

export const getStudentAsync = (id) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const res = await axios.get(`http://localhost:3000/students/${id}`);
      dispatch(getStudent(res.data));
    } catch (error) {
      console.error(error);
      dispatch(addStudentRej(error.message));
    }
  };
};

export const updateStudentAsync = (data) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      await axios.put(`http://localhost:3000/students/${data.id}`, data);
      dispatch(updateStudent());
      dispatch(getAllStudentAsync());
    } catch (error) {
      console.error(error);
      dispatch(addStudentRej(error.message));
    }
  };
};



