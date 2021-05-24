/* eslint-disable indent */
import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const BoxOption = {
  blue: css`
    background: linear-gradient(to bottom, #2323de -16%, #5f5fd9 122%);
  `,
  gray: css`
    background: #f6f6f6;
    pointer-events: none;

  `,
  white: css`
    background: #fff;
  `,
  outline: css`
    background: transparent; 
    border: solid 2px #6e6eff;
  `,
};

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => width}px;
  height: 60px;
  border-radius: 10px;
  user-select: none;
  ${({ btnTheme }) => btnTheme === 'blue'
    && `&: hover {
      opacity: 70%; 
    }`
  }
  ${({ btnTheme }) => (BoxOption[btnTheme])}
`;

const TextOption = {
  blue: '#fff',
  gray: '#3d3d3d',
  outline: '#6e6eff',
  white: '#6e6eff',
};

const Text = styled.p`
  display: inline-block;
  font-family: AppleSDGothicNeoB00;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: ${({ btnTheme }) => (TextOption[btnTheme])};
`;

export default function Button({
  text = '버튼',
  btnTheme = 'blue',
  func = () => {},
  width = 296,
}) {
  return (
    <Box btnTheme={btnTheme} onClick={func} width={width}>
      <Text btnTheme={btnTheme}>{text}</Text>
    </Box>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  btnTheme: PropTypes.string.isRequired,
  func: PropTypes.func,
  width: PropTypes.number,
};
