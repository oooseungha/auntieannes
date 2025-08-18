// ------------------------ React
import React, { useState } from 'react';

// ------------------------ Data & Components
import { products } from '../data/subData';

// ------------------------ Styled-Components
import styled from 'styled-components';
import { SubWrap } from '../../components/StyledComponents';

export default function SubStick() {

  const [subStick] = useState(products.filter(item => item.category.includes('stick')));

  return (
    <SubWrap>
      {
        subStick.map((stick, index) => {
          return (
            <div className='sub_box'>
              <div>
                <img src={stick.image} />
              </div>
              <p className='sub_title'>{stick.title}</p>
              <p className='sub_price'>{stick.price.toLocaleString() + '원'}</p>
            </div>
          )
        })
      }
    </SubWrap>
  )
}
