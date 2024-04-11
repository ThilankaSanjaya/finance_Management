import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

export default class EditTransaction extends Component{

// Make changes to the post
  constructor(props){
    super(props);
    this.state={
        transaction_id:"",
        description:"",
        amount:"",
        newDate:"",
        debit:"",
        credit:""
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

    const {transaction_id,description,amount,newDate,debit,credit} = this.state;

    const data ={
        transaction_id:transaction_id,
        description:description,
        amount:amount,
        newDate:newDate,
        debit:debit,
        credit:credit
    }
 
    console.log(data)
    /// Validation 

    const cuem = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    if(transaction_id.length === 0  || description.length === 0 || amount.length === 0 || newDate.length === 0 ){
        swal(" Fields Cannot empty !","Please enter all data !", "error");
      }else if(transaction_id.length < 6 ){
        swal("Invalid transaction_id !", "Length shuld be greater than 4 !", "error");
      }else if(description.length <8 ){
        swal("Invalid Description !", "Length shuld be greater than 4 !", "error");
      }else if(amount.length < 2 ){
          swal("Invalid Address !", "Length shuld be greater than 4 !", "error");
      }
      else{

      axios.put(`/transaction/update/${id}`,data).then((res) =>{
      if(res.data.success){
        this.setState(
          {
            transaction_id:"",
            description:"",
            amount:"",
            newDate:"",
            debit:"",
            credit:""
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
      window.location = '/Transaction_Details'; // 
  });}
  }


  componentDidMount(){

    const id = this.props.match.params.id;

    axios.get(`/transaction/${id}`).then((res) =>{

      if(res.data.success){
        this.setState({
         
          transaction_id:res.data.post.transaction_id,
          description:res.data.post.description,
          amount:res.data.post.amount,
          newDate:res.data.post.newDate,
          debit:res.data.post.debit,
          credit:res.data.post.credit

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
              <label><strong>Transaction Id :</strong></label>
              <input type="text"
              className="form-control"
              name="transaction_id" 
              placeholder="Enter Transaction Id / Invoice Number"
              value={this.state.transaction_id}
              onChange={this.handleInputChange} 
              style={{backgroundColor: "#ffff", marginTop:"10px",borderRadius: '12px'}} />
          </div><br/>


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
              <label><strong>Description :</strong></label>
              <input type="text"
              className="form-control"
              name="description" 
              maxlength = "10"
              placeholder="Enter Description"
              value={this.state.description}
              onChange={this.handleInputChange} 
              style={{backgroundColor: "#ffff",borderRadius: '12px', marginTop:"10px",}} />
          </div><br/>

          <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
              <label><strong>Amount :</strong></label>
              <input type="text"
              className="form-control"
              name="amount" 
              maxlength = "10"
              placeholder="Enter Amount"
              value={this.state.amount}
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

          <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
              <label><strong>Debit :</strong></label>
              <input type="text"
              className="form-control"
              name="debit" 
              maxlength = "10"
              placeholder="Enter Debit (+)"
              value={this.state.debit}
              onChange={this.handleInputChange} 
              style={{backgroundColor: "#ffff",borderRadius: '12px', marginTop:"10px",}} />
          </div><br/>

          <div class="form-group" style={{marginLeft:"100px", marginRight:"100px"}} >
              <label><strong>Credit :</strong></label>
              <input type="text"
              className="form-control"
              name="credit" 
              maxlength = "10"
              placeholder="Enter Credit (-)"
              value={this.state.credit}
              onChange={this.handleInputChange} 
              style={{backgroundColor: "#ffff",borderRadius: '12px', marginTop:"10px",}} />
          </div><br/>


            <div className="text-center" > 
            <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
              <i className="far fa-check-square"></i>
              &nbsp; Update      
              </button>&nbsp;
            <a href="/Transaction_Details"><button type="button" style={{marginTop:'15px'}} onClick={this.onClick} class="btn btn-warning"><i class="fa fa-close"></i>&nbsp;Cancel</button></a>
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