import mountReact from './react1.jsx';
import react1DataJson from './react1.json';

const devJson = true; // Move to .env file

if (!devJson) {
  // Let React load JSON data via API if required
  react1DataJson = null;
}

console.log ('This is component react1 loaded');

mountReact(react1DataJson);

