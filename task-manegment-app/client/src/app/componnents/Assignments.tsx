import { useAtom } from 'jotai';
import { Assignment } from '../types/projects.js';

import React, { useEffect } from 'react';

import { SetStateAction } from 'jotai';

interface AssignmentsProps {
  assignments: Assignment[];
  setAssignments: (update: SetStateAction<Assignment[]>) => void;
}




 

function Assignments({ assignments, setAssignments }: AssignmentsProps) {


  const toggleComplete = async (id: string) => {
    console.log(id, ' Assignment');
    
    setAssignments(
      assignments.map((assignment: Assignment) =>
    
        assignment.id === id
          ? { ...assignment, isComplete: !assignment.isComplete }
          : assignment
      )
      
      
      );
  };

  const deleteAssignment = (id: string) => {
    setAssignments(assignments.filter((a) => a.id !== id));
  };

  return (
    <div>
      { assignments.filter((a) => !a.isComplete).map((assignment) => (
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
    </div>      ))}
    </div>
  );
}

export default Assignments
