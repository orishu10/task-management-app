import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import { assignmentsAtom, descriptionAtom, projectNameAtom ,projectIdAtom} from '../Atoms.js';
import Header from './Header.js';
import { addAssignmentsToProject, getProject } from '../trpc.js';
import { Assignment } from '../types/projects.js';
import { OpenLayersmap } from './OpenLayerMap.js';

function CreateProjectPage() {
  const [name, setName] = useAtom(projectNameAtom);
  const [assignments, setAssignments] = useAtom(assignmentsAtom);
  const [description, setDescription] = useAtom(descriptionAtom);
  const [projectId, setprojectid] = useAtom(descriptionAtom);
  const [showMap, setShowMap] = useState(false);
  const [newAssignmentTitle, setNewAssignmentTitle] = useState('');

  useEffect(() => {
    setName(localStorage.getItem('title') || name);
    getProject({
      project_id: localStorage.getItem('project') || '',
    });
  }, []);

  const addAssignment = () => {
    const newAssignment = {
      id: uuidv4(),
      title: newAssignmentTitle,
      description : description,
      isComplete: false,
    };
    const updatedAssignments = [...assignments, newAssignment];
    setAssignments(updatedAssignments);
    addAssignmentsToProject({
      title: name,
      assignments: updatedAssignments,
      user_id: localStorage.getItem('user id') || '',
      project_id: localStorage.getItem('ProjectId') || projectId,
    });
    setNewAssignmentTitle('');
  };

  const toggleMapVisibility = () => {
    setShowMap(!showMap);
  };

  const toggleComplete = async (id:string) => {
    setAssignments(assignments.map((assignment:Assignment) =>
      assignment.id === id ? { ...assignment, isComplete: !assignment.isComplete } : assignment
    ));
  // const data = await addAssignmentsToProject({
  //     title: name,
  //     user_id: localStorage.getItem('userId') || '',
  //     assignments: assignments,
  //     project_id: localStorage.getItem('ProjectId') || projectId,
  //   });
  //   console.log(data);
    
  };

  const deleteAssignment = (id:string) => {
    setAssignments(assignments.filter((a) => a.id !== id));
  };

  const renderAssignment = (assignment:Assignment) => (
    <div key={assignment.id} className="flex items-center justify-between gap-4 mb-2 p-2 border-b border-gray-200">
      <span className={`flex-1 ${assignment.isComplete ? 'line-through text-gray-400' : 'text-gray-800'}`}>
        {assignment.title}
      </span>
      <button
        onClick={() => toggleComplete(assignment.id)}
        className={`text-sm py-1 px-3 rounded ${assignment.isComplete ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-green-400 hover:bg-green-500'} text-white`}
      >
        {assignment.isComplete ? 'Mark Incomplete' : 'Mark Complete'}
      </button>
      <button
        onClick={() => deleteAssignment(assignment.id)}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm"
      >
        Delete
      </button>
    </div>
  );

  return (
    <>
      <Header />

      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center my-8">{name || 'Project Title'}</h1>

        <div className="flex flex-col md:flex-row gap-8 justify-center mt-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Create New Assignment</h2>
            <div className="mb-4">
              <input
                type="text"
                value={newAssignmentTitle}
                onChange={(e) => setNewAssignmentTitle(e.target.value)}
                placeholder="New Assignment Title"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-between items-center">
              <button onClick={addAssignment} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
                Add Assignment
              </button>
              <button onClick={toggleMapVisibility} className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
                {showMap ? "Hide Map" : "Show Map"}
              </button>
            </div>
          </div>

          {/* Pending and Completed Assignments Sections */}
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Pending Assignments</h2>
            {assignments.filter((a) => !a.isComplete).map(renderAssignment)}
          </div>

          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Completed Assignments</h2>
            {assignments.filter((a) => a.isComplete).map(renderAssignment)}
          </div>
        </div>

        {showMap && <div className="mt-8"><OpenLayersmap /></div>}
      </div>
    </>
  );
}

export default CreateProjectPage;
