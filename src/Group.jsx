<Container>
  <h2 style={{ color: '#d454ff' }}>{groupName}</h2>
  <h3 style={{ color: '#d454ff' }}>price point: {pricePoint}</h3>
  <br />
  <div>
    {' '}
    {showWinner === true ? (
      <div>
        <h3>{chooser} is the lucky decision maker</h3>
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
              </Button>
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
                  vetoChoice();
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
  <Dialog
    onBackdropClick={() => {
      toggleDialog('directionsPopup');
    }}
    open={directionsPopup}
  >
    <DialogTitle>
      {chooser} chose {choiceName}.
    </DialogTitle>
    <Link href={mapsUrl} target="_blank" rel="noreferrer">
      click here for directions
    </Link>
  </Dialog>
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
    <div className={useStyles.root}>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={6}>
          <Paper className={useStyles.paper}>history: {history}</Paper>
        </Grid>
      </Grid>
    </div>
  </div>
</Container>;
