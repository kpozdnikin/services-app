import { API, FileInfo } from 'jscodeshift';

import packageJson from '../package.json';

const updateStyles = (fileInfo: FileInfo, api: API) => {
  const j = api.jscodeshift;

  const root = j(fileInfo.source);

  // filtering by regexp is not supported, so we select ALL identifiers and then filter manually
  const callExpressions = root.find(j.Identifier);

  const shadowStylesIdentifier = /__.*_shadow_styles/;

  callExpressions
    .filter((item) => shadowStylesIdentifier.test(item.node.name))
    .forEach((item) => {
      const originalAppName = packageJson.name || Date.now().toString(); // Date.now() seems to be better than nothing
      const formattedAppName = originalAppName.replaceAll(/-/g, '_');
      item.node.name = `__${formattedAppName}_shadow_styles`;
    });

  return root.toSource();
};

export default updateStyles;
