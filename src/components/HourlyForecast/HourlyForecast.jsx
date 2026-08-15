import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

import "./HourlyForecast.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function HourlyForecast({ city }) {
  if (!city || !city.hourly) {
    return null;
  }

  const currentHour = new Date().getHours();

  const nextHours = city.hourly
    .filter((hour) => {
      const hourNumber = Number(hour.time.split(" ")[1].split(":")[0]);

      return hourNumber >= currentHour;
    })
    .slice(0, 8);

  if (!nextHours.length) {
    return null;
  }

  const labels = nextHours.map((hour) => {
    const time = hour.time.split(" ")[1];

    return time;
  });

  const temperatures = nextHours.map((hour) => Math.round(hour.temp_c));

  const data = {
    labels,

    datasets: [
      {
        label: "Temperature °C",

        data: temperatures,

        tension: 0.4,

        borderWidth: 2,

        pointRadius: 4,

        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: false,

        ticks: {
          callback: (value) => `${value}°`,
        },
      },
    },
  };

  return (
    <section className="hourly-forecast">
      <div className="hourly-forecast-container container">
        <h2 className="hourly-forecast-title">Hourly forecast</h2>

        <div className="hourly-chart">
          <Line data={data} options={options} />
        </div>
      </div>
    </section>
  );
}

export default HourlyForecast;
