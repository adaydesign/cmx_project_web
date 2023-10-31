import {
  BreadcrumbLink,
  Flex,
} from "@chakra-ui/react"
import { Link } from "@remix-run/react"
import { Page, PageBody, PageHeader } from "~/components/common"

export const handle = {
  breadcrumb: () => (
    <BreadcrumbLink as={Link} to="/">
      หน้าหลัก
    </BreadcrumbLink>
  ),
}

export default function Index() {

  return (
    <Page>
      <PageHeader title="Home" />
      <PageBody>

      </PageBody>
    </Page>
  )
}
