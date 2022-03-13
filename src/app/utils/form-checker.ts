import { AbstractControl } from '@angular/forms';

export default class FormChecker {
  static cnpj(control: AbstractControl): any {
    if (!control.value) {
      return null;
    }

    const validateCNPJ = (value: number | string): boolean => {
      if (!value) {
        return true;
      }

      const validateType = typeof value !== 'string';

      if (validateType) {
        return false;
      }

      const numbers = value.toString().match(/\d/g)?.map(Number);

      if (numbers?.length !== 14) {
        return false;
      }

      const items = [...new Set(numbers)];
      if (items.length === 1) {
        return false;
      }

      const calc = (x: any) => {
        const slice = numbers.slice(0, x);
        let factor = x - 7;
        let sum = 0;

        for (let i = x; i >= 1; i--) {
          const n = slice[x - i];
          sum += n * factor--;
          if (factor < 2) {
            factor = 9;
          }
        }

        const result = 11 - (sum % 11);

        return result > 9 ? 0 : result;
      };

      const digits = numbers.slice(12);

      const digit0 = calc(12);
      if (digit0 !== digits[0]) {
        return false;
      }

      const digit1 = calc(13);
      return digit1 === digits[1];
    };

    const isValid = validateCNPJ(control.value);

    if (isValid) {
      return null;
    }

    return {
      invalidCnpj: !isValid,
    };
  }
}
