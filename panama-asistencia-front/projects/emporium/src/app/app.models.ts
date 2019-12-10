export class Category {
  constructor(
    public id: number, 
    public name:string, 
    public hasSubCategory: boolean,
    public parentId: number
    ){}
}

export class Product {
  constructor(
    public id: number,
    public name: string,
    public images: Array<any>,
    public oldPrice: number,
    public newPrice: number,
    public discount: number,
    public ratingsCount: number,
    public ratingsValue: number,
    public description: string,
    public availibilityCount: number,
    public cartCount: number,
    public color: Array<string>,
    public size: Array<string>,
    public weight: number,
    public categoryId: number
    ){}
}

export class Deal{
  constructor(
    public id:number,
    public short_title: string,
    public long_title: string,
//    public avatar_file_size: number,
    public effective_date: Date,
    public deal_total_limit: number,
    public users_purchase_limit: number,
    public short_description: string,
    public long_description:string,
    public restrictions:string,
//    public commerce_id:number,
    public category_id:number,
//    public slug:string,
    public closing_date: Date,
    public is_public: boolean,
    public available_until: Date,
    public gift_title:string,
    public user_gift_limit:number,
    public discount:number,
//    public images_deal:number,
    public payment_type:string,
//    public deal_type_id: number,
    public comission:number,
    public avatar_file_name: string,
//    public seller_id:number, 
    public img: string,
    public option_pricings: Array<OptionPrice>,
    ){}
}

export class OptionPrice {
  constructor(
    public id:number,
    public original:number,
    public discount: number,
    public limit: number,
    public description:string,
    public effective_date: string,
    public closing_date: string,
    public status:number,
    public deal_id:number,
    public user_purchase_limit:number,
    public user_purchase_gift_limit:number,
    public courtesy:number,
    public purchase_activation:number,
    public created_at: Date,
    public updated_at: Date,
  ){}
}

export class Branch {
  constructor(
    public id: number,
    public name: string,
    public latitude: string,
    public longitude: string,
    public address: string,
    public schedule:string,
    public commerce_id:number,
    public allday:number,
  ){}
}

export class Days {
  constructor(
    public day: string,
    public schedule: string,
  ){}
}

export class Card {
  constructor(
    public user_id: number,
    public card_number: string,
    public card_type: number,
    public card_status: number,
    public card_token: string,
    public card_expiration_date: string,
  ){}
}

export class Purchase {
  constructor (
    public amount: number,
    public user_card_id: number,
    public deal_id: number,
    public option_pricing_id: number,
    public quantity: number,
    public user_id: number,
    public beneficiary_name: string,
    public beneficiary_email: string,
    public beneficiary_note: string,
    public device: string,
    public so: string,
    public payment_platform_id: number,
    public version:string,
    public ip: string,
    public navigator: string,
    public branch_id: number
  ){}
}

/*
    beneficiary_email: "root@mail.com"
    beneficiary_name: "root"
    beneficiary_note: "the note"
    branch_id: 1
    claimed_at: "2018/10/20"
    created_at: "2019-11-11 15:44:06"
    deal_id: 3
    discount: "0"
    id: 17
    ip: "190.204.65.173"
    is_claimed: "0"
    navigator: "Chrome"
    option_pricing_id: 4
    order_key: ""
    payment_platform_id: 1
    quantity: 1
    quantity_gift: 0
    quantity_reclaimed: "0"
    saleman_id: 1
    so: "Linux"
    status: 2
    subtotal: 30
    total: 30
    transaction_type: 1
    unit_price: 30
    updated_at: "2019-11-11 15:44:06"
    user_card_id: 13
    user_id: 1
    version: "version"
*/
