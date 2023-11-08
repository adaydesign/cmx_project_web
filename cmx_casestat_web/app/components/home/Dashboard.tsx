import { Flex } from "@chakra-ui/react"
import { NewProductsList, ProductsStat } from "."

const Dashboard = () => {
  return (
    <Flex direction="column">
        <ProductsStat />
        <NewProductsList />
    </Flex>
  )
}

export default Dashboard