'use client';
import Container from '@mui/material/Container';
import Header from '@/components/header/Header';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import CarInfo from '@/components/car-info/CarInfo';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

const Receipt = () => {
  const router = useRouter();
  return (
    <Container sx={{ height: '100dvh', display: 'flex', flexDirection: 'column' }} disableGutters>
      <Header text="مشخصات بیمه نامه" sx={{ mb: 3 }} />
      <Stack sx={{ alignItems: 'center', mb: 4 }} gap={2}>
        <Image src="/images/validation_form.png" width={60} height={66} alt="validation form" />
        <Typography sx={{ fontSize: 16, fontWeight: 500 }}>
          ثبت اطلاعات شما، با <span style={{ color: '#34A862' }}>موفقیت</span> انجام شد.
        </Typography>
      </Stack>
      <CarInfo sx={{ flex: 1 }} />
      <Button
        variant="contained"
        sx={{ maxWidth: 140, mb: 1.5, mr: 1.5, ml: 'auto' }}
        onClick={() => router.replace('/')}
      >
        بازگشت
      </Button>
    </Container>
  );
};
export default Receipt;
