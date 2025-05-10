import { Button, ButtonProps } from '@mui/material';
import { Loading } from '@/components/svg-icons';
import { keyframes } from '@emotion/react';
import SvgIcon from '@mui/material/SvgIcon';

const circular = keyframes`
  to{transform: rotate(1turn)
`;

type LoadingButtonProps = ButtonProps & {
  isLoading?: boolean;
};

const LoadingButton = (props: LoadingButtonProps) => {
  const { color, size, variant, type, sx, onClick } = props;
  const isLoading = props.isLoading || false;
  return (
    <Button
      onClick={onClick}
      size={size}
      variant={variant}
      type={type}
      sx={{ ...sx, ...(isLoading ? { color: '#525252' } : {}) }}
      color={isLoading ? 'secondary' : color}
    >
      {isLoading && (
        <SvgIcon sx={{ mr: 1.25, animation: `${circular} 1s infinite linear` }}>
          <Loading />
        </SvgIcon>
      )}
      {props.children}
    </Button>
  );
};
export default LoadingButton;
