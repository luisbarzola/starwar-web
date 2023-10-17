"use client"
import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";
import { usePathname } from 'next/navigation'

const links =[
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'People',
    route: '/people',
  },
  {
    label: 'Planets',
    route: '/planets',
  },
  {
    label: 'Starships',
    route: '/starships',
  },
  {
    label: 'Films',
    route: '/films',
  }
]

export default function Navigation() {
  const pathname = usePathname()
  const pageIsActive = (page: string) => {
    if (page === '/') return pathname === page
    return pathname.includes(page)
  } 

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="col-span-5">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href='/' color='foreground'><p className="font-bold text-inherit">STARWAR</p></Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {links.map((link) => (
          <NavbarItem key={link.label} isActive={pageIsActive(link.route)}>
            <Link href={link.route} color={pageIsActive(link.route) ? 'primary' : 'foreground'} >{link.label}</Link>
          </NavbarItem>
        ))}
       
      </NavbarContent>
      <NavbarMenu>
        {links.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link
              color={pageIsActive(item.route) ? 'primary' : 'foreground'}
              className="w-full"
              href={item.route}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

