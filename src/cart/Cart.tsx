import CartItem from "./CartItem"

import { Wrapper } from "./Cart.styles"

import { CartItemType } from "../App"


type Props = {
  cartItem: CartItemType[]
  addToCart: (clickedItem: CartItemType) => void
  removeFromCart: (id: number) => void
}

const Cart: React.FC<Props> = ({ cartItem, addToCart, removeFromCart }) => {
  const calTotal = (items: CartItemType[]) => {
    return items.reduce(
      (ack: number, item) => ack + item.amount * item.price,
      0
    )
  }
  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItem.length === 0 ? <p>No item in cart</p> : null}
      {cartItem.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calTotal(cartItem).toFixed(2)}</h2>
    </Wrapper>
  )
}

export default Cart
