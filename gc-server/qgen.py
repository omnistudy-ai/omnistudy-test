import json
from chat import Chat
from stores import DocStore
from qtype import *

class QuestionGeneration(Chat):
    def __init__(self, docs, num_questions, question_types):
        prompt_template = """
            Given the following context: 
            {context}
            Generate """ + str(num_questions) + " high-quality questions in a json array format\nChoose a mix of the following question types:\n"
        for type in question_types:
            prompt_template += f"{type}\n"
        super().__init__(prompt_template, docs)
    
# Example usage
if __name__ == "__main__":
    docs = DocStore(["https://firebasestorage.googleapis.com/v0/b/omnistudy-test.appspot.com/o/assignments%2F41ffe5b5-8d48-4f65-b08d-edfe2aa8595f%2F857076619_2023-12-13.pdf?alt=media&token=c66e0f7c-7d8b-43a1-86df-bb9a7f75cd8f"]).docs
    chat = QuestionGeneration(
        docs, 
        num_questions=20, 
        question_types=[
            FillInTheBlankQuestion()
        ]
    )
    response = chat.run()['output_text']
    print(response)
    json_qs = json.loads(response)
    # print(json_qs)