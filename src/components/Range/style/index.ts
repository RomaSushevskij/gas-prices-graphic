import { CSSProperties } from 'react';

import { getTrackBackground } from 'react-range';

export const trackStyle: CSSProperties = {
  height: '30px',
  width: 'calc(100% - 50px)',
  marginLeft: '40px',
  marginTop: '15px',
  backgroundColor: '#D7E1E7',
  borderRadius: '4px',
};
export const getMoveTrackStyle = (
  values: number[],
  startTime: number,
  endTime: number,
): CSSProperties => ({
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
});

export const thumbStyle: CSSProperties = {
  height: '24px',
  width: '24px',
  borderRadius: '3px',
  backgroundColor: '#FFFFFF',
  boxShadow: '1px 2px 4px rgba(0,0,0,0.2)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: '0',
};
export const thumbIconStyle: CSSProperties = {
  width: '2px',
  height: '10px',
  borderRight: '2px solid #9D9D9D',
  borderLeft: '2px solid #9D9D9D',
};
export const getThumbLabelStyle = (isDragged: boolean): CSSProperties => ({
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
});

export const thumbLabelPointerStyle: CSSProperties = {
  position: 'absolute',
  width: '8px',
  height: '8px',
  bottom: '-4px',
  backgroundColor: '#D7E1E7',
  transform: 'rotate(45deg)',
  left: 'calc(100% / 2 - 4px)',
};
