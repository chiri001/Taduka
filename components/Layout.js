//wrapper for all pages to add the them of mui and style website elements
import { createTheme } from '@mui/material/styles';
import Head from 'next/head';
import {
  Badge,
  Button,
  Box,
  Container,
  Link,
  Typography,
  Menu,
  MenuItem,
  Toolbar,
  AppBar,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import NextLink from 'next/link';
import classes from '../utils/classes';
import { Store } from '../utils/Store';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import jsCookie from 'js-cookie';
import { getError } from '../utils/error';

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

      h1: {
        fontSize: '1.4rem',
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
        main: '#d1b1e3',
      },
    },
  });

  const [anchorEl, setAnchorEl] = useState(null);

  const loginMenuCLoseHandler = (e, redirect) => {
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

  return (
    <>
      <Head>
        {/* check if title and description exist */}
        <title>{title ? `${title} - Taduka` : 'Taduka'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" sx={classes.appbar}>
          <Toolbar sx={classes.toolbar}>
            <NextLink href="/" passHref>
              <Link>
                <Typography sx={classes.brand}> Taduka </Typography>
              </Link>
            </NextLink>
            <Box>
              <NextLink href="/cart" passHref>
                <Link>
                  <Typography component={'span'}>
                    {cart.cartItems.length > 0 ? (
                      <Badge
                        color="secondary"
                        badgeContent={cart.cartItems.length}
                      >
                        Cart
                      </Badge>
                    ) : (
                      'Cart'
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
                    {userInfo.name}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCLoseHandler}
                  >
                    <MenuItem
                      onClick={(e) => loginMenuCLoseHandler(e, '/profile')}
                    >
                      Profile
                    </MenuItem>

                    <MenuItem onClick={logOutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref>
                  <Link>Login</Link>
                </NextLink>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Container component="main" sx={classes.main}>
          {children}
        </Container>
        <Box component="footer" sx={classes.footer}>
          <Typography> @copyright Taduka 2022. All rights reserved </Typography>
        </Box>
      </ThemeProvider>
    </>
  );
}
