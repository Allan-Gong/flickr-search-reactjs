import React, {Component} from 'react';

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#1f1f1f'
  },
  title: {
    flex: 1,
    fontSize: '1.5rem',
    margin: '1rem'
  },
  date: {
    flex: 1,
    textAlign: 'right',
    margin: '1rem',
    color: 'white'
  }
};

export class Header extends Component {
  render() {
    return (
      <header style={styles.header}>
        <p style={styles.title}>
          <a href="https://github.com/FountainJS/generator-fountain-webapp" target="_blank">
            Fountain Generator
          </a>
        </p>
        <p style={styles.date}>
          Generated with FountainJS v0.7.2 on Tue Nov 08 2016 00:48:39 GMT+1100 (AUS Eastern Daylight Time)
        </p>
      </header>
    );
  }
}
