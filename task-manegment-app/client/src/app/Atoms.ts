import { atom } from 'jotai';
import { Project } from './trpc.js';
import { Assignment } from './componnents/CreateProjectPage.js';

export const projectNameAtom = atom("");
export const showModalAtom = atom(false);
export const projectsAtom = atom<Project[]>([]);
export const isAuthenticatedAtom = atom(false);
export const emailAtom = atom("");
export const passwordAtom = atom("");
export const errorAtom = atom("");
export const loadingAtom = atom(false);
export const assignmentsAtom = atom<Assignment[]>([]);


