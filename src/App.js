import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header/Header';
import LandingPage from './pages/LandingPage/LandingPage';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ScrollToTop from './Hooks/ScrollToTop';
import Backdrop from './components/UI/Backdrop/Backdrop'
import NotFound from './pages/NotFound/NotFound';


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
