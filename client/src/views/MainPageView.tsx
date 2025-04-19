import React from 'react';
import { Link } from 'react-router-dom';


interface IMainPageViewProps {
}

const MainPageView: React.FunctionComponent<IMainPageViewProps> = () => {
     return (
          <>
               <div className="container-fluid">
                    <div className="row">
                         <div className="col bg-success" >

                              <div className="vh-100 d-flex align-items-center justify-content-center">

                                   <Link to='/boards' className='text-white text-decoration-none'><span className='fs-1 decoration-none'>Boards</span></Link>
                              </div>
                         </div>
                         <div className="col bg-primary-subtle">
                              <div className="vh-100 d-flex align-items-center justify-content-center">

                                   <Link to='/tasks' className='text-primary-subtle text-decoration-none'><span className='fs-1 decoration-none'>Tasks</span></Link>

                              </div>
                         </div>
                    </div>
               </div>
          </>
     );
}
export default MainPageView;