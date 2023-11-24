import { Card, CardContent, Typography, useTheme } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';
import './DashboardCards.css';
import { userGrades } from './GradesData';

interface CourseGrade {
  courseName: string;
  grade: number;
}

interface GradesBarProps {
  grades: CourseGrade[];
}

export const GradesBar: React.FC<GradesBarProps> = ({ grades }) => {
  const theme = useTheme();
  


  return (
    <div className='GradesBar'>
      <Card className='grades-container'>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Grade Distribution
          </Typography>
          <div style={{ height: '400px' }}>
            <ResponsiveBar
              data={userGrades}

              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.3}
              valueScale={{ type: 'linear' }}
              indexScale={{ type: 'band', round: true }}
              colors={theme.palette.primary.main}
              borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'course',
                legendPosition: 'middle',
                legendOffset: 32
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'grade',
                legendPosition: 'middle',
                legendOffset: -40
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              legends={[
                {
                  dataFrom: 'keys',
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemTextColor: '#999',
                  symbolSize: 20,
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemTextColor: '#000'
                      }
                    }
                  ]
                }
              ]}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GradesBar;

