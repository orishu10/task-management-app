import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { projectsAtom } from '../Atoms.js';
import { Project } from '../trpc.js';
import { seeProjects } from '../trpc.js';

function AllProjects() {
    const [projects, setProjects] = useAtom(projectsAtom);
    const [error, setError] = useState<string | null>(null);

    const getProjects = async () => {
        console.log('View Projects Clicked');
        try {
            const data = await seeProjects();
            console.log(data, 'projects data');
            setProjects(data);
        } catch (error) {
            console.error('Error loading projects:', error);
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    useEffect(() => {
        getProjects();
    }, []);

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!projects || projects.length === 0) {
        return <p>Loading projects...</p>;
    }
   
        return (
            <div className="container mx-auto p-4">
                <ul className="space-y-4">
                    {projects.map((project: Project, i) => (
                        <li key={i} className="p-4 border border-gray-200 rounded shadow"> 
                            <h3 className="text-xl font-bold text-blue-600 mb-2">{project.title}</h3>
                            <ul className="list-inside list-disc pl-4">
                                {project.assignments}


                                {/* {project.assignments && project.assignments.length > 0 ? (
                                    project.assignments.map((assignment, index) => (
                                        <li key={index} className="text-gray-700">{assignment}</li> 
                                    ))
                                ) : (
                                    <li className="text-gray-700">Test Assignment</li> 
                                )} */}
                            </ul>
                        </li> 
                    ))}
                </ul>
            </div>
        );
    }
    
    export default AllProjects;
    