import React from 'react';

class Confirm extends React.Component {
  state = { data: this.props.location.state.data }


  componentDidMount() {
    this.getServicesData()
  }

  // A function that will post the booking data into the database 
  postBookingData = async () => {
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

  getServicesData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}/services`);
    const data = await response.json();
    this.setState({ services: data.reverse() });
  };

  postBookingServicesData = async (quantity, service) => {

    let data = {
      booking_id: 1,
      service_id: service,
      quantity: quantity
    }
    await fetch(`${process.env.REACT_APP_API}/booking_service`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({bookingservice: data}),
    });
  }

  

  handleClick = async (event) => {
    this.postBookingData()


    let pricing = this.state.data.data.pricing
    console.log(pricing.addons);
    console.log(this.state.services);



    for( let i = 0; i < 7; i ++){
      let quantity = 1
      let service = i

      // Checks for the number of bathrooms and passes it through as a variable
      if (i === 0){
        quantity = pricing.bathrooms
        service = 1
      }

      // Same as above but for bedrooms
      if (i === 1){
        quantity = pricing.bedrooms
        service = 2
      }

    // Check what type of clean it is and passes that service number through as a variable
      if (i === 2){
      this.state.services.find((item) =>{
        if (item.title === pricing.type.toLowerCase()) {
          service = item.id
        }
      })
      // Loops through an array of addons, comparing each of them to the services array and matching them then passing their service number through as a variable
        pricing.addons.map((addon) => {
          this.state.services.find((item) =>{
            if (addon.toLowerCase() === item.title.toLowerCase()){
              service = item.id
            }
          })
        })
    }

      this.postBookingServicesData(quantity, service)
    }
  }




    // console.log(typeof this.state.data.data.pricing);
    // console.log(this.state.services);
    // let entries = Object.entries(this.state.data.data.pricing)
    // let keys = Object.keys(this.state.data.data.pricing)
    // let values = Object.values(this.state.data.data.pricing)    

    // // helps maintain dryness of code
    // let pricing = this.state.data.data.pricing

    // let quantity = 1
    // let service = 0
    // // To see how many addons you have, the +3 is indicative of the bathrooms/bedrooms/type
    // for (let i = 0; i < (pricing.addons.length) + 3; i++){

    //   // bathrooms is the first entry
    // if (i = 0){
    //   quantity = pricing.bathrooms
    //   service = 0
    // }
    // // bedrooms are the second entry
    // if (i = 1){
    //   quantity = pricing.bedrooms
    //   service = 1
    // }
    // // compares the type to the services database, then returns the id of that service
    // this.state.services.find((item) =>{
    //   if (item.title === pricing.type) service = item.id
    // })

    // pricing.addons.map((addon) =>{
    //   this.state.services.find((item) =>{
    //     if (item.title === addon) service = item.id
    //   })
    // })

    //   this.postBookingServicesData(quantity, service)
    // }





  showData = () => {
    console.log(this.state);
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
              `${addon}, `
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