import React, { FunctionComponent } from 'react'
import styles from './styles.module.scss';

interface IProps {
  active?: boolean;
}

const Filter: FunctionComponent<IProps> = ({active, ...props}) => {
  return (
    <div className={`${styles.root} ${active && styles.active}`}>
      {props.children}
    </div>
  )
}

export default Filter
