import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@/components/modal/Modal';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
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
  const [addressToDelete, setAddressToDelete] = useState<Address | null>(null);

  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { data: addresses, isPending } = useAddressesList();

  const deletedAddresses =
    typeof window !== 'undefined'
      ? JSON.parse(
          sessionStorage.getItem('deletedAddresses')
            ? (sessionStorage.getItem('deletedAddresses') as string)
            : '[]'
        )
      : [];
  const handleClose = () => {
    window.history.back();
    setOpen(false);
  };
  const handleCloseConfirm = () => {
    window.history.back();
    setConfirmOpen(false);
    setOpen(true);
  };

  const handleDeleteAddress = () => {
    deletedAddresses.push(addressToDelete?.id);
    sessionStorage.setItem('deletedAddresses', JSON.stringify(deletedAddresses));
    setAddressToDelete(null);
    handleCloseConfirm();
  };

  useEffect(() => {
    const handlePopState = () => {
      if (window.history.state.modal) {
        setConfirmOpen(false);
        setOpen(true);
      } else {
        setOpen(false);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (confirmOpen) {
        window.history.back();
      }
      if (open) {
        window.history.back();
      }
    };
  }, []);
  return (
    <>
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
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
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
                handleClose();
              }
            }}
          >
            انتخاب
          </Button>
        }
      >
        <Stack gap={2}>
          {isPending && 'در حال بارگذاری...'}
          {addresses
            ?.filter(address => {
              if (!deletedAddresses.includes(address.id)) return address;
            })
            .map(address => (
              <AddressItem
                key={address.id}
                {...address}
                checked={checkedAddress?.id === address.id}
                onClick={value => setCheckedAddress(value)}
                onRemove={value => {
                  setAddressToDelete(value);
                  setOpen(false);
                  window.history.pushState({ confirm: true }, '');
                  setConfirmOpen(true);
                }}
              />
            ))}
        </Stack>
      </Modal>
      <Modal
        open={confirmOpen}
        onClose={handleCloseConfirm}
        title="حذف آدرس"
        actionBox={
          <Box sx={{ display: 'flex', width: 1 }} gap={1.25}>
            <Button variant="contained" size="large" sx={{ flex: 1 }} onClick={handleDeleteAddress}>
              تایید
            </Button>
            <Button variant="outlined" size="large" sx={{ flex: 1 }} onClick={handleCloseConfirm}>
              بازگشت
            </Button>
          </Box>
        }
      >
        <Stack gap={2}>
          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
            آیا از حذف آدرس خود، مطمئن هستید؟
          </Typography>
          <Stack gap={1} sx={{ bgcolor: '#F2F2F2', p: 1, mb: 0.25 }}>
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>{addressToDelete?.name}</Typography>
            <Typography sx={{ fontSize: 12 }} color="textSecondary">
              {addressToDelete?.details}
            </Typography>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};
export default AddressSection;
