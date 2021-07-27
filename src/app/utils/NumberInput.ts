export class NumberInput {
    
    static fixIntValueFromMinMax(input: HTMLInputElement): void {
        const min = parseInt(input.min);
        const max = parseInt(input.max);
        let value = parseInt(input.value);
        if (isNaN(value)) {
            value = 0;
        }
        if (!isNaN(min)) {
            value = Math.max(min, value);
        }
        if (!isNaN(max)) {
            value = Math.min(max, value);
        }
        input.value = value.toString();
    }
    
}
