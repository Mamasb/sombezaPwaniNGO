import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  name: string;
  role: string;
} | null;

const UserContext = createContext<{ user: User; setUser: React.Dispatch<React.SetStateAction<User>> } | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    setUser({ name: "Admin User", role: "admin" }); // just for example
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
