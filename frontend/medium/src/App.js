import './App.css';
import {Switch, Route} from 'react-router-dom';
import HomePage from './pages/Homepage/HomePage';
import ArticlePage from './pages/ArticlePage/ArticlePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';


const App = () => {
	return (
		<div className="App">
			<Switch>
				<Route exact path='/' component={HomePage}/>
				<Route path='/?page=' component={HomePage}/>
				<Route path='/article/:slug' component={ArticlePage}/>
				<Route path='/error' component={ErrorPage}/>
				<Route path='/' component={ErrorPage}/>
			</Switch>
		</div>
	)
}

export default App;