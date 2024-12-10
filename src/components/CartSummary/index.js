// Write your code here
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const checkPrice = cartList.map(
        eachValue => eachValue.price * eachValue.quantity,
      )

      let showPrice = 0

      checkPrice.forEach(eachNum => {
        showPrice += eachNum
      })

      return (
        <div className="summary-container">
          <div className="inner-container">
            <h1 className="order-heading">
              Order Total:
              <span className="total-span">Rs {showPrice}/-</span>
            </h1>
            <p className="order-para">
              <span>{cartList.length}</span> Items in cart
            </p>
            {/* eslint-disable-next-line */}
            <button className="custom-btn" type="submit">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
