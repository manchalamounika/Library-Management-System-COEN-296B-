import React, { Component } from 'react';
import Popup from 'reactjs-popup'; 
import CardMoreInfo from './CardMoreInfo';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import classes from './Home.css';

const styles = {
    card: {
      position: 'relative',
      width: '170px',
      height: '170px',     
      background:'white',      
    },
    cardContent:{
        padding :'0px',
    },
    cardHeader: {
      marginTop: '30px',
      marginBottom: '20px'
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
                                <CardContent style={styles.cardContent}>                                    
                                    <Typography style = {styles.cardHeader} variant="headline" component="h2" color="inherit">
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
                        <div className={classes.modalcontainer}>
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
