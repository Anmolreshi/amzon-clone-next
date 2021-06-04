import Head from 'next/head';
import Banner from '../src/components/Banner';
import Header from '../src/components/Header';
import ProductFeed from '../src/components/ProductFeed';
// import styles from '../src/styles/Home.module.css'

export default function Home({products}) {
  return (
    <div className="bg-gray-100" >
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      {/* Header Component */}
      <Header/>

      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
          <Banner/>
        {/* Product Feed  */}
        <ProductFeed products={products}/> 
      </main>
    </div>
  )
};
export async function getServerSideProps(context){
  const products =await fetch("https://fakestoreapi.com/products").then(
    (res)=>res.json());
    return{props:{
      products,
    }}
}
