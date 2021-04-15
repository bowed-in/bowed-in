import React from 'react';
import TopLanding from '../components/TopLanding';
import MiddleLanding from '../components/MiddleLanding';
import BottomLanding from '../components/BottomLanding';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div>
        <TopLanding/>
        <MiddleLanding/>
        <BottomLanding/>
      </div>
    );
  }
}

export default Landing;
