import {
  BreadcrumbLink,
} from "@chakra-ui/react"
import { LoaderFunctionArgs } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { useProducts } from "~/api-hooks/useProducts"
import { ItemDetail } from "~/components/items"

export const handle = {
  breadcrumb: ({data:{item}}:any) => {
    //console.log(item)
    return (
    <BreadcrumbLink as={Link} to="/">
      {item?.title}
    </BreadcrumbLink>
  )
},
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const data = await useProducts()
  const item = data.filter((i: any) => i.id == params.id)
  
  return {item: item[0]}
}

const ItemPage = () => {
  const { item } = useLoaderData<any>()
  return <ItemDetail item={item} />
}

export default ItemPage
