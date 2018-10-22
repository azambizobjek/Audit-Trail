
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component'

export class TabHistory extends Component {
// componentDidUpdate(prevProps){
//     if(prevProps.editor.auditLog!==this.props.editor.auditLog){

//     }
//     const{user:{bio_access_id:bId}}=this.props.session
//     const{selRec:{record_id:recId}}=this.props.records
//     const params={
//         bio_access_id:bId,
//         action: "SEARCH_AUDIT_LOG",
//         action_types: [],
//         audit_types: [],
//         record_id: recId,
//         record_type_id: "",
//         stakeholder_id: "",
//         date_from: "",
//         date_to: ""
//         }
//     this.props.getAuditLog(params)
// }

render() {
    const{auditLog}=this.props.editor
    const actItem=auditLog.map((itm, idx)=>(
        <VerticalTimelineElement key={idx}
            className="vertical-timeline-element--work"
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
            icon={ <img src={require(`../../img/${itm.action_type}.svg`)} alt={itm.action_type}/> }
            >
            <h5 className="vertical-timeline-element-title">{itm.audit_type}</h5>
            <p className="vertical-timeline-element-title">{new Date(itm.date_updated).toLocaleString("en-my")}</p>
            <p>{decodeURIComponent(itm.details)}</p>
            </VerticalTimelineElement>
    ))
    return (
    <>
    <h1 className="h3 display text-primary text-center">History and activities performed by user</h1>
    <div className="timelineWrapper mt-3 bg-light">
    <VerticalTimeline animate={false}>
        {actItem}
    </VerticalTimeline>
    </div>
    <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={this.props.onClose}>Close</button>
    </div>

    </>
    )
}
}
TabHistory.propTypes={
    editor: PropTypes.object.isRequired,
// session: PropTypes.object.isRequired,
// getAuditLog:PropTypes.func.isRequired,
// setCardView:PropTypes.func.isRequired,
// getAdvSearch:PropTypes.func.isRequired,
// showFab:PropTypes.func.isRequired,
// showMultiFab:PropTypes.func.isRequired,
// getRecItemAccess:PropTypes.func.isRequired,
// setIsContainer:PropTypes.func.isRequired,
// setSelRec:PropTypes.func.isRequired,
// changeMultiSel:PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
// session:state.session,
// records:state.records,
editor:state.editor
})
export default connect(mapStateToProps)(TabHistory)
