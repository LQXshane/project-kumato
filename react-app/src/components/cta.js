import * as React from "react"
import { graphql } from "gatsby"
import {
  Box,
  Container,
  Section,
  Text,
  Subhead,
  Icon,
  LinkList,
} from "./ui"
import Voucher from "./create-voucher"

export default function HomepageCta(props) {
  return (
    <Container width="fullbleed">
      <Section padding={5} radius="large" background="muted">
        <Box center>
        {props.image && (
          <Icon
            alt={props.image.alt}
            image={props.image.gatsbyImageData}
            size="large"
          />
        )}
        <Subhead>{props.heading}</Subhead>
        <Text>{props.text}</Text>
        <LinkList links={props.links} />
        <Voucher></Voucher>
      </Box>
      </Section>
    </Container>
  )
}

export const query = graphql`
  fragment HomepageCtaContent on HomepageCta {
    id
    kicker
    heading
    text
    image {
      alt
      id
      gatsbyImageData
    }
    links {
      id
      href
      text
    }
  }
`
