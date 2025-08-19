// ------------------------ React
import React, { useState } from 'react';

// ------------------------ Data & Components
import { products } from '../data/subData';
import SubModal from './SubModal';

// ------------------------ Styled-Components
import styled from 'styled-components';
import { SubWrap } from '../../components/StyledComponents';

export default function SubStick() {

  const [subStick] = useState(products.filter(item => item.category.includes('stick')));
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <SubWrap>
      {selectedProduct &&
        <SubModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      }
      {
        subStick.map((stick, index) => {
          return (
            <div 
              key={stick.id}
              className='sub_box'
              onClick={() => setSelectedProduct(stick)}  
            >
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
