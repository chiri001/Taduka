//wrapper for all pages to add the them of mui and style website elements
import { createTheme } from '@mui/material/styles';
import Head from 'next/head';
import {
  Badge,
  Button,
  Box,
  Container,
  Link,
  List,
  ListItem,
  ListItemText,
  InputBase,
  IconButton,
  Typography,
  Menu,
  Divider,
  Drawer,
  MenuItem,
  Toolbar,
  AppBar,
  CssBaseline,
  ThemeProvider,
  TableCell,
  useMediaQuery,
} from '@mui/material';
import NextLink from 'next/link';
import classes from '../utils/classes';
import { Store } from '../utils/Store';
import { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import jsCookie from 'js-cookie';
import { getError } from '../utils/error';
import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { ImCart } from 'react-icons/im';
import { RiFacebookCircleFill } from 'react-icons/ri';
import { RiInstagramFill } from 'react-icons/ri';
import { FiUserCheck } from 'react-icons/fi';
import { RiUserShared2Line } from 'react-icons/ri';

export default function Layout({ title, description, children }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const theme = createTheme({
    components: {
      MuiLink: {
        defaultProps: {
          underline: 'hover',
        },
      },
    },
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },

      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },

      h3: {
        fontSize: '1.2rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      mode: 'light',
      primary: {
        main: '#00963a',
      },
      secondary: {
        main: '#00963a',
      },
      tertiary: {
        main: '#ffffff',
      },
      delete: {
        main: '#f20521',
      },
    },
  });

  const [anchorEl, setAnchorEl] = useState(null);

  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);

    if (redirect) {
      router.push(redirect);
    }
  };

  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const logOutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    jsCookie.remove('userInfo');
    jsCookie.remove('cartItems');
    jsCookie.remove('shippingAddress');
    jsCookie.remove('paymentMethod');
    router.push('/');
  };

  const [sidbarVisible, setSidebarVisible] = useState(false);
  const sidebarOpenHandler = () => {
    setSidebarVisible(true);
  };
  const sidebarCloseHandler = () => {
    setSidebarVisible(false);
  };
  const { enqueueSnackbar } = useSnackbar();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        enqueueSnackbar(getError(err), { variant: 'error' });
      }
    };
    fetchCategories();
  }, [enqueueSnackbar]);

  const isDesktop = useMediaQuery('(min-width:600px)');

  const [query, setQuery] = useState('');
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };
  return (
    <>
      <Head>
        <title>{title ? `${title} - Taduka` : 'Taduka'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" sx={classes.appbar}>
          <Toolbar sx={classes.toolbar}>
            <Box display="flex" alignItems="center">
              <IconButton
                edge="start"
                aria-label="open drawer"
                onClick={sidebarOpenHandler}
                sx={classes.menuButton}
              >
                <MenuIcon sx={classes.navbarButton} />
              </IconButton>
              <NextLink href="/" passHref>
                <Link>
                  <Typography sx={classes.brand}>Taduka</Typography>
                </Link>
              </NextLink>
            </Box>
            <Drawer
              anchor="left"
              open={sidbarVisible}
              onClose={sidebarCloseHandler}
            >
              <List>
                <ListItem>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography>Shopping by category</Typography>
                    <IconButton
                      aria-label="close"
                      onClick={sidebarCloseHandler}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Box>
                </ListItem>
                <Divider light />
                {categories.map((category) => (
                  <NextLink
                    key={category}
                    href={`/search?category=${category}`}
                    passHref
                  >
                    <ListItem
                      button
                      component="a"
                      onClick={sidebarCloseHandler}
                    >
                      <ListItemText primary={category}></ListItemText>
                    </ListItem>
                  </NextLink>
                ))}
              </List>
            </Drawer>

            <form onSubmit={submitHandler}>
              <Box sx={classes.searchForm}>
                <InputBase
                  name="query"
                  sx={classes.searchInput}
                  placeholder="Search products"
                  onChange={queryChangeHandler}
                />
                <IconButton
                  type="submit"
                  sx={classes.searchButton}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </Box>
            </form>

            <Box>
              <NextLink href="/cart" passHref>
                <Link>
                  <Typography component="span">
                    {cart.cartItems.length > 0 ? (
                      <Badge
                        color="tertiary"
                        badgeContent={cart.cartItems.length}
                      >
                        <ImCart size={20} />
                      </Badge>
                    ) : (
                      <ImCart size={20} />
                    )}
                  </Typography>
                </Link>
              </NextLink>
              {userInfo ? (
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    sx={classes.navbarButton}
                    onClick={loginClickHandler}
                  >
                    <FiUserCheck size={25} color="#4b0096" />
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, '/profile')}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, '/orderHistory')}
                    >
                      Order History
                    </MenuItem>
                    <MenuItem onClick={logOutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    sx={classes.navbarButton}
                    onClick={loginClickHandler}
                    variant="h2"
                  >
                    <RiUserShared2Line size={25} color="#4b0096" />
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, '/login')}
                    >
                      Login
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Container component="main" sx={classes.main}>
          {children}
        </Container>
        <Box backgroundColor="#D3D3D3">
          <TableCell marginleft={3} marginright={3}>
            <Typography variant="h3">
              Taduka is an online ecommerce shop that allows users to order
              groceries from the comfort of their homes and offers free shipping
              to their doorstep. The products we have include categories such as
              meat, dairy products, spices, and vegetables. We give you a
              variety to choose from. You no longer have to go to the market and
              struggle finding grocery to buy let a lone having the budden to
              carry those items. Taduka is here for you. Order today and enjoy
              our services
            </Typography>
          </TableCell>
        </Box>
        <Box component="footer" sx={classes.footer}>
          <Button
            fullWidth
            color="primary"
            onClick={() => {
              router.push('/');
            }}
          >
            Back to top
          </Button>
          <Typography variant="h3">
            @Taduka 2022. All rights reserved
          </Typography>
          <Button>
            <RiInstagramFill
              color="#833AB4"
              onClick={() => {
                router.push('/');
              }}
              size={30}
            />
          </Button>
          <Button>
            <RiFacebookCircleFill
              color="#4267B2"
              onClick={() => {
                router.push('/');
              }}
              size={30}
            />
          </Button>
        </Box>
      </ThemeProvider>
    </>
  );
}
