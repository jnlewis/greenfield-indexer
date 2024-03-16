import type { NextApiRequest, NextApiResponse } from 'next';
import { StorageObject } from '@core/types/api';
import { apiFetchObjectByName } from '@handlers/apiObjectServices';

type ResponseData = StorageObject | null;
type ResponseError = { message: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData | ResponseError>) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { name } = req.query;

    const object = await apiFetchObjectByName(String(name));

    if (!object) {
      return res.status(404).json({ message: 'Object not found' });
    }

    return res.status(200).json(object);
  } catch (e) {
    return res.status(500).json({ message: 'An error occurred on the server.' });
  }
}
