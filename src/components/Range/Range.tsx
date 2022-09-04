import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { Range } from 'react-range';
import { IRenderTrackParams } from 'react-range/lib/types';

import { steps } from './constants';
import {
  getMoveTrackStyle,
  getThumbLabelStyle,
  thumbIconStyle,
  thumbLabelPointerStyle,
  thumbStyle,
  trackStyle,
} from './style';

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
            <div ref={props.ref} style={getMoveTrackStyle(values, startTime, endTime)} />
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
            <div style={getThumbLabelStyle(isDragged)}>
              <div style={thumbLabelPointerStyle} />
              {label}
            </div>
          </div>
        );
      }}
    />
  );
});
