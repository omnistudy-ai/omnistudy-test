
import BookOpenIcon from '@heroicons/react/24/solid/BookOpenIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import { Avatar, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import Card from '../../../../web/components/UI/Card';
import './DashboardCards.css';

interface CourseCardProps {
  courseName: string;
  timeSpent: number;
  timeIncreased: boolean; // Added this prop
}

const CourseCard: React.FC<CourseCardProps> = ({ courseName, timeSpent, timeIncreased }) => {
  return (
    <div className='cards-container'>
      <Card className='dashboard-card'>
        <CardContent>
          <Stack
            alignItems="flex-start"
            direction="row"
            justifyContent="space-between"
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography
                color="text.secondary"
                variant="overline"
              >
                <div className="header-text-course">
                  Last Reviewed Course
                </div>
              </Typography>
              <Typography variant="h5">
                <div className='prop1'>
                  {courseName}
                </div>
              </Typography>
            </Stack>
            <Avatar 
              sx={{
                backgroundColor: 'red',
                height: 56,
                width: 56
              }}
            >
              <SvgIcon>
                <BookOpenIcon />
              </SvgIcon>
            </Avatar>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
};


export default CourseCard;
