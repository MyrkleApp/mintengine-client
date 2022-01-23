import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header/Header';
import Auth from './pages/Auth/Auth';
import LandingPage from './pages/LandingPage/LandingPage';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ScrollToTop from './Hooks/ScrollToTop';
import WalletSetup from './pages/WalletSetup/WalletSetup';
import CreateNewWallet from './pages/CreateNewWallet/CreateNewWallet';
import VerifyAlgoWallet from './pages/VerifyAlgoWallet/VerifyAlgoWallet';
import VerifyRippleWallet from './pages/VerifyRippleWallet/VerifyRippleWallet';
import ImportAlgoWallet from './pages/ImportAlgoWallet/ImportAlgoWallet';
import Backdrop from './components/UI/Backdrop/Backdrop'
import Wallet from './pages/Wallet/Wallet';
import Transactions from './pages/Transactions/Transactions';
import AssetManager from './pages/AssetManager/AssetManager';
import Settings from './pages/Settings/Settings';
import NotFound from './pages/NotFound/NotFound';
import ImportRippleWallet from './pages/ImportRippleWallet/ImportRippleWallet';


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
                      <Route exact path="/verify-wallet/algo" component={VerifyAlgoWallet} />
                      <Route exact path="/verify-wallet/xrp" component={VerifyRippleWallet} />
                      <Route exact path="/import-wallet/algo" component={ImportAlgoWallet} />
                      <Route exact path="/import-wallet/xrp" component={ImportRippleWallet} />
                      <Route exact path="/wallet" component={Wallet} />
                      <Route exact path="/transactions" component={Transactions} />
                      <Route exact path="/asset-manager" component={AssetManager} />
                      <Route exact path="/settings" component={Settings} />
                      <Route component={NotFound} />
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
