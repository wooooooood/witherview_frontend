import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import profileExample from '@assets/images/profile_example.png';
import Icon from '@components/IconTemp';

const Wrapper = styled.div`
  position: relative;
`;

const Image = styled.div`
  width: 14.9vh;
  height: 15.6vh;
  border-radius: 2vh;
  user-select: none;
  background-image: url(${({ src }) => src});
  background-position: center center;
  background-size: cover;
`;

const IconWrapper = styled.span`
  display: inline-block;
  position: absolute;
  top: 11.5vh;
  left: 12vh;
`;

export default function ProfileEdit({ src }) {
  return (
    <Wrapper>
      <Image src={src} alt="profile_image" />
      <IconWrapper>
        <Icon type="capture" alt="" isCircle />
      </IconWrapper>
    </Wrapper>
  );
}

ProfileEdit.propTypes = {
  src: PropTypes.string,
};

ProfileEdit.defaultProps = {
  src: profileExample,
};
