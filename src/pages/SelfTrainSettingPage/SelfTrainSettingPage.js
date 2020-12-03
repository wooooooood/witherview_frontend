import React from 'react';

import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setCompany, setJob, setViewAnswer } from '@store/Train/train';
import { get } from '@utils/snippet';

import TextBox from '@components/TextBox';
import Button from '@components/Button';
import TimeButton from '@components/TimeButton';
import ToggleButton from '@components/ToggleButton';
import InputBar from '@components/InputBar';

const Wrapper = styled.div`
  flex: 1;
  flex-direction: column;
`;

const WrapContent = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WrapContainer = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 90px;
`;

const WrapSubContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const WrapToggle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const WrapText = styled.div`
  display: flex;
  font-family: AppleSDGothicNeoB00;
  font-size: 24px;
  color: #6e6eff;
  ${({ padding }) => (padding ? 'padding-bottom: 20px' : 'padding-right: 25px')};
`;

export default function SelfTrainSettingPage() {
  const dispatch = useDispatch();
  const { selectedQnaId, job, company } = useSelector(get('train'));
  const history = useHistory();

  return (
    <Wrapper>
      <WrapContent>
        <TextBox
          topText="먼저 환경설정을 시작하겠습니다."
          bottomText="원하는 답변 시간을 선택하고 기업 직무 명을 입력해주세요."
        />
        <WrapContainer>
          <WrapSubContainer>
            <TimeButton time={30} />
            <TimeButton time={45} />
            <TimeButton time={60} />
            <TimeButton time={90} />
          </WrapSubContainer>
          <WrapToggle>
            <WrapText>답변 보기 허용</WrapText>
            <ToggleButton
              funcActive={() => dispatch(setViewAnswer({ viewAnswer: true }))}
              funcDecative={() => dispatch(setViewAnswer({ viewAnswer: false }))}
            />
          </WrapToggle>
          <div>
            <WrapText padding>기업 이름</WrapText>
            <InputBar
              onChange={(e) => dispatch(setCompany({ company: e.target.value }))}
              width={967}
            />
          </div>
          <div>
            <WrapText padding>직무 이름</WrapText>
            <InputBar
              onChange={(e) => dispatch(setJob({ job: e.target.value }))}
              width={967}
            />
          </div>
        </WrapContainer>
        <Button
          theme={company && job ? 'blue' : 'gray'}
          text="다음"
          func={() => history.push(`/self-train/${selectedQnaId}`)}
        />
      </WrapContent>
    </Wrapper>
  );
}