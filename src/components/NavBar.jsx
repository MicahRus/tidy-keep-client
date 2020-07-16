
import React from 'react'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
  render() {
    
    return (
      <nav>
          <Link to="/">Home</Link>
          <Link to="/Login">Login</Link>
<Link to="/SignUp">Sign Up</Link>

       
      </nav>
    )
  }
}

export default NavBar