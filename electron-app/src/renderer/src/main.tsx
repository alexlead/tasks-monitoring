import { createRoot } from 'react-dom/client'
import './assets/style.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(

    <App />,
)