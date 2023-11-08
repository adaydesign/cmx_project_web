import { BreadcrumbLink } from "@chakra-ui/react"
import { Link } from "@remix-run/react"
import { useProducts } from "~/api-hooks/useProducts"
import { Page, PageBody, PageHeader } from "~/components/common"
import { Dashboard } from "~/components/home"



export const loader = async () => {
  const data:any = await useProducts()
  const brands: string[] = []
  const categories: string[] = []
  let stock: number = 0

  data.map((d: any) => {
    //brand
    if (!brands.includes(d.brand)) {
      brands.push(d.brand)
    }
    // category
    if (!categories.includes(d.category)) {
      categories.push(d.category)
    }
    // stock
    stock += d.stock
  })

  const newRelease: any[] = data.filter((d:any)=>d.id<15)

  return { data, newRelease, stat: { brands, categories, stock } }
}

export default function Index() {
  return (
    <Page>
      <PageHeader title="Home" />
      <PageBody>
        <Dashboard />
      </PageBody>
    </Page>
  )
}
