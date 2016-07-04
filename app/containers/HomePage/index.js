/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { createStructuredSelector } from 'reselect';

import {
  selectRepos,
  selectLoading,
  selectError,
} from 'containers/App/selectors';

import {
  selectUsername,
} from './selectors';

import { changeUsername } from './actions';
import { loadRepos } from '../App/actions';

import RepoListItem from 'containers/RepoListItem';
import Button from 'components/Button';
import H2 from 'components/H2';
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';

import styles from './styles.css';

export class HomePage extends React.Component {
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }
  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  /**
   * Changed route to '/features'
   */
  openFeaturesPage = () => {
    this.openRoute('/features');
  };

  render() {
    let mainContent = null;

    // Show a loading indicator when we're loading
    if (this.props.loading) {
      mainContent = (<List component={LoadingIndicator} />);

    // Show an error if there is one
    } else if (this.props.error !== false) {
      const ErrorComponent = () => (
        <ListItem item={'Something went wrong, please try again!'} />
      );
      mainContent = (<List component={ErrorComponent} />);

    // If we're not loading, don't have an error and there are repos, show the repos
    } else if (this.props.repos !== false) {
      mainContent = (<List items={this.props.repos} component={RepoListItem} />);
    }

    return (
      <article>
        <div>
          <section className={`${styles.textSection} ${styles.centered}`}>
          <div class="ui grid entire-app">
            <div class="ui three column row top-header">
              <a href="workflow.html" style="overflow: hidden">
                <div class="left floated column logo"><img src="assets/logo-ffb21044bd40f1e391426ff861087fa5.png" class="lytbulb-logo"></div>
              </a>
              <div class="right floated column top-header-right">
              </div>
            </div>
            <div class="ui grid app-body">
              <div class="ui segments landing-segments">
                <div class="ui segment landing-h1">
                <h1 class="landing-h1-text">AUTOMATE YOUR WORK.</h1>
                </div>
                <div class="ui segment landing-h2">
                  <h2 class="landing-h2-text">Lytbulb standardizes your engineering and management processes.</br>Use it across all of your projects and teams.</h2>
                </div>
                <div class="ui segment landing-choose">
                    <div class="field choose-setup">
                      <select class="ui search dropdown">
                        <option value="">Select Project Type</option>
                        <option value="CS">Concept Study</option>
                        <option value="PF">Pre-FEED</option>
                        <option value="FE">FEED</option>
                        <option value="DD">Detailed Design</option>
                      </select>
                      <a href="workflow.html?start-tour">
                      <button class="ui primary button add-workflow-button" style="width: 70px; height: 36.2px; border-left: 0px;">
                        Try it
                      </button>
                      </a>

                    </div>

                </div>

              </div>
            </div>
          </div>
          </section>
          <section className={styles.textSection}>
            <H2>Try me!</H2>
            <form className={styles.usernameForm} onSubmit={this.props.onSubmitForm}>
              <label htmlFor="username">Show Github repositories by
                <span className={styles.atPrefix}>@</span>
                <input
                  id="username"
                  className={styles.input}
                  type="text"
                  placeholder="mxstbr"
                  value={this.props.username}
                  onChange={this.props.onChangeUsername}
                />
              </label>
            </form>
            {mainContent}
          </section>
          <Button handleRoute={this.openFeaturesPage}>Features</Button>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  changeRoute: React.PropTypes.func,
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  repos: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  username: React.PropTypes.string,
  onChangeUsername: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    changeRoute: (url) => dispatch(push(url)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },

    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  repos: selectRepos(),
  username: selectUsername(),
  loading: selectLoading(),
  error: selectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
