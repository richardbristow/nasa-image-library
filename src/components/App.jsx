import React, { useState } from 'react';
import styled from 'styled-components/macro';

import useFetch from '../hooks/useFetch';
import Header from './header/Header';
import Gallery from './gallery/Gallery';
import Loading from './shared/Loading';
import Error from './shared/Error';
import Modal from './modal/Modal';
import ModalContent from './modal/ModalContent';

const StyledApp = styled.div`
  width: 100%;
  min-width: 200px;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
  background: ${({ theme }) => theme.ghostWhite};
  height: 100vh;
  ${({ clickedModalMetadata }) => clickedModalMetadata && 'overflow: hidden;'}
`;

const App = () => {
  const [clickedModalMetadata, setClickedModalMetadata] = useState(null);
  const [{ fetchedData, isLoading, isError }, doFetch] = useFetch(
    'https://images-api.nasa.gov/search?q=iss&media_type=image',
    {
      collection: { items: [] },
    },
  );

  const { collection: data } = fetchedData;

  return (
    <StyledApp clickedModalMetadata={clickedModalMetadata}>
      <Header doFetch={doFetch} />
      {isError && <Error />}
      {isLoading ? (
        <Loading />
      ) : (
        <Gallery
          setClickedModalMetadata={setClickedModalMetadata}
          data={data}
          doFetch={doFetch}
        />
      )}
      {clickedModalMetadata && (
        <Modal setClickedModalMetadata={setClickedModalMetadata}>
          <ModalContent clickedModalMetadata={clickedModalMetadata} />
        </Modal>
      )}
    </StyledApp>
  );
};

export default App;
