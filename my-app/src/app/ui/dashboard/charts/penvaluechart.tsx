'use client'
import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);
import communeData from '@/app/lib/data'; // Importing communeData from data.ts

const ChartComponent = () => {
  const chartData = {
    labels: communeData.technologies.map(tech => tech.tech_name),
    datasets: [
      {
        label: 'Antal Installationer',
        data: communeData.technologies.map(tech => tech.Antal_installationer),
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
      {
        label: 'Årlig Besparing per Installation (SEK)',
        data: communeData.technologies.map(tech => tech.Arlig_besparing_per_installation_SEK),
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
      },
      {
        label: 'Kostnad per Installation',
        data: communeData.technologies.map(tech => tech.Kostnad_per_installation),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: true,
        },
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
        },
      }],
    },
  };

  return (
    <div>
      <h2>Commune: {communeData.commune_name}</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;