import {
  Box,
  Button,
  Card,
  Grid,
  Link,
  List,
  Typography,
  ListItem,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Layout from '../components/Layout';

import { useContext } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import { Store } from '../utils/Store';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { ImCart } from 'react-icons/im';
import { MdDeleteForever } from 'react-icons/md';

function CartScreen() {
  const router = useRouter();

  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store);

  const { enqueueSnackbar } = useSnackbar();

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);

    if (data.countInStock < quantity) {
      enqueueSnackbar('sorry, product is out of stock', { variant: 'error' });
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        _key: item._key,
        name: item.name,
        countInStock: item.countInStock,
        slug: item.slug,
        price: item.price,
        image: item.image,
        quantity,
      },
    });
    enqueueSnackbar(`Quantity of  ${item.name} has been updated in cart`, {
      variant: 'success',
    });
  };

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  return (
    <Layout title="shopping Cart">
      <Typography component="h1" variant="h1">
        Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Box>
          <ImCart size={70} />
          <Typography>
            Your Cart is Empty.
            <NextLink href="/" passHref>
              <Link> Continue Shoping</Link>
            </NextLink>
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} cs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell> Image </TableCell>
                    <TableCell> Name </TableCell>
                    <TableCell>Quantity </TableCell>
                    <TableCell> Price </TableCell>
                    <TableCell> Remove </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item._key}>
                      <TableCell>
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            ></Image>
                          </Link>
                        </NextLink>
                      </TableCell>
                      <TableCell>
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <Typography>{item.name} </Typography>
                          </Link>
                        </NextLink>
                      </TableCell>
                      <TableCell allign="right">
                        <Select
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartHandler(item, e.target.value)
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell allign="right">
                        <Typography> Ksh.{item.price}</Typography>
                      </TableCell>
                      <TableCell allign="right">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => removeItemHandler(item)}
                        >
                          <MdDeleteForever size={20} color={'#a30f20'} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              onClick={() => {
                router.push('/');
              }}
              color="primary"
              variant="contained"
              margineTop={2}
            >
              Continue shopping
            </Button>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h1">
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}
                    items) : Ksh.
                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button
                    onClick={() => {
                      router.push('/shipping');
                    }}
                    fullWidth
                    color="primary"
                    variant="contained"
                  >
                    Pay
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
