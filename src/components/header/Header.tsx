import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SvgIcon from '@mui/material/SvgIcon';
import CarIcon from '@/components/svg-icons/Car';
interface IHeaderProps {
  text: string;
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
export default function Header({ text, component = 'h2' }: IHeaderProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={0.75}
      sx={{ px: 1, py: 1.5, boxShadow: '0px 3px 7px -1px rgba(34, 34, 34, 0.1)' }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ width: 32, height: 32, bgcolor: '#FFC453', borderRadius: '5px' }}
      >
        <SvgIcon>
          <CarIcon />
        </SvgIcon>
      </Stack>
      <Typography sx={{ fontSize: 18, fontWeight: 500 }} component={component}>
        {text}
      </Typography>
    </Stack>
  );
}
