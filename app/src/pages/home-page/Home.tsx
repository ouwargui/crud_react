import React, {useEffect, useState} from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import {
  Container,
  Content,
  MainContainer,
  CardWrapper,
  LoaderContainer,
} from './styles';

import Header from '../../components/header/Header';
import ItemCard from '../../components/item-card/ItemCard';
import {getSneakers} from '../../services/sneakers';
import SneakerModel from '../../models/sneaker';

const Home: React.FC = () => {
  const [sneakers, setSneakers] = useState<SneakerModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSneakers().then((res: any) => {
      const filteredSneakers: SneakerModel[] = res.data.sneaker_list.filter(
        (sneaker: SneakerModel) =>
          sneaker.brand &&
          sneaker.image &&
          sneaker.name &&
          sneaker.releaseDate &&
          sneaker.retailPrice,
      );
      setSneakers(filteredSneakers);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <>
        <Header page="home" />
        <LoaderContainer>
          <Loader
            type="TailSpin"
            color="#ff7a91"
            height={100}
            width={100}
            timeout={undefined}
          />
        </LoaderContainer>
      </>
    );
  }

  return (
    <Container>
      <Header page="home" />
      <Content>
        <MainContainer>
          {sneakers.map((sneaker) => (
            <CardWrapper key={sneaker.id}>
              <ItemCard
                id={sneaker.id}
                headerTitle={sneaker.brand}
                headerSubtitle={sneaker.releaseDate}
                imageUrl={sneaker.image}
                mediaTitle={sneaker.name}
                contentDescription={sneaker.name}
                price={`R$ ${(sneaker.retailPrice * 5.17).toFixed(2)}`}
              />
            </CardWrapper>
          ))}
        </MainContainer>
      </Content>
    </Container>
  );
};

export default Home;
