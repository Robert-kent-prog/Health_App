import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { addPatient, updatePatient, fetchPatients } from './database';

export default function AddEditScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [condition, setCondition] = useState('');

    useEffect(() => {
        if (params.id) {
            const loadPatient = async () => {
                const patients = await fetchPatients();
                const patient = patients.find((p) => p.id === parseInt(params.id));
                if (patient) {
                    setName(patient.name);
                    setAge(patient.age.toString());
                    setCondition(patient.condition);
                }
            };
            loadPatient();
        }
    }, [params.id]);

    const handleSubmit = async () => {
        if (!name || !age || !condition) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        try {
            if (params.id) {
                await updatePatient(params.id, name, parseInt(age), condition);
            } else {
                await addPatient(name, parseInt(age), condition);
            }
            router.back();
        } catch (error) {
            Alert.alert('Error', 'Failed to save patient');
        }
    };

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.headerText}>{params.id ? 'Edit Patient' : 'Add Patient'}</Text>
            </View>

            {/* Input Fields */}
            <View style={styles.formContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter patient's name"
                    value={name}
                    onChangeText={setName}
                />

                <Text style={styles.label}>Age</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter patient's age"
                    value={age}
                    keyboardType="numeric"
                    onChangeText={setAge}
                />

                <Text style={styles.label}>Condition</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter patient's condition"
                    value={condition}
                    onChangeText={setCondition}
                />
            </View>

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5', // Light gray background
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    formContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 15,
    },
    saveButton: {
        backgroundColor: '#4CAF50', // Green button
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});