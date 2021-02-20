export class InputFileReader {
    
    static async read(file: File): Promise<string> {
        const arrayBuffer = await file.arrayBuffer();
        const textDecoder = new TextDecoder("utf-8");
        const fileContent = textDecoder.decode(arrayBuffer);
        return fileContent;
    }
    
}
