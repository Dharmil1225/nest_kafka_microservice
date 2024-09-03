export class CreateOrderDto {
  readonly product: string;
  readonly amount: number;
  readonly userId: string;
}

export class UpdateOrderDto {
  readonly product?: string;
  readonly amount?: number;
}
