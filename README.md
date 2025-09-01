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

### 🛠️ 코드 리뷰
## (1) 키오스크 화면 구성 위해 App 컴포넌트에서 페이지 라우팅 구조 정의
- 키오스크 관련 전체 레이아웃 안에서 주요 페이지 렌더링
- /sub/* 경로에 중첩 라우팅 적용, 기본 인덱스는 classic 페이지로 리다이렉트
- 각 메뉴별 하위 페이지(classic, stick, hotdog, dip, drink)에 products 데이터 props 전달

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
<br/>

## (2) Redux 전역 상태 관리 구성
- Redux Toolkit을 활용해 장바구니, 옵션 수량 등 전역 상태를 일관되게 관리
- cartSlice, optionCountSlice 등을 정의해 상품 추가/삭제, 수량 조절, 옵션 관리 상태를 전역으로 관리
- useSelector, useDispatch를 활용해 컴포넌트 간 상태 공유 및 업데이트를 간소화
- Footer 컴포넌트에서 장바구니 데이터 기반으로 총 수량, 총 금액 계산 및 UI 반영
```javascript
// redux > cartSlice.js

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
    },
    // 이하 reducers(deleteItem, addCount, subCount) 생략
    clearCart: () => {
      return [];
    }
  }
});
```

<details>
  <summary>🔎 cartSlice 요약 없이 전체 보기</summary>

```javascript

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
    },
    deleteItem(state, action) {
      const index = state.findIndex((findId) => findId.id === action.payload);
      state.splice(index, 1);
    },
    addCount(state, action) {
      const index = state.findIndex((findId) => findId.id === action.payload);
      state[index].count++;
    },
    subCount(state, action) {
      const index = state.findIndex((findId) => findId.id === action.payload);
      state[index].count--;
    },
    clearCart: () => {
      return [];
    }
  }
});

export const { addItem, deleteItem, addCount, subCount, clearCart } = cart.actions;
export default cart.reducer;
```
  
</details>

```javascript

// redux > optionCountOneSlice.js

const optionCounterOne = createSlice({
  name: 'optionCounterOne',
  initialState: {value: 1},
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    // 이하 reducers(decrementByAmount, setCount) 생략
  },
});
```

<details>
  <summary>🔎 optionCountOneSlice 요약 없이 전체 보기</summary>

  
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

</details>

``` javascript
// copmonents > footer.js

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalCount = cart.reduce((sum, item) => sum + item.count, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.count, 0)

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

<br><br/>

### 🔹 학습 포인트
- React Router의 Outlet, Navigate를 통한 중첩 라우팅 패턴
- 중첩 라우팅과 리다이렉트를 통한 사용자 흐름 제어 경험
- 장바구니(추가, 삭제, 수량 증감) 같은 실무형 데이터 흐름을 Redux로 일관되게 관리하는 패턴 경험
- useSelector, useDispatch를 통한 React-Redux 연동 방식 이해
- 구조화된 상태 관리와 라우팅 설계가 유지보수성과 확장성 확보에 어떻게 기여하는지 경험
<br/><br/>
