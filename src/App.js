import './App.css';
import fangs from './img/fangs.png'

import Calculator from './components/calculator/Calculator';


function App() {
  return (
    <div className="calc">
      <div className="count"><a href="https://youtu.be/Ur_aDdofl_8">Count Calcula</a></div>
      <div className="fangs"><img src={fangs} alt=""/></div>
        <Calculator/>
    </div>
  )
}

export default App;
