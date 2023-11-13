import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  HStack,
  Avatar,
  Flex,
  Text,
  SimpleGrid,
} from "@chakra-ui/react"
import { useLoaderData } from "@remix-run/react"
import { EmptyState } from "@saas-ui/react"
import { GoAlert } from "react-icons/go/index.js"

type RecentAccessProps = {
  item: RecentAccess
}
const RecentAppItem = ({ item }: RecentAccessProps) => {
  return (
    <Card w="full" _hover={{transform:'scale(1.02)',shadow:'sm',cursor:'pointer'}}>
      <CardBody>
        <HStack>
          <Avatar src={item?.app_icon} size="sm" borderRadius={0} mr={2} />
          <Flex direction="column">
            <Text fontSize="md" fontWeight="bold">{item?.app_name}</Text>
            <Text fontSize="sm">เข้าใช้ล่าสุด {item?.last_access_date}</Text>
          </Flex>
        </HStack>
      </CardBody>
    </Card>
  )
}

const RecentAccessPanel = () => {
  const { recentAccess } = useLoaderData<any>()

  return (
    <Card border={0} shadow="none">
      <CardHeader>
        <Heading size="md">เข้าใช้งานระบบล่าสุด</Heading>
      </CardHeader>

      <CardBody>
        {recentAccess ? (
          <SimpleGrid spacing={3} columns={5}>
            {recentAccess.map((i: RecentAccess) => (
              <RecentAppItem item={i} key={i.id} />
            ))}
          </SimpleGrid>
        ) : (
          <EmptyState
            colorScheme="gray"
            icon={GoAlert}
            title="ยังไม่มีประวัติการใช้งาน"
            description="..."
          />
        )}
      </CardBody>
    </Card>
  )
}

export default RecentAccessPanel
