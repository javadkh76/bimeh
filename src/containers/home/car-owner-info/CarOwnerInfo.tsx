'use client';
import Header from '@/components/header/Header';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Address } from '@/types/address';
import LoadingButton from '@/components/loading-button/LoadingButton';
import { useSubmitOrder } from '@/query/api/modules/order';
import { useRouter } from 'next/navigation';
import { useFormStore } from '@/store/useFormStore';
import AddressSection from '@/containers/home/car-owner-info/address-section/AddressSection';

export type RequestFormSchema = {
  nationalId: string;
  phoneNumber: string;
  addressId: string;
};
const CarOwnerInfo = () => {
  const router = useRouter();
  const { setFormData, formData } = useFormStore();
  const [checkedAddress, setCheckedAddress] = useState<Address | null>(formData.address);

  const methods = useForm<RequestFormSchema>({ mode: 'onSubmit', defaultValues: formData });
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    trigger,
    formState: { isValid, errors },
  } = methods;

  const { mutate, isPending: submitIsPending } = useSubmitOrder({
    mutation: {
      onSuccess(data) {
        if (data) {
          setFormData({ ...getValues(), address: checkedAddress });
          router.replace('/receipt');
        }
      },
      onError: async data => {
        if ('errors' in data) {
          alert(data.errors);
          if (typeof data.errors === 'object' && data.errors && 'price' in data.errors) {
          }
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

  return (
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
          isLoading={submitIsPending}
        >
          تایید و ادامه
        </LoadingButton>
      </Stack>
    </Stack>
  );
};
export default CarOwnerInfo;
