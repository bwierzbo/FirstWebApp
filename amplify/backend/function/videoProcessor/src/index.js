const AWS = require('aws-sdk');
const ffmpeg = require('fluent-ffmpeg');

exports.handler = async (event) => {
  const s3 = new AWS.S3();
  const inputBucket = event.Records[0].s3.bucket.name;
  const inputKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
  
  const outputKey = `highlights/${inputKey}`;

  const inputFile = s3.getObject({ Bucket: inputBucket, Key: inputKey }).createReadStream();
  const outputFile = s3.upload({ Bucket: inputBucket, Key: outputKey }).createWriteStream();

  ffmpeg(inputFile)
    .outputOptions('-vf', 'select=eq(pict_type\\,I)')
    .output(outputFile)
    .on('end', () => {
      console.log('Processing finished successfully');
    })
    .on('error', (err) => {
      console.error('Error during processing', err);
    })
    .run();

  return {
    statusCode: 200,
    body: JSON.stringify('Video processed successfully'),
  };
};