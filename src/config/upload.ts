import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp'),

    filename: (req, file, cb) => {
      const fileNameHashed = crypto.randomBytes(10).toString('hex');
      const name = `${fileNameHashed}-${file.originalname}`;
      return cb(null, name);
    },
  }),
};
