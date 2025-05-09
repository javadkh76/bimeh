import Container from '@mui/material/Container';
import CarInfoSection from '@/containers/home/car-info-section/CarInfoSection';
import CarOwnerInfo from './car-owner-info/CarOwnerInfo';

const Home = () => {
  return (
    <Container disableGutters>
      <CarInfoSection />
      <CarOwnerInfo />
    </Container>
  );
};
export default Home;
