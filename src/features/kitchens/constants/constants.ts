const PARAM_URL = {
  KICTHENS: "kitchens",
  KITCHENS_BY_ID: `kitchens/@0`,
  PLANS: "plans",
  MEALS: "meals/kitchen/@0",
};
//'credit', 'debit', 'cash', 'upi'
const KITCHEN_LOOKUPS = {
  KITCHEN_TYPES: [
    {
      label: "Veg",
      value: "veg",
    },
    { label: "Non-Veg", value: "nonVeg" },
  ],
  PAYMENTS_TYPES: [
    {
      label: "Credit Card",
      value: "credit",
    },
    {
      label: "Debit Card",
      value: "debit",
    },
    {
      label: "UPI",
      value: "upi",
    },
  ],
};

export { PARAM_URL, KITCHEN_LOOKUPS };
