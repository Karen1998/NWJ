import React, { FunctionComponent } from 'react'

import styles from './styles.module.scss'

const Container: FunctionComponent = (props) => {
  return (
    <div className={styles.root}>
      {props.children}
    </div>
  )
}

export default Container
