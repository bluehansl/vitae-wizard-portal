import { useState, useEffect } from 'react';
import { Resume } from '@/types/resume';

const STORAGE_KEY = 'resumes';

export const useResumes = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setResumes(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse stored resumes:', error);
      }
    }
  }, []);

  const saveResumes = (newResumes: Resume[]) => {
    setResumes(newResumes);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newResumes));
  };

  const addResume = (resume: Resume) => {
    const newResumes = [...resumes, resume];
    saveResumes(newResumes);
  };

  const updateResume = (updatedResume: Resume) => {
    const newResumes = resumes.map(resume => 
      resume.id === updatedResume.id ? updatedResume : resume
    );
    saveResumes(newResumes);
  };

  const deleteResume = (id: string) => {
    const newResumes = resumes.filter(resume => resume.id !== id);
    saveResumes(newResumes);
  };

  const getResume = (id: string) => {
    return resumes.find(resume => resume.id === id);
  };

  return {
    resumes,
    addResume,
    updateResume,
    deleteResume,
    getResume
  };
};