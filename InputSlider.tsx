import React, { useState } from 'react';
import { TextField, Slider, Box } from '@mui/material';

function InputBoxAndSlider() {
  const [value, setValue] = useState(50); // Initial value for the slider and input box

  const handleSliderChange = (
    event: any,
    newValue: React.SetStateAction<number>
  ) => {
    setValue(newValue);
  };

  const handleInputChange = (event: any) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  return (
    <Box sx={{ width: 300 }}>
      <TextField
        label="Value"
        value={value}
        onChange={handleInputChange}
        inputProps={{
          step: 1,
          min: 0,
          max: 100,
          type: 'number',
          'aria-labelledby': 'input-slider',
        }}
        sx={{ mb: 2 }}
      />
      <Slider
        value={typeof value === 'number' ? value : 0}
        onChange={handleSliderChange}
        aria-labelledby="input-slider"
        min={0}
        max={100}
      />
    </Box>
  );
}

export default InputBoxAndSlider;
