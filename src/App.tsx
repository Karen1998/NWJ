import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import './styles/reset.css';
import './App.css';
import { getCategories, getBlocks, getViews } from './API';
import LayoutContainer from './containers/LayoutContainer';
import { initData } from './redux/Slices/mainSlice';

interface mainData {
  blocks: string[] | undefined,
  categories: string[] | undefined,
  views: Array<{
    id: number,
    time: number
  }> | undefined,
}

function App() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const dataRef = useRef<mainData>({
    blocks: undefined,
    categories: undefined,
    views: undefined,
  });

  const dispatch = useDispatch();


  useEffect(() => {
    Promise.all([
      getCategories().then((res) => {
        dataRef.current.categories = res?.categories;
      }),

      getViews().then((res) => {
        dataRef.current.views = res?.minutes;
      }),

      getBlocks().then((res) => {
        dataRef.current.blocks = res?.blocks;
      }),
    ]).then(() => {
      dispatch(initData({
        blocks: dataRef.current.blocks,
        categories: dataRef.current.categories,
        views: dataRef.current.views,
      }));
      setLoaded(true);
    })
  }, []);


  return (
    <div className="App">
      {!loaded ? (
        'Loading'
      ) : (
        <LayoutContainer />
      )}
    </div>
  );
}

export default App;
