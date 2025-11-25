# Cache Tag Revalidation Explanation

## How It Works

When a cache entry has **multiple tags**, revalidating **any one of those tags** will revalidate that cache entry.

## Your Current Setup

### Restaurant Details API

```typescript
tags: [
	"all-graphql-apis", // ← Common tag (on all APIs)
	"restaurant-my-restaurant", // ← Specific restaurant
	"restaurant-details", // ← All restaurant details
	"restaurants" // ← All restaurants
]
```

### Menu List API

```typescript
tags: [
	"all-graphql-apis", // ← Common tag (on all APIs)
	"menu-123", // ← Specific menu
	"menu-list", // ← All menu lists
	"menus" // ← All menus
]
```

### Spinner API

```typescript
tags: [
	"all-graphql-apis", // ← Common tag (on all APIs)
	"spinner-123", // ← Specific spinner
	"spinner", // ← All spinners
	"spinners" // ← All spinners (plural)
]
```

## Revalidation Scenarios

### ✅ Scenario 1: Revalidate `all-graphql-apis` in Vercel

**Result**: Revalidates **ALL THREE APIs** (restaurant, menu, spinner)

- ✅ Restaurant Details cache cleared
- ✅ Menu List cache cleared
- ✅ Spinner cache cleared

**Why?** Because all three APIs have the `all-graphql-apis` tag.

### ✅ Scenario 2: Revalidate `restaurant-details` in Vercel

**Result**: Revalidates **ONLY Restaurant Details API**

- ✅ Restaurant Details cache cleared
- ❌ Menu List cache NOT cleared
- ❌ Spinner cache NOT cleared

**Why?** Only the Restaurant Details API has the `restaurant-details` tag.

### ✅ Scenario 3: Revalidate `restaurant-my-restaurant` in Vercel

**Result**: Revalidates **ONLY that specific restaurant's cache**

- ✅ Restaurant Details for "my-restaurant" cache cleared
- ❌ Other restaurants' cache NOT cleared
- ❌ Menu List cache NOT cleared
- ❌ Spinner cache NOT cleared

**Why?** Only that specific restaurant entry has the `restaurant-my-restaurant` tag.

## Summary

| Tag Revalidated            | Restaurant API     | Menu API | Spinner API |
| -------------------------- | ------------------ | -------- | ----------- |
| `all-graphql-apis`         | ✅                 | ✅       | ✅          |
| `restaurant-details`       | ✅                 | ❌       | ❌          |
| `menu-list`                | ❌                 | ✅       | ❌          |
| `spinner`                  | ❌                 | ❌       | ✅          |
| `restaurant-my-restaurant` | ✅ (only this one) | ❌       | ❌          |

## For Vercel Configuration

**Recommended**: Use `all-graphql-apis` tag in Vercel

- One tag to revalidate everything
- Simple and easy to manage
- Perfect for testing

**Alternative**: Use specific tags for granular control

- More precise cache management
- Better for production optimization
