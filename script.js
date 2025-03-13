document.addEventListener('DOMContentLoaded', function() {
    // Update date/time and user info
    function updateInfo() {
        const now = new Date();
        const formatted = now.toISOString().slice(0, 19).replace('T', ' ');
        document.getElementById('currentDateTime').textContent = formatted;
    }
    updateInfo();
    setInterval(updateInfo, 1000);

    // Simulate AI response generation
    function generateAIResponse(symptoms) {
        // This function simulates the response similar to your Python backend
        const responses = {
            headache: `Namaste! I understand you're experiencing a headache. Let me help you with some Ayurvedic solutions:

Ayurvedic Medicines:
1. Brahmi (Bacopa monnieri) - Take 2-3 leaves with honey
2. Shankhpushpi powder - 1/2 teaspoon with warm water
3. Jatamansi powder - Mix with coconut oil for head massage

Yoga Asanas:
1. Shirshasana (Headstand) - Hold for 3-5 minutes if practiced
2. Vajrasana (Diamond Pose) - 10-15 minutes
3. Paschimottanasana (Seated Forward Bend) - 5-10 breaths

Mudras:
1. Prithvi Mudra - Practice for 15 minutes
2. Vayu Mudra - Hold for 10 minutes`,

            fever: `Namaste! For fever, here are some Ayurvedic remedies:

Ayurvedic Medicines:
1. Sudarshan Churna - 1/2 teaspoon twice daily with honey
2. Tulsi (Holy Basil) - 2-3 leaves or as tea
3. Giloy (Tinospora cordifolia) - Juice or tablet form

Yoga Asanas:
1. Shavasana (Corpse Pose) - 15 minutes
2. Pranayama (Breathing exercises)
3. Light Surya Namaskar when fever subsides

Mudras:
1. Surya Mudra - Hold for 10-15 minutes
2. Prithvi Mudra - Practice 3 times daily`,

            default: `Namaste! Based on your symptoms, here are some Ayurvedic remedies:

Ayurvedic Medicines:
1. Triphala - 2 tablets before bed with warm water
2. Ashwagandha - 1 tablet twice daily
3. Turmeric milk - One cup before bedtime

Yoga Asanas:
1. Tadasana (Mountain Pose) - 5 minutes
2. Balasana (Child's Pose) - 5-10 breaths
3. Bhujangasana (Cobra Pose) - 5 repetitions

Mudras:
1. Gyan Mudra - Practice for 15 minutes daily
2. Prana Mudra - Hold for 10 minutes

Additional Tips:
- Follow a regular sleep schedule
- Practice meditation for 10 minutes daily
- Maintain a balanced diet`
        };

        // Check symptoms and return appropriate response
        const lowerSymptoms = symptoms.toLowerCase();
        if (lowerSymptoms.includes('headache')) {
            return responses.headache;
        } else if (lowerSymptoms.includes('fever')) {
            return responses.fever;
        }
        return responses.default;
    }

    // Handle form submission
    document.getElementById('submit').addEventListener('click', async () => {
        const symptoms = document.getElementById('symptoms').value;
        const resultsDiv = document.getElementById('results');

        if (symptoms.trim() === "") {
            alert("Please enter your symptoms.");
            return;
        }

        // Show loading animation
        resultsDiv.innerHTML = `
            <div class="loading-animation">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Analyzing your symptoms...</p>
            </div>
        `;

        // Simulate API delay
        setTimeout(() => {
            try {
                // Generate response
                const response = generateAIResponse(symptoms);
                
                // Display formatted response
                resultsDiv.innerHTML = `
                    <div class="diagnosis-result">
                        <h3><i class="fas fa-stethoscope"></i> Consultation Results</h3>
                        <div class="diagnosis-content">
                            ${formatResponse(response)}
                        </div>
                    </div>
                `;
            } catch (error) {
                resultsDiv.innerHTML = `
                    <div class="error-message">
                        <i class="fas fa-exclamation-circle"></i>
                        <p>Error: ${error.message}</p>
                        <button onclick="location.reload()" class="retry-btn">
                            <i class="fas fa-redo"></i> Try Again
                        </button>
                    </div>
                `;
            }
        }, 1500); // 1.5 second delay to simulate processing
    });

    function formatResponse(text) {
        if (!text) return '<p>No response received</p>';
        
        const sections = text.split('\n\n');
        
        return sections.map(section => {
            if (section.trim() === '') return '';
            
            if (section.toLowerCase().includes('ayurvedic medicines:')) {
                return `<div class="response-section medicines">
                    <h4>🌿 Ayurvedic Medicines</h4>
                    <p>${section.replace('Ayurvedic Medicines:', '')}</p>
                </div>`;
            } else if (section.toLowerCase().includes('yoga asanas:')) {
                return `<div class="response-section yoga">
                    <h4>🧘 Yoga Asanas</h4>
                    <p>${section.replace('Yoga Asanas:', '')}</p>
                </div>`;
            } else if (section.toLowerCase().includes('mudras:')) {
                return `<div class="response-section mudras">
                    <h4>🙏 Mudras</h4>
                    <p>${section.replace('Mudras:', '')}</p>
                </div>`;
            } else if (section.toLowerCase().includes('additional tips:')) {
                return `<div class="response-section tips">
                    <h4>💡 Additional Tips</h4>
                    <p>${section.replace('Additional Tips:', '')}</p>
                </div>`;
            } else {
                return `<p>${section}</p>`;
            }
        }).join('');
    }
});