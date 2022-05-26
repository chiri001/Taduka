import React from 'react';
import classes from '../utils/classes';
import Layout from './Layout';
import { useRouter } from 'next/router';
import { Button, Box, Typography } from '@mui/material';
import { RiFacebookCircleFill } from 'react-icons/ri';
import { RiInstagramFill } from 'react-icons/ri';

export default function Footer() {
  const router = useRouter();

  return (
    <>
      <Box>
        <Box sx={classes.box}>
          <div>
            <Typography variant="h3" paddingLeft={'10px'} paddingRight={'10px'}>
              Taduka is an online ecommerce shop that allows users to order
              groceries from the comfort of their homes and offers free shipping
              to their doorstep. The products we have include categories such as
              meat, dairy products, spices, and vegetables. We give you a
              variety to choose from. You no longer have to go to the market and
              struggle finding grocery to buy let a lone having the budden to
              carry those items. Taduka is here for you. Order today and enjoy
              our services
            </Typography>
          </div>
        </Box>
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
        <Typography variant="h3">@Taduka 2022. All rights reserved</Typography>
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
    </>
  );
}
