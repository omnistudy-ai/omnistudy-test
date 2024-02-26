class QuestionType:
    name: str = ""
    code: str = ""
    json_schema: str = ""
    
    def __init__(self, name, code, json_schema):
        self.name = name
        self.code = code
        self.json_schema = json_schema

    def __str__(self):
        return f"""Question type: {self.name}\nJSON Schema: {self.json_schema} """

class ShortAnswerQuestion(QuestionType):
    def __init__(self):
        super().__init__("short answer", "SHORT", """Object(
            "question": "",
            "answer": "",
            "type": "SHORT" 
        )""")

class MultipleChoiceQuestion(QuestionType):
    def __init__(self):
        super().__init__("multiple choice", "MCQ", """Object(
            "question": "",
            "options": Object(
                "A": "",
                ...
            ),
            "answer": "",
            "type": "MCQ" 
        )""")

class TrueOrFalseQuestion(QuestionType):
    def __init__(self):
        super().__init__("true or false", "TOF", """Object(
            "question": "",
            "answer": True | False,
            "type": "TOF" 
        )""")

class FillInTheBlankQuestion(QuestionType):
    def __init__(self):
        super().__init__("fill in the blank", "FITB", """Object(
            "question": "Fill in the blank: ... __ ...",
            "answer": "",
            "type": "FITB"
        )""")

class QuestionFactory:
    @staticmethod
    def create_from_code(code):
        if code == "SHORT":
            return ShortAnswerQuestion()
        elif code == "MCQ":
            return MultipleChoiceQuestion()
        elif code == "TOF":
            return TrueOrFalseQuestion()
        elif code == "FITB":
            return FillInTheBlankQuestion()

# Example usage
if __name__ == "__main__":
    question = FillInTheBlankQuestion()
    print(question)