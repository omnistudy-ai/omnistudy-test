#env + system imports
from dotenv import load_dotenv
import os
import sys
import json
#pincone
import pinecone  
from transformers import pipeline

class Summarizer:
    def __init__(self):
        self.pinecone_api_key=""
        self.huggingface_api_token=""
        self.index=None
    def init_index(self,index_name):
        #Initialize the pinecone index
        pinecone.init(      
        api_key=self.pinecone_api_key,      
        environment='gcp-starter'      
        )      
        self.index = pinecone.Index(index_name=index_name)
    def Assign_API_Keys(self):
        #Load environment variables from .env file
        # (overide = true) just forces a reload on the .env file in case api key changes
        dotenv_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..','..','..', 'client', '.env')
        load_dotenv(dotenv_path,override=True)
        # Access the API key
        self.pinecone_api_key = os.getenv("PINECONE_API_KEY")
        self.huggingface_api_token = os.getenv("HUGGING_FACE_API_TOKEN")   
    def retrieve_docs(self,namespace,begin_page,end_page):
        query_vector = [0.1] * 768
        data = self.index.query(
            namespace=namespace,
            vector=query_vector,
            filter={
                "$and": [
                    {"page": {"$gte": begin_page}},
                    {"page": {"$lte": end_page}}
                ]
            },
            top_k=100,
            include_metadata=True,
        )
        sorted_docs = sorted(data['matches'], key=lambda x: x['metadata']['page'])
        relevant_docs = []
        for doc in sorted_docs:
            content = doc['metadata']['content']
            relevant_docs.append(content)
        return relevant_docs
    def run(self,namespace,Concise,begin_page,end_page):
        summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
        relevant_docs = self.retrieve_docs(namespace=namespace,begin_page=begin_page,end_page=end_page)

        #Condense summaries to an indepth or concise summary and append to summ_docs list
        #In_Depth : generates summaries and 
        relevant_docs_length = len(relevant_docs)
        summ_docs = []
        total_text = ""
        text_to_summ = ""

        groups = relevant_docs_length / 4
        remainder = relevant_docs_length % 4
            
        if (groups <= 1):
            for i in range(relevant_docs_length):
                summ_text = summarizer(relevant_docs[i], max_length=150, min_length=40, do_sample=False)
                total_text += summ_text[0].get("summary_text")
            #Concise
            if (Concise):
                summ_all_text = summarizer(total_text, max_length=200, min_length=100, do_sample=False)
                return [summ_all_text[0].get("summary_text")]
            else:
                #In_depth
                return [total_text]
        else:
            j = 1
            for i in range(relevant_docs_length):
                summ_text = summarizer(relevant_docs[i], max_length=150, min_length=40, do_sample=False)
                total_text += summ_text[0].get("summary_text")
                if (Concise):
                    text_to_summ += summ_text[0].get("summary_text")
                    if j == 4:
                        j=0
                        summ_all_text = summarizer(text_to_summ, max_length=200, min_length=100, do_sample=False)
                        summ_docs.append(summ_all_text[0].get("summary_text"))
                        text_to_summ = ""
                    else:
                        if j == 4:
                            j=0
                            summ_docs.append(total_text)
                            total_text = ""
                    j+=1 
                if (Concise):
                    if (text_to_summ != ""):
                        if (remainder == 1):
                            summ_docs.append(text_to_summ)
                        else:
                            summ_all_text = summarizer(text_to_summ, max_length=200, min_length=20, do_sample=False)
                            summ_docs.append(summ_all_text[0].get("summary_text"))
                else:
                    if (total_text!=""):
                        summ_docs.append(total_text)
                return summ_docs
    def init_Summarizer(self,index_name):
        self.Assign_API_Keys()
        self.init_index(index_name)
        
if __name__ == "__main__":
    # input_data = json.loads(sys.stdin.read())
    # textbook = input_data.get('textbook')        #namespace for textbook
    # type = input_data.get('type')                #string either concise or any val
    textbook = "testing_cv"
    type = "concise"
    # begin_page = input_data.get('begin_page')    #int
    # end_page = input_data.get('end_page')        #int
    begin_page = 1
    end_page = 1
    if (type=="concise"):
        concise = True
    else:
        concise = False
    Bart = Summarizer()
    Bart.init_Summarizer(index_name='omnistudy')
    answer = Bart.run(namespace=textbook,concise=concise,begin_page=begin_page,end_page=end_page)
    print(json.dumps({'answer': answer}))







