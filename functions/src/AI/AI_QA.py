#env + system imports
from dotenv import load_dotenv
import os
import sys
import json
#pincone
import pinecone  
from haystack.document_stores import PineconeDocumentStore
from haystack.pipelines import DocumentSearchPipeline
from haystack.nodes import EmbeddingRetriever
from haystack.pipelines import DocumentSearchPipeline
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

class QA:
    def __init__(self):
        self.pinecone_api_key=""
        self.huggingface_api_token=""
        self.document_store=None
        self.search_pipe=None
        self.QA_pipeline=None
        self.search_pipe=None
    def init_document_store(self,index_name,namespace):
        #Initialize the pinecone index
        pinecone.init(      
        api_key=self.pinecone_api_key,      
        environment='gcp-starter'      
        )      
        index = pinecone.Index(index_name=index_name)
        #Initialize the haystack document store object
        self.document_store = PineconeDocumentStore(
        api_key=self.pinecone_api_key,
        pinecone_index=index,
        namespace=namespace
        similarity="cosine",
        embedding_dim=768
        )
    def Assign_API_Keys(self):
        #Load environment variables from .env file
        # (overide = true) just forces a reload on the .env file in case api key changes
        dotenv_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..','..','..', 'client', '.env')
        load_dotenv(dotenv_path,override=True)
        # Access the API key
        self.pinecone_api_key = os.getenv("PINECONE_API_KEY")
        self.huggingface_api_token = os.getenv("HUGGING_FACE_API_TOKEN")   
    def init_retriever(self):
        retriever = EmbeddingRetriever(
        document_store=self.document_store,
        embedding_model="flax-sentence-embeddings/all_datasets_v3_mpnet-base",
        model_format="sentence_transformers",
        )
        self.search_pipe = DocumentSearchPipeline(retriever=retriever)
    def retrieve_docs(self,query):
        docs = self.search_pipe.run(query=query, params={"Retriever": {"top_k": 2}})['documents']
        documents = []
        for doc in docs:
            documents.append(doc.content)
        return documents
    def run(self,query):
        supporting_docs = self.retrieve_docs(query)
        model_name = "vblagoje/bart_lfqa"
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
        conditioned_doc = "<P> " + " <P> ".join([d for d in supporting_docs])
        query_and_docs = "question: {} context: {}".format(query, conditioned_doc)
        model_input = tokenizer(query_and_docs, truncation=True, padding=True, return_tensors="pt")

        generated_answers_encoded = model.generate(
        input_ids=model_input["input_ids"],
        attention_mask=model_input["attention_mask"],
        min_length=64,
        max_length=256,
        do_sample=False, 
        early_stopping=True,
        num_beams=8,
        temperature=1.0,
        eos_token_id=tokenizer.eos_token_id,
        no_repeat_ngram_size=3,
        num_return_sequences=1
        )

        return tokenizer.batch_decode(generated_answers_encoded, skip_special_tokens=True,clean_up_tokenization_spaces=True)
    
    def init_QA(self,index_name,namespace):
        self.Assign_API_Keys()
        self.init_document_store(index_name,namespace=namespace)
        self.init_retriever()
        
if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())
    input = input_data.get('input')
    textbook = input_data.get('textbook')
    Bart = QA()
    Bart.init_QA(index_name='omnistudy',namespace=textbook)
    answer = Bart.run(query=input)
    print(json.dumps({'answer': answer}))







