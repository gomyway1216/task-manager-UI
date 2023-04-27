import React, { FC, createContext, useEffect, useContext, useState, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { auth, signInWithEmail, signOutUser } from '../api/firebaseConnect';
import { User } from 'firebase/auth';

interface AuthContextValue {
  currentUser: User | null;
  userId: string;
  signIn: (email: string, password: string) => Promise<User>;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextValue>({
  currentUser: null,
  userId: '',
  signIn: () => Promise.reject(new Error("signIn not implemented")),
  signOut: () => {
    throw new Error("signOut not implemented");
  }
});

export const useAuth = () => {
  return useContext(AuthContext);
};


export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);

  const signIn = async (email: string, password: string) => {
    const user = await signInWithEmail(email, password);
    return user;
  };

  const signOut = () => {
    signOutUser();
    setUserId('');
    setCurrentUser(null);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setCurrentUser(user);
      setUserId(user ? user.uid : '');
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userId,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.any
};