import Header from '@/components/header/Header';
import Stack from '@mui/material/Stack';
import CarInfo from '@/components/car-info/CarInfo';

const CarInfoSection = () => {
  return (
    <Stack gap={3} alignItems="center" sx={{ mb: 4 }}>
      <Header text="مشخصات بیمه نامه" />
      <CarInfo />
    </Stack>
  );
};
export default CarInfoSection;
