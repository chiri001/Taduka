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
    setValue('district', shippingAddress.district);
    setValue('location', shippingAddress.location);
    setValue('village', shippingAddress.village);
    setValue('phoneNumber', shippingAddress.phoneNumber);
  }, [router, setValue, shippingAddress, userInfo]);

  const submitHandler = ({
    fullName,
    district,
    location,
    village,
    phoneNumber,
  }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, district, location, village, phoneNumber },
    });

    jsCookie.set(
      'shippingAddress',
      JSON.stringify({ fullName, district, location, village, phoneNumber })
    );

    router.push('/payment');
  };

  return (
    <Layout title="shipping Address">
      <CheckoutWizard activeStep={1}></CheckoutWizard>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Typography components="h1" variant="h1">
          Shipping Address
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="FullName"
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
                  inputProps={{ type: 'FullName' }}
                  error={Boolean(errors.fullName)}
                  helperText={
                    errors.fullName
                      ? errors.fullName.type === 'minLength'
                        ? 'Full Name length should be more than one'
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
              name="district"
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
                  id="district"
                  label="District"
                  inputProps={{ type: 'district' }}
                  error={Boolean(errors.district)}
                  helperText={
                    errors.district
                      ? errors.district.type === 'minLength'
                        ? 'District length should be more than one'
                        : 'District is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="location"
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
                  id="location"
                  label="Location"
                  inputProps={{ type: 'location' }}
                  error={Boolean(errors.location)}
                  helperText={
                    errors.location
                      ? errors.location.type === 'minLength'
                        ? 'Location length should be more than one'
                        : 'Location is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="village"
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
                  id="village"
                  label="Village"
                  inputProps={{ type: 'village' }}
                  error={Boolean(errors.village)}
                  helperText={
                    errors.village
                      ? errors.village.type === 'minLength'
                        ? 'Village length should be more than one'
                        : 'Village is required'
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
                        ? 'Phone Number length should be more than 9'
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
