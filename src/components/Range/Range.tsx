import * as React from 'react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { getTrackBackground, Range } from 'react-range';
import { IRenderTrackParams } from 'react-range/lib/types';

import { steps } from './constants';
import { thumbIconStyle, thumbStyle, trackStyle } from './style';

type TimeRangePropsType = {
  data: number[];
  onTimeRangeChange: (timeInterval: number[]) => void;
};

export const TimeRange = memo(({ data, onTimeRangeChange }: TimeRangePropsType) => {
  const { startTime, endTime } = useMemo(() => {
    const startTime = data[0];
    const endTime = data[data.length - 1];

    return { startTime, endTime };
  }, [data]);

  const [values, setValues] = useState([startTime || 0, endTime || 1]);

  const onRangeChange = useCallback(
    (newValues: number[]) => {
      setValues(newValues);
      onTimeRangeChange(newValues);
    },
    [setValues, onTimeRangeChange],
  );

  useEffect(() => {
    onRangeChange([startTime, endTime]);
  }, [startTime, endTime]);

  return (
    <Range
      draggableTrack
      values={values}
      step={steps.HOUR}
      min={startTime}
      max={endTime}
      onChange={values => onRangeChange(values)}
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
});
