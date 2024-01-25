import React, { useEffect, useState, useCallback } from 'react';
import { useAtom } from 'jotai';
import { projectsAtom } from '../Atoms.js';
import { seeProjectsByUserId } from '../trpc.js';
import { Assignment } from '../types/projects.js';
import Header from './Header.js';

function AllProjects() {
  const [projects, setProjects] = useAtom(projectsAtom);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  const getProjects = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const data = await seeProjectsByUserId({user_id:userId});
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
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <>
    <Header/>

    <h1 className="flex  justify-center mt-12 text-3xl "> My Projects </h1>
    <div className="flex flex-col md:flex-row gap-4 justify-center mt-6 md:mt-12">
    <ul className="space-y-4">
        {projects.map((project: any, i) => (
          <li key={i} className="p-4 border border-gray-200 rounded shadow">
            <h3 className="text-xl font-bold text-blue-600 mb-2">
              {project.title}
            </h3>
            <ul className="list-inside list-disc pl-4">
              {project.assignments && project.assignments.length > 0 ? (
                project.assignments.map((assignment:Assignment, index:number) => (
                  <li key={index} className="text-gray-700">
                    <li>{assignment.title}</li>
                  </li>
                ))
              ) : (
                <li className="text-gray-700">No Assignments</li>
              )}
            </ul>
          </li>
        ))}
      </ul>
    
    </div>
    </>

  );
}

export default AllProjects;
