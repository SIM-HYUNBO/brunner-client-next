`use strict`

import Layout from '../../components/layout'
import Head from 'next/head'
import BodySection from '../../components/body-section'

import BrunnerBotContent from './content/brunner-bot-content'

export default function Services() {
  return (
    <Layout>
      <Head>
        <title>IT 기술 연구소 - Brunner</title>
        <meta name="description" content="IT 기술 연구소"></meta>
        <meta rel="icon" href="brunnerLogo.png"></meta>
        <link></link>
      </Head>
      <BodySection>
        <div className="container mx-auto flex px-5 md:flex-row flex-col items-center">
          <BrunnerBotContent></BrunnerBotContent>
        </div>
      </BodySection>
    </Layout>
  );
}