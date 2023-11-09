import { Icon } from '@chakra-ui/react'
import { Link, useLocation } from '@remix-run/react'
import { SidebarSection, NavGroup, NavItem } from '@saas-ui/react'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { menuItems } from '~/constants/menu.config'
import { useLayoutContext, isCompactLayout } from '~/contexts/LayoutContext'

const AuthorizedAppMenuSection = () => {
  const { watch } = useFormContext()
  const {pathname} = useLocation()
  const [layout] = useLayoutContext()
  const isCompact = useMemo(() => {
    return isCompactLayout(layout)
  }, [layout])
  
  const displayedItems = useMemo(()=>{
    const search = watch("search")
    if(search && search.trim() != ""){
      return menuItems.map(m => {
        const nav = m.navItems?.filter(n => {
          return n.label.includes(search)
        })
        return {...m, navItems: nav}
      })
    }else{
      return menuItems
    }
  },[watch("search")])

  return (
    <SidebarSection flex="1" overflowY="auto">
    { displayedItems &&
      displayedItems.map((m) => (
        <NavGroup
          title={isCompact? null : m.title}
          isCollapsible={isCompact? false: m.isCollapsible}
          key={m.id}
        >
          {m.navItems?.map((item) => (
            <NavItem
              icon={item.icon && <Icon as={item.icon} />}
              key={item.id}
              as={Link}
              to={item.to}
              isActive={pathname==item.to}
            >
              {item.label}
            </NavItem>
          ))}
        </NavGroup>
      ))}
  </SidebarSection>
  )
}

export default AuthorizedAppMenuSection