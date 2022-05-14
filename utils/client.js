import sanityClient from '@sanity/client';
import React from 'react';

const client = sanityClient({
  projectId: 'fgufzda4',
  dataset: 'production',
  useCdn: true, //increases performance of user querry
  apiVersion: '2022-05-10',
});

export default client;
