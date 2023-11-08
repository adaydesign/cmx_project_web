import {
  HStack,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react"
import { useLoaderData } from "@remix-run/react"

type StatItemProps = {
  title: string
  value: number
  bgColor: string
}
const StatItem = ({ title, value, bgColor }: StatItemProps) => {
  return (
    <Stat w="full" p={6} bgColor={bgColor}>
      <StatLabel>{title}</StatLabel>
      <StatNumber>{value}</StatNumber>
    </Stat>
  )
}

const ProductsStat = () => {
  const { stat } = useLoaderData<any>()

  return (
    <HStack w="full" spacing={4} mb={4}>
      <StatItem title="Brands" value={stat?.brands?.length || 0} bgColor="green.200"/>
      <StatItem title="Categories" value={stat?.categories?.length || 0} bgColor="blue.200"/>
      <StatItem title="Products" value={stat?.stock || 0} bgColor="red.100"/>
    </HStack>
  )
}

export default ProductsStat
