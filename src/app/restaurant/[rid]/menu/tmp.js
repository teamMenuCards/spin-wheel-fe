const snacks = [
	{
		name: "Cheesy Mushroom Quiche",
		price: 158,
		img: "https://b.zmtcdn.com/data/dish_photos/04a/833154ae6e395a30695aea1badb3004a.png?fit=around|85:85&crop=85:85;*,*",
		description: "Creamy mushroom and melted cheese in a golden quiche crust."
	},
	{
		name: "Spicy Korean Potato Tart",
		price: 158,
		img: "https://b.zmtcdn.com/data/dish_photos/0b6/1e561c9a811361b4cbde85327ed800b6.jpg?fit=around|85:85&crop=85:85;*,*",
		description: "Spiced Korean potatoes on a crisp, golden tart crust."
	},
	{
		name: "Pesto with Mozzarella and Cherry Tomato Tart",
		price: 158,
		img: "https://b.zmtcdn.com/data/dish_photos/a97/96cf3440fea5c6dc85b2ccce9571aa97.jpg?fit=around|85:85&crop=85:85;*,*",
		description:
			"A savory delight with fresh pesto, Mozzarella and juicy cherry tomatoes."
	},
	{
		name: "Dough Balls with Caramelised Garlic Butter [Pack of 5]",
		price: 158,
		img: "https://b.zmtcdn.com/data/dish_photos/395/24c7f32dedf3441c2574a269cb976395.jpg?fit=around|85:85&crop=85:85;*,*",
		description:
			"Fluffy dough balls served with rich, caramelized garlic butter."
	},
	{
		name: "Dough Balls with Korean Chilli Butter [Pack of 5]",
		price: 158,
		img: "https://b.zmtcdn.com/data/dish_photos/ce8/89525ca6608f332890d3a3ebd1f63ce8.jpg?fit=around|85:85&crop=85:85;*,*",

		description: "Soft dough balls paired with a fiery Korean chilli butter."
	},
	{
		name: "Dough Balls with Korean Chilli and Caramelised Garlic Butter [Pack of 5]",
		price: 158,
		img: "https://b.zmtcdn.com/data/dish_photos/ae2/783457ef9f67059eb626ed0195646ae2.jpg?fit=around|85:85&crop=85:85;*,*",
		description:
			"The perfect combo of fiery spicy Korean chilli butter and rich caramelised garlic."
	},
	{
		name: "Focaccia Green Chilli Garlic Thecha",
		price: 250,
		img: "https://b.zmtcdn.com/data/dish_photos/db0/3ed6e4b12061813983b035f97c037db0.jpg?fit=around|85:85&crop=85:85;*,*",
		description:
			"Soft focaccia with a spicy, garlicky green chilli thecha topping."
	},
	{
		name: "Double Chocolate Brookies with Sea Salt [1 Piece]",
		price: 220,
		img: "https://b.zmtcdn.com/data/dish_photos/28c/5532eb41ba2006bdf5aba44f9bf8728c.png?fit=around|85:85&crop=85:85;*,*",
		description:
			"The best of both worlds brownie meets cookie, sprinkled with sea salt."
	},
	{
		name: "Chocolate Chunk Sea Salt Cookies [1 Piece]",
		price: 220,
		img: "https://b.zmtcdn.com/data/dish_photos/724/7f5c7dbb9b23aa338b3d2c141a502724.jpg?fit=around|85:85&crop=85:85;*,*",
		description:
			"Chunky chocolate filled cookies with a hint of sea salt in every bite."
	},
	{
		name: "Triple Chocolate Sea Salt Cookies [1 Piece]",
		price: 220,
		img: "https://b.zmtcdn.com/data/dish_photos/1eb/4c0d2e9a9d5a078002c9442d29edb1eb.jpg?fit=around|85:85&crop=85:85;*,*",
		description:
			"Three kinds of chocolate, dark, milk & white with a dash of sea ... read more"
	},
	{
		name: "Spicy Korean Chicken Tart",
		price: 160,

		description: "Tender chicken in spicy Korean sauce on a flaky tart base."
	},
	{
		name: "Korean Garlic Bun",
		price: 320,
		img: "https://b.zmtcdn.com/data/dish_photos/8d4/90bf06a58f9a29f642dbde52d92c98d4.jpg?fit=around|85:85&crop=85:85;*,*",
		description:
			"Trending Korean treat, fluffy buns baked from scratch and filled with a cream ... read more"
	},
	{
		name: "Dark Chocolate Bomboloni [1 Piece]",
		price: 275,
		img: "https://b.zmtcdn.com/data/dish_photos/0dd/2f5a292c2de578d098a06bf4f4e280dd.jpg?fit=around|85:85&crop=85:85;*,*",
		description:
			"Handcrafted bomboloni are italian-style doughnuts with a soft, airy and pillowy texture. Made from scratch, these pastries are fried to a golden brown, creating a delicate outer crust that perfectly complements the tender inside, filled with 55 percent dark couverture chocolate."
	}
]

const desserts = [
	{
		name: "Devils Food Cake",
		price: 290,
		img: "https://b.zmtcdn.com/data/dish_photos/561/cb0230b6cc4f3a5276b13918b9800561.jpg?fit=around|85:85&crop=85:85;*,*",
		description:
			"[Veg preparation] Rich, decadent chocolate cake with 55% pure dark chocolate."
	},
	{
		name: "Nutellicious Cake",
		price: 310,
		img: "https://b.zmtcdn.com/data/dish_photos/32e/17ffe5486331eb9857b47f0123c3c32e.jpg?fit=around|85:85&crop=85:85;*,*",
		description:
			"[Veg preparation] Rich, decadent chocolate cake infused with heavenly Nutella, ferrero rocher and ... read more"
	},
	{
		name: "Lemon Blueberry Tea Cake",
		price: 240,
		img: "https://b.zmtcdn.com/data/dish_photos/914/a44224f265abcba120653e1ecb93e914.jpg?fit=around|85:85&crop=85:85;*,*",
		description:
			"Zesty lemon meets bursts of juicy blueberries in a light, refreshing treat."
	},
	{
		name: "Cold Nutella Cheesecake Jar",
		price: 380,
		img: "https://b.zmtcdn.com/data/dish_photos/a6a/439038c976c16fa2a3ff35871d2f2a6a.jpg?fit=around|85:85&crop=85:85;*,*",
		description:
			"Velvety cheesecake layered with luscious Nutella, served in a jar."
	},
	{
		name: "Cold Biscoff Cheesecake Jar",
		price: 380,
		img: "https://b.zmtcdn.com/data/dish_photos/d2a/b68657913b57a1aa76b42067df470d2a.jpg?fit=around|85:85&crop=85:85;*,*",
		description:
			"Creamy cheesecake swirled with irresistible biscoff, in a ready to go jar."
	},
	{
		name: "Cold Raspberry Cheesecake Jar",
		price: 380,
		img: "https://b.zmtcdn.com/data/dish_photos/2b8/32278ec1993e6c6b70658b6bd371b2b8.jpg?fit=around|85:85&crop=85:85;*,*",
		description:
			"Tart raspberry meets silky cheesecake for a refreshing jarred delight."
	},
	{
		name: "Cold Blueberry Cheesecake Jar",
		price: 360,
		img: "https://b.zmtcdn.com/data/dish_photos/b22/95cdbd9f215a29ae7044fe3973caab22.jpg?fit=around|85:85&crop=85:85;*,*",
		description:
			"Creamy cheesecake topped with juicy blueberries, packed in a jar."
	},
	{
		name: "Cold Salted Caramel Cheesecake Jar",
		price: 360,
		description:
			"Smooth cheesecake drizzled with rich, salted caramel in a jar."
	},
	{
		name: "Cold Dark Chocolate Cheesecake Jar",
		price: 380,
		img: "https://b.zmtcdn.com/data/dish_photos/411/adf7d5ab8811fbce3f48dd39d1ab8411.jpg?fit=around|85:85&crop=85:85;*,*",
		description:
			"Indulgent cheesecake layered with dark chocolate in a jar for pure chocolate bliss"
	},
	{
		name: "Gluten Free Millet and Jaggery Brownie",
		price: 240,
		img: "https://b.zmtcdn.com/data/dish_photos/7bf/5f4b2e35efdcca0cb4d43228879367bf.jpg?fit=around|85:85&crop=85:85;*,*",
		description:
			"A guilt free, gluten free Millet brownie sweetened with jaggery and 60% dark ... read more"
	}
]

const drinks = [
	{
		name: "Iced Coffee",
		price: 160,
		img: "",
		description: "Smooth, cold coffee to energize your day."
	}
]

const getData = (menuData) => {
	return menuData.map((item) => {
		return {
			name: item.name,
			description: item.description,
			categories: ["37307a54-4e21-4f20-b9fa-7ef377f59ee1"],
			variants: [
				{
					variant_details: {},
					variant_name: "Snacks",
					is_veg: true,
					contains_egg: false,
					price: item.price,
					discounted_price: 0.0,
					image_url: item.img,
					preparation_time_minutes: 0,
					allergens: "string",
					dietary_info: "string",
					calories: 0,
					spiciness: 0,
					ingredients: "string"
				}
			]
		}
	})
}

console.log("heyye--", JSON.stringify(getData(drinks)))
