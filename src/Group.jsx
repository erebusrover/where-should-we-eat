import React from 'react';
import {
  Container,
  Button,
  Dialog,
  DialogTitle,
  Link,
  Input,
} from '@material-ui/core';
import GroupMember from './GroupMember.jsx';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { maxWidth } from '@material-ui/system';
import { top } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

/**
 * This is the component that is rendered when a user clicks on one of their groups
 * from their home page.
 *
 * A user can click Start Game to initiate a decision making 'game,'
 * If the user is randomly chosen as the decision maker, they will be presented with an
 * input form and a button, Show Options. They can optionally put something in the input form
 * to add a parameter to the Yelp API query that will result from them clicking the Show Options button.
 * Clicking the Show Options button renders the Options view/component, which will have a list of five
 * restaurant choices for them to choose.
 *
 * We were attempting to make this stateful in order
 * to implement occasional rerendering of state based on changes to the database,
 * but that is not a currently active feature.
 */
class Group extends React.Component {
  constructor(props) {
    super(props);
    const { choiceName, directionsPopup, choiceId, showOptions, randomPlace } = this.props;
    this.state = {
      winner: '',
      history: [],
      loading: true,
      choiceName,
      choiceId,
      directionsPopup,
      randomPlace,
    };
    this.getHistory = this.getHistory.bind(this);
  }

  componentDidMount() {
    this.getHistory();
  }

  getHistory() {
    const { groupName } = this.props;
    axios.get(`api/groupHistory/${groupName}`)
      .then(response => {
        console.log(response);
        console.log(response.data);
        this.setState({
          history: response.data,
          loading: false,
        })
      })
      .catch((error) => {
        debugger;
        console.log("error getting group history", error)
      })
  }


  render() {
    // const useStyles = useStyles();
    let {
      user,
      showRandom,
      groupName,
      pricePoint,
      members,
      handleViewChange,
      userImages,
      handleGetOptions,
      choiceName,
      choiceAddress,
      randomizer,
      chooser,
      showWinner,
      vetoRandomizer,
      veto,
      showVeto,
      showOptions,
      toggleDialog,
      handleCategoriesInput,
      randomChoice,
      confirm,
      top,
    } = this.props;
    let { history, loading, directionsPopup, choiceId, randomPlace, confirmed} = this.state;
    history = [...new Set(history.map(restaurant => restaurant.restaurant_name))];
    // console.log(history)
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${choiceName} ${choiceAddress}`;

    return (
    <Grid container spacing={4}>
      <Grid item xs={8}>
        <h2 style={{ color: '#d454ff' }}>{groupName}</h2>
        <h3 style={{ color: '#d454ff' }}>price point: {pricePoint}</h3>
        <br />
        <div>
          {' '}
          {showWinner === true ? (
            <div>
              <h3>{chooser} is the lucky decision maker</h3>
              {directionsPopup && (
                <div>
                <div>{chooser} chose {choiceName.toLowerCase()}</div>
                <Link href={mapsUrl} target="_blank" rel="noreferrer">click here for directions</Link>{' '}
                <div>
                <br />
                      <Button size="small" style={{ background: '#9900cc', color: 'white' }} onClick={() => {
                  confirm(choiceId, groupName, choiceName);
                  this.setState({
                    confirmed: true,
                    randomPlace: {},
                  })
                }}>confirm</Button>
                </div>
                <br />
                  {confirmed && (<div style={{ fontWeight: 'bold', color: '#ff0000' }}>{groupName} is eating at {choiceName.toLowerCase()}</div>)}
                </div>
              )}
              {randomPlace.name && (
                <div>
                  <div style={{ color: '#d454ff' }}>randomly chosen: <p style={{color: 'black'}}>{randomPlace.name}</p></div>
                  <div style={{ color: '#d454ff' }}>fate has decided for {groupName}</div>
                  <div style={{ color: '#ff0000' }}>no veto allowed</div>
                  <div style={{ color: '#d454ff' }}>start another game to choose again</div>
                </div>
              )}
              <br />
              <div>
                {' '}
                {showOptions && (
                  <div style={{marginTop: "10px"}}>
                    <Input
                      id="categories"
                      type="text"
                      onChange={handleCategoriesInput}
                      style={{ backgroundColor: '#e8f0fe50'}}
                    />{' '}
                    <div>
                    <br />
                    <Button
                      size="medium"
                      className={useStyles.margin}
                      style={{ background: '#9900cc', color: 'white' }}
                      onClick={() => {
                        handleGetOptions();
                      }}
                    >
                      {' '}
                      show options
                    </Button>{' '}
                    <Button
                      size="medium"
                      variant="contained" 
                      className={useStyles.margin}
                      style={{ background: '#9900cc', color: 'white' }}
                      onClick={() => {
                        randomChoice();
                        this.setState({
                          confirmed: true,
                        })
                      }}
                    >
                      random choice
        </Button>{' '}&nbsp;
        </div>
        <br />
                  </div>
                )}
              </div>
              <div>
                {' '}
                {showVeto && (
                  <div>
                    <h3>
                      {veto} may veto {chooser}'s decision
                    </h3>{' '}
                    <Button variant="contained" size="small" className={useStyles.margin}
                      style={{ background: '#FF0000', color: 'white' }}
                      onClick={() => {
                        this.setState({
                          directionsPopup: false,
                        }, () => {
                          vetoRandomizer();
                        })
                      }}
                    >
                      {' '}
                      Veto
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
              <div>
                <h4>click 'start game' to generate the group's decision maker</h4>
                <h4>click 'allow vetoer' to generate a random vetoer</h4>
              </div>
            )}
        </div>
        <br />
        <div>
          <Container style={{ 
            margin: 0,
            background: '#faf2ff',
            maxWidth: '400px',
            boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
      }} fixed>
            {members.map(groupMember => (
              <div style={{padding: '5px'}}>
              <GroupMember userImages={userImages} groupMember={groupMember} />
              </div>
            ))}
          </Container>
        </div>
        <br />
        <div>
          <Button
            size="medium"
            variant="contained"
            style={{ background: '#9900cc', color: 'white' }}
            onClick={() => {
              this.setState({
                randomPlace: {},
                confirmed: false,
                directionsPopup: false,
              }, () => {
                randomizer();
              })
            }}
          >
            start game
          </Button>
          {'  '}
        </div>
        <br />
        <div>
          <Button
            size="medium"
            variant="contained"
            style={{ background: '#9900cc', color: 'white' }}
            onClick={() => {
              vetoRandomizer();
            }}
          >
            allow vetoer
          </Button>
          {'  '}
        </div>
        <br />
        <div>
          <Button
            size="medium"
            variant="contained" 
              style={{ background: '#f8faff', color: 'black' }}
            onClick={() => {
              handleViewChange('addUserToGroup');
            }}
          >
            add group member
        </Button>{' '}
        </div>
      </Grid>
        <Grid item xs={4} justify="flex-start" direction="row">
          <p>
            <h5 style={{ color: '#9900cc' }}>Previously chosen by {groupName}:</h5>
            <Paper style={{backgroundColor: '#f8faff'}} className={useStyles.paper}>
              {!loading &&
                history.map(restaurant => {
                  return <div>{restaurant}</div>;
                })}
            </Paper>
          </p>
        </Grid>
      </Grid>
    );
  }
}

export default Group;
