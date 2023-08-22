const childProcess = require('child_process');

const packageJson = require('../../package.json');

const commitHash = childProcess.execSync('git rev-parse --short HEAD').toString().trim();
const pkgVersion = packageJson.version;

const distPath = './dist';
const version = `${pkgVersion}_${commitHash}`;
const appName = process.env.PUBLIC_DATADOG_SERVICE;

const uploadCommand = `datadog-ci sourcemaps upload ${distPath} --service=${appName} --release-version=${version} --minified-path-prefix=/js`;

const handleError = (error, stdout, stderr) => {
  if (error instanceof Error) throw error;
  // eslint-disable-next-line
  console.log(stderr, stdout);
};

childProcess.exec(uploadCommand, (error, stdout, stderr) => {
  handleError(error, stdout, stderr);
});
