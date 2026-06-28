import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./VisitsChart.css";

const CHART_GREEN = "#75f387";
const CHART_GREEN_MUTED = "#75f38766";
const CHART_BG = "#0a1f12";

const axisTickStyle = {
  fill: CHART_GREEN,
  fontFamily: "pixelmplus12-regular, sans-serif",
  fontSize: 12,
};

function VisitsChart({ data, title = "Site Visits", dataKey = "visits", seriesName = "Visits" }) {
  return (
    <section className="visits-chart-panel">
      <h2 className="visits-chart-title">{title}</h2>
      <div className="visits-chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 12,
              right: 20,
              bottom: 5,
              left: 0,
            }}
          >
            <CartesianGrid
              stroke={CHART_GREEN_MUTED}
              strokeDasharray="4 4"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              stroke={CHART_GREEN_MUTED}
              tick={axisTickStyle}
              axisLine={{ stroke: CHART_GREEN_MUTED }}
              tickLine={{ stroke: CHART_GREEN_MUTED }}
            />
            <YAxis
              width="auto"
              stroke={CHART_GREEN_MUTED}
              tick={axisTickStyle}
              axisLine={{ stroke: CHART_GREEN_MUTED }}
              tickLine={{ stroke: CHART_GREEN_MUTED }}
              label={{
                value: seriesName,
                position: "insideLeft",
                angle: -90,
                fill: CHART_GREEN,
                fontFamily: "pixelmplus12-regular, sans-serif",
                fontSize: 12,
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: CHART_BG,
                border: `1px solid ${CHART_GREEN}`,
                borderRadius: 0,
                color: CHART_GREEN,
                fontFamily: "pixelmplus12-regular, sans-serif",
              }}
              labelStyle={{ color: CHART_GREEN }}
              itemStyle={{ color: CHART_GREEN }}
            />
            <Legend
              align="right"
              wrapperStyle={{
                color: CHART_GREEN,
                fontFamily: "pixelmplus12-regular, sans-serif",
                fontSize: "0.75rem",
              }}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={CHART_GREEN}
              strokeWidth={2}
              name={seriesName}
              dot={{ fill: CHART_GREEN, stroke: CHART_BG, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: CHART_GREEN, stroke: CHART_BG, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default VisitsChart;
