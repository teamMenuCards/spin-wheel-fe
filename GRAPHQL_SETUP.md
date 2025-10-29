# GraphQL Integration Setup Guide

This guide explains how to integrate and use GraphQL APIs in your MenuCard customer frontend.

## 🚀 Quick Start

### 1. Environment Variables

Add these environment variables to your `.env.local` file:

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:4200/
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4200/graphql

# Feature Flags
NEXT_PUBLIC_USE_GRAPHQL=false  # Set to 'true' to enable GraphQL

# Analytics (existing)
NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID=GTM-N6WPVHXW
NEXT_PUBLIC_MICROSOFT_CLARITY_ID=qamligptbk
```

### 2. Enable GraphQL

To switch from REST to GraphQL APIs:

1. Set `NEXT_PUBLIC_USE_GRAPHQL=true` in your environment variables
2. Restart your development server
3. Your app will now use GraphQL APIs instead of REST

## 📁 File Structure

```
src/
├── config/
│   └── api.ts                    # API configuration
├── lib/
│   └── apollo-client.ts          # Apollo Client setup
├── app/providers/
│   └── ApolloProvider.tsx        # GraphQL provider
├── graphql/
│   ├── queries/
│   │   ├── restaurant.ts         # Restaurant queries
│   │   └── menu.ts              # Menu queries
│   └── mutations/
│       └── feedback.ts          # Feedback mutations
├── services/
│   ├── graphql/
│   │   ├── restaurant.ts        # GraphQL restaurant service
│   │   ├── menu.ts             # GraphQL menu service
│   │   └── feedback.ts         # GraphQL feedback service
│   └── hybrid/
│       └── api-service.ts       # Hybrid service (GraphQL/REST)
└── generated/
    └── graphql.ts              # Generated types and hooks
```

## 🔧 Configuration

### Apollo Client Features

- **Caching**: Intelligent caching with 10-hour TTL
- **Error Handling**: Comprehensive error handling and logging
- **Authentication**: Automatic token management
- **SSR Support**: Server-side rendering compatibility

### Cache Policies

- **Restaurant Details**: Cached for 10 hours
- **Menu Categories**: Products array replaced (not merged)
- **Network Strategy**: Cache-first with network fallback

## 📝 Usage Examples

### Using GraphQL Hooks (Recommended)

```typescript
import { useGetRestaurantDetailsQuery } from "@/generated/graphql"

function RestaurantPage({ restaurantName }: { restaurantName: string }) {
	const { data, loading, error } = useGetRestaurantDetailsQuery({
		variables: { name: restaurantName }
	})

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error: {error.message}</div>

	return <div>{data?.restaurant?.display_name}</div>
}
```

### Using Service Classes

```typescript
import { GraphQLRestaurantService } from "@/services/graphql/restaurant"

// Get restaurant details
const restaurant = await GraphQLRestaurantService.getRestaurantDetails(
	"restaurant-name"
)

// Prefetch for better performance
await GraphQLRestaurantService.prefetchRestaurantDetails("restaurant-name")
```

### Using Hybrid Service

```typescript
import { HybridApiService } from "@/services/hybrid/api-service"

// Automatically uses GraphQL or REST based on configuration
const restaurant = await HybridApiService.getRestaurantDetails(
	"restaurant-name"
)
const menu = await HybridApiService.getMenuList("restaurant-name")
```

## 🛠️ Development Commands

### Generate Types

```bash
# Generate GraphQL types and hooks
npm run codegen

# Watch for schema changes
npm run codegen:watch
```

### Development Server

```bash
# Start with GraphQL enabled
NEXT_PUBLIC_USE_GRAPHQL=true npm run dev

# Start with REST APIs (default)
npm run dev
```

## 🔄 Migration Strategy

### Phase 1: Parallel Implementation

- ✅ GraphQL services created alongside REST
- ✅ Hybrid service for easy switching
- ✅ Environment-based configuration

### Phase 2: Testing

- Test GraphQL endpoints with your backend
- Compare performance with REST APIs
- Validate data consistency

### Phase 3: Gradual Rollout

- Enable GraphQL for specific restaurants
- Monitor performance and errors
- Full migration when stable

## 🐛 Troubleshooting

### Common Issues

1. **GraphQL Endpoint Not Found**

   - Verify `NEXT_PUBLIC_GRAPHQL_ENDPOINT` is correct
   - Check if your backend GraphQL server is running

2. **Type Generation Errors**

   - Ensure your GraphQL schema is accessible
   - Run `npm run codegen` to regenerate types

3. **Cache Issues**
   - Clear Apollo cache: `apolloClient.clearStore()`
   - Check cache policies in `apollo-client.ts`

### Debug Mode

Enable Apollo Client dev tools:

```typescript
// In apollo-client.ts
const apolloClient = new ApolloClient({
	// ... other config
	connectToDevTools: process.env.NODE_ENV === "development"
})
```

## 📊 Performance Benefits

### GraphQL Advantages

- **Reduced Over-fetching**: Request only needed fields
- **Single Request**: Multiple resources in one query
- **Type Safety**: Generated TypeScript types
- **Real-time**: Built-in subscription support

### Caching Benefits

- **Apollo Cache**: Intelligent client-side caching
- **Network Optimization**: Reduced API calls
- **Offline Support**: Cached data available offline

## 🔐 Security

### Authentication

- Automatic token injection via auth link
- Token refresh handling
- Secure token storage

### Error Handling

- GraphQL error boundaries
- Network error recovery
- User-friendly error messages

## 📈 Monitoring

### Analytics Integration

- Apollo Client metrics
- Error tracking
- Performance monitoring

### Logging

- GraphQL query logging
- Error logging
- Performance metrics

## 🚀 Next Steps

1. **Test with Your Backend**: Ensure GraphQL schema matches your queries
2. **Generate Types**: Run `npm run codegen` to create TypeScript types
3. **Enable GraphQL**: Set `NEXT_PUBLIC_USE_GRAPHQL=true`
4. **Monitor Performance**: Compare GraphQL vs REST performance
5. **Gradual Migration**: Enable for specific restaurants first

## 📚 Resources

- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [GraphQL Code Generator](https://the-guild.dev/graphql/codegen)
- [Next.js GraphQL Integration](https://nextjs.org/docs/advanced-features/custom-app)
