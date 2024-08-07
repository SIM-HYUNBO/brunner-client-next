`use strict`

import Layout from '../../components/layout'
import Head from 'next/head'
import BodySection from '../../components/bodySection'

import ContactContent from './content/contactContent'

export default function Contact() {
  return (
    <Layout>
      <Head>
        <title>Breakfast, Lunch and Dinner - Brunner</title>
        <meta name="description" content="Breakfast, Lunch and Dinner"></meta>
        <meta rel="icon" href="/brunnerLogo.png"></meta>
        <link></link>
      </Head>
      <BodySection>
        <div className="container mx-auto flex px-5 md:flex-row flex-col items-center">
          <ContactContent></ContactContent>
        </div>
      </BodySection>
    </Layout>
  );
}