import React, { FC, Fragment, useState } from 'react';
import Map from '../Map/Map';
import Header from './components/Header';

import './MainScreen.scss';

const MainScreen: FC = () => {
  const [model, setModel] = useState<string>('all');
  const [state, setState] = useState<string>('all');

  return (
    <Fragment>
      <div className='main-container'>
        <Header 
          setModel={setModel} 
          setState={setState} 
          model={model} 
          state={state} 
        />
        <Map 
          model={model} 
          state={state} 
        />
      </div>
    </Fragment>
  );
}

export default MainScreen;