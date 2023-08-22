import { render } from 'react-dom';

import { config } from '@app/config';

import App from './App';

render(<App />, document.getElementById(config.appRootId));
