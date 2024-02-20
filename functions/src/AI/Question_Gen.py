

from dotenv import load_dotenv
import os
import sys
import json
#pincone
from transformers import T5ForConditionalGeneration, T5TokenizerFast

#within folder
from Summarize import Summarizer
from AI_QA import QA

class question_gen:
    def __init__(self):
        self.huggingface_api_token=""
        self.index=None
        self.text_summ = []
    def Assign_API_Keys(self):
        #Load environment variables from .env file
        # (overide = true) just forces a reload on the .env file in case api key changes
        dotenv_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..','..','..', 'client', '.env')
        load_dotenv(dotenv_path,override=True)
        # Access the API key
        self.huggingface_api_token = os.getenv("HUGGING_FACE_API_TOKEN")  
    def Run_Summ(self,begin_page,end_page,textbook):
        #run summarization on the pages as input data for big boy question gen
        summ = Summarizer()
        summ.init_Summarizer(index_name="haystack")
        return summ.run(namespace=textbook,begin_page=begin_page,end_page=end_page,Concise=True) 
    def Run_Question_Gen(self,begin_page,end_page,textbook):
        answer_model = QA()
     
        text_summ = self.Run_Summ(textbook=textbook,begin_page=begin_page,end_page=end_page)
        question_answer = []

        for text in text_summ:
            question = self.run_gen(input_string=text)[0][0]
            questions = question.split("?")
            for q in questions:
                answer = answer_model.run_for_Summ(query=q,text=text_summ)[0]
                question_answer.append((q,answer))
        return question_answer
    
    def run_gen(self,input_string, **generator_args):
        tokenizer = T5TokenizerFast.from_pretrained("t5-base")
        hfmodel = T5ForConditionalGeneration.from_pretrained("ThomasSimonini/t5-end2end-question-generation")
        generator_args = {
            "max_length": 128,  # Adjust based on your model's capabilities
            "num_beams": 4,
            "length_penalty": 1.0,
            "no_repeat_ngram_size": 2,
            "early_stopping": True,
            }
        input_string = "generate questions: " + input_string + " </s>"
        input_ids = tokenizer.encode(input_string, return_tensors="pt")
        res = hfmodel.generate(input_ids, **generator_args)
        output = tokenizer.batch_decode(res, skip_special_tokens=True)
        output = [item.split("<sep>") for item in output]
        return output



if __name__ == "__main__":
    input_data = json.loads(sys.stdin.read())
    textbook = input_data.get('textbook')        #namespace for textbook
    begin_page = input_data.get('begin_page')    #int
    end_page = input_data.get('end_page')        #int
    Bart = question_gen()
    Bart.init_Summarizer(index_name='omnistudy',namespace=textbook)
    question_answer_pairs = Bart.Run_Question_Gen(textbook=textbook,begin_page=begin_page,end_page=end_page)
    print(json.dumps({'answer': question_answer_pairs}))

    







