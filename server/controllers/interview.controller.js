//fs = Opens and reads the file from your computer.(file read, create new file, write data into file, update or delete file, create folder)
import fs from "fs"
// pdfjsLib = Understands the PDF's structure so you can access its pages and extract text.
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { askAi } from "../services/openRouter.services.js";
import  {upload}  from "../middlewares/multer.js";
export const analyzeResume = async (req, res) => {
    try {
         if (!req.file) {
      return res.status(400).json({ message: "Resume required" });
    }

    const filepath = req.file.path

  // change resueme  or (file) into binary data
    const fileBuffer = await fs.promises.readFile(filepath)

    // we have to convert binary data in that format (uint8Array format) which is used by our package  pdfjs-dist
    // This line converts fileBuffer into a Uint8Array, which is an array-like structure that stores binary data as 8-bit unsigned integers (numbers from 0 to 255).
    // Why convert it?
//Some libraries and APIs expect binary data in the form of a Uint8Array, ArrayBuffer, or another specific format. This conversion makes the data compatible with those APIs.
     const uint8Array = new Uint8Array(fileBuffer)

     // This line loads and parses  a PDF file using the PDF.js library.
     // parse means: Parse means converting raw data into a structured format that a computer can understand and work with.
const pdf = await pdfjsLib.getDocument({data: uint8Array}).promise;

let resumeText = ""; // it store extracted text from each page of  resume
// Extract text from all pages
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        // This line gets a specific page from the PDF document.
      const page = await pdf.getPage(pageNum);

      const content = await page.getTextContent();
    
      // content.items contains multiple objects, we have to extract str property
      // .join(" ") :  Combines all the strings into one string, separating them with spaces.
      const pageText = content.items.map(item => item.str).join(" ");
      resumeText += pageText + "\n";
    }
     // .replace:  cleans the extracted resume text by replacing extra whitespace with a single space 
       resumeText = resumeText
      .replace(/\s+/g, " ") 
      .trim(); // .trim do  removing whitespace from the beginning and end.

        // prompt or messages which i will send to our AI
        const messages = [
        {
        role: "system",
        content: `Extract structured data from resume. Return strictly JSON: 
        {
        "role": "string",
        "experience": "string",
        "projects": ["project1", "project2"],
        "skills": ["skill1", "skill2"]
        }
        `
        },
        {
        role: "user",
        content: resumeText
        }
        ];
        const aiResponse = await askAi(messages)
        // AI return string containing json text 
        // .parsed convert that json string into javascript object 
        // JSON.parse(jsonString) →  convert JSON string to JavaScript object.
          const parsed = JSON.parse(aiResponse);
          fs.unlinkSync(filepath) // file will be delete from public folder
        

             res.json({
      role: parsed.role,
      experience: parsed.experience,
      projects: parsed.projects,
      skills: parsed.skills,
      resumeText
    });

    } catch (error) {
    console.error(error);
        
    if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
    }
   return res.status(500).json({ message: error.message });
    }
}




//1. JSON format
//JSON is a text format used to store or transfer data between applications, such as your backend and an AI API.
// JSON doesn't support JavaScript functions
// 2. JavaScript object
//A JavaScript object is a data structure you can use directly in JavaScript code.
// You can access values using result.name,  result.score