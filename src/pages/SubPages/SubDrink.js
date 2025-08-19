// ------------------------ React
import React, { useState } from 'react';

// ------------------------ Data & Components
import { products } from '../data/subData';
import SubModal from './SubModal';

// ------------------------ Styled-Components
import styled from 'styled-components';
import { SubWrap } from '../../components/StyledComponents';

export default function SubDrink() {

  const [subDrink] = useState(products.filter(item => item.category.includes('drink')));
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
        subDrink.map((drink, index) => {
          return (
            <div
              key={drink.id}
              className='sub_box'
              onClick={() => setSelectedProduct(drink)}
            >
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
