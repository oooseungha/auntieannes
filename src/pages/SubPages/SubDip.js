// ------------------------ React
import React, { useState } from 'react';

// ------------------------ Data & Components
import { products } from '../data/subData';
import SubModal from './SubModal';

// ------------------------ Styled-Components
import styled from 'styled-components';
import { SubWrap } from '../../components/StyledComponents';

export default function SubDip() {

  const [subDip] = useState(products.filter(item => item.category.includes('dip')));
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
        subDip.map((dip, index) => {
          return (
            <div
              key={dip.id}
              className='sub_box'
              onClick={() => setSelectedProduct(dip)}
            >
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
