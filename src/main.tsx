// @ts-nocheck
import React, { useState } from 'react';
import { Box, Slider, TextField, Typography, Button, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
type MonthlyData = {
  month: number;
  monthlySipAmount: number;
  rateOfInterest: number;
  startCorpus: number;
  sipContribution: number;
  monthlySwpAmount: number;
  swpWithdrawal: number;
  endCorpus: number;
};
const InvestmentCalculator = () => {
  const [initialSip, setInitialSip] = useState(25000);
  const [swpAmount, setSwpAmount] = useState(25000);
  const [annualRateOfInterest, setAnnualRateOfInterest] = useState(12);
  const [stepUpPercentage, setStepUpPercentage] = useState(10);
  const [sipMonths, setSipMonths] = useState(10);
  const [totalMonth, setTotalMonth] = useState(10);
  const [swpStartMonth, setSwpStartMonth] = useState(10);
  console.log('annualRateOfInterestout', annualRateOfInterest);

  function calculateSipSwpTable(
    initialSip: number,
    stepUpPercentage: number,
    annualRateOfInterest: number,
    sipMonths: number,
    totalMonths: number,
    swpStartMonth: number,
    swpAmount: number
  ) {
    sipMonths = sipMonths * 12;
    totalMonths = totalMonths * 12;
    swpStartMonth = swpStartMonth * 12 + 1;

    const monthlyRateOfInterest = annualRateOfInterest / 12 / 100;
    let corpus = 0;
    let monthlySipAmount = initialSip;
    const table: MonthlyData[] = [];

    for (let month = 1; month <= totalMonths; month++) {
      let sipContribution = 0;
      let swpWithdrawal = 0;

      if (month <= sipMonths) {
        sipContribution = monthlySipAmount;
        corpus = corpus * (1 + monthlyRateOfInterest) + sipContribution;
      } else {
        corpus = corpus * (1 + monthlyRateOfInterest);
      }

      if (month >= swpStartMonth) {
        swpWithdrawal = swpAmount;
        corpus -= swpWithdrawal;
      }

      table.push({
        month,
        monthlySipAmount: month <= sipMonths ? monthlySipAmount.toFixed(2) : 0,
        rateOfInterest: annualRateOfInterest,
        startCorpus: corpus.toFixed(2),
        sipContribution: sipContribution.toFixed(2),
        monthlySwpAmount: month >= swpStartMonth ? swpAmount : 0,
        swpWithdrawal: swpWithdrawal,
        endCorpus: corpus.toFixed(2),
      });

      // Increment SIP amount by step-up percentage each year
      if (month % 12 === 0 && month < sipMonths) {
        monthlySipAmount *= 1 + stepUpPercentage / 100;
      }
    }
    exportTableToExcel(table);
    return table;
  }

  const exportTableToExcel = (ourData: any[]) => {
    const titleKeys = Object.keys(ourData[1]);

    const refinedData = [];

    refinedData.push(titleKeys);

    ourData.forEach((item) => {
      refinedData.push(Object.values(item));
    });

    let csvContent = '';
    csvContent =
      'data:text/csv;charset=utf-8,' +
      refinedData.map((e) => e.join(',')).join('\n');

    // refinedData.forEach((row) => {
    //   csvContent += row.join(',') + '\n';
    // });

    // const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' });
    // const objUrl = URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.setAttribute('href', objUrl);
    // link.setAttribute('download', 'File.csv');
    // link.textContent = 'Click to Download';

    // document.querySelector('body').append(link);

    const downloadLink = document.createElement('a');
    downloadLink.href = csvContent;
    downloadLink.download = 'SIPSWPMonthly';

    // Triggering the function
    downloadLink.click();
  };
  // console.table(calculateSipSwpTable(10000, 10, 12, 240, 360, 121, 30000));
  const COLORS = ['#8884d8', '#82ca9d'];

  return (
    <Paper variant="elevation"
      sx={{
        p: 4,
        bgcolor: 'white',
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 500,
        margin: 'auto',
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography gutterBottom>SIP Amount</Typography>
          <Slider
            value={initialSip}
            onChange={(e, val) => setInitialSip(val)}
            min={0}
            max={1000000}
            step={1000}
          />
          <TextField
            value={initialSip}
            onChange={(e) => setInitialSip(Number(e.target.value))}
            InputProps={{
              startAdornment: '₹',
            }}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <br/>
        <Grid item xs={6}>
          <Typography gutterBottom>Step Up Percentage</Typography>
          <Slider
            value={stepUpPercentage}
            onChange={(e, val) => setStepUpPercentage(val)}
            min={0}
            max={30}
            step={0.1}
          />
          <TextField
            value={stepUpPercentage}
            onChange={(e) => setStepUpPercentage(Number(e.target.value))}
            InputProps={{
              endAdornment: '%',
            }}
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <Typography gutterBottom>Expected return rate (p.a)</Typography>
          <Slider
            value={annualRateOfInterest}
            onChange={(e, val) => setAnnualRateOfInterest(val)}
            min={0}
            max={30}
            step={0.1}
          />
          <TextField
            value={annualRateOfInterest}
            onChange={(e) => setAnnualRateOfInterest(Number(e.target.value))}
            InputProps={{
              endAdornment: '%',
            }}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <br />
        <Grid item xs={6}>
          <Typography gutterBottom>Time period for SIP</Typography>
          <Slider
            value={sipMonths}
            onChange={(e, val) => setSipMonths(val)}
            min={1}
            max={30}
            step={1}
          />
          <TextField
            value={sipMonths}
            onChange={(e) => setSipMonths(Number(e.target.value))}
            InputProps={{
              endAdornment: 'Yr',
            }}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item size={{ xs: 6, md: 11 }}>
          <Typography gutterBottom>
            Time period After which SWP starts
          </Typography>
          <Slider
            value={swpStartMonth}
            onChange={(e, val) => setSwpStartMonth(val)}
            min={1}
            max={30}
            step={1}
          />
          <TextField
            value={swpStartMonth}
            onChange={(e) => setSwpStartMonth(Number(e.target.value))}
            InputProps={{
              endAdornment: 'Yr',
            }}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <br />
        <Grid item size={{ xs: 6, md: 11 }}>
          <Typography gutterBottom>
            Total number of month for which SIP and SWP will continue
          </Typography>
          <Slider
            value={totalMonth}
            onChange={(e, val) => setTotalMonth(val)}
            min={1}
            max={30}
            step={1}
          />
          <TextField
            value={totalMonth}
            onChange={(e) => setTotalMonth(Number(e.target.value))}
            InputProps={{
              endAdornment: 'Yr',
            }}
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item size={{ xs: 6, md: 11 }}>
          <Typography gutterBottom>SWP Amount</Typography>
          <Slider
            value={swpAmount}
            onChange={(e, val) => setSwpAmount(val)}
            min={0}
            max={1000000}
            step={1000}
          />
          <TextField
            value={swpAmount}
            onChange={(e) => setSwpAmount(Number(e.target.value))}
            InputProps={{
              startAdornment: '₹',
            }}
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          onClick={() =>
            calculateSipSwpTable(
              initialSip,
              stepUpPercentage,
              annualRateOfInterest,
              sipMonths,
              totalMonth,
              swpStartMonth,
              swpAmount
            )
          }
        >
          Calculate Month wise Statement
        </Button>
      </Box>
    </Paper>
  );
};

export default InvestmentCalculator;
