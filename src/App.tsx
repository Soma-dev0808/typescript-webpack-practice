import React from 'react';

import "./style.scss";

interface AppProps {
    title?: string;
}

const App: React.FC<AppProps> = ({ title }) => {
    return (
        <div>App {title}</div>
    );
};

export default App;