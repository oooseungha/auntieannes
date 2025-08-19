// ------------------------ React
import React, { useEffect } from 'react';

// ------------------------ Router
import { useParams } from 'react-router-dom';


import { products } from '../data/subData.js'

// ------------------------ Redux & slice
import { useDispatch, useSelector } from 'react-redux';
import { 
  incrementByAmount as incrementOne, 
  decrementByAmount as decrementOne, 
  setCount as setOne
 } from '../../redux/optionCountOneSlice.js';
import { addItem } from '../../redux/cartSlice.js';
import { increment, decrement, setCount } from '../../redux/dipOptionSlice.js';



// ------------------------ Styled-Components
import styled from 'styled-components';
import { PlusBtn, MinusBtn, DelBtn } from '../../components/StyledComponents';

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

const ModalBtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 610px;
  margin: 30px auto;
  span {
    font-size: 40px;
    font-weight: bold;
  }
`

const ModalOptionWrap = styled.div`
  width: 610px;
  margin: 0 auto;
  .modal_option_title {
    width: 610px;
    margin: 0 auto;
    font-size: 32px;
    color: #666;
    font-weight: 500;
    border-bottom: 1px solid #999;
    text-align: center;
    padding-bottom: 10px;
  }
  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .modal_option_img {
      width: 90px;
      float: left;
    }
    .modal_option_name {
      width: 200px;
      font-size: 20px;
      font-weight: bold;
    }
  }
`

const OptionBtnWrap = styled.div`
  width: 410px;
  // margin: 50px auto 0 auto;
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
  }
  .prev_btn {
    margin-right: 10px;
  }
  .select_btn {
    background-color: #10059F;
    color: white;
  }

`

const ModalOptionBtn = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  button {
    width: 40px; height: 40px;
    background-size: contain;
  }
  span {
    font-size: 24px;
    font-weight: bold;
  }
`
const ModalOptionPrice = styled.li`
  width: 90px;
  font-size: 20px;
  text-align: center;
`

export default function SubModal({product, onClose}) {

  const dispatch = useDispatch();

  const proCount = useSelector((state) => state.optionCounterOne.value);
  const proTotalPrice = proCount * product.price;
  const dipOption = useSelector((state) => state.dipOption);

  const cheddaTotalPrice = (dipOption.chedda || 0) * 1500;
  const creamTotalPrice = dipOption.cream * 1500;
  const hotSalsaTotalPrice = dipOption.hotSalsa * 1500;

  useEffect(() => {
    dispatch(setOne(1))
    dispatch(setCount({chedda: 0, cream: 0, hotSalsa: 0}))
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

        <ModalBtnBox>
          <MinusBtn
            disabled={dipOption <= 1}
            onClick = {() => dispatch(decrementOne(1))}
          />
          <span>{proCount}</span>
          <PlusBtn
            onClick = {() => dispatch(incrementOne(1))}
          />
          <span>{proTotalPrice.toLocaleString()}원</span>
        </ModalBtnBox>

        {!(product.category === 'dip' || product.category === 'drink') && (
          
          <ModalOptionWrap>
            <p className='modal_option_title'>딥소스 추가</p>
            <ul>
              <li className='modal_option_img'>
                <img src={process.env.PUBLIC_URL + '/images/modal_dip_01.png'} />
              </li>
              <li className='modal_option_name'>
                <p>체다치즈 딥</p>
                <p style={{fontSize: '18px', color: '#666', fontWeight: 400}}>1,500원</p>
              </li>
              <ModalOptionBtn>
                <MinusBtn
                  disabled={dipOption.chedda <= 0}
                  onClick={() => dispatch(decrement('chedda'))}
                />
                <span>{dipOption.chedda}</span>
                <PlusBtn
                  onClick={() => dispatch(increment({option: 'chedda', amount: 1}))}
                />
              </ModalOptionBtn>
              <ModalOptionPrice>{cheddaTotalPrice.toLocaleString()}원</ModalOptionPrice>
            </ul>
            <ul>
              <li className='modal_option_img'>
                <img src={process.env.PUBLIC_URL + '/images/modal_dip_02.png'} />
              </li>
              <li className='modal_option_name'>
                <p>크림치즈 딥</p>
                <p style={{fontSize: '18px', color: '#666', fontWeight: 400}}>1,500원</p>
              </li>
              <ModalOptionBtn>
                <MinusBtn
                  disabled={dipOption.chedda <= 0}
                  onClick={() => dispatch(decrement('cream'))}
                />
                <span>{dipOption.cream}</span>
                <PlusBtn
                  onClick={() => dispatch(increment({option: 'cream', amount: 1}))}
                />
              </ModalOptionBtn>
              <ModalOptionPrice>{creamTotalPrice.toLocaleString()}원</ModalOptionPrice>
            </ul>
            <ul>
              <li className='modal_option_img'>
                <img src={process.env.PUBLIC_URL + '/images/modal_dip_03.png'} />
              </li>
              <li className='modal_option_name'>
                <p>핫살사 치즈 딥</p>
                <p style={{fontSize: '18px', color: '#666', fontWeight: 400}}>1,500원</p>
              </li>
              <ModalOptionBtn>
                <MinusBtn
                  disabled={dipOption.chedda <= 0}
                  onClick={() => dispatch(decrement('hotSalsa'))}
                />
                <span>{dipOption.hotSalsa}</span>
                <PlusBtn
                  onClick={() => dispatch(increment({option: 'hotSalsa', amount: 1}))}
                />
              </ModalOptionBtn>
              <ModalOptionPrice>{hotSalsaTotalPrice.toLocaleString()}원</ModalOptionPrice>
            </ul>
          </ModalOptionWrap>

        )}

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
                count: proCount,
                price: product.price,
                options: ['chedda','cream','hotSalsa']
              }))
              onClose();
            }}
          >선택 완료</button>
        </OptionBtnWrap>

      </div>

    </SubModalWrap>
  )
}
