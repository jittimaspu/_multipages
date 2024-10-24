import Counter from './components/Counter/counter';
import Timer from './components/Timer/Timer';
import Add from './components/Add/Add';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Components.css";
import Temperatures from './components/Temperatures/Temperatures';


function Components() {
    return (
        <div className='component-container'>
            <div className='main-container'>
                <h1 className='component-title'>REACT COMPONENTS</h1>
                <div className='wrapper' >
                    <div><Counter />
                        <Timer /> </div>
                    <div><Add /></div>
                </div>
                <div><Temperatures /></div>
                <hr />
                <h2 className='component-name'>นางสาว จิตติมา โอภาพ รหัส 66078688</h2>
            </div>
        </div>
    );
}

export default Components;
