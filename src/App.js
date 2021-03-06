import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'
import { productInitialization } from './reducers/productReducer'
import { featuredProductInitialization } from './reducers/featuredProductReducer'
import { usersInitialization } from './reducers/usersReducer'
import { ordersInitialization } from './reducers/ordersReducer'
import { userLoggingIn } from './reducers/loginReducer'
import userService from './services/users'
import orderService from './services/orders'
import NavBar from './components/NavBar'
import ProductsPage from './components/ProductsPage'
import Product from './components/Product'
import CheckOutPage from './components/CheckOutPage'
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import OrderDetails from './components/OrderDetails'
import UserInfo from './components/UserInfo'
import AdminPage from './components/AdminPage'
import TopBar from './components/TopBar'

const StyledContainer = styled.div`
  max-width: 1200px;
  margin: 75px auto;
  background-color: rgba(240, 240, 240, 0.6);
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(75, 75, 75, 0.2);
  padding: 25px 0;

  @media screen and (min-width: 768px) {
    padding: 50px;
  }
`

const App = props => {
  useEffect(() => {
    props.productInitialization()
    props.featuredProductInitialization()
    if (props.user && props.user.admin) {
      // refactor these to login reducer
      userService.setToken(props.user.token)
      orderService.setToken(props.user.token)
      props.usersInitialization()
      props.ordersInitialization()
    }
  }, [])

  const productById = id => props.products.find(product => product._id === id)

  const orderById = id => {
    if (props.user.admin) {
      return props.allOrders.find(order => order._id === id)
    }
    return props.user.orders.find(order => order._id === id)
  }

  const userById = id => props.registeredUsers.find(user => user._id === id)

  return (
    <Router>
      <TopBar />
      <NavBar />
      <StyledContainer>
        <Route path="/" exact component={LandingPage} />
        <Route
          exact
          path="/admin/"
          render={() => <AdminPage products={props.products} />}
        />
        <Route path="/products/" exact component={ProductsPage} />
        <Route
          exact
          path="/products/:id"
          render={({ match }) => (
            <Product product={productById(match.params.id)} />
          )}
        />
        <Route path="/cart/" component={CheckOutPage} />
        <Route path="/account/" exact component={LoginPage} />
        <Route
          exact
          path="/account/orders/:id"
          render={({ match }) => (
            <OrderDetails order={orderById(match.params.id)} />
          )}
        />
        <Route
          exact
          path="/admin/users/:id"
          render={({ match }) => <UserInfo user={userById(match.params.id)} />}
        />
        <Route
          exact
          path="/admin/orders/:id"
          render={({ match }) => (
            <OrderDetails order={orderById(match.params.id)} />
          )}
        />
      </StyledContainer>
    </Router>
  )
}

const mapStateToProps = state => ({
  products: state.products,
  user: state.user,
  registeredUsers: state.registeredUsers,
  allOrders: state.allOrders
})

export default connect(
  mapStateToProps,
  {
    productInitialization,
    featuredProductInitialization,
    usersInitialization,
    ordersInitialization,
    userLoggingIn
  }
)(App)
