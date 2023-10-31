import { BreadcrumbLink, Flex } from "@chakra-ui/react"
import { Link } from "@remix-run/react"
import { Page, PageHeader, PageBody } from "~/components/common"

export const handle = {
  breadcrumb: () => (
    <BreadcrumbLink as={Link} to="/">
      page 1
    </BreadcrumbLink>
  ),
}

export default function Page1() {
  return (
    <Page>
      <PageHeader title="Page 1" />
      <PageBody>
        
      </PageBody>
    </Page>
  )
}
