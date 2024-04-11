import React, { Component } from 'react';
import axios from 'axios';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Shows details of all recipe...
 class Transaction_Details extends Component{
  constructor(props){
  super(props);

  this.state={
    posts:[]
  };
}
componentDidMount(){
  this.retrievePosts();
}

retrievePosts(){
  axios.get("/transaction").then(res =>{
    if(res.data.success){
      this.setState({
        posts:res.data.existingPosts
      });
      console.log(this.state.posts)
    }
  });
}

onDelete=(id)=>{
  if (window.confirm('Are you sure?')) {
  axios.delete(`/transaction/delete/${id}`).then((res)=>{
    alert("Delete Successfully !");
    this.retrievePosts();
  })
}}


filterData(posts,searchKey){
  const result =posts.filter((post)=>
  post.transaction_id.includes(searchKey) || post.transaction_id.toLowerCase().includes(searchKey) ||
  post.amount.includes(searchKey) || post.amount.toLowerCase().includes(searchKey) ||
  post.newDate.includes(searchKey) || post.newDate.toLowerCase().includes(searchKey))
  this.setState({posts:result})
}

handleSearchArea =(e) =>{
  const searchKey=e.currentTarget.value;

  axios.get("transaction").then(res =>{
    if(res.data.success){

      this.filterData(res.data.existingPosts,searchKey)
    }
  });
}
//pdf generating
jsPdfGenerator = () => {

  //new document in jspdf
  var doc = new jsPDF('p','pt');

  doc.text(210,30,"transaction")
  doc.autoTable({  html:'#my-table' })

  doc.autoTable({
    columnStyles: { europe: { halign: 'center' } }, 
    margin: { top: 10 },
  })

  //save the pdf
  doc.save("transactions.pdf");
}
render(){
    return (
      
      <div className style={{ backgroundColor:'#F1F1F1', backgroundSize: 'cover'}}> <br/>
      <br/>
      <h1 className="text-center" > <font face = "Comic sans MS" size ="6" > Transaction Details</font> </h1> <br/>
      
      
      <div className = "row" style={{marginLeft:"50px", marginRight:"63px"}} >
        
            
      <div className = "col-lg-9 mt-2 mb-2" >
        &nbsp;&nbsp;&nbsp;
        <button type="button" class="btn btn-success" variant = "primary"> <a href="/AddTransaction" style={{textDecoration:'none',color:'white'}}>
          Create New Transaction </a></button>
        
        </div > 
            
          <div className = "col-lg-3 mt-2 mb-2">
          <input className="form-control"
          type="search"
          placeholder="Search Transaction ID/Amount/Date"
          namr="searchQuery"
          onChange={this.handleSearchArea}>
          </input> &nbsp;&nbsp;&nbsp;</div > </div>

      
      <table class="table table-bordered table-white" style={{border:' 1px #3f7385',marginLeft:'auto',marginRight:'auto',width: '500px',backgroundColor:'#9D74C1'}}id="my-table" className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Transaction Id</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
            <th scope="col">Debit</th>
            <th scope="col">Credit</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.posts.map((posts,index)=>(
              <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>
                  <div href={`/transaction/${posts._id}`} style={{textDecoration:'none'}}>
                  {posts.transaction_id}
                  </div>
                  </td>
                  <td>{posts.description}</td>
                  <td>{posts.amount}</td>
                  <td>{posts.newDate}</td>
                  <td>{posts.debit}</td>
                  <td>{posts.credit}</td>
                <td>
                  {/* Edit button */}
                  <a className="btn btn-info" style={{width:'50px',height:'40px' }}   href={`/EditTransaction/${posts._id}`}>
                    <i className="fas fa-edit"></i>
                  </a>
                  </td>
                  <td>
                  {/* Delet button */}
                  <a className="btn btn-danger" style={{width:'50px',height:'40px' }}   href="#" onClick={()=>this.onDelete(posts._id)}>
                    <i className="fa fa-trash"></i>
                  </a>
                </td>
              </tr>
            )) }
        </tbody>
      </table>
      <div className = "col-lg-9 mt-2 mb-2" style={{marginLeft:'70%' }}>

        <button onClick={this.jsPdfGenerator} type="button" class="btn btn-primary"> &nbsp;&nbsp;&nbsp;&nbsp;Pdf&nbsp; &nbsp;&nbsp;&nbsp;</button>
        
        </div > 
      
      <br/><br/></div>
    )
  }
}
export default Transaction_Details;
