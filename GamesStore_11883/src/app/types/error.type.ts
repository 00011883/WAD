export type Errors = {
  required: boolean;
  email: boolean;
  minlength: { actualLength: number; requiredLength: number };
  maxlength: { actualLength: number; requiredLength: number };
};
