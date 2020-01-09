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
    const {
      choiceName, directionsPopup, choiceId
    } = this.props;
    this.state = {
      winner: '',
      history: [],
      loading: true,
      choiceName,
      choiceId,
      directionsPopup,
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
      toggleDialog,
      handleCategoriesInput,
      randomPlace,
      randomChoice,
      confirm,
    } = this.props;
    let { history, loading, directionsPopup, choiceId } = this.state;
    history = [...new Set(history.map(restaurant => restaurant.restaurant_name))];
    // console.log(history)
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${choiceName} ${choiceAddress}`;

    return ( 
      <Container>
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
                <Button style={{ background: '#d454ff', color: 'white' }} onClick={() => confirm(choiceId, groupName, choiceName)}>confirm</Button>
                </div>
              )}
              <br />
              <div>
                {' '}
                {chooser && (
                  <div>
                    <Input
                      id="categories"
                      type="text"
                      onChange={handleCategoriesInput}
                    />{' '}
                    <Button
                      style={{ background: '#9900cc', color: 'white' }}
                      onClick={() => {
                        handleGetOptions();
                      }}
                    >
                      {' '}
                      show options
                    </Button>{' '}
                    <Button
                      style={{ background: '#9900cc', color: 'white' }}
                      onClick={() => {
                        randomChoice();
                      }}
                    >
                      Get random choice
        </Button>{' '}&nbsp;
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
                    <Button
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
                <h3>click 'start game' to generate the group's decision maker</h3>
                <h3>click 'allow vetoer' to generate a random vetoer</h3>
              </div>
            )}
        </div>
        <br />
        <div>
          <ul>
            {members.map(groupMember => (
              <GroupMember userImages={userImages} groupMember={groupMember} />
            ))}
          </ul>
        </div>
        <br />
        <div>
          <Button
            style={{ background: '#9900cc', color: 'white' }}
            onClick={() => {
              randomizer();
            }}
          >
            start game
          </Button>
          {'  '}
        </div>
        <br />
        <div>
          <Button
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
            style={{ background: '#d454ff', color: 'white' }}
            onClick={() => {
              handleViewChange('addUserToGroup');
            }}
          >
            add group member
        </Button>{' '}
          <h1> {randomPlace.name} </h1>
          <div className={useStyles.root}>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={6}>
                <Paper className={useStyles.paper}>
                  <div>Previously chosen by {groupName}:</div>
                  {!loading && ( 
                  history.map(restaurant => {
                  return <div>{restaurant}</div>
                  })
                  )}
              </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    );
  }
}

export default Group;
