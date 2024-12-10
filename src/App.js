import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = idValue => {
    const {cartList} = this.state
    const otherProduct = cartList.filter(eachValue => eachValue.id !== idValue)
    this.setState({cartList: [...otherProduct]})
  }

  decrementCartItemQuantity = idValue => {
    const {cartList} = this.state
    const checkProduct = cartList.filter(eachValue => eachValue.id === idValue)
    const obj = checkProduct.map(eachValue => ({
      availability: eachValue.availability,
      brand: eachValue.brand,
      description: eachValue.description,
      id: eachValue.id,
      imageUrl: eachValue.imageUrl,
      price: eachValue.price,
      rating: eachValue.rating,
      title: eachValue.title,
      totalReviews: eachValue.total_reviews,
      quantity: eachValue.quantity - 1,
    }))
    const otherProduct = cartList.filter(eachValue => eachValue.id !== idValue)
    this.setState({cartList: [...obj, ...otherProduct]})
  }

  incrementCartItemQuantity = idValue => {
    const {cartList} = this.state
    const checkProduct = cartList.filter(eachValue => eachValue.id === idValue)
    const obj = checkProduct.map(eachValue => ({
      availability: eachValue.availability,
      brand: eachValue.brand,
      description: eachValue.description,
      id: eachValue.id,
      imageUrl: eachValue.imageUrl,
      price: eachValue.price,
      rating: eachValue.rating,
      title: eachValue.title,
      totalReviews: eachValue.total_reviews,
      quantity: eachValue.quantity + 1,
    }))
    const otherProduct = cartList.filter(eachValue => eachValue.id !== idValue)
    this.setState({cartList: [...obj, ...otherProduct]})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const checkProduct = cartList.filter(
      eachValue => eachValue.id === product.id,
    )
    if (checkProduct.length === 0) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
