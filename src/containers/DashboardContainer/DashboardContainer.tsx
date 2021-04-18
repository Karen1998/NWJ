import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';

import Card from 'src/components/Card';
import Filter from 'src/components/Filter';
import Heading from 'src/components/Heading'
import { getMainData } from 'src/redux/Slices/mainSlice';
import { randomDate } from 'src/utils/randomDate';
import Image1 from 'src/assets/dev/dev1.png';
import Image2 from 'src/assets/dev/dev2.png';

import styles from './styles.module.scss';
import ColoredScrollbars from 'src/utils/scrollBar';


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
  const contentRef = useRef<HTMLDivElement>(null);
  const contentStyles = useRef<any>(null);

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

  useEffect(() => {
    contentStyles.current = {
      height: `calc(100vh - ${contentRef.current?.getBoundingClientRect().top}px)`
    }
  }, [])


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

      <div
        className={styles.cardsContainer}
        ref={contentRef}
        style={{
          height: contentStyles.current?.height,
        }}
      >
        <div
          className={styles.cardsContainerInner}
          style={{
            overflowY: 'auto',
            height: contentStyles.current?.height
          }}
        >
          {coursers.map((obj: Course) => (
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
    </div>
  )
}

export default DashboardContainer
