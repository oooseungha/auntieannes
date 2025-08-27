# React 기반 AUNTIE ANNE'S Kiosk 제작 프로젝트
매장에서 사용하는 키오스크 환경을 가정하여 React 기반 Auntie Anne’s 프레첼 키오스크 앱 개발
<br/><br/>

### 🌐 프로젝트 소개
React를 기반으로 키오스크 앱을 제작하여 고객이 매장에서 손쉽게 주문할 수 있는 환경 제공하고,
매장용 키오스크 특화 UI/UX를 설계하여 실시간 메뉴 선택부터 장바구니 관리 구현한 React App입니다.
<br/><br/>

### 📅 기획/개발 기간
- 25.08.08. ~ 25.08.22.  
- 디자인·개발 2주
<br/><br/>

### 💡 기획의도
**문제점**
- 기존 키오스크 시스템의 제한적 UI로 주문 과정이 복잡하고 비직관적

**개선 방향**
- 고객이 빠르고 직관적으로 메뉴를 탐색하고 주문할 수 있도록 UI 단순화
- 장바구니 실시간 확인 가능
- 포인트 컬러와 브랜드 아이덴티티를 반영해 매장 친화적 경험 제공
<br/><br/>

### 📍 프로젝트 목표
- 매장 환경에 최적화된 키오스크 UI/UX 설계
- 메뉴 선택 -> 장바구니 -> 결제까지 자연스러운 주문 흐름 제공
- React Router와 Redux를 활용하여 앱 구조 안정성 및 상태 관리 효율화
- 컴포넌트 기반 구조로 유지보수 및 기능 확장 용이
- 브랜드 아이덴티티와 활기찬 매장 이미지를 포인트 컬러 및 시각적 요소로 강화
<br/><br/>

### 📐 디자인 가이드
<img width="1080" height="1920" alt="Image" src="https://github.com/user-attachments/assets/46948db0-9aae-4081-a37b-474e88c321ef" />
<br/><br/>


### 🛠️ 코드 리뷰
(1) Router
```javascript

// App.js

function App() {

  return (
    <div className="App">
      <KioskWrapper>
        <KioskWrap>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/sub/*' element={<Sub />}>
              <Route index element={<Navigate to='classic' replace />} />
              <Route path='classic' element={<SubClassic products={products} />} />
              <Route path='stick' element={<SubStick products={products} />} />
              <Route path='hotdog' element={<SubHotdog products={products} />} />
              <Route path='dip' element={<SubDip products={products} />} />
              <Route path='drink' element={<SubDrink products={products} />} />
            </Route>
            <Route path='payment' element={<Payment />} />
          </Routes>
        </KioskWrap>
      </KioskWrapper>
    </div>
  );
}
```


(2) Redux
```javascript
// redux > cartSlice.js

import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItem(state, action) {
      const index = state.findIndex((findId) => findId.id === action.payload.id)
      if (index > -1) {
        state[index].count += action.payload.count;
        state[index].options = action.payload.options;
      } else {
        state.push(action.payload);
      }
    }, // addItem
    deleteItem(state, action) {
      const index = state.findIndex((findId) => findId.id === action.payload);
      state.splice(index, 1);
    }, // deleteItem
    addCount(state, action) {
      const index = state.findIndex((findId) => findId.id === action.payload);
      state[index].count++;
    }, // addCount
    subCount(state, action) {
      const index = state.findIndex((findId) => findId.id === action.payload);
      state[index].count--;
    }, // subCount
    clearCart: () => {
      return [];
    }
  }
});

export const { addItem, deleteItem, addCount, subCount, clearCart } = cart.actions;
export default cart.reducer;
```

```javascript

// redux > optionCountOneSlice.js

import { createSlice } from "@reduxjs/toolkit";

const optionCounterOne = createSlice({
  name: 'optionCounterOne',
  initialState: {value: 1},
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    decrementByAmount: (state, action) => {
      state.value -= action.payload;
    },
    setCount: (state, action) => {
      state.value = action.payload;
    }

  },
});

export const { incrementByAmount, decrementByAmount, setCount } = optionCounterOne.actions;
export default optionCounterOne.reducer;
```

```javascript

// redux > store.js

import { configureStore } from "@reduxjs/toolkit";
import countOneReducer from './optionCountOneSlice';
import cartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    optionCounterOne: countOneReducer,
    cart: cartReducer,
  }
});

export default store;
```

``` javascript
// copmonents > footer.js

      <div className={SubFooterStyle.cart_list}>
        {
          cart.map((item,i) => {
            return(
              <ul key={item.id}>
                <li>{item.title}</li>
                <li>
                  <MinusBtn
                    disabled={item.count <= 1}
                    onClick={() => {
                        if (item.count > 1) {
                          dispatch(subCount(item.id));
                        }
                      }}
                  />
                  <span>{item.count}</span>
                  <PlusBtn
                    onClick={() => dispatch(addCount(item.id))}
                  />
                </li>
                <li>{(item.price * item.count).toLocaleString()}원</li>
                <li>
                  <DelBtn
                    onClick={() => dispatch(deleteItem(item.id))}
                  >삭제</DelBtn>
                </li>
              </ul>
            )
          })
        }
      </div>
```

```javascript

// pages > payment.js

  <PaymentCart>
    <ul className='cart_sort'>
      <li>메뉴</li>
      <li>수량</li>
      <li>금액</li>
      <li></li>
    </ul>

    {
      cart.map((item) => {
        const proTotalPrice = item.count * item.price;
        return (
          <CartList key={item.id}>
            <li className='menu_name'>
              <div><img src={item.image} /></div>
              <p>{item.title}</p>
            </li>
            <li className='payment_amount_box'>
              <BtnBox style={{width: '300px', justifyContent: 'space-between'}}>
                <MinusBtn
                  disabled={item.count <= 1}
                  onClick = {() => dispatch(subCount(item.id))}
                />
                <span>{item.count}</span>
                <PlusBtn
                  onClick = {() => dispatch(addCount(item.id))}
                />
              </BtnBox>
            </li>
            <li className='payment_price'>
              <span>{proTotalPrice.toLocaleString()}원</span>
            </li>
            <li className='payment_del_btn'>
              <DelBtn
                onClick={() => dispatch(deleteItem(item.id))}
              >삭제</DelBtn>
            </li>
          </CartList>
        )
      })
    }
  </PaymentCart>

  <CreditWrap>
    <div className='payment_info'>
      <ul>
        <li className='payment_total_account'>총 수량</li>
        <li className='payment_total_price'>{totalCount} 개</li>
      </ul>
      <ul>
        <li className='payment_total_account'>총 결제 금액</li>
        <li className='payment_total_price'>{totalPrice.toLocaleString()} 원</li>
      </ul>
    </div>
```
<br/><br/>

### 🔍 코드 리뷰 요약
- 
<br><br/>

### 🔹 학습 포인트
- 
<br/><br/>
