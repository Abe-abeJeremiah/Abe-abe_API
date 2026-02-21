// server.js

// In any component
var serviceAccount = require("C:\Users\Acer\Desktop\School FilesFolder\IT15 4592\reactproject\reactproject\firebase-service-account.json"); // <- use new file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore(); // ✅ THIS is correct for backend

const app = express();
app.use(cors());
app.use(express.json());

// =====================
// ROUTES
// =====================

// GET all students
app.get("/students", async (req, res) => {
  try {
    const studentsRef = db.collection('students');
    const snapshot = await studentsRef.get();
    
    if (snapshot.empty) {
      return res.json([]);
    }

    const students = snapshot.docs.map(doc => ({
      id: doc.id, // Firestore generates a unique ID (string)
      ...doc.data()
    }));
    
    res.json(students);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new student
app.post("/students", async (req, res) => {
  const { name, course, year } = req.body;

  if (!name || !course || !year) {
    return res.status(400).json({ error: "Missing name, course, or year" });
  }

  try {
    const docRef = await db.collection('students').add({
      name,
      course,
      year
    });
    res.json({ id: docRef.id, name, course, year });
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT update a student by ID
app.put("/students/:id", async (req, res) => {
  const { id } = req.params;
  const { name, course, year } = req.body;

  if (!name || !course || !year) {
    return res.status(400).json({ error: "Missing details" });
  }

  try {
    await db.collection('students').doc(id).set({
      name,
      course,
      year
    });
    res.json({ id, name, course, year });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a student by ID
app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db.collection('students').doc(id).delete();
    res.json({ deleted: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

// =====================
// START SERVER
// =====================
app.listen(3000, () => console.log('Server running on http://localhost:3000'));