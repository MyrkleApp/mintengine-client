import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header/Header';
import Auth from './pages/Auth/Auth';
import LandingPage from './pages/LandingPage/LandingPage';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ScrollToTop from './Hooks/ScrollToTop';
import WalletSetup from './pages/WalletSetup/WalletSetup';
import CreateNewWallet from './pages/CreateNewWallet/CreateNewWallet';
import VerifyWallet from './pages/VerifyWallet/VerifyWallet';
import ImportWallet from './pages/ImportWallet/ImportWallet';
import Backdrop from './components/UI/Backdrop/Backdrop'
import Wallet from './pages/Wallet/Wallet';
import Transactions from './pages/Transactions/Transactions';
import AssetManager from './pages/AssetManager/AssetManager';


function App() {

  return (
    <Router>
      <div className="App">
        <Header />
        <Backdrop />
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
                      <Route exact path="/verify-wallet/:wallet" component={VerifyWallet} />
                      <Route exact path="/import-wallet/:wallet" component={ImportWallet} />
                      <Route exact path="/wallet" component={Wallet} />
                      <Route exact path="/transactions" component={Transactions} />
                      <Route exact path="/asset-manager" component={AssetManager} />
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
