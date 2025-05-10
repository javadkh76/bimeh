'use client';
import Header from '@/components/header/Header';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Address } from '@/types/address';
import LoadingButton from '@/components/loading-button/LoadingButton';
import { useSubmitOrder } from '@/query/api/modules/order';
import { useRouter } from 'next/navigation';
import { useFormStore } from '@/store/useFormStore';
import AddressSection from '@/containers/home/car-owner-info/address-section/AddressSection';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@/components/modal/Modal';
import { AxiosError } from 'axios';
import { SubmitOrder400 } from '@/query/api/types/submitOrder400';

export type RequestFormSchema = {
  nationalId: string;
  phoneNumber: string;
  addressId: string;
};
const CarOwnerInfo = () => {
  const router = useRouter();
  const { setFormData, formData } = useFormStore();
  const [checkedAddress, setCheckedAddress] = useState<Address | null>(formData.address);
  const [open, setOpen] = useState(false);

  const methods = useForm<RequestFormSchema>({ mode: 'onSubmit', defaultValues: formData });
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    trigger,
    formState: { isValid, errors },
  } = methods;

  const { mutate, isPending } = useSubmitOrder({
    mutation: {
      onSuccess(data) {
        if (data) {
          setFormData({ ...getValues(), address: checkedAddress });
          router.replace('/receipt');
        }
      },
      onError: async (data: AxiosError<SubmitOrder400>) => {
        const error = data.response?.data;
        if (error && 'errors' in error && Array.isArray(error.errors)) {
          alert(error.errors[0]);
        } else {
          window.history.pushState({ errorModal: true }, '');
          setOpen(true);
        }
      },
    },
  });

  const onSubmit: SubmitHandler<RequestFormSchema> = data =>
    !isValid
      ? trigger().then(value => {
          if (value) {
            mutate({ data: getValues() });
          }
        })
      : mutate({
          data,
        });

  useEffect(() => {
    const handlePopState = () => {
      setOpen(false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (open) {
        window.history.back();
      }
    };
  }, []);
  return (
    <>
      <Stack gap={3} sx={{ alignItems: 'center', mb: 3.5 }}>
        <Header text="مشخصات مالک خودرو" />
        <Stack
          alignItems="flex-start"
          sx={{ width: 1, px: 2.5 }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography sx={{ fontSize: 16, fontWeight: 500, mb: 0.75 }}>
            لطفا اطلاعات شخصی مالک خودرو را وارد کنید:
          </Typography>
          <TextField
            placeholder="کد ملی"
            fullWidth
            sx={{ mb: !!errors['nationalId'] ? 0.25 : 3.5 }}
            slotProps={{ htmlInput: { inputMode: 'numeric', maxLength: 10 } }}
            {...register('nationalId', {
              required: true,
              pattern: /^[0-9]{10}$/i,
            })}
            error={!!errors['nationalId']}
            helperText={errors['nationalId'] ? 'کد ملی وارد شده معتبر نیست.' : ''}
          />
          <TextField
            placeholder="شماره تلفن همراه"
            fullWidth
            sx={{ mb: !!errors['phoneNumber'] ? 0.25 : 3.5 }}
            slotProps={{ htmlInput: { inputMode: 'numeric', maxLength: 11 } }}
            {...register('phoneNumber', {
              required: true,
              pattern: /^09\d{9}$/i,
            })}
            error={!!errors['phoneNumber']}
            helperText={errors['phoneNumber'] ? 'شماره تلفن همراه معتبر نیست.' : ''}
          />
          <input
            type="hidden"
            {...register('addressId', {
              required: true,
            })}
          />

          <AddressSection
            onChange={value => {
              setValue('addressId', value.id);
              setCheckedAddress(value);
            }}
            error={!!errors['addressId']}
            value={checkedAddress}
          />
          <LoadingButton
            color="primary"
            variant="contained"
            type="submit"
            size="large"
            sx={{ alignSelf: 'flex-end' }}
            isLoading={isPending && !open}
          >
            تایید و ادامه
          </LoadingButton>
        </Stack>
      </Stack>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        title="حذف آدرس"
        actionBox={
          <Box sx={{ display: 'flex', width: 1 }} gap={1.25}>
            <LoadingButton
              color="primary"
              variant="contained"
              type="submit"
              size="large"
              sx={{ flex: 1, alignSelf: 'flex-end' }}
              isLoading={isPending}
              onClick={() => {
                mutate({
                  data: getValues(),
                });
              }}
              disabled={true}
            >
              تایید و ادامه
            </LoadingButton>
            <Button
              variant="outlined"
              size="large"
              sx={{ flex: 1 }}
              onClick={() => {
                window.history.back();
                setOpen(false);
              }}
              disabled={isPending}
            >
              بازگشت
            </Button>
          </Box>
        }
      >
        <Typography>متاسفانه در ثبت اطلاعات شما، خطایی رخ داده است.</Typography>
        <Typography>مجددا تلاش کنید.</Typography>
      </Modal>
    </>
  );
};
export default CarOwnerInfo;
