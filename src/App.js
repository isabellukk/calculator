import './App.css';
import fangs from './img/fangs.png'

import Calculator from './components/calculator/Calculator';


function App() {
  return (
    <div>
      <div className="count">Count Calcula</div>
      <div className="fangs"><img src={fangs} alt="fangs"/></div>
        <Calculator/>
    </div>
  )
}

export default App;
