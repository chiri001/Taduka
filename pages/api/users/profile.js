import nc from 'next-connect';
import { signToken, isAuth } from '../../../utils/auth';
import axios from 'axios';
import config from '../../../utils/config';

const handler = nc();

handler.use(isAuth);
handler.put(async (req, res) => {
  const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;
  await axios.post(
    `https://${config.projectId}.api.sanity.io/v1/data/mutate/${config.dataset}`,
    {
      mutations: [
        {
          patch: {
            id: req.user._id,
            set: {
              name: req.body.name,
              email: req.body.email,
            },
          },
        },
      ],
    },
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${tokenWithWriteAccess}`,
      },
    }
  );

  const user = {
    _id: req.user._id,
    name: req.body.name,
    email: req.body.email,
    isAdmin: req.user.isAdmin,
  };
  const token = signToken(user);
  res.send({ ...user, token });
});

export default handler;
