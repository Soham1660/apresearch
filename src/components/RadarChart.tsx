import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface CaseFile {
  id: string;
  title: string;
  alignmentScore: {
    focus: number;
    methodology: number;
    analysis: number;
    conclusions: number;
    gaps: number;
  };
}

interface RadarChartProps {
  caseFiles: CaseFile[];
}

const RadarChart: React.FC<RadarChartProps> = ({ caseFiles }) => {
  // Calculate average scores across all cases
  const avgScores = caseFiles.reduce(
    (acc, caseFile) => {
      acc.focus += caseFile.alignmentScore.focus;
      acc.methodology += caseFile.alignmentScore.methodology;
      acc.analysis += caseFile.alignmentScore.analysis;
      acc.conclusions += caseFile.alignmentScore.conclusions;
      acc.gaps += caseFile.alignmentScore.gaps;
      return acc;
    },
    { focus: 0, methodology: 0, analysis: 0, conclusions: 0, gaps: 0 }
  );

  const numCases = caseFiles.length;
  Object.keys(avgScores).forEach(key => {
    avgScores[key as keyof typeof avgScores] /= numCases;
  });

  const data = {
    labels: ['Focus', 'Methodology', 'Analysis', 'Conclusions', 'Gap ID'],
    datasets: [
      {
        label: 'Average Alignment',
        data: [
          avgScores.focus,
          avgScores.methodology,
          avgScores.analysis,
          avgScores.conclusions,
          avgScores.gaps,
        ],
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(34, 197, 94, 1)',
        pointBorderColor: '#000',
        pointHoverBackgroundColor: '#000',
        pointHoverBorderColor: 'rgba(34, 197, 94, 1)',
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
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#22c55e',
        bodyColor: '#ffffff',
        borderColor: '#22c55e',
        borderWidth: 1,
      },
    },
    scales: {
      r: {
        angleLines: {
          color: 'rgba(34, 197, 94, 0.3)',
        },
        grid: {
          color: 'rgba(34, 197, 94, 0.3)',
        },
        pointLabels: {
          color: '#22c55e',
          font: {
            size: 12,
            family: 'monospace',
          },
        },
        ticks: {
          color: '#22c55e',
          backdropColor: 'transparent',
          font: {
            size: 10,
            family: 'monospace',
          },
        },
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <div className="h-64">
      <Radar data={data} options={options} />
    </div>
  );
};

export default RadarChart;