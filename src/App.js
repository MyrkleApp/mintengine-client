import './App.css';
import Header from './components/Header/Header';
import Auth from './pages/Auth/Auth';
import LandingPage from './pages/LandingPage/LandingPage';


function App() {

  return (
    <div className="App">
      <Header />
      {/* <LandingPage /> */}
      <Auth />
    </div>
  );
}

export default App;
