import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  HStack,
  SimpleGrid,
  Image,
  Flex,
} from "@chakra-ui/react"
import {
  PropertyList,
  Property,
  PropertyLabel,
  PropertyValue,
} from "@saas-ui/react"

type ItemDetailProps = {
  item: any
}
type ItemGalleryProps = {
  images: string[]
}

const ItemGallery = ({ images }: ItemGalleryProps) => {
  return (
    <SimpleGrid columns={images.length} spacing={4}>
      {images && images.map((i, index) => <Image src={i} key={index} _hover={{transform:`scale(1.01)`,shadow:"lg"}}/>)}
    </SimpleGrid>
  )
}
const ItemProperty = ({ item }: ItemDetailProps) => {
  const keys = [
    "title",
    "description",
    "price",
    "discountPercentage",
    "rating",
    "stock",
    "brand",
    "category",
  ]
  return (
    <PropertyList>
      {keys.map((k) => (
        <Property key={k}>
          <PropertyLabel>{k}</PropertyLabel>
          <PropertyValue>{item[k]}</PropertyValue>
        </Property>
      ))}
    </PropertyList>
  )
}
const ItemDetail = ({ item }: ItemDetailProps) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">{item.title}</Heading>
      </CardHeader>

      <CardBody>
        <Flex direction="column">
          <ItemGallery images={item.images} />
          <Heading fontSize="lg" my={4}>Product Detail</Heading>
          <ItemProperty item={item} />
        </Flex>
      </CardBody>
    </Card>
  )
}

export default ItemDetail
