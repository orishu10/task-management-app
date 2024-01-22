import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import {
  projectNameAtom,
  showModalAtom,
  errorAtom,
} from '../Atoms.js';
import { createProject } from '../trpc.js';

export default function UserPage() {
  const [showModal, setShowModal] = useAtom(showModalAtom);
  const [error, setError] = useAtom(errorAtom);
  const [name, setName] = useAtom(projectNameAtom);
  const navigate = useNavigate();
  const style = 'p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-40';

  const handleCreateProject = () => {
    console.log('Create New Project Clicked');
    createProject({
      title: name,
      assignments: [],
      user_id: localStorage.getItem('user id') || '', 
    });
    setShowModal(true);
  };

  const handleViewProjects = async () => {
    console.log('View Projects Clicked');
    try {
      setShowModal(false);
      navigate('/AllProjects');
    } catch (error) {
      console.error('Error loading projects:', error);
      setError('Error loading projects');
    }
  };

  return (
    <>
      <header className="bg-gray-800 text-white p-4 text-center">
        <h1 className="text-3xl">Project Pulse</h1>
      </header>

      <div className="flex p-22 justify-center w-full flex-col items-center gap-4 my-10">
        <h2 className="text-xl">Manage Your Projects</h2>

        <div className="flex gap-4">
          <button className={style} onClick={handleCreateProject}>
            Create New Project
          </button>

          <button className={style} onClick={handleViewProjects}>
            View Projects
          </button>
        </div>

        {showModal && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-md">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/* Modal Header */}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                    <h3 className="text-2xl font-semibold">
                      Create New Project
                    </h3>
                    <button
                      className="ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/* Modal Body */}
                  <div className="relative p-6 flex-auto">
                    <form onSubmit={(e) => e.preventDefault()}>
                      <input
                        type="text"
                        value={name}
                        className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                        placeholder="Project Name"
                        name="projectName"
                        onChange={(e) => {
                          setName(e.target.value);
                          console.log(e.target.value);
                          // localStorage.setItem('projectName', e.target.value);
                        }}
                      />
                    </form>
                  </div>
                  {/* Modal Footer */}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => navigate('/CreateProjectPage')}
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        )}
      </div>
      <footer className="bg-gray-800 text-white p-4 text-center fixed bottom-0 w-full">
        <p>© 2024 Project Pulse. All rights reserved.</p>
      </footer>
    </>
  );
}
