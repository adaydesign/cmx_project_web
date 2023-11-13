import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Button,
  IconButton,
} from "@chakra-ui/react"
import { createColumnHelper } from "@tanstack/react-table"
import { GoLinkExternal } from "react-icons/go/index.js"
import { Table } from "../common"
import { useLoaderData } from "@remix-run/react"

type DocumentInfo = {
  id: number
  doc_no: string
  title: string
  important?: boolean
  date: string
  url: string
}

const columnHelper = createColumnHelper<DocumentInfo>()

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: "รหัส",
    enableColumnFilter: false,
  }),
  columnHelper.accessor("title", {
    cell: (info) => info.getValue(),
    header: "เรื่อง",
  }),
  columnHelper.accessor("date", {
    cell: (info) => info.getValue(),
    header: "ลงวันที่",
  }),
  columnHelper.accessor("url", {
    cell: (info) => (
      <IconButton
        icon={<GoLinkExternal />}
        aria-label="go"
        size="sm"
        colorScheme="blue"
        variant="ghost"
      />
    ),
    header: "ลิ้งค์",
  }),
]

const DocumentsTable = () => {
  const { document } = useLoaderData<any>()
  console.log("document")
  console.log(document)
  return (
    <Card border={0} shadow="none">
      <CardHeader>
        <Heading size="md">หนังสือ และเอกสารที่เกี่ยวข้อง</Heading>
      </CardHeader>
      <CardBody>
        <Table title="" columns={columns} data={document} />
      </CardBody>
    </Card>
  )
}

export default DocumentsTable
