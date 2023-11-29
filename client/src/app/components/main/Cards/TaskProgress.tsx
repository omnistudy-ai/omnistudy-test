import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon';
import './DashboardCards.css'

import {
  Avatar,
  Box,

  CardContent,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material';
import Card from '../../../../web/components/UI/Card';


interface ITaskProgress {
    progressBar: number;
}



const TaskProgress: React.FC<ITaskProgress> = ({ progressBar }) => {

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
              gutterBottom
              variant="overline"
            ><div className="header-text">
              Task Progress
              </div>
            </Typography>
            <Typography variant="h4">
            <div className='prop1'>
              {progressBar}%
              </div>
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <ListBulletIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        <Box sx={{ mt: 3 }}>
          <LinearProgress
            value={progressBar}
            variant="determinate"
          />
        </Box>
      </CardContent>
    </Card>
    </div>
  );
};


export default  TaskProgress