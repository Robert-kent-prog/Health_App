import * as SQLite from 'expo-sqlite';

// Use a self-invoking async function to initialize the database
let db;
(async () => {
  db = await SQLite.openDatabaseAsync('doctor_patient.db');
})();

export const initDatabase = async () => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER,
        condition TEXT
      )
    `);
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
};

export const fetchPatients = async () => {
  try {
    const result = await db.getAllAsync('SELECT * FROM patients');
    return result;
  } catch (error) {
    console.error('Failed to fetch patients:', error);
    throw error;
  }
};

export const addPatient = async (name, age, condition) => {
  try {
    await db.runAsync(
      'INSERT INTO patients (name, age, condition) VALUES (?, ?, ?)',
      [name, age, condition]
    );
  } catch (error) {
    console.error('Failed to add patient:', error);
    throw error;
  }
};

export const updatePatient = async (id, name, age, condition) => {
  try {
    await db.runAsync(
      'UPDATE patients SET name = ?, age = ?, condition = ? WHERE id = ?',
      [name, age, condition, id]
    );
  } catch (error) {
    console.error('Failed to update patient:', error);
    throw error;
  }
};

export const deletePatient = async (id) => {
  try {
    await db.runAsync(
      'DELETE FROM patients WHERE id = ?',
      [id]
    );
  } catch (error) {
    console.error('Failed to delete patient:', error);
    throw error;
  }
};