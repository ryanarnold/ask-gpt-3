// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import initializeFirebase from '../../common/init-firebase';

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
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

        res.status(200).send('Success');
      })
      .catch((error: any) => {
        console.log(error.code);
        console.log(error.message);
        res.status(500).send(error);
      });
  }
}
