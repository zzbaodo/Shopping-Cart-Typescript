import { useState } from "react"
import { useQuery } from "react-query"

import Drawer from "@material-ui/core/Drawer"
import LinearProgress from "@material-ui/core/LinearProgress"
import Grid from "@material-ui/core/Grid"
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart"
import Badge from "@material-ui/core/Badge"

import { Wrapper } from "./App.styles"

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
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "product",
    getProducts
  )
  console.log(data)
  const getTotalItems = () => null
  const handleAddtoCart = () => null
  const handleRemoveFromCart = () => null
  if (isLoading) return <LinearProgress />
  if (error) return <div>Something went wrong</div>
  return <div className="App">start</div>
}

export default App
