import './App.css';
import PokemonComponent from './Components/PokemonComponent';

function App() {
  return (
    <div className="App">
      <h2>Welcome to Pokemon Api</h2>
      <p>Enter a pokemon name and you'll get some stats about it</p>
      <PokemonComponent/>
    </div>
  );
}

export default App;
