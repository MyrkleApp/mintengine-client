import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header/Header';
import Auth from './pages/Auth/Auth';
import LandingPage from './pages/LandingPage/LandingPage';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ScrollToTop from './Hooks/ScrollToTop';
import WalletSetup from './pages/WalletSetup/WalletSetup';
import CreateNewWallet from './pages/CreateNewWallet/CreateNewWallet';


function App() {

  return (
    <Router>
      <div className="App">
        <Header />
        <ScrollToTop />
        <Route
          render={({ location }) => {
            return (
              <>
                <TransitionGroup component={null}>
                  <CSSTransition
                    timeout={300}
                    classNames="page"
                    key={location.key}
                  >
                    <Switch location={location}>
                      <Route exact path="/" component={LandingPage} />
                      <Route exact path={['/signup', '/login']} component={Auth} />
                      <Route exact path={["/wallet-setup", "/create-wallet"]} component={WalletSetup} />
                      <Route exact path="/create-wallet/:wallet" component={CreateNewWallet} />
                    </Switch>
                  </CSSTransition>
                </TransitionGroup>
              </>
            )
          }}
        />
      </div>
    </Router>
  );
}

export default App;
