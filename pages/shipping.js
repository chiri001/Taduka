import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import Form from '../components/Form';
import {
  TextField,
  Button,
  Link,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { Store } from '../utils/Store';
import jsCookie from 'js-cookie';

export default function ShippingScreen() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  useEffect(() => {
    if (!userInfo) {
      return router.push('/login?redirect=/shipping');
    }

    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.area);
    setValue('city', shippingAddress.estate);
    setValue('postalCode', shippingAddress.phoneNumber);
  }, [router, setValue, shippingAddress, userInfo]);

  const submitHandler = ({ fullName, area, estate, phoneNumber }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, area, estate, phoneNumber },
    });
    jsCookie.set(
      'shippingAddress',
      JSON.stringify({
        fullName,
        area,
        estate,
        phoneNumber,
      })
    );
    router.push('/payment');
  };
  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1}></CheckoutWizard>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Typography component="h1" variant="h1">
          Shipping Address
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="fullName"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  inputProps={{ type: 'fullName' }}
                  error={Boolean(errors.fullName)}
                  helperText={
                    errors.fullName
                      ? errors.fullName.type === 'minLength'
                        ? 'Full Name length is more than 1'
                        : 'Full Name is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="area"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="area"
                  label="Area i.e South B"
                  inputProps={{ type: 'area' }}
                  error={Boolean(errors.area)}
                  helperText={
                    errors.area
                      ? errors.area.type === 'minLength'
                        ? 'Area length is more than 1'
                        : 'Area is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="estate"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="estate"
                  label="Estate and house number if applicable"
                  inputProps={{ type: 'estate' }}
                  error={Boolean(errors.estate)}
                  helperText={
                    errors.estate
                      ? errors.location.type === 'minLength'
                        ? 'Estate length is more than 1'
                        : 'Estate is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 10,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  inputProps={{ type: 'phoneNumber' }}
                  error={Boolean(errors.phoneNumber)}
                  helperText={
                    errors.phoneNumber
                      ? errors.phoneNumber.type === 'minLength'
                        ? 'Phone Number length is more than 9'
                        : 'Phone Number is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Continue
            </Button>
          </ListItem>
        </List>
      </Form>
    </Layout>
  );
}
