import SportsIcon from '@mui/icons-material/Sports';
import { Box, Typography, TypographyProps } from '@mui/material';

interface BrandTextProps extends TypographyProps {
  withIcon?: boolean;
  iconSize?: string;
}

export const BrandText = ({
  withIcon,
  iconSize = '2.75rem',
  ...props
}: BrandTextProps) => {
  return (
    <Typography
      {...props}
      sx={{
        ...(props.sx && props.sx),
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.25rem',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {withIcon && <SportsIcon sx={{ fontSize: iconSize, mr: '0.25rem' }} />}
        ODDLY
      </Box>
    </Typography>
  );
};
