import './Preloader.css';
import React from 'react';

class Preloader extends React.Component
{
    render()
    {
        return(
            <div className='preloader-wrapper'>
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div> );
    }
}
export default Preloader;