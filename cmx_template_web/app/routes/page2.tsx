import { BreadcrumbLink, Flex } from "@chakra-ui/react"
import { Link } from "@remix-run/react"
import { Page, PageHeader, PageBody } from "~/components/common"

export const handle = {
  breadcrumb: () => (
    <BreadcrumbLink as={Link} to="/">
      page 2
    </BreadcrumbLink>
  ),
}

export default function Page2() {
  return (
    <Page>
      <PageHeader title="Page 2" />
      <PageBody>
        
      </PageBody>
    </Page>
  )
}
