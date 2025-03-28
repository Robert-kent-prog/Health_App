import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from 'expo-router'; // Import useFocusEffect
import { initDatabase, fetchPatients, deletePatient } from './database';

export default function HomeScreen() {
    const [patients, setPatients] = useState([]);
    const router = useRouter();

    // Function to initialize the database and load patients
    useEffect(() => {
        const initializeAndLoad = async () => {
            try {
                await initDatabase(); // Initialize the database and create the table
            } catch (error) {
                Alert.alert('Error', 'Failed to initialize database');
            }
        };
        initializeAndLoad();
    }, []);

    // Function to fetch patients from the database
    const loadPatients = async () => {
        try {
            const data = await fetchPatients();
            setPatients(data); // Update the state with the latest data
        } catch (error) {
            Alert.alert('Error', 'Failed to load patients');
        }
    };

    // Use useFocusEffect to reload patients when the screen comes into focus
    useFocusEffect(
        React.useCallback(() => {
            loadPatients(); // Reload the patient list every time the screen is opened
        }, [])
    );

    // Function to handle patient deletion
    const handleDelete = async (id) => {
        try {
            await deletePatient(id);
            loadPatients(); // Reload the patient list after deletion
        } catch (error) {
            Alert.alert('Error', 'Failed to delete patient');
        }
    };

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Patient Management</Text>
            </View>

            {/* Buttons Section */}
            <View style={styles.buttonContainer}>
                {/* Add Patient Button */}
                <TouchableOpacity
                    style={[styles.button, styles.addButton]}
                    onPress={() => router.push('/add-edit')}
                >
                    <Text style={styles.buttonText}>Add Patient</Text>
                </TouchableOpacity>

                {/* Open WebView Button */}
                <TouchableOpacity
                    style={[styles.button, styles.webviewButton]}
                    onPress={() => router.push('/webview')}
                >
                    <Text style={styles.buttonText}>Open WebViewScreen</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.header}>
                <Text style={styles.headerText}>List of Available Patients</Text>
            </View>

            {/* Patient List */}
            <FlatList
                data={patients}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <View style={styles.patientDetails}>
                            <Text style={styles.patientLabel}>Name:</Text>
                            <Text style={styles.patientValue}>{item.name}</Text>

                            <Text style={styles.patientLabel}>Age:</Text>
                            <Text style={styles.patientValue}>{item.age} years old</Text>

                            <Text style={styles.patientLabel}>Condition:</Text>
                            <Text style={styles.patientValue}>{item.condition}</Text>
                        </View>
                        <View style={styles.actionButtons}>
                            {/* Edit Button */}
                            <TouchableOpacity
                                style={[styles.actionButton, styles.editButton]}
                                onPress={() => router.push(`/add-edit?id=${item.id}`)}
                            >
                                <Text style={styles.actionButtonText}>Edit</Text>
                            </TouchableOpacity>
                            {/* Delete Button */}
                            <TouchableOpacity
                                style={[styles.actionButton, styles.deleteButton]}
                                onPress={() => handleDelete(item.id)}
                            >
                                <Text style={styles.actionButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
        color: '#333',
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#4CAF50', // Green for Add
        marginRight: 10,
    },
    webviewButton: {
        backgroundColor: '#2196F3', // Blue for WebView
        marginLeft: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 8,
        elevation: 2, // Shadow effect
    },
    patientDetails: {
        flex: 1,
    },
    patientLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 5,
    },
    patientValue: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    actionButtons: {
        flexDirection: 'column', // Changed to column for vertical alignment
        alignItems: 'center', // Center buttons horizontally
        justifyContent: 'center', // Center buttons vertically
        gap: 10,
    },
    actionButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: '#FFC107',
        // Yellow for Edit
    },
    deleteButton: {
        backgroundColor: '#F44336', // Red for Delete
    },
    actionButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});