import { Row, createColumnHelper } from "@tanstack/react-table"
import { Table } from "../common"
import { Button, Flex, IconButton, Image, Text } from "@chakra-ui/react"
import { GoChevronRight, GoChevronDown } from "react-icons/go/index.js"
import { Property, PropertyLabel, PropertyList, PropertyValue } from "@saas-ui/react"
import { Link } from "@remix-run/react"

type Page1TableType = {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

const columnHelper = createColumnHelper<Page1TableType>()

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: "รหัส",
    enableColumnFilter: false
  }),
  columnHelper.accessor("thumbnail", {
    cell: (info) => (<Image boxSize={12} src={info.getValue()} aria-label="thumbnail" />),
    header: "รูปสินค้า",
  }),
  columnHelper.accessor("title", {
    cell: (info) => info.getValue(),
    header: "ชื่อสินค้า",
  }),
  columnHelper.accessor("price", {
    cell: (info) => info.getValue(),
    header: "ราคา",
  }),
  columnHelper.accessor("discountPercentage", {
    cell: (info) => info.getValue(),
    header: "ลดราคา(%)",
  }),
  columnHelper.accessor("brand", {
    cell: (info) => info.getValue(),
    header: "ยี่ห้อ",
  }),
  columnHelper.accessor("category", {
    cell: (info) => info.getValue(),
    header: "ประเภท",
  }),
  columnHelper.accessor("description", {
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <IconButton
          icon={row.getIsExpanded() ? <GoChevronDown /> : <GoChevronRight />}
          onClick={row.getToggleExpandedHandler()}
          aria-label="toggle-info"
          variant="ghost"
          size="sm"
        />
      ) : (
        <>A</>
      )
    },
    header: "รายละเอียด",
    enableColumnFilter: false
  }),
]

const renderSubComponent = ({ row }: { row: Row<Page1TableType> }) => {
  const item = row?.original
  return (
    <PropertyList>
    <Property>
      <PropertyLabel>Description</PropertyLabel>
      <PropertyValue>{item?.description}</PropertyValue>
    </Property>
    <Property>
      <PropertyLabel>Price</PropertyLabel>
      <PropertyValue>{item?.price} (-{item?.discountPercentage}%)</PropertyValue>
    </Property>
    <Property>
      <PropertyLabel>Stock</PropertyLabel>
      <PropertyValue>{item?.stock}</PropertyValue>
    </Property>
    <Property>
      <PropertyLabel>Brand</PropertyLabel>
      <PropertyValue>{item?.brand}</PropertyValue>
    </Property>
    <Property>
      <PropertyLabel>Detail</PropertyLabel>
      <PropertyValue>
        <Button size="sm" colorScheme="blue" as={Link} to={`/items/${item?.id}`}>อ่านเพิ่มเติม</Button>
      </PropertyValue>
    </Property>
  </PropertyList>
  )
}

type ExamplePage1TableProps = {
  data: Page1TableType[]
}

const ExamplePage1Table = ({ data }: ExamplePage1TableProps) => {
  return (
    <Table
      title="ตารางตัวอย่างที่ 1"
      columns={columns}
      data={data}
      getRowCanExpand={() => true}
      renderSubComponent={renderSubComponent}
    />
  )
}

export default ExamplePage1Table
