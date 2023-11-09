import {
  ReactElement,
  useState,
  Fragment,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react"
import {
  Table as CKTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tfoot,
  HStack,
  Button,
  Select,
  Text,
  Input,
  Spacer,
  Flex,
  TableContainer,
  Icon,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  Divider,
  Checkbox,
  Heading,
  Box,
  IconButton,
  useDisclosure,
  UseDisclosureReturn,
  MenuItem,
} from "@chakra-ui/react"
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HamburgerIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons"
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
  Row,
  getExpandedRowModel,
  FilterFn,
  getFilteredRowModel,
  ColumnFiltersState,
  Column,
  Table as RETable,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
} from "@tanstack/react-table"
import {
  GoFilter,
  GoInbox,
  GoLinkExternal,
  GoTasklist,
} from "react-icons/go/index.js"
import {
  FaFileCsv,
  FaPrint,
  FaRegFileExcel,
  FaRegFilePdf,
} from "react-icons/fa6/index.js"
import { rankItem } from "@tanstack/match-sorter-utils"
import { SearchInput } from "@saas-ui/react"
import jsPDF from "jspdf"
import "jspdf-autotable"
import { mkConfig, generateCsv, download } from "export-to-csv"
import XLSX from "xlsx"

export const NoDataDisplay = () => {
  return (
    <Flex
      direction="column"
      p={4}
      align="center"
      justify="center"
      bgColor="gray.100"
    >
      <Icon as={GoInbox} boxSize="70px" mb={3} color="gray.400" />
      <Text fontSize="md" fontWeight="bold" mb={2}>
        ไม่มีรายการข้อมูล
      </Text>
      <Text fontSize="sm">ท่านยังไม่ได้เพิ่มรายการข้อมูลในตารางนี้</Text>
    </Flex>
  )
}

type DataTableProps<Data extends object> = {
  title: string
  data: Data[] | undefined
  columns: ColumnDef<Data, any>[]
  renderSubComponent?: (props: { row: Row<Data> }) => ReactElement
  getRowCanExpand?: (row: Row<Data>) => boolean
}

export function Table<Data extends object>({
  title,
  data,
  columns,
  renderSubComponent,
  getRowCanExpand,
}: DataTableProps<Data>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [globalFilter, setGlobalFilter] = useState("")
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  // show filter input
  const filterDisclosure = useDisclosure()

  const table = useReactTable({
    data: data || [],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      columnVisibility,
      globalFilter,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    // sort
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    // paging
    getPaginationRowModel: getPaginationRowModel(),
    // column visible
    onColumnVisibilityChange: setColumnVisibility,
    // expand
    getRowCanExpand,
    getExpandedRowModel: getExpandedRowModel(),
    // global filter
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getFilteredRowModel: getFilteredRowModel(),
    // column filter
    onColumnFiltersChange: setColumnFilters,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  })

  return (
    <Flex direction="column" shadow="md" borderRadius="md" pt={4}>
      <TableController
        title={title}
        table={table}
        data={data}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        filterDisclosure={filterDisclosure}
        setColumnFilters={setColumnFilters}
      />
      <TableContainer>
        <CKTable size="sm" variant="simple" id="my-table">
          <Thead>
            {table.getHeaderGroups().map((headerGroup, hgIndex) => (
              <Tr
                key={`header-group-${headerGroup.id}-${hgIndex}`}
                aria-label={headerGroup.id}
              >
                {headerGroup.headers.map((header, headerIndex) => {
                  // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                  const meta: any = header.column.columnDef.meta
                  return (
                    <Th
                      key={`header-column-${headerGroup.id}-${header.id}-${headerIndex}`}
                      aria-label={header.id}
                      isNumeric={meta?.isNumeric}
                    >
                      <Flex direction="column">
                        <HStack
                          onClick={header.column.getToggleSortingHandler()}
                          cursor="pointer"
                          spacing={1}
                        >
                          <Text>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </Text>
                          <Box>
                            {header.column.getIsSorted() &&
                              (header.column.getIsSorted() === "desc" ? (
                                <TriangleDownIcon aria-label="sorted descending" />
                              ) : (
                                <TriangleUpIcon aria-label="sorted ascending" />
                              ))}
                          </Box>
                        </HStack>
                        {header.column.getCanFilter() &&
                          filterDisclosure.isOpen && (
                            <Flex mt={1}>
                              <Filter column={header.column} table={table} />
                            </Flex>
                          )}
                      </Flex>
                    </Th>
                  )
                })}
              </Tr>
            ))}
          </Thead>
          {data && data?.length > 0 && (
            <Tbody>
              {table.getRowModel().rows?.map((row, index) => (
                <Fragment key={`body-${row.id}-${index}`}>
                  <Tr
                    aria-label={row.id}
                    _hover={{ shadow: "md", bg: "blackAlpha.50" }}
                  >
                    {row.getVisibleCells().map((cell, indexCell) => {
                      // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                      const meta: any = cell.column.columnDef.meta
                      return (
                        <Td
                          key={`body-cell-${row.id}-${cell.id}-${indexCell}`}
                          isNumeric={meta?.isNumeric}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Td>
                      )
                    })}
                  </Tr>
                  {row.getIsExpanded() && renderSubComponent && (
                    <Tr>
                      <Td colSpan={row.getVisibleCells().length}>
                        {renderSubComponent({ row })}
                      </Td>
                    </Tr>
                  )}
                </Fragment>
              ))}
            </Tbody>
          )}
          {(data == null || data == undefined || data?.length == 0) && (
            <Tbody>
              <Tr>
                <Td colSpan={columns.length}>
                  <NoDataDisplay />
                </Td>
              </Tr>
            </Tbody>
          )}
          <Tfoot>
            <Tr>
              <Td colSpan={columns.length}>
                <Flex w="full">
                  <HStack>
                    <Button
                      size="sm"
                      onClick={() => table.setPageIndex(0)}
                      isDisabled={!table.getCanPreviousPage()}
                    >
                      <ArrowBackIcon />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => table.previousPage()}
                      isDisabled={!table.getCanPreviousPage()}
                    >
                      <ChevronLeftIcon />
                    </Button>
                    <HStack minW="fit-content" justify="center">
                      <Text>
                        {`หน้า ${
                          table.getState().pagination.pageIndex + 1
                        } / ${table.getPageCount()}`}
                      </Text>
                    </HStack>
                    <Button
                      size="sm"
                      onClick={() => table.nextPage()}
                      isDisabled={!table.getCanNextPage()}
                    >
                      <ChevronRightIcon />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() =>
                        table.setPageIndex(table.getPageCount() - 1)
                      }
                      isDisabled={!table.getCanNextPage()}
                    >
                      <ArrowForwardIcon />
                    </Button>
                  </HStack>
                  <HStack ml={4}>
                    <Text minW="fit-content">ไปยังหน้า : </Text>
                    <Input
                      type="number"
                      defaultValue={table.getState().pagination.pageIndex + 1}
                      onChange={(e) => {
                        const page = e.target.value
                          ? Number(e.target.value) - 1
                          : 0
                        table.setPageIndex(page)
                      }}
                      size="sm"
                    />
                  </HStack>
                  <Spacer />
                  <Flex justify="end">
                    <Select
                      minW="fit-content"
                      value={table.getState().pagination.pageSize}
                      size="sm"
                      onChange={(e) => {
                        table.setPageSize(Number(e.target.value))
                      }}
                    >
                      {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                          แสดง {pageSize}
                        </option>
                      ))}
                    </Select>
                  </Flex>
                </Flex>
              </Td>
            </Tr>
          </Tfoot>
        </CKTable>
      </TableContainer>
    </Flex>
  )
}

type TableControllerProps = {
  title: string
  table: any
  data: any
  globalFilter: string
  setGlobalFilter: Dispatch<SetStateAction<string>> //(value: string | number) => void
  filterDisclosure: UseDisclosureReturn
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>
}
const TableController = ({
  title,
  table,
  data,
  globalFilter,
  setGlobalFilter,
  filterDisclosure,
  setColumnFilters,
}: TableControllerProps) => {
  function getExportFileBlob(
    columns: any,
    data: any,
    fileType: string,
    fileName: string
  ) {
    const header = columns
      .filter((c: any) => c.getIsVisible())
      .map((column: any) => {
        return {
          id: column.id,
          name: column.columnDef?.header,
        }
      })

    const headerNames = header.map((c: any) => c.name)

    if (fileType === "csv") {
      const csvConfig = mkConfig({
        columnHeaders: header.map((c: any) => c.id),
        filename: fileName,
      })
      const csv = generateCsv(csvConfig)(data)
      download(csvConfig)(csv)
    } else if (fileType === "xlsx") {
      // XLSX example
      const headerXLSX = header.map((c: any) => c.id)
      const compatibleData = data.map((row: any) => {
        const obj: any = {}
        header.forEach((col: any) => {
          obj[col.id] = row[col.id]
        })
        return obj
      })
      let wb = XLSX.utils.book_new()
      let ws1 = XLSX.utils.json_to_sheet(compatibleData, {
        header: headerXLSX,
      })
      XLSX.utils.sheet_add_aoa(ws1, [headerNames], { origin: "A1" })
      XLSX.utils.book_append_sheet(wb, ws1, "Sheet 1")
      XLSX.writeFile(wb, `${fileName}.xlsx`)
      // Returning false as downloading of file is already taken care of
      return false
    }
    //PDF example
    else if (fileType === "pdf" || fileType === "pdf-print") {
      const listData = data.map((d: any) => {
        const value: any = []
        header.map((c: any) => value.push(d[c.id]))
        return value
      })

      const unit = "pt"
      const size = "A4" // Use A1, A2, A3 or A4
      const orientation = "landscape" // portrait or landscape

      // const marginLeft = 40;
      const doc = new jsPDF(orientation, unit, size)

      // font
      doc.addFont("fonts/sarabun-regular.ttf", "sarabun", "normal")
      doc.setFont("sarabun") // set font
      doc.setFontSize(12)
      doc.text(title, 45, 50)

      ;(doc as any).autoTable({
        head: [headerNames],
        body: listData,
        margin: { top: 70 },
        styles: {
          minCellHeight: 9,
          halign: "left",
          fontSize: 11,
          font: "sarabun",
          lineHeight: 1.8,
        },
        theme:'grid',
        headStyles:{
          fillColor: [166, 207, 152]
        }
      })

      if (fileType == "pdf") {
        doc.save(`${fileName}.pdf`)
      } else if (fileType == "pdf-print") {
        doc.autoPrint({ variant: "non-conform" })
        doc.output("pdfobjectnewwindow")
      }
    }

    return false
  }

  return (
    <Flex w="full" mb={2} px={2} align="center">
      <Heading fontSize="lg">
        <Icon as={HamburgerIcon} mr={2} />
        {title}
      </Heading>
      <Spacer />
      <HStack align="center">
        <SearchInput
          value={globalFilter}
          onChange={(e: any) => setGlobalFilter(e.target.value)}
          placeholder="ค้นหา"
          onReset={() => setGlobalFilter("")}
        />
        {filterDisclosure && (
          <IconButton
            icon={<GoFilter />}
            variant="ghost"
            aria-label="toggle filter"
            isActive={filterDisclosure?.isOpen}
            onClick={() => {
              if (filterDisclosure.isOpen) {
                setColumnFilters([])
              }
              filterDisclosure.onToggle()
            }}
          />
        )}
        <Menu closeOnSelect={false}>
          <MenuButton
            as={IconButton}
            icon={<GoTasklist />}
            variant="ghost"
            aria-label="column toggle"
          />
          <MenuList>
            <Flex w="full" direction="column" p={2}>
              <HStack>
                <Checkbox
                  isChecked={table.getIsAllColumnsVisible()}
                  onChange={table.getToggleAllColumnsVisibilityHandler()}
                >
                  all columns
                </Checkbox>
              </HStack>
              <Divider orientation="horizontal" my={1} />
              <VStack align="start">
                {table.getAllLeafColumns().map((column: any) => (
                  <Checkbox
                    key={column.id}
                    isChecked={column.getIsVisible()}
                    onChange={column.getToggleVisibilityHandler()}
                  >
                    {column?.columnDef?.header}
                  </Checkbox>
                ))}
              </VStack>
            </Flex>
          </MenuList>
        </Menu>
        <Menu closeOnSelect={false}>
          <MenuButton
            as={IconButton}
            icon={<GoLinkExternal />}
            variant="ghost"
            aria-label="export"
          />
          <MenuList>
            <MenuItem
              icon={<FaRegFileExcel />}
              onClick={() => {
                getExportFileBlob(table.getAllColumns(), data, "xlsx", "abc")
              }}
            >
              บันทึกไฟล์ Excel
            </MenuItem>
            <MenuItem
              icon={<FaFileCsv />}
              onClick={() => {
                getExportFileBlob(table.getAllColumns(), data, "csv", "abc")
              }}
            >
              บันทึกไฟล์ CSV
            </MenuItem>
            <MenuItem
              icon={<FaRegFilePdf />}
              onClick={() => {
                getExportFileBlob(table.getAllColumns(), data, "pdf", "abc")
              }}
            >
              บันทึกไฟล์ PDF
            </MenuItem>
            <MenuItem
              icon={<FaPrint />}
              onClick={() => {
                getExportFileBlob(
                  table.getAllColumns(),
                  data,
                  "pdf-print",
                  "abc"
                )
              }}
            >
              พิมพ์
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  )
}

type FilterProps = {
  column: Column<any, unknown>
  table: RETable<any>
}
const Filter = ({ column, table }: FilterProps) => {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  )

  return typeof firstValue === "number" ? (
    <HStack w="full" spacing={1}>
      <Input
        type="number"
        size="sm"
        min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
        max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
        value={(columnFilterValue as [number, number])?.[0] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder={`Min ${
          column.getFacetedMinMaxValues()?.[0]
            ? `(${column.getFacetedMinMaxValues()?.[0]})`
            : ""
        }`}
      />
      <Input
        type="number"
        size="sm"
        min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
        max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
        value={(columnFilterValue as [number, number])?.[1] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder={`Max ${
          column.getFacetedMinMaxValues()?.[1]
            ? `(${column.getFacetedMinMaxValues()?.[1]})`
            : ""
        }`}
      />
    </HStack>
  ) : (
    <Flex w="full">
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <Input
        type="text"
        size="sm"
        value={(columnFilterValue ?? "") as string}
        onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder={`ค้นหา... (${column.getFacetedUniqueValues().size})`}
        list={column.id + "list"}
      />
    </Flex>
  )
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}
