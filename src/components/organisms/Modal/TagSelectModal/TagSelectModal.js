import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { removeModal } from '@store/Modal/modal';
import A from '@atoms';
import { postGroupRoomApi } from '@repository/groupRepository';
import { MODALS } from '@utils/constant';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40vh;
  height: 39.5vh;
  padding: 5.5vh 5.2vh;
`;

const InputText = styled.div`
  font-family: AppleSDGothicNeoB00;
  font-size: 2.4vh;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.42;
  letter-spacing: normal;
  text-align: left;
  color: #6e6eff;
`;

const WrapButton = styled.div`
  margin-top: 4vh;
  ${({ theme }) => theme.button}
`;

const SelectList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4.5vh;
  cursor: pointer;
`;

const Select = styled.div`
  display: flex;
  align-items: center;
  width: 27vh;
  height: 6vh;
  box-sizing: border-box;
  margin-top: 1.6vh;
  border-radius: 1vh;
  border: solid 0.1vh #9e9e9e;
  background-color: #ffffff;
`;

const SelectItemListWrapper = styled.div`
  position: absolute;
  width: 27vh;
  height: 25vh;
  transform: translateY(5.6vh);
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 1vh;
  box-shadow: 0 1.2vh 3.6vh 0 rgba(4, 4, 161, 0.15);
  background-color: #ffffff;
  z-index: 2;
`;

const SelectItemList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: visible;
  z-index: 10;
`;

const SelectItem = styled.div`
  display: flex;
  width: 100%;
  height: 5.2vh;
  align-items: center;
  cursor: pointer;
  user-select: none;
  &:first-child {
    margin-top: 2vh;
  }
  &:hover {
    background-color: #eef0ff;
    & > div {
      color: #0c0c59;
    }
  }
`;

const SelectText = styled.div`
  width: 21vh;
  margin-left: 2.2vh;
  font-family: AppleSDGothicNeoM00;
  font-size: 1.8vh;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.3;
  letter-spacing: normal;
  text-align: left;
  color: #9e9e9e;
`;

const useStyles = makeStyles(() => ({
  textField: {
    width: '23vh',
    marginLeft: '2.1vh',
    color: '#9e9e9e',
  },
}));

const initSelect = {
  industry: false,
};

const industryList = [
  '경영/사무',
  '마케팅/MD',
  '영업',
  'IT/인터넷',
  '연구개발/설계',
  '생산/품질',
  '디자인',
  '기타',
];

export default function TagSelectModal({ func }) {
  const dispatch = useDispatch();
  const [industry, setIndustry] = useState('산업을 선택해주세요.');
  const [select, setSelect] = useState(initSelect);

  const handleSelect = (set, value, type) => {
    set(value);
    setSelect({ ...select, [type]: !select[type] });
  };

  const handleToggle = (type) => {
    setSelect({ [type]: !select[type] });
  };

  const handleMakeStudy = async () => {
    if (industryList.indexOf(industry) === -1) {
      return alert('입력값을 확인해 주세요.');
    }
    try {
      await postGroupRoomApi({
        industry,
      });
      func();
      dispatch(removeModal({ modalName: MODALS.TAG_SELECT_MODAL }));
    } catch (error) {
      console.error(error);
      alert(error);
    }
    return null;
  };

  const industryRef = useRef();
  const handleClickOutside = ({ target }) => {
    if (!industryRef.current.contains(target)) {
      setSelect(initSelect);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      <Wrapper>
        <InputText>산업</InputText>
        <SelectList ref={industryRef}>
          <Select onClick={() => handleToggle('industry')}>
            <SelectText>{industry}</SelectText>
            <A.Icon type="arrow_down_blue" alt="" />
          </Select>
          {select.industry && (
            <SelectItemListWrapper>
              <SelectItemList>
                {industryList.map((val) => (
                  <SelectItem>
                    <SelectText
                      onClick={() => handleSelect(setIndustry, val, 'industry')}
                    >
                      {val}
                    </SelectText>
                  </SelectItem>
                ))}
              </SelectItemList>
            </SelectItemListWrapper>
          )}
        </SelectList>
        <WrapButton>
          <A.Button text="저장" theme="blue" func={handleMakeStudy} />
          <A.Button text="취소" theme="gray" func={handleMakeStudy} />
        </WrapButton>
      </Wrapper>
    </>
  );
}

TagSelectModal.propTypes = {
  func: PropTypes.func,
};

TagSelectModal.defaultProp = {
  func: () => {},
};
