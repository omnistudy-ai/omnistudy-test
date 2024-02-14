import React, { useState } from "react";
import Container from "../../UI/Container";
import "./Faq.css";
import { motion, AnimatePresence } from "framer-motion";
import EncryptButton from "../../UI/EncryptedButton";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How do I set up my OmniStudy account?",
    answer:
      "Visit our website, click 'Sign Up,' and follow the simple steps to create your personalized account for a seamless start.",
  },
  {
    question: "Can I use OmniStudy for any subject?",
    answer:
      "Absolutely! OmniStudy caters to a wide range of subjects, tailoring its features to your unique learning style and academic needs.",
  },
  {
    question: "How does OmniStudy provide personalized study plans?",
    answer:
      "OmniStudy analyzes your learning style and preferences to curate customized study materials and schedules, maximizing your study efficiency.",
  },
  {
    question: "What kind of real-time feedback does OmniStudy offer?",
    answer:
      "OmniStudy provides instant feedback on your progress, highlighting strengths and areas for improvement. It adapts recommendations to enhance your learning journey continuously.",
  },
];

const Faq = () => {
  const [openQuestions, setOpenQuestions] = useState<boolean[]>(
    new Array(faqData.length).fill(false)
  );

  const handleQuestionClick = (index: number) => {
    const newOpenQuestions = [...openQuestions];
    newOpenQuestions[index] = !newOpenQuestions[index];
    setOpenQuestions(newOpenQuestions);
  };

  return (
    <section className="faqs">
      <Container>
        <div className="faq-content">
          <div className="faq-text">
            <h6>Omnistudy Support</h6>
            <h3>Frequently Asked Questions</h3>
            <p>
              Everything you need to know about OmniStudy. Can't find the answer
              you're looking for? Please,
              <div className="btn-box">
                <EncryptButton text="get in touch" route="/contact" />
              </div>
            </p>
          </div>
          <div className="faq-questions">
            {faqData.map((faq, i) => (
              <div
                className="faq"
                key={i}
                onClick={() => handleQuestionClick(i)}
              >
                <div className="question-head">
                  <h6>{faq.question}</h6>
                  <AnimatePresence>
                    <motion.span
                      initial={{ rotate: 0 }}
                      animate={{ rotate: openQuestions[i] ? 45 : 0 }}
                      exit={{ rotate: 0 }}
                    >
                      +
                    </motion.span>
                  </AnimatePresence>
                </div>
                <AnimatePresence>
                  {openQuestions[i] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {openQuestions[i] && <p>{faq.answer}</p>}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Faq;
