import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ForecastChart({ forecast }) {
  if (!forecast || forecast.length === 0) {
    return <p>No forecast data available.</p>;
  }

  // Extract dates and temperatures
  const labels = forecast.map(item =>
    new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" })
  );
  const temps = forecast.map(item => item.main.temp);

  const data = {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temps,
        borderColor: "#ff9800",
        backgroundColor: "rgba(255, 152, 0, 0.2)",
        tension: 0.3
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: "5-Day Temperature Forecast" }
    }
  };

  // ✅ Return JSX properly
  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}

export default ForecastChart;
