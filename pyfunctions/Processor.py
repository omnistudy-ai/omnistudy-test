import os
from dotenv import load_dotenv
from pinecone import Pinecone, PodSpec
from haystack.document_stores import PineconeDocumentStore
from haystack.nodes import PDFToTextConverter, PreProcessor, EmbeddingRetriever
import json
import sys

class Processor:
    """This class is responsible for processing the PDF file and initializing the pinecone index."""

    def __init__(self):
        """Processor class constructor"""
        self.index_name = 'omnistudy'
        self.pinecone_api_key = None
        self.huggingface_api_token = None
        self.document_store = None  
        self.docs = None
        self.pc = Pinecone(api_key="d8412dc6-f006-4fc7-b055-e389b2ca80a1")

    def access_key(self):
        self.pinecone_api_key = "d8412dc6-f006-4fc7-b055-e389b2ca80a1"

        if self.pinecone_api_key is None and self.huggingface_api_token is None:
            return False
        else:
            return True

    def init_index(self):
        """Initialize the pinecone index and the haystack document store object."""
        # Initialize the pinecone index
        self.index = self.pc.list_indexes().indexes[0]
        print(self.index)
        # self.index = self.pc.create_index(
        #     name=self.index_name,
        #     metric="cosine",
        #     dimension=768,
        #     spec=PodSpec(
        #         environment="gcp-starter",
        #     )
        # )

        # Initialize the haystack document store object
        self.document_store = PineconeDocumentStore(
            api_key=self.pinecone_api_key,
            pinecone_index=self.index,
            similarity="cosine",
            embedding_dim=768
        )

    def preprocess_text(self, path):
        converter = PDFToTextConverter(remove_numeric_tables=True, valid_languages=["en"])
        doc_pdf = converter.convert(file_path=path, meta=None)[0]
        preprocessor = PreProcessor(
            clean_empty_lines=True,
            clean_whitespace=True,
            clean_header_footer=False,
            split_by="word",
            split_length=500,
            split_respect_sentence_boundary=True,  # Prevents sentences from being cut off
        )
        self.docs = preprocessor.process([doc_pdf])

    def init_retriever(self):
        self.retriever = EmbeddingRetriever(
            document_store=self.document_store,
            embedding_model="flax-sentence-embeddings/all_datasets_v3_mpnet-base",
            model_format="sentence_transformers",
            top_k=2
        )

    def is_file_path_real(self, file_path):
        return True
    
    def embed_retriever(self, namespace):
        # Embed data
        batch_size = 64
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
                self.document_store.write_documents(embedded_Docs,namespace=namespace)
                embedded_Docs.clear()
            if counter == total_doc_count:
                break
        
    def upload(self,path,textbook_name):
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
        self.embed_retriever(namespace=textbook_name)

        print("Finished! The Pinecone Index should be usable")

if __name__=="__main__":
    # Freeze support is reccommended for multiprocessing
    # from multiprocessing import freeze_support
    # freeze_support()

    print("Starting the upload process")

    # input_data = json.loads(sys.stdin.read())
    # file_path = input_data.get('input')
    # textbook = input_data.get('textbook')
    # create a FileUpload object
    processor = Processor()
    # use the upload method to upload your file to Pinecone
    processor.upload('./CV.pdf',textbook_name='testing_cv')