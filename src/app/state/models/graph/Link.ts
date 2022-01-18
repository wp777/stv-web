export interface Link {
    id: number;
    source: number;
    target: number;
    str: 0 | 1;
    
    [key: string]: any;
    T: string[];
}
