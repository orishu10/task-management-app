import { atom } from 'jotai';
import { Project } from './types/projects.js';
import { Assignment } from './types/projects.js';

export const projectNameAtom = atom("");
export const showModalAtom = atom(false);
export const projectsAtom = atom<Project[]>([]);
export const isAuthenticatedAtom = atom(false);
export const emailAtom = atom("");
export const passwordAtom = atom("");
export const errorAtom = atom("");
export const loadingAtom = atom(false);
export const assignmentsAtom = atom<Assignment[]>([]);
export const projectIdAtom = atom('');
export const descriptionAtom = atom('');


