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
    
    static isString(value: any): value is string {
        return typeof(value) === "string";
    }
    
    static isNonEmptyString(value: any): boolean {
        return this.isString(value) && value.length > 0;
    }
    
}
