import React from 'react';

import PropTypes from 'prop-types';

import styled from 'styled-components';

import Icon from '../Icon';
import ProfileIcon from '../ProfileIcon';

import profileExample from '../../assets/images/profile_example.png';

const Wrapper = styled.div`
  height: 73px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Name = styled.div`
  font-family: AppleSDGothicNeoEB00;
  font-size: 20px;
  padding-left: 29px;
  padding-right: 10px;
  user-select: none;
  color: #3d3d3d;
`;

export default function ProfileMenuContainer({ name, src }) {
  return (
    <Wrapper>
      <ProfileIcon src={src} />
      <Name>{name}</Name>
      <Icon type="arrow_down" alt="arrow_down" style={{ width: '12px', height: '7px' }} />
    </Wrapper>
  );
}

ProfileMenuContainer.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string,
};

ProfileMenuContainer.defaultProps = {
  name: '홍길동',
  src: profileExample,
};