import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import CardMoreInfo from './CardMoreInfo';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {  red900, blue100 } from 'material-ui/styles/colors';
import Button from '@material-ui/core/Button';


const styles = {
    card: {
      position: 'relative',
      width: '250px',      
    //   color: red900 ,
      background:'#E1F5FE',        
    },
  
    cardHeader: {
      paddingBottom: '40px'
    }
  }

class HomeCard extends Component {
    render() {
        const { library } = this.props
        return (
            <div>
                <Popup
                    trigger={                        
                        <Card style={styles.card} >
                                <CardContent>                                    
                                    <Typography variant="headline" component="h2" color="inherit">
                                        {library}
                                    </Typography>
                                    <br/>
                                    <Typography component="p" color="textSecondary">
                                        Librarians: abc, xyz.
                                    </Typography>
                                </CardContent>
                            </Card>                   
                    }
                    modal
                    closeOnDocumentClick>
                    {close => (
                        <div className='modal-container'>
                            <a className="close" onClick={close}>
                                &times;
                            </a>
                            <CardMoreInfo library={library} />
                            <Button
                                size="small"
                                // variant="contained"                                
                                color="secondary"
                                onClick={() => close()
                                }>
                                close modal
                            </Button>
                        </div>
                    )}
                </Popup>
            </div>
        )
    }
}

export default HomeCard;
