import React from 'react';
import {ClockIcon} from '@heroicons/react/24/solid';
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
interface StudyTimeTrackerProps {
  currentHours: number;
  goalHours: number;
  sx?: object; 
}

export const StudyTimeTracker: React.FC<StudyTimeTrackerProps> = ({ currentHours, goalHours, sx }) => {
  // Calculate progress as a percentage
  const progress = Math.min((currentHours / goalHours) * 100, 100);

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
              Study Time Tracker
              </div>
            </Typography>
            <Typography variant="h4">
              <div className='prop1'>
              {currentHours} / {goalHours} hrs
              </div>
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <ClockIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        <Box sx={{ mt: 3 }}>
          <LinearProgress
            value={progress}
            variant="determinate"
          />
        </Box>
        {/* Optional: Add a link or button here for detailed view or setting goals */}
      </CardContent>
    </Card>
    </div>
  );
};

export default StudyTimeTracker
