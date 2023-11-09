import { Card, CardHeader, Heading, CardBody, Flex, HStack, Avatar, VStack, Text, SimpleGrid } from "@chakra-ui/react"
import { useLoaderData } from "@remix-run/react"

type NotifyItemProps = {
  item: Notify
}
const NotifyItem = ({ item }: NotifyItemProps) => {
  return (
    <Card w="200px" _hover={{transform:'scale(1.02)',shadow:'sm',cursor:'pointer'}}>
      <CardBody>
        <Flex>
            <Avatar src={item?.app?.app_icon} size="sm" borderRadius={0} mr={2}/>
            <Flex direction="column">
                <Text fontSize="sm">{item?.app?.app_name}</Text>
                <Text fontSize="md">{item?.message}</Text>
            </Flex>
        </Flex>
      </CardBody>
    </Card>
  )
}

const NotifyPanel = () => {
  const { notify } = useLoaderData<any>()
  return (
    <Card border={0} shadow="none">
      <CardHeader>
        <Heading size="md">แจ้งเตือน</Heading>
      </CardHeader>

      <CardBody>
        <SimpleGrid spacing={3} columns={6}>
          {notify &&
            notify.map((n: Notify) => <NotifyItem item={n} key={n.id} />)}
        </SimpleGrid>
      </CardBody>
    </Card>
  )
}

export default NotifyPanel
