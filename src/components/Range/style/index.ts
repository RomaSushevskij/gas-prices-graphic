import { CSSProperties } from 'react';

export const trackStyle: CSSProperties = {
  height: '30px',
  width: 'calc(100% - 50px)',
  marginLeft: '40px',
  marginTop: '40px',
  backgroundColor: '#D7E1E7',
  borderRadius: '4px',
};

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
