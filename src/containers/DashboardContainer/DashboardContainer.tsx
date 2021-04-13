import React, { FunctionComponent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Card from 'src/components/Card';

import Filter from 'src/components/Filter';
import Heading from 'src/components/Heading'
import { getMainData } from 'src/redux/Slices/mainSlice';

import Image1 from 'src/assets/dev/dev1.png';
import Image2 from 'src/assets/dev/dev2.png';

import styles from './styles.module.scss';
import { randomDate } from 'src/utils/randomDate';


interface Category {
  id: string;
  name: string;
}

interface INavigationPanelProps {
  onFilterChange: Function;
}

const NavigationPanel: FunctionComponent<INavigationPanelProps> = ({ onFilterChange }) => {
  const { categories } = useSelector(getMainData);
  const [activeCourse, setActiveCourse] = useState<Category>(categories[0]);


  return (
    <div className={styles.navPanelRoot}>
      <Heading>
        Courses
      </Heading>

      <div className={styles.filterContainer}>
        {categories.map((categoryObj: Category) => (
          <div
            key={categoryObj.id}
            className={styles.filter}
            onClick={() => {
              setActiveCourse(categoryObj);
              onFilterChange(categoryObj.name)
            }}
          >
            <Filter active={categoryObj.id === activeCourse.id}>
              {categoryObj.name}
            </Filter>
          </div>
        ))}
      </div>

    </div>
  )
}


type Course = {
  name: string,
  count: string,
  duration: string,
  imageSrc: string,
  viewsCount: number,
  createdAt: Date,
}

const DashboardContainer: FunctionComponent = () => {
  const { blocks, views } = useSelector(getMainData);
  const [coursers, setCoursers] = useState<Course[]>([]);

  const sortCardsByViews = (array: Course[]) => {
    let sortedArray = [...array];

    sortedArray.sort((a, b) => (a.viewsCount < b.viewsCount) ? 1 : -1);

    setCoursers(sortedArray);
  };

  const sortCardsByUpdatedTime = (array: Course[]) => {
    let sortedArray = [...array];

    sortedArray.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    setCoursers(sortedArray);
  };

  useEffect(() => {
    const changedArray = blocks.map((block, index) => {
      const randomCount = (Math.random() * 100).toFixed(); // lessons count

      return ({
        name: block.name,
        count: randomCount,
        duration: views[index].time,
        imageSrc: index % 2 === 0 ? Image1 : Image2,
        createdAt: randomDate(new Date(2012, 0, 1), new Date()),
        viewsCount: Number(randomCount + views[index].time)
      })
    });

    sortCardsByViews(changedArray);
  }, [blocks, views]);


  return (
    <div>
      <NavigationPanel
        onFilterChange={(name: string) => {
          if (name.toLowerCase() === 'popular') {
            sortCardsByViews(coursers);
          } else if (name.toLowerCase() === 'new') {
            sortCardsByUpdatedTime(coursers)
          }
        }}
      />

      <div className={styles.cardsContainer}>
        {coursers.map((obj) => (
          <div
            key={obj.name + obj.createdAt}
            className={styles.cardWrapper}
          >
            <Card
              {...obj}
            />
          </div>
        ))}
      </div>

    </div>
  )
}

export default DashboardContainer
