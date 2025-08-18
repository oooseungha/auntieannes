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