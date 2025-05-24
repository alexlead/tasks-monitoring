import React from 'react';
import HeaderMenu from '../components/common/HeaderMenu';
import  TasksBoard from '../components/boards/TasksBoard';


interface IMainPageViewProps {
}

const MainPageView: React.FunctionComponent<IMainPageViewProps> = () => {
     return (
          <>
          <HeaderMenu />
               <div className="container-fluid">
                    <div className="container">
                    <div className="row">
                         <TasksBoard />
                    </div>
                         
                    </div>
               </div>
          </>
     );
}
export default MainPageView;