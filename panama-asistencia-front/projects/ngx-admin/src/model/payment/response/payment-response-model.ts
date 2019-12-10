import { PaymentRequestModel } from '../request/payment-request.model';
import { PaymentResponseModel } from './payment-response.model';

export class ResponseModel {
  item: Array<PaymentResponseModel>;
}
