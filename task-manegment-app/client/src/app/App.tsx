import React from 'react';
import styles from './app.module.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './componnents/HomePage.js';
import SignIn from './componnents/SignIn.js';
import './App.css'
import UserPage from './componnents/UserPage.js';
import Register from './componnents/Register.js';
import Projects from './componnents/Projects.js';
import {createProject} from './trpc.js';
import CreateProjectPage from './componnents/CreateProjectPage.js';
import { useAtom } from 'jotai';
import {isAuthenticatedAtom  } from './Atoms.js';

import Unauthenticated from './componnents/Unauthenticated.js';
import AllProjects from './componnents/AllProjects.js';

const App = () => {

  return (
    <div className={styles.body}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        {isAuthenticatedAtom ? (
          <Route path="/userpage" element={<UserPage />} />
        ) : (
          <Route path="/userpage" element={<Unauthenticated />} /> 
        )}
        <Route path="/register" element={<Register />} />
        <Route path="/AllProjects" element={<AllProjects />} />
        <Route path="/CreateProjectPage" element={<CreateProjectPage />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </div>
  );
};

export default App;
