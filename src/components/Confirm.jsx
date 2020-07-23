import React from 'react';

class Confirm extends React.Component {
 render() {
   console.log(this.props.location.state.data);
 return (
   <div> Confirmation page</div>
 );
 };
}

export default Confirm;