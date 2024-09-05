// @ts-nocheck
import React, { useState } from 'react';
import { Box, Slider, TextField, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Sip: React.FC = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(25000);
  const [annualStepUp, setAnnualStepUp] = useState<number>(10);
  const [rate, setRate] = useState<number>(12);
  const [time, setTime] = useState<number>(10);

  const calculateReturns = (): number => {
    let totalInvestment = 0;
    let totalReturns = 0;

    for (let i = 0; i < time; i++) {
      const yearlyInvestment = monthlyInvestment * 12 * Math.pow(1 + annualStepUp / 100, i);
      totalInvestment += yearlyInvestment;
      totalReturns += yearlyInvestment * Math.pow(1 + rate / 100, time - i);
    }

    return totalReturns - totalInvestment;
  };

  const investedAmount = monthlyInvestment * 12 * time * ((Math.pow(1 + annualStepUp / 100, time) - 1) / (annualStepUp / 100));
  const estimatedReturns = calculateReturns();
  const totalValue = investedAmount + estimatedReturns;

  const data = [
    { name: 'Invested amount', value: investedAmount },
    { name: 'Est. returns', value: estimatedReturns },
  ];

  const COLORS = ['#8884d8', '#82ca9d'];

  return (
    <Box sx={{ p: 4, bgcolor: 'white', borderRadius: 2, boxShadow: 3, maxWidth: 800, margin: 'auto' }}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography gutterBottom>Monthly investment</Typography>
          <Slider
            value={monthlyInvestment}
            onChange={(e, val) => setMonthlyInvestment(val as number)}
            min={0}
            max={100000}
            step={1000}
          />
          <TextField
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
            InputProps={{
              startAdornment: '₹',
            }}
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <Typography gutterBottom>Annual step up</Typography>
          <Slider
            value={annualStepUp}
            onChange={(e, val) => setAnnualStepUp(val as number)}
            min={0}
            max={100}
            step={1}
          />
          <TextField
            value={annualStepUp}
            onChange={(e) => setAnnualStepUp(Number(e.target.value))}
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
            value={rate}
            onChange={(e, val) => setRate(val as number)}
            min={0}
            max={30}
            step={0.1}
          />
          <TextField
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            InputProps={{
              endAdornment: '%',
            }}
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <Typography gutterBottom>Time period</Typography>
          <Slider
            value={time}
            onChange={(e, val) => setTime(val as number)}
            min={1}
            max={30}
            step={1}
          />
          <TextField
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
            InputProps={{
              endAdornment: 'Yr',
            }}
            variant="outlined"
            fullWidth
          />
        </Grid>

        <Grid item xs={6}>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography>Invested amount: ₹{investedAmount.toLocaleString()}</Typography>
        <Typography>Est. returns: ₹{estimatedReturns.toLocaleString()}</Typography>
        <Typography>Total value: ₹{totalValue.toLocaleString()}</Typography>
      </Box>
    </Box>
  );
};

export default Sip;
