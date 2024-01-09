import React, { useState } from 'react';
import { atom, useAtom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import {projectName} from './UserPage.js'
import Header from './Header.js';

interface Assignment {
  id: string;
  title: string;
  isComplete: boolean;
}

const assignmentsAtom = atom<Assignment[]>([]);

function CreateProjectPage() {
    const [name, setName] = useAtom(projectName);
    const [assignments, setAssignments] = useAtom(assignmentsAtom);
    const [newAssignmentTitle, setNewAssignmentTitle] = useState('');

    const addAssignment = () => {
      const newAssignment = {
        id: uuidv4() , 
        title: newAssignmentTitle,
        isComplete: false
      };
      setAssignments([...assignments, newAssignment]);
      setNewAssignmentTitle('');
    };

    const toggleComplete = (id: string) => {
      setAssignments(assignments.map(a => 
        a.id === id ? {...a, isComplete: !a.isComplete} : a
      ));
    };

    const deleteAssignment = (id: string) => {
      setAssignments(assignments.filter(a => a.id !== id));
    };

    return (
      <>
        <Header/>
        <div className='flex justify-center mt-6 md:mt-12'>
        <div className='w-full max-w-md p-6'> {/* Adjust max width as needed */}
          <h1 className='text-3xl font-bold mb-4'>{name}</h1>
          <div className='flex gap-4 mb-4'>
            <input
              type="text"
              value={newAssignmentTitle}
              onChange={(e) => setNewAssignmentTitle(e.target.value)}
              placeholder="New Assignment"
              className='p-2 border border-gray-300 rounded'
            />
            <button 
              onClick={addAssignment} 
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Add Assignment
            </button>
          </div>          
            {assignments.map((assignment) => (
              <div key={assignment.id} className='flex items-center gap-4 mb-2'>
                <span 
                  className={`flex-1 ${assignment.isComplete ? 'line-through' : ''}`}
                >
                  {assignment.title}
                </span>
                <button 
                  onClick={() => toggleComplete(assignment.id)}
                  className={`text-sm py-1 px-3 rounded ${assignment.isComplete ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
                >
                  {assignment.isComplete ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button 
                  onClick={() => deleteAssignment(assignment.id)}
                  className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm'
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </>
    );
}

 
       
  

export default CreateProjectPage;
