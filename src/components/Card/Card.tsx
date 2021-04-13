import React, { FunctionComponent } from 'react'

import { ReactComponent as PlayIcon } from 'src/assets/play-icon.svg';
import styles from './styles.module.scss';

interface IProps {
  name: string,
  count: string,
  duration: string,
  imageSrc: string,
}

const Card: FunctionComponent<IProps> = ({
  name,
  count,
  duration,
  imageSrc,
}) => {
  return (
    <div className={styles.root}>
      <div className={styles.imageWrapper}>
        <img
          src={imageSrc}
          alt={name}
        />
      </div>

      <div className={styles.cardInfo}>
        <div className={styles.cardInfoTitleBox}>
          <h3 className={styles.cardInfoTitle}>{name}</h3>
          <span className={styles.cardInfoLessons}>{count} lessons</span>
        </div>

        <div>
          <span className={styles.cardInfoDuration}>{duration} min</span>
        </div>
      </div>


      <div className={styles.playIcon}>
        <PlayIcon />
      </div>

    </div>
  )
}

export default Card
