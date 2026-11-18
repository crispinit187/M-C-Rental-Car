// GitHub Pages has no server-side routing: a refresh on /faqs would 404.
// Serving a copy of index.html as 404.html lets the React router take over.
import { copyFileSync } from 'node:fs';
copyFileSync('dist/index.html', 'dist/404.html');
