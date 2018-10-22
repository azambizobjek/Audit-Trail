import React, { Component } from 'react'

export default class History extends Component {
 constructor(){
   super()
   this.state={
    editRec:null,
    searchKey:null
   }
 }
  componentDidMount(){
    // if(sessionStorage.isAuth){
    //   const {stakeholder_id:stakehId}=sessionStorage
    //   const {editRec, searchKey}=JSON.parse(localStorage[stakehId])
    //   this.setState({editRec:editRec, searchKey:searchKey})
    // }
  }

  render() {
    // const {editRec, searchKey}=this.state

  //   const searchList = searchKey!==null?searchKey.map((itm,idx)=>
  //     <li className="d-flex justify-content-between" key={idx}>
  //       <div className="left-col d-flex">
  //         <div className="icon"><i className="fa fa-search"></i></div>
  //         <div className="title"><Link to={`/search?q=${itm.keyword}`}><strong>{itm.keyword}</strong></Link>
  //         </div>
  //       </div>
  //       <div className="right-col text-right">
  //         <div className="update-date">{itm.day}<span className="month">{itm.month}</span></div>
  //       </div>
  //     </li>
  //   ):''

  //   const recList = editRec!==null?editRec.map(rec=>
  //   <li key={rec.recNo}>
  //   <div className="row">
  //     <div className="col-4 date-holder text-right text-truncate">
  //       <div className="icon clearbg"><img src={require('../../img/'+rec.icon+'.svg')} alt={rec.icon} className="p-1 img-fluid" /></div>
  //       <div className="date">
  //         <span>{rec.date}</span>
  //         <span className="text-info">{rec.time}</span>
  //         </div>
  //     </div>
  //     <div className="col-8 content"> <Link to={`/search/${rec.rectype}?q=${rec.recId}&title=${rec.title}`}  className="clearfix"><strong>{rec.title}</strong></Link>
  //     </div>
  //   </div>
  // </li>):''

    return (
        <section className="mt-30px mb-30px">
        <div className="container-fluid">
          <div className="row">


            <div className="col-lg-8 col-md-6">
              <div id="recent-activities-wrapper" className="card updates activities">
                <div id="activites-header" className="card-header d-flex justify-content-between align-items-center">
                  <h2 className="h5 display"><a data-toggle="collapse" data-parent="#recent-activities-wrapper" href="#activities-box" aria-expanded="true" aria-controls="activities-box">Recent Activities</a></h2><a data-toggle="collapse" data-parent="#recent-activities-wrapper" href="#activities-box" aria-expanded="true" aria-controls="activities-box"><i className="fa fa-angle-down"></i></a>
                </div>
                <div id="activities-box" role="tabpanel" className="collapse show">
                  <ul className="activities list-unstyled">
                    {/* {recList} */}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">

              <div id="new-updates" className="card updates recent-updated">
                <div id="updates-header" className="card-header d-flex justify-content-between align-items-center">
                    <h2 className="h5 display">
                        <a data-toggle="collapse" data-parent="#new-updates" href="#updates-box" aria-expanded="true" aria-controls="updates-box">Search Keywords</a>
                    </h2>
                    <a data-toggle="collapse" data-parent="#new-updates" href="#updates-box" aria-expanded="true" aria-controls="updates-box">
                    <i className="fa fa-angle-down"></i></a>
                </div>
                <div id="updates-box" role="tabpanel" className="collapse show">
                  <ul className="news list-unstyled">
                    {/* {searchList} */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
