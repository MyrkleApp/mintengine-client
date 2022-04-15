import React, { Suspense } from 'react'
import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Header from './components/Header/Header';
import Auth from './pages/Auth/Auth';
// import LandingPage from './pages/LandingPage/LandingPage';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ScrollToTop from './Hooks/ScrollToTop';
import WalletSetup from './pages/WalletSetup/WalletSetup';
import CreateNewWallet from './pages/CreateNewWallet/CreateNewWallet';
import VerifyAlgoWallet from './pages/VerifyAlgoWallet/VerifyAlgoWallet';
// import VerifyRippleWallet from './pages/VerifyRippleWallet/VerifyRippleWallet';
import ImportAlgoWallet from './pages/ImportAlgoWallet/ImportAlgoWallet';
import Backdrop from './components/UI/Backdrop/Backdrop'
import useFingerprint from './Hooks/Fingerprint';
import PrivateRoute from './privateRoute'
import ActiveWalletPassphrase from './Hooks/ActiveWalletPassphrase';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Wallet = React.lazy(() => import("./pages/Wallet/Wallet"));
const Transactions = React.lazy(() => import('./pages/Transactions/Transactions'));
const AssetManager = React.lazy(() => import('./pages/AssetManager/AssetManager'));
const Settings = React.lazy(() => import('./pages/Settings/Settings'));
const NotFound = React.lazy(() => import('./pages/NotFound/NotFound'));
const Exchange = React.lazy(() => import('./pages/Exchange/Exchange'));
const NewAssets = React.lazy(() => import('./pages/NewAssets/NewAssets'));



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
                    <Suspense fallback={<Backdrop isOpen />}>
                      <Switch location={location}>
                        <Route exact path="/">
                          <Redirect to="/login" />
                        </Route>
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
                    </Suspense>
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
