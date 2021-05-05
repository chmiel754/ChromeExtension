export interface ZalandoItemOrderMutation {
  id: string;
  variables: {
    addToCartInput: {
      productId: string;
      clientMutationId: string;
    },
  };
}
