// ------------------------ React
import React, { useState } from 'react';

// ------------------------ Data & Components
import { products } from '../data/subData';

// ------------------------ Styled-Components
import styled from 'styled-components';
import { SubWrap } from '../../components/StyledComponents';

export default function SubDip() {

  const [subDip] = useState(products.filter(item => item.category.includes('dip')));

  return (
    <SubWrap>
      {
        subDip.map((dip, index) => {
          return (
            <div className='sub_box'>
              <div>
                <img src={dip.image} />
              </div>
              <p className='sub_title'>{dip.title}</p>
              <p className='sub_price'>{dip.price.toLocaleString() + '원'}</p>
            </div>
          )
        })
      }
    </SubWrap>
  )
}
