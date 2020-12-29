import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import SyncLoader from 'react-spinners/SyncLoader';

import LandingPage from '@pages/LandingPage';

import AuthRoute from '@components/AuthRoute';
import NotFound from '@pages/404';
import LoginPage from '@pages/LoginPage';
import QuestionListPage from '@pages/QuestionListPage';
import QuestionPage from '@pages/QuestionPage';

import SelfTrainEntryPage from '@pages/SelfTrainEntryPage';
import SelfTrainSettingPage from '@pages/SelfTrainSettingPage';
import SelfTrainPage from '@pages/SelfTrainPage';

import AloneQuestionCheckList from '@pages/AloneQuestionCheckList';
import MyPage from '@pages/MyPage';
import StudyMainPage from '@pages/StudyMainPage';
import InterviewStudyEntry from '@pages/InterviewStudyEntry';

import MyVideoPage from '@pages/MyVideoPage';
import VideoPage from '@pages/VideoPage';
import PeerStudyTrainPage from '@pages/PeerStudyTrainPage';

import Sidebar from '@components/Sidebar';
import ProfileMenuContainer from '@components/ProfileMenuContainer';

import StudyBackground from '@assets/images/study_background.png';
import useWindowSize from '@hooks/useWindowSize';

import GlobalStyles from './style/globalStyles';

import { get } from './utils/snippet';

const Wrapper = styled.div`
  display: flex;
`;

const WrapPage = styled.div`
  display: flex;
  ${({ toggleTrain }) => (toggleTrain
    ? 'width: 100vw;'
    : 'height: 100vh; width: calc(100vw - 15.9vh); padding-left: 15.9vh;')}
`;

const WrapSpinner = styled.div`
  z-index: 30;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WrapRatio = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 4vw;
  line-height: 7vw;
  text-align: center;
  background-image: url(${({ source }) => source});
`;

export default function App() {
  const { name } = useSelector(get('auth'));
  const { toggleTrain, isLoading } = useSelector(get('train'));
  const { ratio } = useWindowSize();

  // TIP: 새로고침에 랜딩페이지로 가지 않도록 할려면 AuthRoute를 Route로 바꾸면 된다.
  return (
    <>
      <GlobalStyles />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginPage} />
        {isLoading && (
          <WrapSpinner>
            <SyncLoader size={50} color="#123abc" />
          </WrapSpinner>
        )}
        {ratio < 1.6 && (
          <WrapRatio source={StudyBackground}>
            브라우저 창의 높이를 줄여주세요.
            <br />
            16:9 비율에 최적화되어 있습니다.
          </WrapRatio>
        )}
        <Wrapper>
          {!toggleTrain && <Sidebar />}
          {!toggleTrain && <ProfileMenuContainer name={name} />}
          <WrapPage toggleTrain={toggleTrain}>
            <Route exact path="/self" component={SelfTrainEntryPage} />
            <AuthRoute
              exact
              path="/questionlist"
              component={QuestionListPage}
            />
            <AuthRoute path="/question/:id" component={QuestionPage} />
            <AuthRoute
              path="/self/setting/:id"
              component={SelfTrainSettingPage}
            />
            <AuthRoute path="/self-train/:id" component={SelfTrainPage} />
            <AuthRoute
              exact
              path="/self-checklist/:roomId"
              component={AloneQuestionCheckList}
            />
            <AuthRoute path="/mypage" component={MyPage} />
          </WrapPage>
          <AuthRoute path="/group-study" component={StudyMainPage} />
          <AuthRoute path="/study-room/:id" component={InterviewStudyEntry} />
          <AuthRoute
            path="/peer-study/:roomId"
            component={PeerStudyTrainPage}
          />
          <Route exact path="/myvideo" component={MyVideoPage} />
          <Route exact path="/video/:id" component={VideoPage} />
        </Wrapper>
        <Route component={NotFound} />
      </Switch>
    </>
  );
}
