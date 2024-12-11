// Write your code here
import {useState} from 'react'
import {Popup} from 'reactjs-popup'
import {IoIosClose} from 'react-icons/io'
import CartContext from '../../context/CartContext'
import 'reactjs-popup/dist/index.css'

import './index.css'

const CartSummary = () => {
  const [checkbox, setCheckbox] = useState(false)
  const [submitted, checkSubmitted] = useState(false)

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, removeAllCartItems} = value

        const checkPrice = cartList.map(
          eachValue => eachValue.price * eachValue.quantity,
        )

        let showPrice = 0

        checkPrice.forEach(eachNum => {
          showPrice += eachNum
        })

        const removeItems = () => {
          checkSubmitted(true)
        }

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
              <Popup
                trigger={
                  <button className="custom-btn" type="submit">
                    Checkout
                  </button>
                }
                modal
              >
                {close => {
                  if (submitted) {
                    return (
                      <div className="pop-container success">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk0GIpKTjwpXb1ZUTvSSJMr8AvvfptCGQt9w&s"
                          alt="success"
                          className="success-img"
                        />
                        <h1>Your order has been placed successfully</h1>
                        <button
                          type="submit"
                          className="checkout-button"
                          onClick={() => removeAllCartItems()}
                        >
                          Close
                        </button>
                      </div>
                    )
                  }

                  return (
                    <>
                      <button
                        type="submit"
                        className="close-btn"
                        onClick={() => close()}
                      >
                        <IoIosClose size={20} />{' '}
                      </button>
                      <div className="pop-container">
                        <h1 className="payment-heading">Payment Method</h1>
                        <p className="payment-para">
                          How would you like to pay?
                        </p>
                        <ul className="payment-list-container">
                          <li className="payment-list-el">
                            <input
                              type="radio"
                              disabled
                              className="payment-input-el"
                              id="vard"
                            />
                            <label htmlFor="card">Card</label>
                          </li>
                          <hr />
                          <li className="payment-list-el">
                            <input
                              type="radio"
                              disabled
                              className="payment-input-el"
                              id="netbanking"
                            />
                            <label htmlFor="netbanking">Net Banking</label>
                          </li>
                          <hr />
                          <li className="payment-list-el">
                            <input
                              type="radio"
                              disabled
                              className="payment-input-el"
                              id="upi"
                            />
                            <label htmlFor="upi">UPI</label>
                          </li>
                          <hr />
                          <li className="payment-list-el">
                            <input
                              type="radio"
                              disabled
                              className="payment-input-el"
                              id="wallet"
                            />
                            <label htmlFor="wallet">Wallet</label>
                          </li>
                          <hr />
                          <li className="payment-list-el">
                            {checkbox ? (
                              <input
                                type="radio"
                                className="payment-input-el"
                                id="cod"
                                onChange={() => setCheckbox(true)}
                                checked
                              />
                            ) : (
                              <input
                                type="radio"
                                className="payment-input-el"
                                id="cod"
                                onChange={() => setCheckbox(true)}
                              />
                            )}
                            <label htmlFor="cod">Cash on Delivery</label>
                          </li>
                        </ul>
                        <div className="bill-container">
                          <h1 className="order-heading">
                            Order Total:
                            <span className="total-span">Rs {showPrice}/-</span>
                          </h1>
                          <p className="order-para">
                            <span>{cartList.length}</span> Items in cart
                          </p>
                          {/* eslint-disable-next-line */}
                        </div>
                        {checkbox === false ? (
                          <button
                            type="submit"
                            className="checkout-button unselected"
                            disabled
                          >
                            Confirm Order
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="checkout-button"
                            onClick={removeItems}
                          >
                            Confirm Order
                          </button>
                        )}
                      </div>
                    </>
                  )
                }}
              </Popup>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
