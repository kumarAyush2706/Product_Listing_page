// Loader.jsx
import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

const skeletonData = Array.from({ length: 3 });

const Loader = () => {
  return (
    <Grid container wrap="nowrap" sx={{ overflowX: 'auto', py: 2 }}>
      {skeletonData.map((_, index) => (
        <Box key={index} sx={{ width: 310, marginRight: 2 }}>
          <Skeleton variant="rectangular" width={310} height={158} />
          <Box sx={{ pt: 1 }}>
            <Skeleton width="80%" />
            <Skeleton width="60%" />
          </Box>
        </Box>
      ))}
    </Grid>
  );
};

export default Loader;

