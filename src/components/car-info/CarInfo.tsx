import Stack from '@mui/material/Stack';
import Image from 'next/image';
import carPlate from './assets/car_plate.png';
import InfoItem from '@/components/car-info/InfoItem';
import { SxProps } from '@mui/system';

type CarInfoProps = {
  sx?: SxProps;
};
const CarInfo = ({ sx }: CarInfoProps) => {
  return (
    <Stack gap={3} alignItems="center" sx={sx}>
      <Image src={carPlate} width={280} height={50} alt="car plate" />
      <Stack width={1} gap={1} sx={{ px: '40px', fontSize: 14, color: '#808080' }}>
        <InfoItem title="شرکت بیمه گر" description="پارسیان" />
        <InfoItem title="برند خودرو" description="پژو" />
        <InfoItem title="مدل خودرو" description="206 تیپ 6" />
      </Stack>
    </Stack>
  );
};
export default CarInfo;
