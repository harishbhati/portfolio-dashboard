import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './store/slices/userSlice';
import Account from './components/Account';
import Profile from './components/account/Profile';
import UpdateProfile from './components/account/UpdateProfile';
import UpdatePassword from './components/account/UpdatePassword';
import 'react-toastify/dist/ReactToastify.css';
import Messages from './components/Messages';
import AddTimeline from './components/AddTimeline';
import AddSkill from './components/AddSkill';
import AddApplication from './components/AddApplication';
import AddProject from './components/AddProject';
import Dashboard from './components/Dashboard';
import ManageProjects from './pages/ManageProjects';
import ManageSkills from './pages/ManageSkills';
import ManageTimeline from './pages/ManageTimeline';
import ManageSoftware from './pages/ManageSoftware';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isAuthenticated) {
      dispatch(getUser());
    }
  }, [dispatch, isAuthenticated]);
    

  return (
     <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        {/* Protected Routes */}
        {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/" element={<HomePage />}>
            <Route index element={<Dashboard />} />

            <Route path="account" element={<Account />}>
              <Route index element={<Profile />} />
              <Route path="updateProfile" element={<UpdateProfile />} />
              <Route path="updatePassword" element={<UpdatePassword />} />
            </Route>

            <Route path="messages" element={<Messages />} />
            <Route path="timeline" element={<AddTimeline />} />
            <Route path="skill" element={<AddSkill />} />
            <Route path="application" element={<AddApplication />} />
            <Route path="project" element={<AddProject />} />
          </Route>

          <Route path="manage/projects" element={<ManageProjects />} />
          <Route path="manage/skills" element={<ManageSkills />} />
          <Route path="manage/timeline" element={<ManageTimeline />} />
          <Route path="manage/software" element={<ManageSoftware />} />
        {/* </Route> */}

      </Routes>

      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  );
}

export default App;
