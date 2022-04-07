import React, { useState } from "react";

//Redux Imports
// import { useDispatch } from "react-redux";

//Router Imports
import { useNavigate } from "react-router";

//Common Styling Imports
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

//Navbar Imports
import AppBar from "@mui/material/AppBar";
import styled from "@mui/material/styles/styled";

//Navbar Links Imports
import Button from "@mui/material/Button";

//User Nav Link
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import AccountCircle from "@mui/icons-material/AccountCircle";
import Badge from "@mui/material/Badge";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Avatar, Checkbox } from "@mui/material";

//Site Logo Imports
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";

//Searchbar Imports
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

//Import Login, Signup Dialog
// import Register from "../Pages/Register";
// import Login from "../Pages/Login"
//Redux Actions Imports
// import { logout } from "../../js/actions";

// import { useSelector } from "react-redux";

//Configuring Style for SearchBar Elements
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  color: "black",
  border: "2px solid black",
  borderRadius: "30px",
  backgroundColor: "#F5F3EE",
  "&:hover": {
    backgroundColor: "#F0EEE9",
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  padding: "0px",
  width: "auto",
  display: "flex",
  alignItems: "center",
  direction: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
}));

const SearchIconButton = styled(IconButton)(({ theme }) => ({
  size: "large",
  float: "right",
  // aria-label: "show 4 new mails",
  color: "inherit",
  width: "auto",
  fontWeight: "bold",
  textAlign: "center",
  // padding: theme.spacing(0, 2),
  // height: '100%',
  // position: 'absolute',
  // pointerEvents: 'none',
  // display: 'flex',
  // alignItems: 'center',
  // justifyContent: 'center',
  // color: "black"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(0)})`,
    // paddingLeft: '10px',
    transition: theme.transitions.create("width"),
    width: "80%",
    // [theme.breakpoints.up('md')]: {
    //   width: '20ch',
    // },
  },
}));

export default function Navbar(props) {
//   const dispatch = useDispatch();
  let navigate = useNavigate();

//   const cartItems = useSelector((state) => state.cartItems);
//   const loggedInUser = useSelector(state => state.loggedInUser);
//   let isLoggedIn = Object.keys(loggedInUser).length !== 0 ? true : false;

  // const cart = useSelector(state => state.userCartItems);
  // console.log(cart.length);
  // console.log(isLoggedIn);
  //Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [registerDialogVisibility, setRegisterDialogVisibility]= useState(false);
  const openRegisterDialog = () => {
    console.log("Opening register dialog")
    setRegisterDialogVisibility(true);
  }
  const closeRegisterDialog = () => {
    setRegisterDialogVisibility(false);
  }

  const [loginDialogVisibility, setLoginDialogVisibility]= useState(false);
  const openLoginDialog = () => {
    console.log("Opening Login dialog")
    setLoginDialogVisibility(true);
  }
  const closeLoginDialog = () => {
    setLoginDialogVisibility(false);
  }

  const [searchItemString, setSearchItemSting] = useState(null);
  const updateSearchString = async (e) => {
    console.log(e.target.value);
    setSearchItemSting(e.target.value);
  };

//   const searchItem = async () => {
//     var shopId = (loggedInUser["userShopData"]["shop_id"]) ? loggedInUser["userShopData"]["shop_id"]: "-1"
//     var url = (isLoggedIn) ? "/search/" + shopId +"/" + searchItemString : "/";
//     navigate(url);
//   };

  const isPageFavorite = props.isPageFavorite;
//   const goToFavoriteItemsPage = () => {
//     console.log("Going to Favourites Page");
//     var url = (isLoggedIn) ? "/viewUserProfile/" + loggedInUser["userData"]["user_id"] : "/";
//     navigate(url);
//   };

  const isCartPage = props.isCartPage;
  // const shopCartTotalItems = 
//   const goToMyCartPage = () => {
//     console.log("Going to My Cart Page");
//     var url = (isLoggedIn) ? "/viewCart/" + loggedInUser["userData"]["user_id"] : "/";
//     navigate(url);
//   };

//   const goToMyProfilePage = () => {
//     console.log("Going to My Profile Section");
//     var url = (isLoggedIn) ? "/viewUserProfile/" + loggedInUser["userData"]["user_id"] : "/";
//     navigate(url);
//   };

//   const goToMyShopPage = () => {
//     console.log("Going to My Profile Section");
//     var url = (isLoggedIn) ? (loggedInUser["userShopData"]["shop_id"]) ? "/viewShop/" + loggedInUser["userShopData"]["shop_id"] : "/createShop" : "/";
//     navigate(url);
//   };

//   const goToMyOrderPage = () => {
//     console.log("Going to My Purchases Page");
//     var url = (isLoggedIn) ? "/showOrders/" + loggedInUser["userData"]["user_id"] : "/";
//     navigate(url);
//   };

  const goToLogin = (event) => {
    //console.log("Welcome To Login");
    navigate("/login");
  };

  // const goToRegister = (event) => {
  //   //console.log("Welcome To Register");
  //   navigate("/register");
  // };

  const goToLogout = (event) => {
    //console.log("Welcome To Logout");
    sessionStorage.clear();
    // dispatch(logout({}));
    navigate("/");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={goToMyProfilePage}>My Profile</MenuItem>
      <MenuItem onClick={goToMyShopPage}>My Shop</MenuItem>
      <MenuItem onClick={goToMyOrderPage}>My Purchases</MenuItem> */}
      <MenuItem onClick={goToLogout}>Logout</MenuItem>
    </Menu>
  );

  let shopCartIcon = null;
  if(isCartPage) {
    // console.log("ght" + cartItems.length);
    // shopCartIcon = (<Badge id="shopCartTotalItems" color="error" badgeContent={cartItems.length}>
    //             <ShoppingCartIcon sx={{ color: "black" }} />
    //     </Badge>);
  }
  else{
    // shopCartIcon = (<Badge id="shopCartTotalItems"color="error" badgeContent={cartItems.length}>
    //             <ShoppingCartOutlinedIcon sx={{ color: "black" }} />
    //     </Badge>);
  }

  let userProfileIcon = null;
//   if(isLoggedIn){
//     userProfileIcon = (<Avatar alt="Remy Sharp" src={loggedInUser["userData"]["profileImageURL"]} />);
//   }
//   else{
//     userProfileIcon = (<AccountCircle sx={{ color: "black" }} />);
//   }
  const getNavLinks = () => {
    // const isLoggedIn = props.isLoggedIn;
    // if (isLoggedIn) {
    //   return (
    //     <div>
    //       <Box
    //         sx={{ display: { xs: "none", md: "flex" } }}
    //         style={{ margin: "5px" }}
    //       >
    //         <Badge badgeContent={0} color="error">
    //           <Checkbox
    //             id="goToFavoriteItemsPage"
    //             onChange={goToFavoriteItemsPage}
    //             sx={{
    //               color: "black",
    //               "&.Mui-checked": {
    //                 color: "red",
    //               },
    //             }}
    //             icon={<FavoriteBorderIcon />}
    //             checkedIcon={<Favorite />}
    //             checked={isPageFavorite}
    //           />
    //         </Badge>
    //         <IconButton
    //           size="large"
    //           aria-label="show 17 new notifications"
    //           color="inherit"
    //           onClick={goToMyCartPage}
    //         >
    //           {shopCartIcon}
    //         </IconButton>
    //         <IconButton
    //           size="large"
    //           edge="end"
    //           aria-label="account of current user"
    //           aria-controls={menuId}
    //           aria-haspopup="true"
    //           onClick={handleProfileMenuOpen}
    //           color="inherit"
    //         >
    //           {userProfileIcon}
    //         </IconButton>
    //       </Box>
    //     </div>
    //   );
    // } else {
    //   return (
    //     <Box sx={{ display: { xs: "none", md: "flex" } }}>
    //       <Box
    //         sx={{ display: { xs: "none", md: "flex" } }}
    //         style={{ margin: "5px" }}
    //       >
    //         <Button
    //           size="large"
    //           aria-label="show 4 new mails"
    //           color="inherit"
    //           style={{
    //             borderRadius: "24px",
    //             fontFamily:
    //               '"Graphik Webfont",-apple-system,"Helvetica Neue","Droid Sans",Arial,sans-serif',
    //             fontWeight: "bold",
    //           }}
    //           onClick={openLoginDialog}
    //         >
    //           <Typography
    //             variant="h8"
    //             noWrap
    //             component="div"
    //             sx={{ display: { xs: "none", sm: "block" }, color: "black" }}
    //             textTransform="capitalize"
    //           >
    //             Sign In
    //           </Typography>
    //         </Button>
    //       </Box>
    //       <Box
    //         sx={{ display: { xs: "none", md: "flex" } }}
    //         style={{ margin: "5px" }}
    //       >
    //         <Button
    //           id="signUpButton"
    //           size="large"
    //           aria-label="show 4 new mails"
    //           color="inherit"
    //           style={{
    //             borderRadius: "24px",
    //             fontFamily:
    //               '"Graphik Webfont",-apple-system,"Helvetica Neue","Droid Sans",Arial,sans-serif',
    //             fontWeight: "bold",
    //           }}
    //           onClick={openRegisterDialog}
    //         >
    //           <Typography
    //             variant="h8"
    //             noWrap
    //             component="div"
    //             sx={{ display: { xs: "none", sm: "block" }, color: "black" }}
    //             textTransform="capitalize"
    //           >
    //             Sign Up
    //           </Typography>
    //         </Button>
    //       </Box>
    //     </Box>
    //   );
    // }
  };

  return (
    <div>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" style={{ backgroundColor: "white" }}>
        <Toolbar>
          {renderMenu}
          <Box  style={{ marginLeft: "10px" }}>
            <Link onClick={() => navigate("/home")} color="inherit">
              <Paper elevation={0}>
                <img
                  src="https://seeklogo.com/images/C/club-mahindra-logo-95D973A6C9-seeklogo.com.png"
                  alt="Site Logo"
                  width="48"
                  height="24"
                />
              </Paper>
            </Link>
          </Box>
  

          <Box sx={{ flexGrow: 1 }}>
            <Search>
              <StyledInputBase
                placeholder="Search for everything"
                inputProps={{ "aria-label": "search" }}
                onChange={updateSearchString}
                style={{ width: "90%" }}
              />
              <SearchIconButton > 
                  {/* onClick={searchItem} */}
                <SearchIcon />
              </SearchIconButton>
            </Search>
          </Box>
          {getNavLinks()}
        </Toolbar>
      </AppBar>  
    </Box>
    {/* <Register open={registerDialogVisibility} handleClose={closeRegisterDialog}/>
    <Login open={loginDialogVisibility} handleClose={closeLoginDialog} /> */}
  </div>
    );
  
}
