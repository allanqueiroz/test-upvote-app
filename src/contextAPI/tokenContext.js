import React from "react";

const TokenContext = React.createContext({});

export function TokenProvider(props) {
  const [token, setToken] = React.useState("");
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {props.children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  const { token, setToken } = React.useContext(TokenContext);
  return { token, setToken };
}
