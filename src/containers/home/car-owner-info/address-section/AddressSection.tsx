import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@/components/modal/Modal';
import Stack from '@mui/material/Stack';
import AddressItem from '@/containers/home/car-owner-info/address-section/AddressItem';
import { useAddressesList } from '@/query/api/modules/address';
import { useEffect, useState } from 'react';
import { Address } from '@/types/address';

type AddressSectionProps = {
  onChange?: (value: Address) => void;
  error?: boolean;
  value?: Address | null;
};
const AddressSection = ({ onChange, error, value }: AddressSectionProps) => {
  const [checkedAddress, setCheckedAddress] = useState<Address | null>(null);

  const [open, setOpen] = useState(false);

  const { data: addresses, isPending } = useAddressesList();

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
    <Stack gap={1} sx={{ width: 1, mb: 3 }}>
      <Typography sx={{ fontSize: 16, fontWeight: 500 }}>آدرس جهت درج روی بیمه نامه</Typography>

      {!value ? (
        <>
          <Typography color={error ? 'error' : 'primary'} sx={{ fontSize: 14 }}>
            لطفا آدرسی را که می خواهید روی بیمه نامه درج شود، وارد کنید.
          </Typography>
          <Button
            fullWidth
            size="large"
            sx={{ backgroundColor: '#FFC453', color: 'black' }}
            onClick={() => {
              window.history.pushState({ modal: true }, '');
              setOpen(true);
            }}
          >
            انتخاب از آدرس های من
          </Button>
        </>
      ) : (
        <Typography color="textSecondary" sx={{ fontSize: 12 }}>
          {value?.details}
        </Typography>
      )}
      <Modal
        open={open}
        onClose={() => {
          window.history.back();
          setOpen(false);
        }}
        title="انتخاب آدرس"
        actionBox={
          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{ py: 1.5 }}
            disabled={!checkedAddress}
            onClick={() => {
              if (checkedAddress) {
                onChange?.(checkedAddress);
                setOpen(false);
              }
            }}
          >
            انتخاب
          </Button>
        }
      >
        <Stack gap={2}>
          {isPending && 'در حال بارگذاری...'}
          {addresses?.map(address => (
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
  );
};
export default AddressSection;
