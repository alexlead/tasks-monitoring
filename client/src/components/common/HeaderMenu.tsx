import React from 'react';
import DateTimeDisplay from '../../UI/dateTime/DateTimeDisplay';


interface IHeaderMenuProps {
}

const HeaderMenu: React.FunctionComponent<IHeaderMenuProps> = () => {

    

    return (
        <>


            <div className="container-fluid p-0 m-0 text-bg-primary">
            <hr className="border border-info border-3 opacity-75 mt-0 mb-5" />
     

                <div className="container pb-5">
                    <div className="row">
                    <div className="col">

                    <h1 className="h4 mb-2">Hi, Admin</h1>
                    <div className="fs-6"><DateTimeDisplay /></div>
                    </div>
                    <div className="col text-end">
                        <i className="bi bi-person-circle fs-1"></i>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default HeaderMenu;