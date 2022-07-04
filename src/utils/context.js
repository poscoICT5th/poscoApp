import { useLocalObservable } from 'mobx-react-lite';
import React, { createContext } from 'react';

import createRootStore from '../store/index';


export const storesContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const store = useLocalObservable(createRootStore);

  return <storesContext.Provider value={store}>{children}</storesContext.Provider>;
};