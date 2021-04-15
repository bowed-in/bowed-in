import React from 'react';
import { Header } from 'semantic-ui-react';

export default class TopLanding extends React.Component {
  render() {
    return (
      <div className='bottom-gray-background' style={ { fontSize: '30px', color: 'orangered' } }>
        <Header textAlign='center' style={ { color: 'coral' } }>
          BTW it&apos;s pronounced: &apos;bō-ed In!
        </Header>
      </div>
    );
  }
}
