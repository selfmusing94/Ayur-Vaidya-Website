from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
load_dotenv()

@app.route('/get-consultation', methods=['POST'])
def get_consultation():
    try:
        user_input = request.json.get('text')
        
        chat = ChatGroq(
            temperature=0, 
            model_name="llama-3.3-70b-versatile", 
            groq_api_key=os.getenv("GROQ_API_KEY")
        )
        
        system = """You are an Medical assistant named Charaka.You are supposed to give Ayurvedic medicines, 
        Yoga asanas and also how to do it, mudras and mantras and a neat description to do the same to 
        cure the symptoms the user enters. If user enters specific Medicine, then list the ingredients of the medicines.
        Use short, conversational responses as if you're having a live conversation. Dont give responses like AI. 
        Dont say its not my expertise etc. Just give answer to what you have been asked."""
        
        human = "{text}"
        prompt = ChatPromptTemplate.from_messages([("system", system), ("human", human)])
        chain = prompt | chat
        
        response = chain.invoke({"text": user_input})
        return jsonify({"response": response.content})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)