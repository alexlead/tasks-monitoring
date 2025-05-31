import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css';
import MainPageView from './views/MainPageView';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {

  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="*" element={<MainPageView />} />
          </Routes>
        </Router>
      </Provider>
    </>
  )
}

export default App