import React from 'react';

class Confirm extends React.Component {
  state = { data: this.props.location.state.data}

  handleClick = async (event) => {
    // Sets the data that will be parsed into the post request
    let data = {
      recurring: true,
      price: this.state.data.data.pricing.totalCost,
      datetime: this.state.data.data.startDate,
      address_id: this.state.data.addresses[this.state.data.userChoice].id
    }
      await fetch(`${process.env.REACT_APP_API}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({booking: data}),
    });
  }


  showData = () => {
    // Sets variables that are repeated, to help maintain code dryness
    const location = this.state.data
    const pricing = this.state.data.data.pricing
    return (
      <div>
        <h3> Address</h3>
        <p>{location.street_address}</p>

        <h3> Post Code</h3>
        <p>{location.post_code}</p>

        <h3> State</h3>
        <p>{location.state}</p>

          <h3>On</h3>
          <p>{this.state.data.data.startDate.toString()}</p>

          <h3>For</h3>
          <p>Bathrooms: {pricing.bathrooms}</p>
          <p>Bedrooms: {pricing.bedrooms}</p>
          <p>Type: {pricing.type}</p>
          <p>TotalCost: {pricing.totalCost}</p>

          <p>Addons: {pricing.addons.map((addon) => {
            return (
              `${addon} `
            )
          })}
          </p>

             <h1> Is this information correct?</h1>

          <button onClick={this.handleClick}> Confirm booking</button>

      </div>
    )
  }

 render() {
 return (
   <div>

   <div> Confirmation page</div>

    {this.showData()}

   
   </div>
 );
 };
}

export default Confirm;