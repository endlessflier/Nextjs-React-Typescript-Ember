import React, { KeyboardEvent } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Datum, Listing } from '../types/listings';
import ReactLoading from 'react-loading';

async function getListings<Listing>(
  filter: RequestInfo, pageSize: RequestInfo, pageLimit: RequestInfo
): Promise<Listing> {
  let url = `https://search.outdoorsy.com/rentals?filter[keywords]=${filter}&page[limit]=${pageSize}&page[offset]=${pageLimit}`;
  const response = await fetch(url);
  const body = await response.json();
  return body;
}

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [pageSize, setPageSize] = React.useState(10);
  const [listings, setListings] = React.useState<Listing>();
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [nextPageAvailable, setNextPageAvailable] = React.useState(true);

  async function getData(filter: string) {
    setLoading(true);
    const s: Listing = await getListings(filter, pageSize.toString(), (pageSize * currentPage).toString());
    setListings(s);
    setLoading(false);
    if (s.data.length > 0) {
      setNextPageAvailable(true);
      setCurrentPage(currentPage + 1);
    }
    else {
      setNextPageAvailable(false);
      setCurrentPage(1);
    }
    return s;
  }


  function getImage(s: Datum) {
    try {
      var imId = s.relationships.primary_image.data.id;
      var im = listings?.included.filter((i) => i.id == imId && i.type == 'images');
      if (im && im?.length > 0)
        return im[0].attributes.url
      return '';  
    } catch (error) {
      return '';
    }

  }

  function search(e: KeyboardEvent<HTMLInputElement>) {
    setCurrentPage(1);
    setNextPageAvailable(true);
    if (e.code == 'Enter') {
      getData(searchTerm);
    }

  }

  function nextPage() {
    getData(searchTerm);
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Outdoorsy</title>
        <meta name="Outdpprsu" content="Outdoorsy listings" />
        <link rel="icon" href="/OIP.ico" />
      </Head>

      <main className={styles.main}>
        <input type="text" value={searchTerm} placeholder="Enter search term"
          onChange={(e) => { setSearchTerm(e.target.value) }} className={styles.inputSearchTerm} onKeyDown={search} />
        {currentPage != 1 && !loading && listings && listings.data && <p>Page {currentPage - 1}</p>}

        {loading ?
          <ReactLoading type='spin' color='blue' height={50} width={50} className={styles.spinner} /> :

          listings && listings.data.length == 0 ?

            <p>No Result Found</p>
            : listings && listings.data.map((i) => (<>
              <div className={styles.listing}>
                <img src={getImage(i)} className={styles.listingImage} />
                <p className={styles.listingName}>{i.attributes.name}</p>
              </div>
            </>
            ))
        }
        {
          !loading && listings && listings.data && nextPageAvailable ?
            <button onClick={nextPage} className={styles.nextbutton} disabled={loading}>Next Page</button>
            : ''
        }
      </main>
    </div>
  )
}

export default Home
