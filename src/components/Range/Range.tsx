import * as React from 'react';
import { FC, useEffect, useState } from 'react';

import { getTrackBackground, Range } from 'react-range';
import { IRenderTrackParams } from 'react-range/lib/types';

import { MS_IN_DAY } from './constants/constants';
import { thumbIconStyle, thumbStyle, trackStyle } from './style';

type TimeRangePropsType = {
  data: number[];
  onRangeChange: (timeInterval: number[]) => void;
};

export const TimeRange: FC<TimeRangePropsType> = ({ data, onRangeChange }) => {
  const startTime = data[0];
  const endTime = data[data.length - 1];
  const [values, setValues] = useState([startTime, endTime]);

  const setGlobalValues = (newValues: number[]) => {
    setValues(newValues);
    onRangeChange(newValues);
  };

  useEffect(() => {
    setGlobalValues([startTime, endTime]);
  }, [startTime, endTime]);

  return (
    <Range
      allowOverlap
      values={values}
      step={MS_IN_DAY}
      min={startTime}
      max={endTime}
      onChange={values => setGlobalValues(values)}
      renderTrack={({ props, children }: IRenderTrackParams) => {
        return (
          <div
            role="button"
            tabIndex={0}
            {...props}
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              ...trackStyle,
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '30px',
                width: '100%',
                borderRadius: '4px',
                position: 'relative',
                background: getTrackBackground({
                  values,
                  colors: ['#D7E1E7', '#9DB3C2', '#D7E1E7'],
                  min: startTime,
                  max: endTime,
                }),
              }}
            />
            {children}
          </div>
        );
      }}
      renderThumb={({ index, props, isDragged }) => {
        const label =
          values[index] &&
          new Date(values[index]).toLocaleString('en', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });

        return (
          <div
            {...props}
            style={{
              ...props.style,
              ...thumbStyle,
              outline: 'none',
            }}
          >
            <div style={thumbIconStyle} />
            <div
              style={{
                width: 'max-content',
                position: 'absolute',
                top: '-38px',
                color: '#666666',
                fontSize: '14px',
                fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                padding: '4px',
                borderRadius: '4px',
                backgroundColor: '#D7E1E7',
                transform: `scale(${isDragged ? '1' : '0'})`,
                transition: 'all .1s ease-in-out',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: '8px',
                  height: '8px',
                  bottom: '-4px',
                  backgroundColor: '#D7E1E7',
                  transform: 'rotate(45deg)',
                  left: 'calc(100% / 2 - 4px)',
                }}
              />
              {label}
            </div>
          </div>
        );
      }}
    />
  );
};
