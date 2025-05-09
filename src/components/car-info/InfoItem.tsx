import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type InfoItemProps = {
  title: string;
  description: string;
};
const InfoItem = ({ title, description }: InfoItemProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {title}
      <Typography
        sx={{
          color: '#000',
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          '&:before': {
            content: "''",
            borderBottom: '1px dashed #E0E0E0',
            flex: 1,
            m: 0.75,
          },
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};
export default InfoItem;
