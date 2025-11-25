# Cache Tag Information for Vercel

## Common Cache Tag

All GraphQL APIs now include a common cache tag: **`all-graphql-apis`**

This tag is added to:
- ✅ Restaurant details API
- ✅ Menu list API  
- ✅ Spinner data API

## For Vercel Configuration

When setting up cache revalidation in Vercel, you can use the tag:

**`all-graphql-apis`**

This single tag will revalidate all GraphQL API caches at once.

## How to Use

### 1. Revalidate All APIs at Once

```bash
# Via API endpoint
curl -X POST "https://your-domain.vercel.app/api/revalidate?all=true"

# Or directly in code
import { revalidateAllApis } from '@/lib/cache-revalidate'
await revalidateAllApis()
```

### 2. Revalidate Specific Restaurant

```bash
curl -X POST "https://your-domain.vercel.app/api/revalidate?restaurantName=my-restaurant&restaurantId=123"
```

### 3. In Vercel Dashboard

1. Go to your project settings
2. Navigate to "Data Cache" or "Cache" settings
3. Add the tag: **`all-graphql-apis`**
4. Configure webhooks or manual revalidation triggers

## Cache Tag Structure

Each API has multiple tags for granular control:

- **Common tag**: `all-graphql-apis` (for all APIs)
- **Specific tags**: 
  - Restaurant: `restaurant-{name}`, `restaurant-details`, `restaurants`
  - Menu: `menu-{id}`, `menu-list`, `menus`
  - Spinner: `spinner-{id}`, `spinner`, `spinners`

## Benefits

✅ **Single tag for Vercel**: Use `all-graphql-apis` to manage all caches  
✅ **Granular control**: Still have specific tags for individual revalidation  
✅ **Easy testing**: One tag to rule them all!  
✅ **Production ready**: Can switch to specific tags later if needed

