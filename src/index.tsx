import React from 'react';
import ReactDOM from 'react-dom';
import CustomButton from './components/CustomButton';

const App = () => (

    <div>
        <h1>Root react component in App 2 </h1>
        <CustomButton />
    </div>
);


ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

