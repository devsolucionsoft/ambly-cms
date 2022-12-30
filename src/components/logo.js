import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

export const Logo = styled((props) => {
  const { variant, ...other } = props;

  const color = variant === 'light' ? '#C1C4D6' : '#5048E5';

  return (
    <div style={{position:"relative", width:"226px", height:"88px", scale: ".7" }}>
      <Image src={"/static/icon-ambly.png"} layout="fill" alt='Logo Ambly'/>
    </div>
  );
})``;

Logo.defaultProps = {
  variant: 'primary'
};

Logo.propTypes = {
  variant: PropTypes.oneOf(['light', 'primary'])
};
