import Layout from '../components/layout';
import Head from 'next/head';
import dotenv from 'dotenv';
import BoardItem from "../components/board-item";

export default function BoardView(pages) {
  console.log(pages);

  return (
    <Layout>    
      <Head>
          <title>Brunner Home</title>
          <meta name="description" content="서비스플랫폼"></meta>
          <meta rel="icon" href="brunnerLogo.png"></meta>
          <link></link>
      </Head>   
      <section className="text-gray-600 body-font min-h-[calc(100vh-_18rem)]">
        <div className="flex 
                    flex-col 
                    items-left 
                    justify-center 
                    min-h-[calc(100vh-_15rem)] 
                    px-5 mb-10">
            <h1 className="text-2xl ml-10 mb-10">
              게시글 : <span className="pl-2 text-blue-500">{pages.results.length}</span>
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-6 py-5 mx-5 gap-20'>
              {pages.results.map(aPage=>(
                <BoardItem data={aPage} key={aPage.id}></BoardItem> 
              ))}
            </div>
        </div>
      </section>
    </Layout>
  )
}

// If you export a function called getStaticProps (Static Site Generation) from a page, 
// Next.js will pre-render this page at build time using the props returned by getStaticProps.

export async function getStaticProps() { 
  dotenv.config();

  const options = {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NOTION_DATABASE_TOKEN}`
    },
    body: JSON.stringify({
      sorts: [
        {
          "property" : "게시일",
          "direction":"descending"
        }
      ],
      page_size:100})
  };

  console.log(`https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`);
  console.log(options);
  
  const res = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`, options);
  
  const jRes = await res.json();
  const results = jRes.results;

  return {
    props: {results}, // will be passed to the page component as props
  }
}
