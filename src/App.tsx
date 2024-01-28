import './App.css';
import React from "react";
import FlowChart from './components/FlowChart';

const App: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-black ">
      <FlowChart height='h-screen' widht='w-screen' />
    </div>
  )
}

export default App;
