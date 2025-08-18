// ------------------------ React
import React, { useState } from 'react';

// ------------------------ Data & Components
import { products } from '../data/subData';

// ------------------------ Styled-Components
import styled from 'styled-components';
import { SubWrap } from '../../components/StyledComponents';

export default function SubClassic() {

  const [subClassic] = useState(products.filter(item => item.category.includes('classic')));


  return (
    <SubWrap>
      {
        subClassic.map((classic, index) => {
          return (
            <div className='sub_box'>
              <div>
                <img src={classic.image} />
              </div>
              <p className='sub_title'>{classic.title}</p>
              <p className='sub_price'>{classic.price.toLocaleString() + '원'}</p>
            </div>
          )
        })
      }
    </SubWrap>
  )
}
