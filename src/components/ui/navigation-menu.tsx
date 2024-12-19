"use client";

import { forwardRef } from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";

const NavigationMenu = NavigationMenuPrimitive.Root;

const NavigationMenuTrigger = NavigationMenuPrimitive.Trigger;

const NavigationMenuContent = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => <NavigationMenuPrimitive.Content ref={ref} className={className} {...props} />);

NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuList = NavigationMenuPrimitive.List;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

export {
  NavigationMenu,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
};
