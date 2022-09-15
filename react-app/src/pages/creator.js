import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import * as sections from "../components/sections"
import Fallback from "../components/fallback"
import FileUploader from "../components/nft-storage"
import { Container, Box, Section, Kicker, Heading, Icon, Subhead, Text, LinkList } from "../components/ui"
import GetPicture from "../components/generator"

export default function About(props) {
  const { aboutPage } = props.data

  return (
    <Layout {...aboutPage}>
      {aboutPage.blocks.map((block) => {
        if (block) {
          const { id, blocktype, ...componentProps } = block
          const Component = sections[blocktype] || Fallback
          return <Component key={id} {...componentProps} />
        }
      })}

    <Container width="fullbleed">
      <Section padding={5} radius="large" background="muted">
        <Box center>          
          <Kicker>(There is a chance of failure due to disease and limits of released traits)</Kicker>
          <Heading>Create hybrid</Heading>
            <GetPicture></GetPicture>
      </Box>
      </Section>
    </Container>

    <Container width="fullbleed">
      <Section padding={5} radius="large" background="muted">
        <Box center>
          <Kicker>THE FUTURE OF NFT IS YOURS</Kicker>
          <Heading>Upload your own NFT to IPFS</Heading>
            <FileUploader></FileUploader>
          </Box>
      </Section>
    </Container>
    </Layout>
  )
}

export const query = graphql`
  {
    aboutPage {
      id
      title
      description
      image {
        id
        url
      }
      blocks: content {
        id
        blocktype
        ...AboutHeroContent
        ...AboutStatListContent
        ...HomepageProductListContent
        ...AboutLeadershipContent
        ...HomepageBenefitListContent
        ...AboutLogoListContent
        ...HomepageCtaContent
      }
    }
  }
`
