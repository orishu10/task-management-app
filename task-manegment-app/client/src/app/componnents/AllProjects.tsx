import React, { useEffect, useState, useCallback } from 'react';
import { useAtom } from 'jotai';
import { projectsAtom } from '../Atoms.js';
import { seeProjectsByUserId } from '../trpc.js';
import { useNavigate } from 'react-router-dom';
import { Project } from '../types/projects.js';
import Header from './Header.js';

function AllProjects() {
  const [projects, setProjects] = useAtom(projectsAtom);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const nav = useNavigate();

  const navigateToProject = (project: Project) => () => {
    localStorage.setItem('projectId', project.project_id || '');
    nav('/CreateProjectPage');
  };

  const getProjects = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const data = await seeProjectsByUserId({ user_id: userId });
      setProjects(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }, [userId, setProjects]);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      getProjects();
    }
  }, [getProjects]);

  if (isLoading) {
    return <p className="text-center mt-20">Loading projects...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center mt-20">Error: {error}</p>;
  }

  return (
    <>
      <Header />
      <h1 className="text-3xl font-semibold text-center mt-12 mb-6 text-gray-800">My Projects</h1>
      <div className="flex flex-wrap justify-center gap-8 mt-6">
        {projects.map((project, i) => (
          <div key={i} className="p-6 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out w-full md:w-5/12">
            <h3 className="text-xl font-bold text-blue-600 mb-2">{project.title}</h3>
            <div className="flex flex-col justify-between h-full">
              {/* <p className="text-gray-600 mb-4">{project}</p> Assuming there's a description to add some content */}
              <button
                onClick={navigateToProject(project)}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow hover:shadow-md transition ease-in-out duration-150 self-end"
              >
                Go to Project
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AllProjects;
