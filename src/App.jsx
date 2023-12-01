import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from './pages/Home.jsx'
import Signin from './pages/Signin.jsx'
import Signup from './pages/Signup.jsx'
import About from './pages/About.jsx'
import Profile from './pages/Profile.jsx'
import Header from "./components/Header.jsx"
import PrivateRoute from "./components/PrivateRoute.jsx"
import Createlisting from "./pages/Createlisting.jsx"
export default function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/about" element={<About />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-list" element={<Createlisting />}/>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}
