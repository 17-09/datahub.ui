import Dashboard from 'containers/Dashboard';
import ImportFile from 'containers/ImportFile';
import Field from 'containers/Field';
import Contact from 'containers/Contact';
import Login from 'components/Login';

export default [
  { path: '/', component: Dashboard },
  { path: '/login', component: Login },
  { path: '/files', component: ImportFile },
  { path: '/contacts', component: Contact },
  { path: '/fields', component: Field },
];
