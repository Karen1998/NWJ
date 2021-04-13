import React, { FunctionComponent, useState } from 'react'

import styles from './styles.module.scss';

import { ReactComponent as DashboardIcon } from 'src/assets/dashboard-icon.svg';
import { ReactComponent as ShoppingIcon } from 'src/assets/shopping-icon.svg';
import { ReactComponent as CustomerIcon } from 'src/assets/customer-icon.svg';


interface IProps {
  onViewChange?: Function;
}

const views = [
  {
    id: '68465',
    icon: <DashboardIcon />,
    key: 'dashboard'
  },
  {
    id: '46548',
    icon: <ShoppingIcon />,
    key: 'shopping'
  },
  {
    id: '46848',
    icon: <CustomerIcon />,
    key: 'customer'
  },
];

const SidebarContainer: FunctionComponent<IProps> = ({ onViewChange, ...props }) => {
  const [activeView, setActiveView] = useState(views[0]);

  return (
    <div className={styles.root}>
      {views.map((view) => (
        <div
          key={view.id}
          onClick={() => {
            setActiveView(view);
            onViewChange && onViewChange(view.key);
          }}
          className={`${styles.iconRoot} ${view.id === activeView.id && styles.active}`}
        >
          {view.icon}
        </div>
      ))}
    </div>
  )
}

export default SidebarContainer
