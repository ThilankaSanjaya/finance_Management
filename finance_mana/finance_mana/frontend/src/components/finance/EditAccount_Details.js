import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

export default class EditAccount_Details extends Component{

// Make changes to the post
  constructor(props){
    super(props);
    this.state={
        acc_Name:"",
        acc_type:"",
        BBF:"",
        newDate:""
    }
  }

  handleChange = (event) => {
    this.setState({ acc_type: event.target.value });
  };
  
  handleInputChange = (e) =>{
    const {name,value} = e.target;

    this.setState({
      ...this.state,
      [name]:value
    })

  }

  onSubmit = (e) =>{

    e.preventDefault();
    const id = this.props.match.params.id;

    const {acc_Name,acc_type,BBF,newDate} = this.state;

    const data ={
        acc_Name:acc_Name,
        acc_type:acc_type,
        BBF:BBF,
        newDate:newDate
    }
 
    console.log(data)
    /// Validation 

    const cuem = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if(acc_Name.length === 0  || acc_type.length === 0 || BBF.length === 0 || newDate.length === 0 ){
        swal(" Fields Cannot empty !","Please enter all data !", "error");
      }else if(acc_Name.length < 4 ){
        swal("Invalid Account Name !", "Length shuld be greater than 4 !", "error");
      }else if(acc_type.length <8 ){
        swal("Invalid acc_type !", "Length shuld be greater than 4 !", "error");
      }else if(BBF.length < 10 ){
          swal("Invalid Address !", "Length shuld be greater than 4 !", "error");
      }
      else{

      axios.put(`/account_Details/update/${id}`,data).then((res) =>{
      if(res.data.success){
        this.setState(
          {
            acc_Name:"",
            acc_type:"",
            BBF:"",
            newDate:""
          }
        )
      }
    });
    swal({
      title: "Done!",
      text: "Update Successful",
      icon: "success",
      button: "Okay!"
  })
  .then((value) => {
      window.location = '/Account_Details'; // 
  });}
  }


  componentDidMount(){

    const id = this.props.match.params.id;

    axios.get(`/account_Details/${id}`).then((res) =>{

      if(res.data.success){
        this.setState({
         
          acc_Name:res.data.post.acc_Name,
          acc_type:res.data.post.acc_type,
          BBF:res.data.post.BBF,
          newDate:res.data.post.newDate

        });

        console.log(this.state.post);
      }
    })

  }

  render() {
    const { acc_type } = this.state;
    return (
    <div>
      <div className style={{ backgroundColor:'#F1F1F1', backgroundSize: 'cover'}}> <br/>
        <div className="col-md-8 mt-4 mx-auto">
          <h1 className="text-center" > <font face = "Comic sans MS" size ="6" > Edit Order Details </font> </h1> 
          <br/>
          <form className="needs-validation" noValidate style={{backgroundColor: "#9D74C1", 
          }}>
          <br/><br/>

          <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
              <label><strong>Account Name :</strong></label>
              <input type="text"
              className="form-control"
              name="acc_Name" 
              placeholder="Enter Account Name"
              value={this.state.acc_Name}
              onChange={this.handleInputChange} 
              style={{backgroundColor: "#ffff", marginTop:"10px",borderRadius: '12px'}} />
          </div><br/>


          <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
          <label><strong>Account Type :</strong></label>
          <div>
          <select value={acc_type} onChange={this.handleChange}style={{backgroundColor: "#ffff", marginTop:"10px",borderRadius: '8px'}}>
              <option value="">Select Account Type</option>
              <option value="The Emperors Court">The Emperors Court</option>
              <option value="The Grand Ballroom">The Grand Ballroom</option>
              <option value="King’s Court">King’s Court</option>
              <option value="Moon's Court">Moon's Court </option>
              <option value="21st Birthday Parties">21st Birthday Parties</option>
            </select>
         </div>
         </div>

          <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
              <label><strong>Balance Brought Forward :</strong></label>
              <input type="text"
              className="form-control"
              name="BBF" 
              maxlength = "10"
              placeholder="Enter Balance Brought Forward"
              value={this.state.BBF}
              onChange={this.handleInputChange} 
              style={{backgroundColor: "#ffff",borderRadius: '12px', marginTop:"10px",}} />
          </div><br/>

          <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
              <label><strong>Date :</strong></label>
              <input type="text"
              className="form-control"
              name="newDate" 
              placeholder="Date"
              value={this.state.newDate}
              onChange={this.handleInputChange} 
              style={{backgroundColor: "#ffff",borderRadius: '12px', marginTop:"10px",}} />
          </div><br/>


            <div className="text-center" > 
            <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
              <i className="far fa-check-square"></i>
              &nbsp; Update      
              </button>&nbsp;
            <a href="/Account_Details"><button type="button" style={{marginTop:'15px'}} onClick={this.onClick} class="btn btn-warning"><i class="fa fa-close"></i>&nbsp;Cancel</button></a>
            {/* ListRegistration */}
            </div>
            <br/>
          </form>

          <br/>
          </div>
        </div>
        </div>
    )
   }
}