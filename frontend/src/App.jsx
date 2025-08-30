import { Route, Routes } from "react-router-dom"
import { toast } from "react-toastify"
import SignInPage from "./pages/SignInPage"
import HomePage from "./pages/HomePage"
import Dashboard from "./components/Dashboard"
import Transactions from "./components/Transactions"
import Users from "./components/Users"
import Schedules from "./components/Schedules"
import Settings from "./components/Settings"
import PrivateRoute from "./components/PrivateRoute"
import SetPassword from "./components/SetPassword"
import Help from "./components/Help"
import Contact from "./components/Contact"

function App() {

  return (
    <div >
      
      <Routes>
        <Route path="/auth" element={<SignInPage/>}/>
        <Route path="/set-password" element={<SetPassword/>}/>
        <Route path="/" element={<PrivateRoute><HomePage/></PrivateRoute>}>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/transactions" element={<Transactions/>}/>
          <Route path="/users" element={<Users/>}/>
          <Route path="/schedules" element={<Schedules/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/help" element={<Help/>}/>
          <Route path="/contact-us" element={<Contact/>}/>
        </Route>
      </Routes>

    </div>
  )
}

export default App
