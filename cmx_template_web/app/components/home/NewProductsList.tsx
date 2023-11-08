import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Avatar,
  Text,
  HStack,
  Tag,
  LinkBox,
} from "@chakra-ui/react"
import { Link, useLoaderData } from "@remix-run/react"
import {
  StructuredList,
  StructuredListHeader,
  StructuredListItem,
  StructuredListCell,
} from "@saas-ui/react"

type ProductItemProps = {
  data: any
}
const ProductItem = ({ data }: ProductItemProps) => {
  return (
    <LinkBox as={Link} to={`/items/${data.id}`}>
      <StructuredListItem href="#">
        <StructuredListCell>
          <Avatar name={data.title} size="lg" src={data.thumbnail} />
        </StructuredListCell>
        <StructuredListCell flex="1">
          <Text fontWeight="bold">{data.title}</Text>
          <Text fontSize="sm" color="muted" noOfLines={2}>
            {data.description}
          </Text>
        </StructuredListCell>
        <StructuredListCell>
          <HStack>
            <Tag colorScheme="blue">{data.brand}</Tag>
            <Tag colorScheme="green">{data.category}</Tag>
          </HStack>
        </StructuredListCell>
      </StructuredListItem>
    </LinkBox>
  )
}

const NewProductsList = () => {
  const { newRelease } = useLoaderData<any>()
  return (
    <Card >
      <CardHeader>
        <Heading size="md">New Releases!</Heading>
      </CardHeader>
      <CardBody>
        <StructuredList>
          {newRelease &&
            newRelease.map((item: any) => <ProductItem data={item} key={item.id}/>)}
        </StructuredList>
      </CardBody>
    </Card>
  )
}

export default NewProductsList
