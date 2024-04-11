import React, { useState } from 'react'
import {AppBar, Toolbar, Typography,Tab, Tabs} from "@mui/material"
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    const [value, setValue] =useState(  ); 
  return (
    <div>
        <AppBar sx={{backgroundColor:"#5B189B", width:"auto", ml:"auto"}} position='sticky'>

          <Toolbar>
            <div class="text-secondary">
            <a href="/Profile"><img style={{height: 50, width: 50}} class="rounded-circle" src=".\avatar.png" href="#"></img></a>
            </div> 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a className="nav-link" aria-current="page" href="/" ><div class="text-secondary" style={{color: '#5A189A'}}>Home</div></a>
            <a className="nav-link" aria-current="page" href="/AddTransaction" ><div class="text-secondary">Delivery Man Details</div></a>
            <a className="nav-link" aria-current="page" href="/AddAccount" ><div class="text-secondary">Order Details</div></a>
            <Tabs sx={{ml:"auto"}}   value={value} onChange={(e,val)=>setValue(val)} >
            <div><a href="/Profile"><img style={{height: 50, width: 50}} class="rounded-circle" src="https://cdn-icons-png.flaticon.com/512/219/219983.png" href="#"></img></a></div>
              <Tab LinkComponent={NavLink} to="/" label='Sign Out'/>
            </Tabs>
            </Toolbar>
        </AppBar>
    </div>
  )
}

export default NavBar