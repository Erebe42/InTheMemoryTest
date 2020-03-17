import * as React from 'react';

import { Grid, InputLabel, Select, MenuItem } from '@material-ui/core';
import { StylesProvider } from '@material-ui/styles';

import styles from './App.module.scss';

const App = () => {
  return (
    <Grid className={styles.App} container>
      <StylesProvider injectFirst>
      <Grid item container direction='row' alignItems='center' spacing={2}>
        <Grid item>
          <InputLabel>Country</InputLabel>
        </Grid>
        <Grid item>
          <Select id="select" value="France">
            <MenuItem value="France">France</MenuItem>
            <MenuItem value="Italia">Italia</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Grid item container>
        <h1>Summary</h1>
        <Grid item container direction='row'>
          <Grid item xs={4}>
            <div className={styles.detailsMain}>
              <div className={styles.detailsLabel}>Revenue</div>
              <div className={styles.detailsValue}>101.0 M€</div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={styles.detailsMain}>
              <div className={styles.detailsLabel}>Average revenue per order</div>
              <div className={styles.detailsValue}>40 €</div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={styles.detailsMain}>
              <div className={styles.detailsLabel}>Customers</div>
              <div className={styles.detailsValue}>40 K</div>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <h1>Revenue for month</h1>
        Graph
      </Grid>
      </StylesProvider>
    </Grid>
  );
}

export default App;
