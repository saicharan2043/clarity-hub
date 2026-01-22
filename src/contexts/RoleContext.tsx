import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'trainer' | 'user' | null;

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  userName: string;
  setUserName: (name: string) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>('trainer'); // Default to trainer for demo
  const [userName, setUserName] = useState('John Trainer');

  return (
    <RoleContext.Provider value={{ role, setRole, userName, setUserName }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
