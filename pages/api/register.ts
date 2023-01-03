// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import initializeFirebase from '../../common/init-firebase';

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    initializeFirebase();
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Signed in!');

        updateProfile(userCredential.user, {
          displayName: name,
        });
      })
      .catch((error: any) => {
        console.log(error.code);
        console.log(error.message);
      });
  }

  res.status(200).json({ name: 'John Doe' });
}
