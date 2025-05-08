import Container from '@mui/material/Container';
import CarInfo from './car-info/CarInfo';
import CarOwnerInfo from './car-owner-info/CarOwnerInfo';

const Home = () => {
  return (
    <Container disableGutters>
      <CarInfo />
      <CarOwnerInfo />
    </Container>
  );
};
export default Home;
