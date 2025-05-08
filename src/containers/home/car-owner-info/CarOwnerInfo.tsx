import Header from '@/components/header/Header';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';

const CarOwnerInfo = () => {
  return (
    <Stack gap={3} alignItems="center">
      <Header text="مشخصات مالک خودرو" />
      <Stack alignItems="flex-start" sx={{ width: 1, px: 2.5 }}>
        <Typography sx={{ fontSize: 16, fontWeight: 500, mb: 0.75 }}>
          لطفا اطلاعات شخصی مالک خودرو را وارد کنید:
        </Typography>
        <TextField
          placeholder="کد ملی"
          fullWidth
          sx={{ mb: 0.25 }}
          helperText="کد ملی وارد شده معتبر نیست."
          error={true}
        />
        <TextField placeholder="شماره تلفن همراه" fullWidth sx={{ mb: 3.5 }} />
        <Stack gap={0.75} sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: 16, fontWeight: 500 }}>آدرس جهت درج روی بیمه نامه</Typography>
          <Typography sx={{ fontSize: 14 }}>
            لطفا آدرسی را که می خواهید روی بیمه نامه درج شود، وارد کنید.
          </Typography>
          <Button fullWidth size="large" sx={{ backgroundColor: '#FFC453', color: 'black' }}>
            انتخاب از آدرس های من
          </Button>
        </Stack>
        <Button
          color="secondary"
          variant="contained"
          type="submit"
          size="large"
          sx={{ alignSelf: 'flex-end' }}
          disabled
        >
          تایید و ادامه
        </Button>
      </Stack>
    </Stack>
  );
};
export default CarOwnerInfo;
