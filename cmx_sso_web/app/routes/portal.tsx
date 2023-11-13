import { BreadcrumbLink } from "@chakra-ui/react"
import { Link, useLoaderData } from "@remix-run/react"
import { Page, PageBody } from "~/components/common"
import { PortalPanel } from "~/components/portal"

export const handle = {
  breadcrumb: () => (
    <BreadcrumbLink as={Link} to="/">
      รวมโปรแกรม
    </BreadcrumbLink>
  ),
}

export const loader = async () => {
    console.log("portal")
    
    
    return {  }
  }

const PortalPage = () => {
  return (
    <Page>
      <PageBody>
        <PortalPanel />
      </PageBody>
    </Page>
  )
}

export default PortalPage
