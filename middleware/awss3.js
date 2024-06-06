const multer = require("multer");
const aws = require("aws-sdk");

aws.config.update({
  accessKeyId: "",
  secretAccessKey: "",
  region: "ap-south-1",
});

const s3 = new aws.S3();

exports.upload = multer({
  storage: multer.memoryStorage(),
});

exports.uploadToS3 = async (file, imageType, side) => {
  const fileBuffer = file.buffer;

  const params = {
    Bucket: "bucketname",
    Key: `${imageType}/${side}/${Date.now().toString()}-${file.originalname}`,
    Body: fileBuffer,
    ContentType: file.mimetype,
  };

  const data = await s3.upload(params).promise();
  return data.Location;
};
