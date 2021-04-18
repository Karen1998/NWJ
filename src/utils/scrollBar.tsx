import React, { CSSProperties, FunctionComponent, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

interface IScrollBarFunctionProps {
  style: CSSProperties;
}

const ColoredScrollbars: FunctionComponent = (props) => {
  const [top, setTop] = useState(0);

  const handleUpdate = (values: any) => {
    const { top } = values;

    setTop(top);
  }

  const renderView = ({ style, ...props }: IScrollBarFunctionProps) => {
    const viewStyle = {
      padding: 15,
      backgroundColor: `rgb(${Math.round(255 - (top * 255))}, ${Math.round(top * 255)}, ${Math.round(255)})`,
      color: `rgb(${Math.round(255 - (top * 255))}, ${Math.round(255 - (top * 255))}, ${Math.round(255 - (top * 255))})`
    };

    return (
      <div
        className="box"
        style={{ ...style, ...viewStyle }}
        {...props} />
    );
  }

  const renderThumb = ({ style, ...props }: IScrollBarFunctionProps) => {
    const thumbStyle = {
      backgroundColor: `rgb(${Math.round(255 - (top * 255))}, ${Math.round(255 - (top * 255))}, ${Math.round(255 - (top * 255))})`
    };

    return (
      <div
        style={{ ...style, ...thumbStyle }}
        {...props} />
    );
  }

  return (
    <Scrollbars
      renderView={renderView}
      renderThumbHorizontal={renderThumb}
      renderThumbVertical={renderThumb}
      onUpdate={handleUpdate}
      {...props}
      />
  );
}

export default ColoredScrollbars;
