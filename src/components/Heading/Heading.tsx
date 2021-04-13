import React, { FunctionComponent } from 'react'
import styles from './styles.module.scss';


const Heading: FunctionComponent = (props) => {
  return (
    <h2 className={styles.root}>
      {props.children}
    </h2>
  )
}

export default Heading
