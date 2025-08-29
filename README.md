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
(1) 키오스크 화면 라우터 구성
- React Router를 활용해 키오스크 첫 화면, 카테고리별 상품 화면, 결제 화면 간 원활한 이동 구현
- 중첩 라우트 및 Navigate를 활용해 기본 카테고리 리다이렉트 처리

```javascript

// App.js

function App() {

  return (
    <div className="App">

      {/* 키오스크 전체 래퍼: 화면 중앙 배치 및 기본 스타일 적용 */}
      <KioskWrapper>
        {/* 키오스크 콘텐츠 영역 컨테이너 */}
        <KioskWrap>

          {/* 라우팅 설정 */}
          <Routes>
            {/* 키오스크 첫 화면 */}
            <Route path='/' element={<Main />} />
            {/* 서브 메뉴 화면(카테고리별 상품 리스트) */}
            <Route path='/sub/*' element={<Sub />}>
              {/* /sub 접근 시 classic 카테고리로 이동 */}
              <Route index element={<Navigate to='classic' replace />} />
              {/* 각 카테고리별 상품 페이지 */}
              <Route path='classic' element={<SubClassic products={products} />} />
              <Route path='stick' element={<SubStick products={products} />} />
              <Route path='hotdog' element={<SubHotdog products={products} />} />
              <Route path='dip' element={<SubDip products={products} />} />
              <Route path='drink' element={<SubDrink products={products} />} />
            </Route>
            {/* 결제 화면 */}
            <Route path='payment' element={<Payment />} />
          </Routes>
        </KioskWrap>
      </KioskWrapper>
    </div>
  );
}
```
<br/>

(2) Redux 전역 상태 관리 구성
- Redux Toolkit을 활용해 장바구니, 옵션 수량 등 전역 상태를 일관되게 관리
- cartSlice, optionCountSlice 등을 정의해 상품 추가/삭제, 수량 조절, 옵션 관리 상태를 전역으로 관리
- useSelector, useDispatch를 활용해 컴포넌트 간 상태 공유 및 업데이트를 간소화
```javascript
// redux > cartSlice.js

import { createSlice } from "@reduxjs/toolkit";

// 장바구니 상태 관리 슬라이스
const cart = createSlice({
  name: 'cart',
  initialState: [], // 초기 상태: 빈 배열
  reducers: {

    // 장바구니에 아이템 추가
    addItem(state, action) {
      const index = state.findIndex((findId) => findId.id === action.payload.id)
      if (index > -1) {
        // 이미 존재하면 수량 증가 및 옵션 업데이트
        state[index].count += action.payload.count;
        state[index].options = action.payload.options;
      } else {
        // 새 아이템이면 배열에 추가
        state.push(action.payload);
      }
    },

    // 장바구니에서 아이템 삭제
    deleteItem(state, action) {
      const index = state.findIndex((findId) => findId.id === action.payload);
      state.splice(index, 1);
    },

    // 아이템 수량 증가
    addCount(state, action) {
      const index = state.findIndex((findId) => findId.id === action.payload);
      state[index].count++;
    },

    // 아이템 수량 감소
    subCount(state, action) {
      const index = state.findIndex((findId) => findId.id === action.payload);
      state[index].count--;
    },

    // 장바구니 초기화
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

// 단일 옵션 카운트 상태 관리
const optionCounterOne = createSlice({
  name: 'optionCounterOne',
  initialState: {value: 1}, // 초기값 1
  reducers: {

    // 수량 증가
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },

    // 수량 감소
    decrementByAmount: (state, action) => {
      state.value -= action.payload;
    },

    // 수량 직접 설정
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

// redux store 생성, 각 슬라이스를 리듀서로 등록
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

  // 장바구니 상태, dispatch 가져오기
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // 장바구니 관련 데이터 계산
  const totalCount = cart.reduce((sum, item) => sum + item.count, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.count, 0)

  <div className={SubFooterStyle.cart_list}>
    {
      cart.map((item,i) => {
        return(
          <ul key={item.id}>
            {/* 상품명 */}
            <li>{item.title}</li>
            {/* 수량 조절 버튼 */}
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
            {/* 가격 */}
            <li>{(item.price * item.count).toLocaleString()}원</li>
            {/* 삭제 버튼 */}
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

  // 액션 실행용 dispatch
  const dispatch = useDispatch();
  // 장바구니 상태 호출
  const cart = useSelector((state) => state.cart);

  // 결제 페이지 관련 데이터 계산
  const totalCount = cart.reduce((acc, item) => acc + item.count, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.count * item.price, 0);

  // 결제 수단 선택 모달 상태
  const [selectedPayment, setSelectedPayment] = useState(null);

  <PaymentWrap>
    {/* 결제 수단이 선택되었을 때만 결제 모달 표시 */}
    {
      selectedPayment && (
        <PaymentModal
          payment={selectedPayment}
          onClose={() => setSelectedPayment(null)}
        />
      )
    }

    {/* 장바구니 목록 영역 */}
    <PaymentCart>
      {/* 장바구니 테이블 헤더 */}
      <ul className='cart_sort'>
        <li>메뉴</li>
        <li>수량</li>
        <li>금액</li>
        <li></li>
      </ul>

      {/* 장바구니 아이템 출력 */}
      {
        cart.map((item) => {
          // 각 상품의 총 금액 = 단가 * 수량
          const proTotalPrice = item.count * item.price;

          return (
            <CartList key={item.id}>
              <li className='menu_name'>
                {/* 상품 정보(이미지 + 이름) */}
                <div><img src={item.image} /></div>
                <p>{item.title}</p>
              </li>
              {/* 수량 조절 버튼 */}
              <li className='payment_amount_box'>
                <BtnBox style={{width: '300px', justifyContent: 'space-between'}}>
                  {/* 수량 감소 버튼 (1 이하일 땐 비활성화) */}
                  <MinusBtn
                    disabled={item.count <= 1}
                    onClick = {() => dispatch(subCount(item.id))}
                  />
                  <span>{item.count}</span>
                  {/* 수량 증가 버튼 */}
                  <PlusBtn
                    onClick = {() => dispatch(addCount(item.id))}
                  />
                </BtnBox>
              </li>

              {/* 상품 총 금액 */}
              <li className='payment_price'>
                <span>{proTotalPrice.toLocaleString()}원</span>
              </li>

              {/* 삭제 버튼 */}
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

    {/* 결제 정보 요약 (총 수량 / 총 금액) */}
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
  {/* --- 이후 다른 UI 생략 --- */}
  </PaymentWrap>

```
<br/>

### 🔍 코드 리뷰 요약
- Navigate를 통해 /sub 진입 시 기본 카테고리(classic)로 자동 리다이렉트 처리
- Redux Toolkit 활용해 cartSlice로 장바구니 관리, optionCountOneSlice로 옵션 수량 상태 관리
- Footer, Payment 페이지에서 장바구니 데이터 기반으로 총 수량, 총 금액 계산 및 UI 반영
- 결제 페이지에서 모달 상태 관리로 결제 수단 선택 기능 구현
<br><br/>

### 🔹 학습 포인트
- React Router의 Outlet, Navigate를 통한 중첩 라우팅 패턴
- 중첩 라우팅과 리다이렉트를 통한 사용자 흐름 제어 경험
- 장바구니(추가, 삭제, 수량 증감) 같은 실무형 데이터 흐름을 Redux로 일관되게 관리하는 패턴 경험
- useSelector, useDispatch를 통한 React-Redux 연동 방식 이해
- 구조화된 상태 관리와 라우팅 설계가 유지보수성과 확장성 확보에 어떻게 기여하는지 경험
<br/><br/>
