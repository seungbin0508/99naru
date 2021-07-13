import multer from "multer";
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'
import path from 'path';
const __dirname = path.resolve();
aws.config.loadFromPath(__dirname + '/config/s3.json');

  const S3 = new aws.S3();
  const upload = multer({
      storage: multerS3({
          s3: S3,
          bucket: 'myh99bucket',
          acl: 'public-read-write',
          contentType: multerS3.AUTO_CONTENT_TYPE,
          metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname }) 
          },
          key: function(req, file, cb){
          cb(null, 'profilePic/' + Date.now() + '.' + file.originalname.split('.').pop());
          },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
  });

  
 export { upload, S3 };

 