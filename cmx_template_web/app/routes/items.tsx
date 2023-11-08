import { BreadcrumbLink } from "@chakra-ui/react"
import { Link, Outlet } from "@remix-run/react"

export const handle = {
    breadcrumb: () => (
      <BreadcrumbLink as={Link} to="/">
        items
      </BreadcrumbLink>
    ),
  }

const ItemsPage = () => {
  return (
    <Outlet />
  )
}

export default ItemsPage