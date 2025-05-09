'use client';
import Header from '@/components/header/Header';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';
import Modal from '@/components/modal/Modal';
import { useState } from 'react';
import AddressItem from '@/containers/home/car-owner-info/AddressItem';
import { Address } from '@/types/address';
import LoadingButton from '@/components/loading-button/LoadingButton';

const CarOwnerInfo = () => {
  const [open, setOpen] = useState(false);
  const [checkedAddress, setCheckedAddress] = useState<Address | null>(null);

  const addresses = [
    {
      id: '1',
      name: 'آدرس شماره ۱',
      details: 'فارس، شیراز، خیابان جمهوری، بالاتراز فلان، پلاک 6، واحد 234',
    },
    {
      id: '2',
      name: 'آدرس شماره ۲',
      details: 'فارس، شیراز، خیابان جمهوری، بالاتراز فلان، پلاک 6، واحد 234',
    },
  ];
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
        <Stack gap={1} sx={{ width: 1, mb: 3 }}>
          <Typography sx={{ fontSize: 16, fontWeight: 500 }}>آدرس جهت درج روی بیمه نامه</Typography>
          <Typography sx={{ fontSize: 14 }}>
            لطفا آدرسی را که می خواهید روی بیمه نامه درج شود، وارد کنید.
          </Typography>
          <Button
            fullWidth
            size="large"
            sx={{ backgroundColor: '#FFC453', color: 'black' }}
            onClick={() => {
              setOpen(true);
            }}
          >
            انتخاب از آدرس های من
          </Button>
          <Modal
            open={open}
            onClose={() => {
              setOpen(false);
            }}
            title="انتخاب آدرس"
            actionBox={
              <Button variant="contained" fullWidth size="large" sx={{ py: 1.5 }}>
                انتخاب
              </Button>
            }
          >
            <Stack gap={2}>
              {addresses.map(address => (
                <AddressItem
                  key={address.id}
                  {...address}
                  checked={checkedAddress?.id === address.id}
                  onClick={value => setCheckedAddress(value)}
                />
              ))}
            </Stack>
          </Modal>
        </Stack>
        <LoadingButton
          color="primary"
          variant="contained"
          type="submit"
          size="large"
          sx={{ alignSelf: 'flex-end' }}
        >
          تایید و ادامه
        </LoadingButton>
      </Stack>
    </Stack>
  );
};
export default CarOwnerInfo;
