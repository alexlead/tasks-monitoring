import React from 'react';
import { Route,  BrowserRouter as Router, Routes } from 'react-router-dom'
import 'bootstrap-icons/font/bootstrap-icons.css';
import TasksView from './views/TasksView';
import BoardsView from './views/BoardsView';
import MainPageView from './views/MainPageView';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/tasks" element={<TasksView />} />
          <Route path="/boards" element={<BoardsView />} />
          <Route path="*" element={<MainPageView />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
