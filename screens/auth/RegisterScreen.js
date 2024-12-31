import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '../../config/SupabaseClient';
const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            Alert.alert('Error', error.message);
        } else {
            Alert.alert(
                'Registro exitoso',
                'Se ha enviado un correo de confirmación. Por favor, verifica tu correo electrónico para activar tu cuenta.'
            );
            navigation.navigate('LoginScreen'); // Redirige al inicio de sesión
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear Cuenta</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.link}>¿Ya tienes una cuenta? Inicia sesión aquí</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        padding: 15,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    link: {
        color: '#4CAF50',
        fontSize: 14,
        marginTop: 20,
        textDecorationLine: 'underline',
    },
});

export default RegisterScreen;
