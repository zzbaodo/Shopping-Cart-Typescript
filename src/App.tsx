import { useState } from "react"
import { useQuery } from "react-query"

import Drawer from "@material-ui/core/Drawer"
import LinearProgress from "@material-ui/core/LinearProgress"
import Grid from "@material-ui/core/Grid"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
import Badge from "@material-ui/core/Badge"
import Item from "./item/Item"
import { Wrapper } from "./App.styles"
import { StyledButton } from "./App.styles"
import Cart from "./cart/Cart"

export type CartItemType = {
  id: number
  category: string
  description: string
  image: string
  price: number
  title: string
  amount: number
}

const getProducts = async (): Promise<CartItemType[]> => {
  const data = await (await fetch("https://fakestoreapi.com/products")).json()
  return data
}
function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemType[])
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "product",
    getProducts
  )
  console.log(data)
  const getTotalItems = (items: CartItemType[]) => {
    return items.reduce((ack: number, item) => ack + item.amount, 0)
  }
  const handleAddtoCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const existed = prev.find((item) => item.id === clickedItem.id)
      if (existed) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        )
      }
      return [...prev, { ...clickedItem, amount: 1 }]
    })
  }
  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack
          return [...ack, { ...item, amount: item.amount - 1 }]
        } else {
          return [...ack, item]
        }
      }, [] as CartItemType[])
    )
  }
  if (isLoading) return <LinearProgress />
  if (error) return <div>Something went wrong</div>
  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItem={cartItems}
          addToCart={handleAddtoCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item: CartItemType) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddtoCart={handleAddtoCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  )
}

export default App
