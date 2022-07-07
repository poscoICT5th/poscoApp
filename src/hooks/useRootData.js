import { useObserver } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { storesContext } from '../utils/context';


export const useStoreData = (
  context,
  storeSelector,
  dataSelector,
) => {
  const value = useContext(context);
  if (!value) {
    throw new Error("No store");
  }
  const store = storeSelector(value);

  return useObserver(() => {
    return dataSelector(store);
  });
};

export default (dataSelector) => {
  return useStoreData(storesContext, (contextData) => contextData, dataSelector);
};