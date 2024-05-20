import React from 'react';
import ReactDOM from 'react-dom/client';
import {StrictMode} from 'react';
import {createRoot, render} from 'react-dom/client';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

// static resources should just be served as they are
app.use(express.static(
    path.resolve(__dirname, '..', 'build'),
    { maxAge: '30d' }, ));

app.listen(PORT, (error) => {
      if (error) {
          return console.log('Error during app startup', error);
      }
      console.log("listening on " + PORT + "...");
  });
app.get('/*', (req, res, next) => {
    fs.readFile(indexPath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('Error during file reading', err);
            return res.status(404).end()
        }
        // get post info
        const postId = req.params.id;
        const post = getPostById(postId);
        if(!post) return res.status(404).send("Post not found");

        // inject meta tags
        htmlData = htmlData.replace(
            "<title>React App</title>",
            `<title>${post.title}</title>`
        )
        .replace('__META_OG_TITLE__', post.title)
        .replace('__META_OG_DESCRIPTION__', post.description)
        .replace('__META_DESCRIPTION__', post.description)
        .replace('__META_OG_IMAGE__', post.thumbnail)
        return res.send(htmlData);
    });
});

root.render(
  <GoogleOAuthProvider clientId="78244490523-lobbagoj7mhobmmc9c8uv06164ivbtqr.apps.googleusercontent.com">
      <React.StrictMode>
          <App />
      </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
