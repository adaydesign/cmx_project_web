import { BreadcrumbLink, Flex } from "@chakra-ui/react"
import { Link, useLoaderData } from "@remix-run/react"
import { useProducts } from "~/api-hooks/useProducts"
import { Page, PageHeader, PageBody } from "~/components/common"
import { ExamplePage1Table } from "~/components/page1"

export const handle = {
  breadcrumb: () => (
    <BreadcrumbLink as={Link} to="/">
      page 1
    </BreadcrumbLink>
  ),
}

export const loader = async () =>{
  const data = await useProducts()
  return data
}

export default function Page1() {
  const data:any = useLoaderData()
 
  return (
    <Page>
      <PageHeader title="Page 1" />
      <PageBody>
        <ExamplePage1Table data={data}/>
      </PageBody>
    </Page>
  )
}
