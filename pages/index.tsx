import React, { KeyboardEvent } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Datum, Listing } from '../types/listings';
import ReactLoading from 'react-loading';


//function to call the outdoorsy listing api
// accepts searchTerm, pageSize, pageOffset
async function getListings<Listing>(
  filter: RequestInfo, pageSize: RequestInfo, offset: RequestInfo
): Promise<Listing> {
  let url = `https://search.outdoorsy.com/rentals?filter[keywords]=${filter}&page[limit]=${pageSize}&page[offset]=${offset}`;
  const response = await fetch(url);
  const body = await response.json();
  return body;
}

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = React.useState(''); //state to capture the search term
  const [pageSize, setPageSize] = React.useState(10);   // page size of the listings, default 10
  const [listings, setListings] = React.useState<Listing>(); // list of listings retrived from the database
  const [loading, setLoading] = React.useState(false); // loading state for fetching the application
  const [currentPage, setCurrentPage] = React.useState(1); //current page of the listing
  const [nextPageAvailable, setNextPageAvailable] = React.useState(true);  //boolean if there are more pages to be fetched

  //function to fetch listing based on the searchterm
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


  //filter the image out of the listings.included array  based on the listing id
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

  //search function triggered when the person hits enter
  function search(e: KeyboardEvent<HTMLInputElement>) {
    setCurrentPage(1);
    setNextPageAvailable(true);
    if (e.code == 'Enter') {
      getData(searchTerm);
    }

  }

  //function to load the next page
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
        <h3 className={styles.maintitle}>Outdoorsy</h3>
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
          !loading && listings && listings.data.length > 0 && nextPageAvailable ?
            <button onClick={nextPage} className={styles.nextbutton} disabled={loading}>Next Page</button>
            : ''
        }
      </main>
    </div>
  )
}

export default Home
