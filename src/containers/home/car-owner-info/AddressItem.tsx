import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import RadioBtnChecked from '@/components/svg-icons/RadioBtnChecked';
import RadioBtn from '@/components/svg-icons/RadioBtn';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { Address } from '@/types/address';

type AddressItemProps = Address & {
  checked?: boolean;
  onClick?: (address: Address) => void;
  onRemove?: (address: Address) => void;
};
const AddressItem = ({ id, name, details, checked, onClick, onRemove }: AddressItemProps) => {
  return (
    <Stack
      gap={1}
      sx={{ cursor: 'pointer' }}
      onClick={() => {
        onClick?.({ id, name, details });
      }}
    >
      <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center' }}>
        {checked ? (
          <RadioBtnChecked style={{ fontSize: 16 }} />
        ) : (
          <RadioBtn style={{ fontSize: 16 }} fill="white" />
        )}
        <Typography sx={{ flex: 1 }}>{name}</Typography>
        <CloseIcon
          sx={{ fontSize: 20, color: '#FFA5A5', mr: '-2px' }}
          onClick={e => {
            e.stopPropagation();
            onRemove?.({ id, name, details });
          }}
        />
      </Box>
      <Typography sx={{ textAlign: 'center', color: '#757575' }}>{details}</Typography>
    </Stack>
  );
};
export default AddressItem;
