import React, { FunctionComponent, useRef, useState } from 'react'

import Container from 'src/components/Container';
import DashboardContainer from '../DashboardContainer';
import DummyContainer1 from '../DummyContainer1';
import DummyContainer2 from '../DummyContainer2';

import SidebarContainer from '../SideBarContainer'
import styles from './styles.module.scss';


const LayoutContainer = () => {
  const views = useRef([
    {
      name: 'dashboard',
      component: <DashboardContainer />
    },
    {
      name: 'shopping',
      component: <DummyContainer1 />
    },
    {
      name: 'customer',
      component: <DummyContainer2 />
    }
  ]);

  const [activeView, setActiveView] = useState<JSX.Element | null>(<DashboardContainer />);

  const handleViewChange = (key: string) => {
    const newView = views.current.find((view) => view.name === key);

    setActiveView(newView ? newView.component : null);
  }

  return (
    <div className={styles.layoutRoot}>
      <div style={{
        minHeight: '100vh'
      }}>
        <SidebarContainer onViewChange={handleViewChange} />
      </div>

      <Container>
        {activeView}
      </Container>


    </div>
  )
}

export default LayoutContainer
