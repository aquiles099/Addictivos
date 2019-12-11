export class PriceOptionResquestModel {
  id: number;
  original: number;
  discount: number;
  limit: number;
  description: string;
  effective_date: string;
  closing_date: string;
  status: number;
  deal_id: number;
  gift_title: string;
  user_gift_limit: number;
  user_purchase_limit: number;
  user_purchase_gift_limit: number;
  courtesy: number;
  purchase_activation: number;
}
