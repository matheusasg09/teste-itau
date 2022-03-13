import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  template: '',
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class CustomInput
  implements OnInit, AfterViewInit, ControlValueAccessor
{
  @Input() required!: string;
  @Output() changed = new EventEmitter<any>();
  @Output() selectionChange = new EventEmitter<any>();

  wasValidated = false;
  control = new FormControl(null);
  errorList: string[] = [];

  get value(): any {
    return this.control.value;
  }

  get isRequired(): boolean {
    const isNull = this.required == null;

    if (isNull) {
      return false;
    }

    const isEmpty = this.required === '';

    if (isEmpty) {
      return true;
    }

    return !!this.required;
  }

  constructor(
    @Self() @Optional() protected ngControl: NgControl,
    protected changeDetectorRef?: ChangeDetectorRef
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  onChange: (_: any) => void = () => {};
  onTouched: (_: any) => void = () => {};

  ngOnInit(): void {
    this.registerChanges();
  }

  ngAfterViewInit(): void {
    this.registerValidators();
    this.registerErrors();

    this.linkValidatorsAndErrors();
  }

  linkValidatorsAndErrors(): void {
    this.control.valueChanges.subscribe(() => {
      this.replaceErrors();
    });
  }

  registerChanges(): void {
    this.control.valueChanges.subscribe((value: any) => {
      this.onChange(value);
    });
  }

  registerErrors(): void {
    this.ngControl?.control?.statusChanges?.subscribe(() => {
      this.replaceErrors();
    });
  }

  replaceErrors(): void {
    if (this.ngControl?.control) {
      const mergedErrors = {
        ...this.ngControl.control.errors,
        ...this.control.errors,
      };

      const localErrors = Object.keys(mergedErrors)
        .filter((e) => this.errorList.includes(e))
        .reduce((a, e) => ({ ...a, [e]: mergedErrors[e] }), {});

      const formattedErrors = {
        ...this.ngControl.control.errors,
        ...localErrors,
      };

      const errorsLength = Object.keys(formattedErrors || {}).length;

      if (errorsLength !== 0) {
        this.control.setErrors(formattedErrors);
      } else {
        this.control.setErrors(null);
      }
    }
  }

  registerValidators(): void {
    if (this.ngControl?.control) {
      const { validator } = this.ngControl.control;
      const controlValidator = this.control.validator;
      const validators = [
        ...this.formatValidator(validator),
        ...this.formatValidator(controlValidator),
      ];

      this.control.setValidators(validators);
      this.ngControl.control.setValidators(validators);
    }
  }

  validateField(): void {
    this.control.updateValueAndValidity();
    this.wasValidated = true;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  writeValue(newValue: any): void {
    this.control.setValue(newValue);
  }

  private formatValidator(validator: any): any[] {
    return (Array.isArray(validator) ? validator : [validator]).filter(Boolean);
  }
}
