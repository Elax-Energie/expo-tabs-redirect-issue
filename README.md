# Expo Router UI - Redirect Bug Reproduction

This repository demonstrates a bug where `<Redirect />` from `expo-router` does not work on web when using `expo-router/ui` components (`Tabs`, `TabSlot`, `TabList`, `TabTrigger`).

## Environment

- **Expo SDK:** 54.0.23
- **expo-router:** 6.0.14
- **React:** 19.1.0
- **Platform:** Web

## Bug Description

When using `expo-router/ui` components for custom tab layouts on web, the `<Redirect />` component fails to execute. The same redirect works correctly when using `_layout.tsx` instead.

## Reproduction Steps

1. Install dependencies:

   ```bash
   bun install
   ```

2. Start the web server:

   ```bash
   bun start
   ```

3. Go to `http://localhost:8081/redirect-not-working` directly

4. **Expected:** Should redirect to `/` (index route)

5. **Actual:** Stays on `/redirect-not-working` route, redirect does not execute

## Key Files

### `app/(tabs)/_layout.web.tsx` - Web layout using expo-router/ui

```typescript
import { TabList, TabSlot, TabTrigger, Tabs } from "expo-router/ui";
import type { ReactNode } from "react";

export default function TabLayout(): ReactNode {
  return (
    <Tabs>
      <TabSlot />
      <TabList>
        <TabTrigger name="index" href="/" />
        <TabTrigger name="redirect-not-working" href="/redirect-not-working" />
        <TabTrigger name="useeffect-redirect-not-working" href="/useeffect-redirect-not-working" />
        <TabTrigger name="two" href="/two" />
      </TabList>
    </Tabs>
  );
}
```

### `app/(tabs)/redirect-not-working.tsx` - Route with redirect

```typescript
import { Redirect } from "expo-router";

export default function RedirectNotWorkingScreen() {
  return <Redirect href="/" />;
}
```

### `app/(tabs)/useeffect-redirect-not-working.tsx` - Alternative redirect approach (also doesn't work)

```typescript
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function RedirectNotWorkingScreen() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, []);

  return null;
}
```

This alternative approach using `useEffect` + `router.replace()` also fails on web with `expo-router/ui`.

### `app/(tabs)/_layout.tsx` - Native layout (for comparison)

Remove (or move) `_layout.web.tsx` to check that it works when using standard Tabs.

## Observations

- ❌ Redirect does NOT work on web with `expo-router/ui` (using `<Redirect />` component)
- ❌ Redirect with `useEffect` + `router.replace()` also does NOT work on web with `expo-router/ui`
- ✅ **Removing `_layout.web.tsx` makes the redirect work on web** (using native tabs layout)
- No errors in console
- Route stays on `/redirect-not-working` or `/useeffect-redirect-not-working` instead of redirecting to `/`

## Expected Behavior

The redirect should work consistently across all platforms, including web when using `expo-router/ui` components.

## Related Documentation

- [Expo Router Custom Tabs](https://docs.expo.dev/router/advanced/custom-tabs/)
- [Expo Router Redirects](https://docs.expo.dev/router/advanced/redirects/)
