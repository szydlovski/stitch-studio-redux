import { encode as qs } from 'node:querystring';

export class EtsyApiClient {
	public constructor(private readonly apiKey: string) {}
	private fetch<T = any>(url: string, init?: RequestInit) {
		return fetch(`https://openapi.etsy.com/v3/${url}`, {
			...init,
			headers: { ...init?.headers, 'x-api-key': this.apiKey },
		}).then((response) => {
			if (!response.ok) throw new Error(response.statusText);
			return response.json() as Promise<T>;
		});
	}
	public createListing(shopId: string, body: CreateListingBody) {
		return this.fetch<CreateListingResponse>(
			`application/shops/${shopId}/listings`,
			{
				method: 'POST',
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
	}
	public getListing(
		listingId: string,
		{ includes, language }: GetListingParameters = {}
	) {
		return this.fetch<GetListingResponse>(
			`application/listings/${listingId}?${qs({ includes, language })}`
		);
	}
	public findAllActiveListingsByShop(
		shopId: number,
		{
			limit,
			sort_on,
			sort_order,
			offset,
			keywords,
		}: FindAllActiveListingsByShopParameters = {}
	) {
		return this.fetch<FindAllActiveListingsByShopResponse>(
			`application/shops/${shopId}/listings/active?${qs({
				limit,
				sort_on,
				sort_order,
				offset,
				keywords,
			})}`
		);
	}
}

interface FindAllActiveListingsByShopParameters {
	limit?: number;
	sort_on?: 'created' | 'price' | 'updated' | 'score';
	sort_order?: 'asc' | 'desc';
	offset?: number;
	keywords?: string;
}

interface FindAllActiveListingsByShopResponse {
	count: number;
	results: FindListingsItem[];
}

type GetListingInclude =
	| 'Shipping'
	| 'Images'
	| 'Shop'
	| 'User'
	| 'Translations'
	| 'Inventory'
	| 'Videos';

interface GetListingParameters {
	includes?: GetListingInclude[];
	language?: string;
}

type WhoMade = 'i_did' | 'someone_else' | 'collective';

type WhenMade =
	| 'made_to_order'
	| '2020_2024'
	| '2010_2019'
	| '2005_2009'
	| 'before_2005'
	| '2000_2004'
	| '1990s'
	| '1980s'
	| '1970s'
	| '1960s'
	| '1950s'
	| '1940s'
	| '1930s'
	| '1920s'
	| '1910s'
	| '1900s'
	| '1800s'
	| '1700s'
	| 'before_1700';

type ItemDimensionsUnit = 'in' | 'ft' | 'mm' | 'cm' | 'm' | 'yd' | 'inches';

type ItemWeightUnit = 'oz' | 'lb' | 'g' | 'kg';

type ListingType = 'physical' | 'digital';
interface ListingPersonalization {
	is_personalizable: boolean;
	personalization_is_required: boolean;
	personalization_char_count_max: number;
	personalization_instructions: string;
}
interface ListingMeasurements {
	item_weight: number;
	item_length: number;
	item_width: number;
	item_height: number;
	item_weight_unit: ItemWeightUnit;
	item_dimensions_unit: ItemDimensionsUnit;
}

interface ListingTimestamps {
	creation_timestamp: number;
	created_timestamp: number;
	ending_timestamp: number;
	original_creation_timestamp: number;
	last_modified_timestamp: number;
	updated_timestamp: number;
	state_timestamp: number;
}

interface ListingCategorization {
	is_supply: boolean;
	tags: string[];
	style: string[];
	materials: string[];
}

interface ListingPrice {
	amount: number;
	divisor: number;
	currency_code: string;
}

interface ListingShipping {
	shipping_profile_id: number;
	return_policy_id: number;
	processing_min: number;
	processing_max: number;
}

interface CreateListingBody
	extends Partial<ListingMeasurements>,
		Partial<ListingPersonalization>,
		Partial<ListingCategorization>,
		Partial<ListingShipping> {
	title: string;
	description: string;

	price: number;
	quantity: number;

	who_made: WhoMade;
	when_made: WhenMade;
	taxonomy_id: number;

	shop_section_id?: number;
	type?: ListingType;
	image_ids?: number[];

	product_partner_ids?: number[];
	is_customizable?: boolean;
	is_taxable?: boolean;
}

interface BaseListing {
	title: string;
	description: string;
	price: ListingPrice;
	quantity: number;
	url: string;
	shop_section_id: number;
	taxonomy_id: number;
	listing_id: number;
	user_id: number;
	shop_id: number;
	state: string;
	who_made: string;
	when_made: string;
	featured_rank: number;
	non_taxable: boolean;
	is_taxable: boolean;
	is_customizable: boolean;
	listing_type: string;
	is_private: boolean;
	file_data: string;
	has_variations: boolean;
	should_auto_renew: boolean;
	language: string;
	num_favorers: number;
}

interface FindListingsItem
	extends BaseListing,
		ListingMeasurements,
		ListingPersonalization,
		ListingTimestamps,
		ListingCategorization,
		ListingShipping {}

interface CreateListingResponse
	extends BaseListing,
		ListingMeasurements,
		ListingPersonalization,
		ListingTimestamps,
		ListingCategorization,
		ListingShipping {}

export interface GetListingResponse
	extends BaseListing,
		ListingShipping,
		ListingPersonalization,
		ListingTimestamps,
		ListingCategorization,
		ListingMeasurements {
	skus: string[];
	views: number;
	images: ListingImage[];
}

interface ListingImage {
	listing_id: number;
	listing_image_id: number;
	hex_code: string;
	red: number;
	green: number;
	blue: number;
	hue: number;
	saturation: number;
	brightness: number;
	is_black_and_white: boolean;
	creation_tsz: number;
	created_timestamp: number;
	rank: number;
	url_75x75: string;
	url_170x135: string;
	url_570xN: string;
	url_fullxfull: string;
	full_height: number;
	full_width: number;
	alt_text: string;
}

// const extra = {
// 	shipping_profile: {
// 		shipping_profile_id: 1,
// 		title: 'string',
// 		user_id: 1,
// 		min_processing_days: 0,
// 		max_processing_days: 0,
// 		processing_days_display_label: 'string',
// 		origin_country_iso: 'string',
// 		is_deleted: true,
// 		shipping_profile_destinations: [
// 			{
// 				shipping_profile_destination_id: 1,
// 				shipping_profile_id: 1,
// 				origin_country_iso: 'string',
// 				destination_country_iso: 'string',
// 				destination_region: 'eu',
// 				primary_cost: {
// 					amount: 0,
// 					divisor: 0,
// 					currency_code: 'string',
// 				},
// 				secondary_cost: {
// 					amount: 0,
// 					divisor: 0,
// 					currency_code: 'string',
// 				},
// 				shipping_carrier_id: 0,
// 				mail_class: 'string',
// 				min_delivery_days: 1,
// 				max_delivery_days: 1,
// 			},
// 		],
// 		shipping_profile_upgrades: [
// 			{
// 				shipping_profile_id: 1,
// 				upgrade_id: 1,
// 				upgrade_name: 'string',
// 				type: '0',
// 				rank: 0,
// 				language: 'string',
// 				price: {
// 					amount: 0,
// 					divisor: 0,
// 					currency_code: 'string',
// 				},
// 				secondary_price: {
// 					amount: 0,
// 					divisor: 0,
// 					currency_code: 'string',
// 				},
// 				shipping_carrier_id: 0,
// 				mail_class: 'string',
// 				min_delivery_days: 1,
// 				max_delivery_days: 1,
// 			},
// 		],
// 		origin_postal_code: 'string',
// 		profile_type: 'manual',
// 		domestic_handling_fee: 0,
// 		international_handling_fee: 0,
// 	},
// 	user: {
// 		user_id: 1,
// 		primary_email: 'user@example.com',
// 		first_name: 'string',
// 		last_name: 'string',
// 		image_url_75x75: 'string',
// 	},
// 	shop: {
// 		shop_id: 1,
// 		user_id: 1,
// 		shop_name: 'string',
// 		create_date: 0,
// 		created_timestamp: 0,
// 		title: 'string',
// 		announcement: 'string',
// 		currency_code: 'string',
// 		is_vacation: true,
// 		vacation_message: 'string',
// 		sale_message: 'string',
// 		digital_sale_message: 'string',
// 		update_date: 0,
// 		updated_timestamp: 0,
// 		listing_active_count: 0,
// 		digital_listing_count: 0,
// 		login_name: 'string',
// 		accepts_custom_requests: true,
// 		policy_welcome: 'string',
// 		policy_payment: 'string',
// 		policy_shipping: 'string',
// 		policy_refunds: 'string',
// 		policy_additional: 'string',
// 		policy_seller_info: 'string',
// 		policy_update_date: 0,
// 		policy_has_private_receipt_info: true,
// 		has_unstructured_policies: true,
// 		policy_privacy: 'string',
// 		vacation_autoreply: 'string',
// 		url: 'string',
// 		image_url_760x100: 'string',
// 		num_favorers: 0,
// 		languages: ['string'],
// 		icon_url_fullxfull: 'string',
// 		is_using_structured_policies: true,
// 		has_onboarded_structured_policies: true,
// 		include_dispute_form_link: true,
// 		is_direct_checkout_onboarded: true,
// 		is_etsy_payments_onboarded: true,
// 		is_calculated_eligible: true,
// 		is_opted_in_to_buyer_promise: true,
// 		is_shop_us_based: true,
// 		transaction_sold_count: 0,
// 		shipping_from_country_iso: 'string',
// 		shop_location_country_iso: 'string',
// 		review_count: 0,
// 		review_average: 0,
// 	},
// 	images: [
// 		{
// 			listing_id: 1,
// 			listing_image_id: 1,
// 			hex_code: 'string',
// 			red: 0,
// 			green: 0,
// 			blue: 0,
// 			hue: 0,
// 			saturation: 0,
// 			brightness: 0,
// 			is_black_and_white: true,
// 			creation_tsz: 0,
// 			created_timestamp: 0,
// 			rank: 0,
// 			url_75x75: 'string',
// 			url_170x135: 'string',
// 			url_570xN: 'string',
// 			url_fullxfull: 'string',
// 			full_height: 0,
// 			full_width: 0,
// 			alt_text: 'string',
// 		},
// 	],
// 	videos: [
// 		{
// 			video_id: 1,
// 			height: 0,
// 			width: 0,
// 			thumbnail_url: 'string',
// 			video_url: 'string',
// 			video_state: 'active',
// 		},
// 	],
// 	inventory: {
// 		products: [
// 			{
// 				product_id: 1,
// 				sku: 'string',
// 				is_deleted: true,
// 				offerings: [
// 					{
// 						offering_id: 1,
// 						quantity: 0,
// 						is_enabled: true,
// 						is_deleted: true,
// 						price: {
// 							amount: 0,
// 							divisor: 0,
// 							currency_code: 'string',
// 						},
// 					},
// 				],
// 				property_values: [
// 					{
// 						property_id: 1,
// 						property_name: 'string',
// 						scale_id: 1,
// 						scale_name: 'string',
// 						value_ids: [1],
// 						values: ['string'],
// 					},
// 				],
// 			},
// 		],
// 		price_on_property: [0],
// 		quantity_on_property: [0],
// 		sku_on_property: [0],
// 	},
// 	production_partners: [
// 		{
// 			production_partner_id: 1,
// 			partner_name: 'string',
// 			location: 'string',
// 		},
// 	],
// 	translations: {
// 		de: {
// 			listing_id: 1,
// 			language: 'string',
// 			title: 'string',
// 			description: 'string',
// 			tags: ['string'],
// 		},
// 		'en-GB': {
// 			listing_id: 1,
// 			language: 'string',
// 			title: 'string',
// 			description: 'string',
// 			tags: ['string'],
// 		},
// 		'en-IN': {
// 			listing_id: 1,
// 			language: 'string',
// 			title: 'string',
// 			description: 'string',
// 			tags: ['string'],
// 		},
// 		'en-US': {
// 			listing_id: 1,
// 			language: 'string',
// 			title: 'string',
// 			description: 'string',
// 			tags: ['string'],
// 		},
// 		es: {
// 			listing_id: 1,
// 			language: 'string',
// 			title: 'string',
// 			description: 'string',
// 			tags: ['string'],
// 		},
// 		fr: {
// 			listing_id: 1,
// 			language: 'string',
// 			title: 'string',
// 			description: 'string',
// 			tags: ['string'],
// 		},
// 		it: {
// 			listing_id: 1,
// 			language: 'string',
// 			title: 'string',
// 			description: 'string',
// 			tags: ['string'],
// 		},
// 		ja: {
// 			listing_id: 1,
// 			language: 'string',
// 			title: 'string',
// 			description: 'string',
// 			tags: ['string'],
// 		},
// 		nl: {
// 			listing_id: 1,
// 			language: 'string',
// 			title: 'string',
// 			description: 'string',
// 			tags: ['string'],
// 		},
// 		pl: {
// 			listing_id: 1,
// 			language: 'string',
// 			title: 'string',
// 			description: 'string',
// 			tags: ['string'],
// 		},
// 		pt: {
// 			listing_id: 1,
// 			language: 'string',
// 			title: 'string',
// 			description: 'string',
// 			tags: ['string'],
// 		},
// 		ru: {
// 			listing_id: 1,
// 			language: 'string',
// 			title: 'string',
// 			description: 'string',
// 			tags: ['string'],
// 		},
// 	},
// };
