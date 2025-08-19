// ------------------------ React
import React, { useState } from 'react';

// ------------------------ Data & Components
import { products } from '../data/subData';
import SubModal from './SubModal';

// ------------------------ Styled-Components
import styled from 'styled-components';
import { SubWrap } from '../../components/StyledComponents';

export default function SubHotdog() {

  const [subHotdog] = useState(products.filter(item => item.category.includes('hotdog')));
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
        subHotdog.map((hotdog, index) => {
          return (
            <div
              key={hotdog.id} 
              className='sub_box'
              onClick={() => setSelectedProduct(hotdog)}
            >
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
