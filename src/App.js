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
import Exchange from './pages/Exchange/Exchange';
import NewAssets from './pages/NewAssets/NewAssets';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import useFingerprint from './Hooks/Fingerprint';
import PrivateRoute from './privateRoute'
import ActiveWalletPassphrase from './Hooks/ActiveWalletPassphrase';

function App() {
  
  //get unique browser ID
  useFingerprint()


  return (
    <Router>
      <div className="App">
        <Header />
        <Backdrop />
        <ScrollToTop />
        <ActiveWalletPassphrase />
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
                      
                      <PrivateRoute exact path={["/wallet-setup", "/create-wallet"]}>
                        <WalletSetup />
                      </PrivateRoute>
                      <PrivateRoute exact path="/create-wallet/:wallet">
                        <CreateNewWallet />
                      </PrivateRoute>
                      <PrivateRoute exact path="/verify-wallet/algo">
                        <VerifyAlgoWallet />
                      </PrivateRoute>
                      {/* <PrivateRoute exact path="/verify-wallet/xrp">
                        <VerifyRippleWallet />
                      </PrivateRoute> */}
                      <PrivateRoute exact path="/import-wallet/algo">
                        <ImportAlgoWallet />
                      </PrivateRoute>
                      {/* <PrivateRoute exact path="/import-wallet/xrp">
                        <ImportRippleWallet />
                      </PrivateRoute> */}
                      <PrivateRoute exact path="/wallet">
                        <Wallet />
                      </PrivateRoute>
                      <PrivateRoute exact path="/transactions">
                        <Transactions />
                      </PrivateRoute>
                      <PrivateRoute exact path="/asset-manager">
                        <AssetManager />
                      </PrivateRoute>
                      <PrivateRoute exact path="/new-assets">
                        <NewAssets />
                      </PrivateRoute>
                      <PrivateRoute exact path="/exchange">
                        <Exchange />
                      </PrivateRoute>
                      <PrivateRoute exact path="/settings">
                        <Settings />
                      </PrivateRoute>
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
