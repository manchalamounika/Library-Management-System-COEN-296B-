import React, { Component } from 'react';


class CardMoreInfo extends Component {
   
    render() {
        const {library} = this.props;
        return (
        
           <div className='more-info-container'>
               <div className="header"> {library } </div>
                <div className="content">
                <img className="image-icons"src={require('/Users/saishree/reactWorkspace/library_managementsystem/src/images/books1.png')} />
                Books: books
                <br/>
                <img className="image-icons2"src={require('/Users/saishree/reactWorkspace/library_managementsystem/src/images/readers.jpg')} />
                Readers:Readers
                <br/>
                <img className="image-icons2"src={require('/Users/saishree/reactWorkspace/library_managementsystem/src/images/checkout.jpg')} />
                CheckOuts: CheckOuts
                <br/>
                <img className="image-icons"src={require('/Users/saishree/reactWorkspace/library_managementsystem/src/images/overdue.png')} />
                OverDue: over due
                <br/>
                <br/>
                Librarians: abc, xyz 
                </div>
           </div>
        );
    }
}

export default CardMoreInfo;