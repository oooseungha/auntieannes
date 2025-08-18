// ------------------------ React
import React, { useState } from 'react';

// ------------------------ Data & Components
import { products } from '../data/subData';

// ------------------------ Styled-Components
import styled from 'styled-components';
import { SubWrap } from '../../components/StyledComponents';

export default function SubHotdog() {

  const [subHotdog] = useState(products.filter(item => item.category.includes('hotdog')));

  return (
    <SubWrap>
      {
        subHotdog.map((hotdog, index) => {
          return (
            <div className='sub_box'>
              <div>
                <img src={hotdog.image} />
              </div>
              <p className='sub_title'>{hotdog.title}</p>
              <p className='sub_price'>{hotdog.price.toLocaleString() + '원'}</p>
            </div>
          )
        })
      }
    </SubWrap>
  )
}
