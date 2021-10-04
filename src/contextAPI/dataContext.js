import React from "react";

const DataContext = React.createContext({});

export function DataProvider(props) {
  const [data, setData] = React.useState([]);
  return (
    <DataContext.Provider value={{ data, setData }}>
      {props.children}
    </DataContext.Provider>
  );
}

export function useData() {
  const { data, setData } = React.useContext(DataContext);
  return { data, setData };
}
