import { blue } from '@mui/material/colors';
import { PieChart } from '@mui/x-charts/PieChart';
import React from 'react';
export default function PieCharts(dataa: any){
    const data1= [{...dataa}]
    console.log("data in pie",data1);
    
return (
  <PieChart
  height={100}
  width={200}
  series={[
    {
      data: data1,
      innerRadius: 40,
      outerRadius: 80,
    //   paddingAngle: 5,
    //   cornerRadius: 5,
    //   startAngle: 0,
    //   endAngle: 360,
      cx: 500,
      cy: 200,
    }
   
  ]}
  
/>  
)    
}
