import React from 'react';
import ReactDOM from 'react-dom';
import Marquee from 'react-fast-marquee';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import './assets/css/index.css';

import SNCFd, { SNCFa, IENAa, IENAd } from './trains';
import Doc_S from './doc_s';
import Doc_T from './doc_t';
import Home from './home';
import Error from './error';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false 
    };
  }

  componentDidCatch(error, info) {
    this.setState({ 
      hasError: true
    });
  }

  render() {
    if (this.state.hasError == true) {
      return <Error error={'Erreur fatale'} error_message={'Quelque chose s\'est mal passé.'} />;
    } else {
      return this.props.children;
    }
  }
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          
          {window.location.href.indexOf('mylines.fr/embed') >= 0 ?
            <>
              // Infogare Train Empire
              <Route path="/SNCF/departure/:stop/:auth" element={<SNCFd />} />
              <Route path="/SNCF/arrival/:stop/:auth" element={<SNCFa />} />

              <Route path="/IENA/departure/:stop/:auth" element={<IENAd />} />
              <Route path="/IENA/arrival/:stop/:auth" element={<IENAa />} />
              <Route path="/doc" element={<Doc_T />} />
            </>
            :
            <>
              // Infogare SNCF
              <Route path="/SNCF/departure/:stop" element={<SNCFd />} />
              <Route path="/SNCF/arrival/:stop" element={<SNCFa />} />

              <Route path="/IENA/departure/:stop" element={<IENAd />} />
              <Route path="/IENA/arrival/:stop" element={<IENAa />} />
              <Route path="/doc" element={<Doc_S />} />
            </>
          }

          <Route path="*" element={<Home />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// https://jsfiddle.net/La8wQ/313/
// Animation par animista