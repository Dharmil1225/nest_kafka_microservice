export class CreateBillingDto {
  readonly amount: number;
  readonly orderId: number;
}

export class UpdateBillingDto {
  readonly amount?: number;
}
