// ------------------------ React
import React, { useState } from 'react';

// ------------------------ Data & Components
import { products } from '../data/subData';

// ------------------------ Styled-Components
import styled from 'styled-components';
import { SubWrap } from '../../components/StyledComponents';

export default function SubDrink() {

  const [subDrink] = useState(products.filter(item => item.category.includes('drink')));

  return (
    <SubWrap>
      {
        subDrink.map((drink, index) => {
          return (
            <div className='sub_box'>
              <div>
                <img src={drink.image} />
              </div>
              <p className='sub_title'>{drink.title}</p>
              <p className='sub_price'>{drink.price.toLocaleString() + '원'}</p>
            </div>
          )
        })
      }
    </SubWrap>
  )
}
