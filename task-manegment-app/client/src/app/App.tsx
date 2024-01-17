import React from 'react';
import styles from './app.module.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './componnents/HomePage.js';
import SignIn from './componnents/SignIn.js';
import './App.css'
import UserPage from './componnents/UserPage.js';
import Register from './componnents/Register.js';
import Projects from './componnents/Projects.js';
import {main} from './trpc.js';
import CreateProjectPage from './componnents/CreateProjectPage.js';


main()
export function App() {
  return (
    <>
    <div className={styles.body}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/CreateProjectPage" element={<CreateProjectPage />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
          </div>
    </>
  );
}

export default App;
