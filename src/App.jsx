import { useRoutes } from "react-router-dom"
import UserList from "./pages/UserList"
import UserEdit from "./pages/UserEdit"
import AddCart from "./pages/AddCart"
const App =()=>{
  const element = useRoutes([
    {path:'/',element:<UserList/>},
    {path:'/create',element:<UserEdit/>},
    {path:'/edit/:id',element:<UserEdit/>},
    {path:'/cart',element:<AddCart/>}

  ])
  return element
}


export default App
