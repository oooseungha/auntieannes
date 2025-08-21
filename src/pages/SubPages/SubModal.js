// ------------------------ React
import React, { useEffect } from 'react';


// ------------------------ Redux & slice
import { useDispatch, useSelector } from 'react-redux';
import { 
  incrementByAmount as incrementOne, 
  decrementByAmount as decrementOne, 
  setCount as setOne
 } from '../../redux/optionCountOneSlice.js';
import { addItem } from '../../redux/cartSlice.js';


// ------------------------ Styled-Components
import styled from 'styled-components';
import { PlusBtn, MinusBtn, DelBtn, BtnBox } from '../../components/StyledComponents';

const SubModalWrap = styled.div`
  width: 1070px; height: 1770px;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 150px; left: 0;
  z-index: 100;
  .sub_modal {
    width: 822px; height: 1420px;
    background-color: #eee;
    border-radius: 30px;
    margin: 150px auto 0 auto;
    padding-top: 30px;
    position: relative;
    .modal_img {
      width: 400px;
      margin: 30px auto;
    }
    .modal_eng_title {
      font-size: 24px;
      font-family: "Fredoka", sans-serif;
      font-weight: 500;
      color: #FF9E18;
      text-align: center;
    }
    .modal_title {
      font-size: 36px;
      font-weight: bold;
      text-align: center;
      margin: 10px 0;
    }
    .modal_info {
      font-size: 20px;
      color: #666;
      text-align: center;
    }
  }
`

const OptionBtnWrap = styled.div`
  width: 410px;
  display: flex;
  justify-content: center;
  position: absolute;
  left: calc(50% - 205px); bottom: 100px;

  button {
    width: 200px; height: 80px;
    border-radius: 50px;
    border: 1px solid #999;
    background-color: #eee;
    font-size: 32px;
    font-weight: bold;
    color: #666;
    letter-spacing: -1px;
    font-family: "Noto Sans KR", sans-serif;
  }
  .prev_btn {
    margin-right: 10px;
  }
  .select_btn {
    background-color: #10059F;
    color: white;
  }
`

const ModalContent = styled.div `
  width: 619px;
  margin: 0 auto;
  color: #666;
  .modal_content_title {
    font-size: 24px;
    line-height: 50px;
    text-align: center;
    font-weight: bold;
    border-bottom: 1px solid #999;
    margin-top: 50px;
  }
  ul {
    display: flex;
    justify-content: space-between;
    li {
      margin-top: 10px;
      width: calc(100% / 6);
      text-align: center;
      font-weight: bold;
      font-size: 17px;
    }
  }
  .nutrition_detail li p {
    font-size: 24px;
  }
  .allergy_info {
    margin-top: 50px;
    p {
      font-size: 24px;
      text-align: center;
      line-height: 50px;
    }
  }
`


export default function SubModal({product, onClose}) {

  const dispatch = useDispatch();

  const proCount = useSelector((state) => state.optionCounterOne.value);
  const proTotalPrice = proCount * product.price;

  useEffect(() => {
    dispatch(setOne(1))
  }, [dispatch]);

  return (
    <SubModalWrap>
      <div className='sub_modal'>
        <div>
          <div className='modal_img'>
            <img src={product.image} alt={product.title} />
          </div>
          <div><p className='modal_eng_title'>{product.eng_title}</p></div>
          <div><p className='modal_title'>{product.title}</p></div>
          <div><p className='modal_info'>{product.info}</p></div>
        </div>

        <BtnBox style={{width: '610px', margin: '30px auto', justifyContent: 'space-evenly'}}>
          <MinusBtn
            disabled={proCount <= 1}
            onClick = {() => dispatch(decrementOne(1))}
          />
          <span>{proCount}</span>
          <PlusBtn
            onClick = {() => dispatch(incrementOne(1))}
          />
          <span>{proTotalPrice.toLocaleString()}원</span>
        </BtnBox>

        <ModalContent>
          <div className='nutrition_info'>
            <div className='modal_content_title'><p>제품 영양 정보</p></div>
            <ul>
              <li><p>중량(g/ml)</p></li>
              <li><p>열량(Kcal)</p></li>
              <li><p>당류(g)</p></li>
              <li><p>단백질g(%)</p></li>
              <li><p>포화지방g(%)</p></li>
              <li><p>나트륨mg(%)</p></li>
            </ul>
            <ul className='nutrition_detail'>
              <li><p>{product.weight}</p></li>
              <li><p>{product.calories}</p></li>
              <li><p>{product.sugars}</p></li>
              <li><p>{product.protein}</p></li>
              <li><p>{product.fat}</p></li>
              <li><p>{product.sodium}</p></li>
            </ul>
          </div>
          <div className='allergy_info'>
            <div className='modal_content_title'><p>알레르기 성분</p></div>
            <p>{product.allergens}</p>
          </div>
        </ModalContent>

        <OptionBtnWrap>
          <button
            className='prev_btn'
            onClick={onClose}
          >이전으로</button>
          <button
            className='select_btn'
            onClick={() => {
              dispatch(addItem({
                id: product.id,
                title: product.title,
                image: product.image,
                count: proCount,
                price: product.price,
              }))
              onClose();
            }}
          >선택 완료</button>
        </OptionBtnWrap>

      </div>

    </SubModalWrap>
  )
}
