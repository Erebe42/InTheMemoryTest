import React, { useState, useEffect, ChangeEvent } from 'react';

import { Grid, InputLabel, Select, MenuItem } from '@material-ui/core';
import { StylesProvider } from '@material-ui/styles';

import axios from 'axios';

import { Graph } from './Graph';

import styles from './App.module.scss';

const App = () => {
  const [countries, setCountries] = useState(null as null | string[]);
  const [totalEarn, setTotalEarn] = useState(0);
  const [averageRevenue, setAverageRevenue] = useState(0);
  const [uniqueCustomersCount, setUniqueCustomersCount] = useState(0);
  const [revenuePerMonth, setRevenuePerMonth] = useState(0);

  const [selectedCountries, setSelectedCountries] = useState([] as string[]);

  useEffect(() => {
    axios.get('http://localhost:3000/countries').then(({status, data}) => {
      if (status === 200) {
        setCountries(data.countries);
      }
    });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/', { params: { countries: selectedCountries } }).then(({status, data}) => {
      if (status === 200) {
        setTotalEarn(Number(data.totalEarn));
        setAverageRevenue(Number(data.averagePrice));
        setUniqueCustomersCount(Number(data.customerAmount));
        setRevenuePerMonth(data.revenuePerMonth);
      }
    });
  }, [selectedCountries]);

  const currencyOptions = {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  };

  return (
    <Grid className={styles.App} container>
      <StylesProvider injectFirst>
      <Grid item container direction='row' alignItems='center' spacing={2}>
        <Grid item>
          <InputLabel>Country</InputLabel>
        </Grid>
        <Grid item>
          <Select
            multiple
            displayEmpty
            renderValue={() => {
              if (selectedCountries.length) {
                return `${selectedCountries.length} countr${selectedCountries.length > 1 ? 'ies' : 'y'}`;
              } else {
                return 'All';
              }
            }}
            value={selectedCountries}
            onChange={(event) => {
              const { value } = event.target as { value: string[] };
              if (value.includes('AllCountries')) {
                setSelectedCountries([]);
              } else {
                setSelectedCountries(value);
              }
            }}
          >
            <MenuItem value='AllCountries'>All countries</MenuItem>
            {
              countries && countries.map(countryName => (
                <MenuItem value={countryName}>{countryName}</MenuItem>
              ))
            }
          </Select>
        </Grid>
      </Grid>
      <Grid item container>
        <h1>Summary</h1>
        <Grid item container direction='row'>
          <Grid item xs={4}>
            <div className={styles.detailsMain}>
              <div className={styles.detailsLabel}>Revenue</div>
              <div className={styles.detailsValue}>{totalEarn.toLocaleString(navigator.language, currencyOptions)}</div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={styles.detailsMain}>
              <div className={styles.detailsLabel}>Average revenue per order</div>
              <div className={styles.detailsValue}>{averageRevenue.toLocaleString(navigator.language, currencyOptions)}</div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={styles.detailsMain}>
              <div className={styles.detailsLabel}>Customers</div>
              <div className={styles.detailsValue}>{uniqueCustomersCount.toLocaleString(navigator.language)}</div>
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container xs={12} direction='column'>
        <Grid item container>
          <h1>Revenue per month</h1>
        </Grid>
        <Grid item>
          <Graph data={revenuePerMonth} />
        </Grid>
      </Grid>
      </StylesProvider>
    </Grid>
  );
}

export default App;
