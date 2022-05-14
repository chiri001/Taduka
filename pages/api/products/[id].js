import nc from 'next-connect';
import client from '../../../utils/client';

const handler = nc();

handler.get(async (req, res) => {
  const product = await client.fetch(`*[_type == "Product" && _id == $id][0]`, {
    id: req.query.id,
  });

  //return product from backend
  res.send(product);
});
export default handler;
