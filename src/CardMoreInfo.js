import React, { Component } from 'react';


class CardMoreInfo extends Component {
   
    render() {
        const {library} = this.props;
        return (
        
           <div className='more-info-container'>
               <div className="header"> {library } </div>
                <div className="content">
                Books: books
                <br/>
                Readers:Readers
                <br/>
                CheckOuts: CheckOuts
                <br/>
                OverDue: over due
                <br/>
                Librarians: abc, xyz 
                </div>
           </div>
        );
    }
}

export default CardMoreInfo;