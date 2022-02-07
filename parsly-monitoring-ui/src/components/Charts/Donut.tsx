import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

export const DonutChart = ({ chartData, chartOptions }) => {
  return (
    <ReactApexChart
      options={chartOptions}
      series={chartData}
      type="donut"
      width="100%"
      height="100%"
    />
  );
};
