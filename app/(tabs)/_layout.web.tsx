import { Link } from "expo-router";
import { TabList, TabSlot, TabTrigger, Tabs } from "expo-router/ui";
import type { ReactNode } from "react";

export default function TabLayout(): ReactNode {
  return (
    <Tabs>
      <TabSlot />

      <TabList>
        <TabTrigger asChild name="index" href="/">
          <Link href="/">Index</Link>
        </TabTrigger>
        <TabTrigger asChild name="redirect-not-working" href="/redirect-not-working">
          <Link href="/redirect-not-working">Redirect Not Working</Link>
        </TabTrigger>
        <TabTrigger
          asChild
          name="useeffect-redirect-not-working"
          href="/useeffect-redirect-not-working"
        >
          <Link href="/useeffect-redirect-not-working">
            UseEffect Redirect Not Working (unless you reload)
          </Link>
        </TabTrigger>
        <TabTrigger asChild name="two" href="/two">
          <Link href="/two">Two</Link>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}
