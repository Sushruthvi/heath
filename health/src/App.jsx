import React, { useState } from 'react';
import './App.css';  // Ensure to import your CSS file

const symptoms = [
  "anxiety and nervousness", "depression", "shortness of breath", 
  "depressive or psychotic symptoms", "sharp chest pain", "dizziness", "insomnia", 
  "abnormal involuntary movements", "chest tightness", "palpitations", "irregular heartbeat", 
  "breathing fast", "hoarse voice", "sore throat", "difficulty speaking", "cough", 
  "nasal congestion", "throat swelling", "diminished hearing", "lump in throat", 
  "throat feels tight", "difficulty in swallowing", "skin swelling", "retention of urine", 
  "groin mass", "leg pain", "hip pain", "suprapubic pain", "blood in stool", 
  "lack of growth", "emotional symptoms", "elbow weakness", "back weakness", 
  "pus in sputum", "symptoms of the scrotum and testes", "swelling of scrotum", 
  "pain in testicles", "flatulence", "pus draining from ear", "jaundice", 
  "mass in scrotum", "white discharge from eye", "irritable infant", "abusing alcohol", 
  "fainting", "hostile behavior", "drug abuse", "sharp abdominal pain", "feeling ill", 
  "vomiting", "headache", "nausea", "diarrhea", "vaginal itching"
];

const App = () => {
  const [age, setAge] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [input, setInput] = useState('');
  const [filteredSymptoms, setFilteredSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [checkboxSymptoms, setCheckboxSymptoms] = useState({
    "Sharp chest pain": false,
    "Palpitations": false,
    "Irregular heartbeat": false,
    "Coughing up sputum (blood-tinged or excessive)": false,
    "Seizures": false,
    "Delusions or hallucinations": false,
    "Vomiting blood (Hematemesis)": false,
    "Pain or tightness in throat": false
  });

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleBloodPressureChange = (e) => {
    setBloodPressure(e.target.value);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim()) {
      const filtered = symptoms.filter(symptom => 
        symptom.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSymptoms(filtered);
    } else {
      setFilteredSymptoms([]);
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxSymptoms((prevState) => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleSymptomClick = (symptom) => {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
    setInput(''); // Clear input field after adding
    setFilteredSymptoms([]); // Clear suggestions
  };

  const handleSubmit = () => {
    const selectedCheckboxSymptoms = Object.keys(checkboxSymptoms)
      .filter((key) => checkboxSymptoms[key])
      .map((key) => key);

    const JSON_String = JSON.stringify({
      age: age,
      bloodPressure: bloodPressure,
      symptoms: [...selectedSymptoms, ...selectedCheckboxSymptoms]
    });
    console.log(JSON_String);
  };

  return (
    <div className="App">
      <h1>Symptom Input</h1>
      <div>
        <label>
          Age:
          <input type="number" value={age} onChange={handleAgeChange} />
        </label>
      </div>
      <div>
        <label>
          Blood Pressure:
          <input type="text" value={bloodPressure} onChange={handleBloodPressureChange} />
        </label>
      </div>
      
      {age && bloodPressure && (
        <>
          <div>
            <h3>Select Symptoms (Checkboxes):</h3>
            {Object.keys(checkboxSymptoms).map((symptom) => (
              <label key={symptom}>
                <input
                  type="checkbox"
                  name={symptom}
                  checked={checkboxSymptoms[symptom]}
                  onChange={handleCheckboxChange}
                />
                {symptom}
              </label>
            ))}
          </div>

          <div>
            <label htmlFor="symptoms">Search for Symptoms:</label>
            <input 
              type="text" 
              id="symptoms" 
              value={input} 
              onChange={handleInputChange} 
              placeholder="Start typing symptoms..." 
            />
          </div>

          {filteredSymptoms.length > 0 && (
            <ul>
              {filteredSymptoms.map((symptom, index) => (
                <li key={index} onClick={() => handleSymptomClick(symptom)} style={{ cursor: 'pointer' }}>
                  {symptom}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      
      {selectedSymptoms.length > 0 && (
        <div>
          <h2>Selected Symptoms:</h2>
          <ul>
            {selectedSymptoms.map((symptom, index) => (
              <li key={index}>{symptom}</li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default App;
