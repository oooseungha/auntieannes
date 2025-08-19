// ------------------------ React
import React, { useState } from 'react';

// ------------------------ Data & Components
import { products } from '../data/subData';
import SubModal from './SubModal';


// ------------------------ Styled-Components
import styled from 'styled-components';
import { SubWrap } from '../../components/StyledComponents';

export default function SubClassic() {

  const [subClassic] = useState(products.filter(item => item.category.includes('classic')));
  const [selectedProduct, setSelectedProduct] = useState(null);


  return (
    <SubWrap>
      {selectedProduct && (
        <SubModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)} 
        />
      )}
      {
        subClassic.map((classic, index) => {
          return (
            <div
              key={classic.id}
              className='sub_box'
              onClick={() => setSelectedProduct(classic)}
            >
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
