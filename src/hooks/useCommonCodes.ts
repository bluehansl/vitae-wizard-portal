import { useState, useEffect } from 'react';
import { CommonCode, CommonCodeCategory, DEFAULT_COMMON_CODES } from '@/types/commonCode';

const STORAGE_KEY = 'commonCodes';

export const useCommonCodes = () => {
  const [commonCodes, setCommonCodes] = useState<CommonCode[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setCommonCodes(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse stored common codes:', error);
        initializeDefaultCodes();
      }
    } else {
      initializeDefaultCodes();
    }
  }, []);

  const initializeDefaultCodes = () => {
    const codes = DEFAULT_COMMON_CODES.map(code => ({
      ...code,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    setCommonCodes(codes);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(codes));
  };

  const saveCommonCodes = (newCodes: CommonCode[]) => {
    setCommonCodes(newCodes);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newCodes));
  };

  const addCommonCode = (code: Omit<CommonCode, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCode: CommonCode = {
      ...code,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const newCodes = [...commonCodes, newCode];
    saveCommonCodes(newCodes);
  };

  const updateCommonCode = (updatedCode: CommonCode) => {
    const newCodes = commonCodes.map(code => 
      code.id === updatedCode.id ? { ...updatedCode, updatedAt: new Date().toISOString() } : code
    );
    saveCommonCodes(newCodes);
  };

  const deleteCommonCode = (id: string) => {
    const newCodes = commonCodes.filter(code => code.id !== id);
    saveCommonCodes(newCodes);
  };

  const getCommonCodesByCategory = (category: CommonCodeCategory) => {
    return commonCodes
      .filter(code => code.category === category && code.isActive)
      .sort((a, b) => a.order - b.order);
  };

  const getAllCommonCodesByCategory = (category: CommonCodeCategory) => {
    return commonCodes
      .filter(code => code.category === category)
      .sort((a, b) => a.order - b.order);
  };

  return {
    commonCodes,
    addCommonCode,
    updateCommonCode,
    deleteCommonCode,
    getCommonCodesByCategory,
    getAllCommonCodesByCategory
  };
};