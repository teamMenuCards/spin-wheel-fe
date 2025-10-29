# GraphQL Migration Guide

This document explains the migration from REST APIs to GraphQL APIs in the MenuCard customer frontend.

## Overview

The frontend has been completely migrated to use GraphQL APIs exclusively. All REST API dependencies have been removed and replaced with GraphQL queries and mutations.

## Key Changes

### 1. Environment Configuration

GraphQL is now enabled by default. To disable it, set `NEXT_PUBLIC_USE_GRAPHQL=false` in your `.env.local` file.

```env
# .env.local
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4200/graphql
NEXT_PUBLIC_USE_GRAPHQL=true  # This is now the default
```

### 2. Apollo Client Setup

The Apollo Client is configured with:

- HTTP link for GraphQL endpoint
- Authentication headers
- Error handling
- Cache policies for optimal performance
- Server-side rendering support

### 3. GraphQL Queries

All queries are defined in `/src/graphql/queries/`:

- `restaurant.ts` - Restaurant details queries
- `menu.ts` - Menu and product queries

### 4. Service Layer

GraphQL services are located in `/src/services/graphql/`:

- `restaurant.ts` - Restaurant data fetching
- `menu.ts` - Menu data fetching

### 5. Custom Hooks

Custom React hooks for easy data fetching:

- `useRestaurantDetails(name)` - Fetch restaurant details
- `useMenuList(name)` - Fetch menu categories and products

## Usage Examples

### Using Custom Hooks (Recommended)

```tsx
import { useRestaurantDetails, useMenuList } from "@/hooks"

function RestaurantPage({ restaurantName }: { restaurantName: string }) {
	const {
		data: restaurant,
		loading: restaurantLoading,
		error: restaurantError
	} = useRestaurantDetails(restaurantName)
	const {
		data: menu,
		loading: menuLoading,
		error: menuError
	} = useMenuList(restaurantName)

	if (restaurantLoading || menuLoading) return <div>Loading...</div>
	if (restaurantError || menuError) return <div>Error loading data</div>

	return (
		<div>
			<h1>{restaurant?.display_name}</h1>
			<p>{restaurant?.address}</p>

			{menu?.map((category) => (
				<div key={category.id}>
					<h2>{category.display_name}</h2>
					{category.products?.map((product) => (
						<div key={product.id}>
							<h3>{product.display_name}</h3>
							<p>₹{product.variants?.[0]?.price}</p>
						</div>
					))}
				</div>
			))}
		</div>
	)
}
```

### Using Service Functions

```tsx
import {
	getRestaurantDetailsClient,
	getMenuListClient
} from "@/services/graphql"

async function fetchRestaurantData(restaurantName: string) {
	try {
		const restaurant = await getRestaurantDetailsClient(restaurantName)
		const menu = await getMenuListClient(restaurantName)

		return { restaurant, menu }
	} catch (error) {
		console.error("Error fetching data:", error)
		return { restaurant: null, menu: [] }
	}
}
```

### Server-Side Rendering

```tsx
import {
	getRestaurantDetailsServer,
	getMenuListServer
} from "@/services/graphql"

export default async function RestaurantPage({
	params
}: {
	params: { rname: string }
}) {
	const restaurant = await getRestaurantDetailsServer(params.rname)
	const menu = await getMenuListServer(params.rname)

	if (!restaurant) {
		return <div>Restaurant not found</div>
	}

	return (
		<div>
			<h1>{restaurant.display_name}</h1>
			{/* Render menu data */}
		</div>
	)
}
```

## Data Transformation

The GraphQL responses are automatically transformed to match the expected frontend data structure:

- Restaurant details include all metadata and dashboard links
- Menu categories are sorted by display order
- Product variants are sorted by price
- All data maintains backward compatibility with existing components

## Caching Strategy

- **Client-side**: Apollo Client uses `cache-first` policy for optimal performance
- **Server-side**: Uses `network-only` policy to ensure fresh data
- **Cache TTL**: 10 hours (matching previous REST API revalidation)

## Error Handling

- GraphQL errors are logged to console
- Network errors are handled gracefully
- 401 errors automatically clear authentication tokens
- Components receive loading and error states

## Testing

Visit `/test-graphql` to test the GraphQL integration:

- Test restaurant details fetching
- Test menu list fetching
- Test error handling
- Verify data transformation

## Migration Benefits

1. **Type Safety**: Full TypeScript support with generated types
2. **Performance**: Efficient data fetching with Apollo Client caching
3. **Flexibility**: Request only the data you need
4. **Real-time**: Easy to add subscriptions for real-time updates
5. **Developer Experience**: Better debugging with GraphQL dev tools

## Backward Compatibility

All existing components continue to work without changes. The data structure remains the same, ensuring a smooth migration.

## Next Steps

1. Start your GraphQL backend server
2. Update the GraphQL endpoint in `.env.local`
3. Test the integration at `/test-graphql`
4. Deploy with confidence!

For more details, see the example components in `/src/components/examples/`.
