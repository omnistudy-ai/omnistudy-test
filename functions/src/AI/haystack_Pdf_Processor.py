#env + system imports
import os
from dotenv import load_dotenv
#pincone
import pinecone  
from haystack.document_stores import PineconeDocumentStore
from haystack.nodes import PDFToTextConverter, PreProcessor, EmbeddingRetriever



class FileUpload:
    def __init__(self):
        self.pinecone_api_key = None
        self.huggingface_api_token = None
        self.document_store = None  
        self.docs = None  
    def access_key(self):
        # load env elements (api key)
        load_dotenv(override=True)
        # Access the API key
        self.pinecone_api_key = os.getenv("PINECONE_API_KEY")
        self.huggingface_api_token = os.getenv("HUGGING_FACE_API_TOKEN")

        # Check user access to api_keys
        if self.pinecone_api_key is None or self.huggingface_api_token is None:
            return False
        else:
            return True
    def init_index(self):
        # Initialize the pinecone index
        index_name='haystack'
        pinecone.init(      
        api_key=self.pinecone_api_key,      
        environment='gcp-starter'      
        )      
        index = pinecone.Index(index_name=index_name)

        # Initialize the haystack document store object
        self.document_store = PineconeDocumentStore(
        api_key=self.pinecone_api_key,
        pinecone_index=index,
        similarity="cosine",
        embedding_dim=768
    )
    def preprocess_text(self,path):
        converter = PDFToTextConverter(remove_numeric_tables=True, valid_languages=["en"])
        doc_pdf = converter.convert(file_path=path, meta=None)[0]
        preprocessor = PreProcessor(
        clean_empty_lines=True,
        clean_whitespace=True,
        clean_header_footer=False,
        split_by="word",
        split_length=500,
        split_respect_sentence_boundary=True,    #prevents sentences from being cut off
        )
        self.docs = preprocessor.process([doc_pdf])
    def init_retriever(self):
        self.retriever = EmbeddingRetriever(
        document_store=self.document_store,
        embedding_model="flax-sentence-embeddings/all_datasets_v3_mpnet-base",
        model_format="sentence_transformers",
        top_k=2
        )
    def is_file_path_real(file_path):
        return os.path.exists(file_path)
    def embed_retriever(self):
        #Embed data
        batch_size = 256
        total_doc_count = len(self.docs)
        counter = 0
        embedded_Docs = []
        for doc in self.docs:
            embedded_Docs.append(doc)
            counter += 1
            if counter % batch_size == 0 or counter == total_doc_count:
                embeds = self.retriever.embed_documents(embedded_Docs)
                for i, doc in enumerate(embedded_Docs):
                    doc.embedding = embeds[i]
                self.document_store.write_documents(embedded_Docs)
                embedded_Docs.clear()
            if counter == total_doc_count:
                break
    def upload(self,path):
        if not self.is_file_path_real(path):
           raise ValueError("Invalid Path to File")
        if not self.access_key():
           raise ValueError("Invalid Access to API Key")
        self.init_index()
        print("Initialization of index completed.")
        self.preprocess_text(path)
        print("Text preprocessing completed.")
        self.init_retriever()
        print("Retriever initialization completed.")
        print("Begin retriever embedding, this will take some time")
        self.embed_retriever()
        print("Finished! The Pinecone Index should be usable")



    
if __name__=="__main__":
    # Freeze support is reccommended for multiprocessing
    # from multiprocessing import freeze_support
    # freeze_support()

    # Designate the desired file path
    file_path = "/path/to/your/file.pdf"  
    # create a FileUpload object
    uploader = FileUpload()
    # use the upload method to upload your file to Pinecone
    uploader.upload(file_path)
    