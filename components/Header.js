import React from 'react';
import PropTypes from 'prop-types';

import * as Routing from '../common/routing';

import Link from '../components/Link';

export default class Header extends React.PureComponent {
  static propTypes = {
    count: PropTypes.number,
  };

  _handleClick = () => {
    Routing.push('/');
  };

  render() {
    return (
      <header className="header">
        <style jsx>{`
          .header {
            width: 100%;
            max-width: 1319px;
            padding: 0 24px 0 24px;
            box-sizing: border-box;
            margin: 2rem auto 0 auto;
            display: flex;
            align-items: center;
            justify-content: 'space-between';

            @media (max-width: 600px) {
              margin: 2rem auto 0 auto;
            }
          }

          .header-contents {
            max-width: 420px;
            width: 100%;
            padding: 0 24px 0 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .header-contents-logo {
            flex-shrink: 0;
            padding: 0 8px 0 0;
            cursor: pointer;
            text-decoration: none;
          }

          .header-contents-text {
            min-width: 25%;
            width: 100%;
          }

          .header-contents-text--strong {
            font-weight: 700;
          }
        `}</style>
        <div className="header-contents">
          <a className="header-contents-logo" href="/">
            <img
              src="/static/logo.png"
              alt="Native Directory logo"
              width="64"
              height="64"
              onClick={this._handleClick}
            />
          </a>
          <div className="header-contents-text">
            <p>
              <strong className="header-contents-text--strong">
                Native Directory
              </strong>{' '}
              is a curated list of {this.props.count}{' '}
              <Link
                isStyled
                href="https://facebook.github.io/react-native/docs/getting-started.html">
                React Native
              </Link>{' '}
              libraries to help you build your projects.
            </p>
          </div>
        </div>
      </header>
    );
  }
}
