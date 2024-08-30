import React from 'react';
import { GlobalCss } from "./styles";
import Header from './components/Header';
import Body from './components/Body';

const App: React.FC = () => {
  return (
    <>
      <GlobalCss />
      <Header />
      <Body />
    </>
  );
};

export default App;