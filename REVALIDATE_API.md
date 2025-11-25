# Cache Revalidation API Guide

This guide shows how to call the `/api/revalidate` endpoint to clear cached data.

## Endpoint

```
GET/POST /api/revalidate?restaurantName=<name>&restaurantId=<id>
```

## Parameters

- `restaurantName` (required): The restaurant slug/name
- `restaurantId` (required): The restaurant ID
- `secret` (optional): Secret key for authentication (if enabled)

## Examples

### 1. Using cURL (Command Line)

```bash
# Local development
curl -X POST "http://localhost:3000/api/revalidate?restaurantName=my-restaurant&restaurantId=123"

# Production (Vercel)
curl -X POST "https://your-domain.vercel.app/api/revalidate?restaurantName=my-restaurant&restaurantId=123"

# With secret (if enabled)
curl -X POST "https://your-domain.vercel.app/api/revalidate?restaurantName=my-restaurant&restaurantId=123&secret=your-secret-key"
```

### 2. Using JavaScript/TypeScript (Server-Side)

```typescript
// In a Next.js Server Action or API Route
async function revalidateRestaurantCache(
	restaurantName: string,
	restaurantId: string
) {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
	const url = `${baseUrl}/api/revalidate?restaurantName=${restaurantName}&restaurantId=${restaurantId}`

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		}
	})

	const data = await response.json()
	return data
}

// Usage
await revalidateRestaurantCache("my-restaurant", "123")
```

### 3. Using Next.js Server Action

```typescript
// app/actions/revalidate.ts
"use server"

import { revalidateRestaurantAll } from "@/lib/cache-revalidate"

export async function revalidateRestaurant(
	restaurantName: string,
	restaurantId: string
) {
	await revalidateRestaurantAll(restaurantName, restaurantId)
	return { success: true }
}
```

### 4. Using Webhook (Backend Integration)

If your backend updates restaurant data, set up a webhook to call this endpoint:

```javascript
// Example: Node.js backend webhook handler
const axios = require("axios")

async function onRestaurantUpdate(restaurantName, restaurantId) {
	try {
		const response = await axios.post(
			"https://your-domain.vercel.app/api/revalidate",
			null,
			{
				params: {
					restaurantName,
					restaurantId,
					secret: process.env.REVALIDATE_SECRET // Optional
				}
			}
		)
		console.log("Cache revalidated:", response.data)
	} catch (error) {
		console.error("Revalidation failed:", error)
	}
}
```

### 5. Using Vercel Webhooks

1. Go to your Vercel project settings
2. Navigate to "Webhooks"
3. Add a new webhook:
   - **URL**: `https://your-domain.vercel.app/api/revalidate?restaurantName={restaurantName}&restaurantId={restaurantId}`
   - **Events**: Choose when to trigger (e.g., on deployment)

### 6. Using Postman/Thunder Client

1. Method: `POST` or `GET`
2. URL: `https://your-domain.vercel.app/api/revalidate`
3. Query Parameters:
   - `restaurantName`: `my-restaurant`
   - `restaurantId`: `123`
   - `secret`: `your-secret` (optional)

### 7. Direct Function Call (Recommended for Internal Use)

Instead of calling the API endpoint, you can directly use the utility functions:

```typescript
import { revalidateRestaurantAll } from "@/lib/cache-revalidate"

// In your server component or API route
await revalidateRestaurantAll("my-restaurant", "123")
```

## Response

Success response:

```json
{
	"revalidated": true,
	"restaurantName": "my-restaurant",
	"restaurantId": "123",
	"now": 1234567890123
}
```

Error response:

```json
{
	"message": "Missing restaurantName or restaurantId"
}
```

## Security (Optional)

To add secret validation, uncomment the secret check in `src/app/api/revalidate/route.ts` and set:

```bash
# .env.local
REVALIDATE_SECRET=your-secret-key-here
```

## When to Use

- After updating restaurant details in your backend
- After updating menu items
- After updating spinner configuration
- When you need to force fresh data without waiting for cache expiration
