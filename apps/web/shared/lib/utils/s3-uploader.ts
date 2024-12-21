import AWS, { S3 } from "aws-sdk";
import * as process from "node:process";

const s3 = new AWS.S3({
  accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_S3_REGION,
});

export const fileRenamer = (filename: string): string => {
  const queHoraEs = Date.now();
  const regex = /[\s_-]/gi;
  const fileTemp = filename.replace(regex, ".");
  let arrTemp = [fileTemp.split(".")];
  if (arrTemp?.[0])
    return `${arrTemp[0]
      .slice(0, arrTemp[0].length - 1)
      .join("_")}${queHoraEs}.${arrTemp[0].pop()}`;
  return "";
};

export const uploadS3 = async (
  fileStream: S3.Body,
  imageKey: string,
  itemId: string,
  mimetype: string,
) => {
  const params = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET as string,
    Key: `${imageKey}/${itemId}`,
    Body: fileStream,
    ACL: "public-read",
    ContentType: mimetype,
  };

  try {
    return await s3.upload(params).promise();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
