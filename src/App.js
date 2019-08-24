import { connect } from 'react-redux';
import { login, checkAuthStatus, fetchRecipes, setScreen } from './modules/Actions/index';
import App from './AppView';

const mapStateToProps = state => state;

const mapDispatchToProps = { login, checkAuthStatus, fetchRecipes, setScreen };

export default connect(mapStateToProps, mapDispatchToProps)(App);
