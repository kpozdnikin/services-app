/* eslint-disable */
const exec = require('child_process').exec;

const s3Buckets = {
  production: 'services-app.getsquire.com',
  staging: 'services-app-staging-1.getsquire.com',
  qa: 'services-app-qa-1.getsquire.com',
  development: 'services-app-dev-1.getsquire.com',
};

const s3Bucket = s3Buckets[process.env.PUBLIC_DEPLOYMENT_ENV];
if (!s3Bucket) {
  throw new Error(`There is no bucket specified for this deployment environment: ${process.env.PUBLIC_DEPLOYMENT_ENV}`);
}

const deployCommand = "aws s3 sync --delete --exclude '*.html' dist/ s3://" + s3Bucket;
const deployCommandHtml =
  "aws s3 sync --delete --include '*.html' --cache-control 'max-age=300' dist/ s3://" + s3Bucket;

const handleError = (error, stdout, stderr) => {
  if (error instanceof Error) throw error;
  console.log(stderr, stdout);
};

exec(deployCommand, (error, stdout, stderr) => {
  handleError(error, stdout, stderr);
  exec(deployCommandHtml, (error, stdout, stderr) => {
    handleError(error, stdout, stderr);
  });
});
