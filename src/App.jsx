import React from 'react'
import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Header from './components/Header/Header.jsx';
import Auth from './pages/Auth/Auth.jsx';
// import LandingPage from './pages/LandingPage/LandingPage';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ScrollToTop from './Hooks/ScrollToTop.js';
import WalletSetup from './pages/WalletSetup/WalletSetup.jsx';
import CreateNewWallet from './pages/CreateNewWallet/CreateNewWallet.jsx';
import VerifyAlgoWallet from './pages/VerifyAlgoWallet/VerifyAlgoWallet.jsx';
// import VerifyRippleWallet from './pages/VerifyRippleWallet/VerifyRippleWallet';
import ImportAlgoWallet from './pages/ImportAlgoWallet/ImportAlgoWallet.jsx';
import Backdrop from './components/UI/Backdrop/Backdrop.jsx'
import useFingerprint from './Hooks/useDeviceId.js';
import PrivateRoute from './privateRoute.jsx'
import ActiveWalletPassphrase from './Hooks/ActiveWalletPassphrase.js';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import LandingPage from './pages/LandingPage/LandingPage.jsx';

// Previously these routes were lazy-loaded with React.Suspense.
// In the current setup, the lazy chunks sometimes fail to resolve,
// leaving the Suspense fallback `<Backdrop isOpen />` visible
// indefinitely after navigating to protected routes like `/wallet`.
// To make navigation reliable, we import these pages eagerly instead.
import Wallet from './pages/Wallet/Wallet.jsx';
import Transactions from './pages/Transactions/Transactions.jsx';
import AssetManager from './pages/AssetManager/AssetManager.jsx';
import Settings from './pages/Settings/Settings.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import Exchange from './pages/Exchange/Exchange.jsx';
import NewAssets from './pages/NewAssets/NewAssets.jsx';



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
