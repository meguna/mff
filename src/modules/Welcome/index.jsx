import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'react-feather';
import LangChange from './components/LangChange';
import './styles.css';

class Welcome extends Component {
  componentDidMount() {
  }

  componentDidUpdate() {
    const { isAuthenticated, history } = this.props;
    if (isAuthenticated) {
      history.push('/');
    }
  }

  render() {
    return (
      <div id="welcome">
        <header className="welcome-header">
          <Link className="w-main-title-link" to="/welcome">Foodnotes</Link>
          <LangChange />
        </header>
        <section className="section-1">
          <div className="section-title-wrapper">
            <h1 className="section-title">
              Experimenting in the kitchen has never felt better.
            </h1>
            <p className="section-caption">
              Designed with serious cooking and baking enthusiasts in mind,
              Foodnotes is a free recipe manager that helps you build complex
              recipes then track and search them.
            </p>
          </div>
          <div className="links-row">
            <Link className="welcome-action-unfilled" to="/signup">Sign Up</Link>
            <Link className="welcome-action-unfilled" to="/login">Log In</Link>
          </div>
          <img
            className="kitchen-table-image"
            src="http://localhost:3005/welcomeimages/kitchen_table_1x.png"
            srcSet="http://localhost:3005/welcomeimages/kitchen_table_1x.png 1x,
              http://localhost:3005/welcomeimages/kitchen_table_2x.png 2x"
            alt="kitchen table illustration"
          />
          <img
            className="cookie-desktop-image"
            src="http://localhost:3005/welcomeimages/desktop_cookie_1x.png"
            srcSet="http://localhost:3005/welcomeimages/desktop_cookie_1x.png 1x,
              http://localhost:3005/welcomeimages/desktop_cookie_2x.png 2x"
            alt="monkey chef illustration"
          />
          <img
            className="recipe-corner-image"
            src="http://localhost:3005/welcomeimages/recipe_corner_1x.png"
            srcSet="http://localhost:3005/welcomeimages/recipe_corner_1x.png 1x,
              http://localhost:3005/welcomeimages/recipe_corner_2x.png 2x"
            alt="abstract recipe illustration"
          />
          <div className="down-button-wrapper-wrapper">
            <p className="down-button-desc">scroll to read more</p>
            <a href="#section-2" className="down-button-wrapper">
              <ChevronDown />
            </a>
          </div>
        </section>
        <section className="section-2">
          <h1 className="section-title regular-section-title" id="section-2">
            Features
          </h1>
          <div className="w-feature-row-wrapper">
            <div className="w-feature-wrapper">
              <img
                className="w-feature-image"
                src="http://localhost:3005/welcomeimages/complexity_1x.png"
                srcSet="http://localhost:3005/welcomeimages/complexity_1x.png 1x,
                  http://localhost:3005/welcomeimages/complexity_2x.png 2x"
                alt="ramen illustration"
              />
              <h3 className="w-feature-section-title">Complex Recipes</h3>
              <p className="w-feature-description">
                Easily build complex recipes with the ability to group and label ingredients,
                add pictures, and edit frequently.
              </p>
            </div>
            <div className="w-feature-wrapper">
              <img
                className="w-feature-image"
                src="http://localhost:3005/welcomeimages/mobility_1x.png"
                srcSet="http://localhost:3005/welcomeimages/mobility_1x.png 1x,
                  http://localhost:3005/welcomeimages/mobility_2x.png 2x"
                alt="pizza in single slice wrapper illustration"
              />
              <h3 className="w-feature-section-title">Mobile Friendly</h3>
              <p className="w-feature-description">
                View, share, or update your recipes on-the-go with our mobile friendly UI.
              </p>
            </div>
            <div className="w-feature-wrapper">
              <img
                className="w-feature-image"
                src="http://localhost:3005/welcomeimages/sortsearch_1x.png"
                srcSet="http://localhost:3005/welcomeimages/sortsearch_1x.png 1x,
                  http://localhost:3005/welcomeimages/sortsearch_2x.png 2x"
                alt="cupcakes illustration"
              />
              <h3 className="w-feature-section-title">Sort & Search</h3>
              <p className="w-feature-description">
                Sort, categorize, and search through your recipes like you&apos;ve
                never done before!
              </p>
            </div>
          </div>
        </section>
        <section className="section-3">
          <h1 className="section-title regular-section-title" id="section-2">
            Screenshots
          </h1>
          <div className="w-sshot-wrapper-wrapper">
            <div className="w-sshot-wrapper">
              <img
                className="w-sshot-image"
                src="http://localhost:3005/welcomeimages/listview_1x.png"
                srcSet="http://localhost:3005/welcomeimages/listview_1x.png 1x,
                  http://localhost:3005/welcomeimages/listview_2x.png 2x"
                alt="cupcakes illustration"
              />
              <div className="w-sshot-info">
                <h3 className="w-sshot-title">Viewing a Recipe</h3>
                <p className="w-sshot-desc">The recipe viewing panel.</p>
              </div>
            </div>
            <div className="w-sshot-wrapper">
              <img
                className="w-sshot-image"
                src="http://localhost:3005/welcomeimages/editview_1x.png"
                srcSet="http://localhost:3005/welcomeimages/editview_1x.png 1x,
                  http://localhost:3005/welcomeimages/editview_2x.png 2x"
                alt="cupcakes illustration"
              />
              <div className="w-sshot-info">
                <h3 className="w-sshot-title">Editing a Recipe</h3>
                <p className="w-sshot-desc">The recipe viewing panel.</p>
              </div>
            </div>
          </div>
        </section>
        <footer className="welcome-footer">
          <img
            src="http://localhost:3005/welcomeimages/github.svg"
            className="footer-gh-logo"
            alt="github logo"
          />
          <a href="https://github.com/meguna/inthemoodforfood">View this project on github</a>
          <p>Copyright &copy; 2019 Meguna</p>
        </footer>
      </div>
    );
  }
}

Welcome.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Welcome.defaultProps = {
};

const mapStateToProps = state => state;

const mapDispatchToProps = {
  Welcome,
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
