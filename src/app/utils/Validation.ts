import { ConfigProvider } from "../config.provider";

export class Validation {
    
    static isNumber(value: any): value is number {
        return typeof(value) === "number" && !isNaN(value);
    }
    
    static isInteger(value: any): boolean {
        return this.isNumber(value) && Number.isInteger(value);
    }
    
    static isPositiveInteger(value: any): boolean {
        return this.isInteger(value) && value > 0;
    }
    
    static isNonNegativeInteger(value: any): boolean {
        return this.isInteger(value) && value >= 0;
    }
    
    static isNegativeInteger(value: any): boolean {
        return this.isInteger(value) && value < 0;
    }
    
    static isNonPositiveInteger(value: any): boolean {
        return this.isInteger(value) && value <= 0;
    }
    
    static isIntegerInRange(value: number, min: number, max: number): boolean {
        if (isNaN(value)) {
            return false;
        }
        if (min !== ConfigProvider.UNLIMITED && value < min) {
            return false;
        }
        if (max !== ConfigProvider.UNLIMITED && value > max) {
            return false;
        }
        return true;
    }
    
    static isString(value: any): value is string {
        return typeof(value) === "string";
    }
    
    static isNonEmptyString(value: any): boolean {
        return this.isString(value) && value.length > 0;
    }
    
    static isStringLengthInRange(value: string, minLength: number, maxLength: number): boolean {
        const length = value.length;
        if (minLength !== ConfigProvider.UNLIMITED && length < minLength) {
            return false;
        }
        if (maxLength !== ConfigProvider.UNLIMITED && length > maxLength) {
            return false;
        }
        return true;
    }
    
}
