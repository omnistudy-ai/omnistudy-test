// Langchain File Loader class imports
import {   PDFLoader    } from "langchain/document_loaders/fs/pdf";
import {   TextLoader   } from "langchain/document_loaders/fs/text";
import {   DocxLoader   } from "langchain/document_loaders/fs/docx"
import {   CSVLoader    } from "langchain/document_loaders/fs/csv";
import {   JSONLoader   } from "langchain/document_loaders/fs/json";

// Langchain Text Splitter class imports
import { RecursiveCharacterTextSplitter, TextSplitter } from "langchain/dist/text_splitter";

// Custom file loader class
// This class is used to load and parse files
// It also handles splitting the file data into chunks
// This class automatically determines which loader to use based on the file type
export class FileLoader {
    // Constructor
    constructor(file: File) {
        this.setLoaderFromFiletype(file);
        // Set default text splitter
        this.textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: this.chunkSize,
            chunkOverlap: 0
        });
    }

    // Determine which loader to use based on filetype
    setLoaderFromFiletype(file: File): void {
        if(file.type == "pdf")
            this.loader = new PDFLoader(file);
        else if(file.type == "txt")
            this.loader = new TextLoader(file);
        else if(file.type == "docx")
            this.loader = new DocxLoader(file);
        else if(file.type == "csv")
            this.loader = new CSVLoader(file);
        else if(file.type == "json")
            this.loader = new JSONLoader(file);
        else
            this.loader = null;
    }

    // Parse and split the file data
    async load(): Promise<void> {
        if(this.loader) {
            this.data = await this.loader.load();
            this.splitData = await this.textSplitter.splitDocuments(this.data);
        }
    }

    // Update the text splitting method
    setTextSplitter(textSplitter: TextSplitter) {
        this.textSplitter = textSplitter;
    }
    
    // Update the text splitting chunk size
    setSplitChunkSise(chunkSize: number) {
        this.chunkSize = chunkSize;
    }

    private loader: SupportedFileLoader = null;
    private data: any;
    private splitData: any;
    private textSplitter: TextSplitter;
    private chunkSize: number = 500;
}

// Supported file loaders type
type SupportedFileLoader = null
    | PDFLoader
    | TextLoader
    | DocxLoader
    | CSVLoader
    | JSONLoader;
