import React from 'react'
import styled from 'styled-components';


export const KioskWrap = styled.div`
  width: 1070px; height: 1920px;
  margin: 0 auto;

  // ★★★ 개발용 임시 미디어쿼리
  @media screen and (max-width: 3000px) {
    transform: scale(0.4);
    transform-origin: top left;
  }
`

export const SubWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 0 20px;
  gap: 40px 10px;
  .sub_box {
    width: 100%; height: 340px;
    border-radius: 10px;
    background-color: #eee;
    
    p {
      text-align: center;
    }
    .sub_title {
      font-size: 20px;
    }
    .sub_price {
      font-size: 24px;
      font-weight: bold;
    }
  }
`