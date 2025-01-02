import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '../../config/SupabaseClient';

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName, setdisplayName] = useState('');
    const [phone, setPhone] = useState('');

    const handleSignUp = async () => {
        if (!email || !password || !confirmPassword || !displayName || !phone) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            Alert.alert('Error', error.message);
        } else {
            // Agregar información adicional del usuario a Supabase
            const { error: profileError } = await supabase.from('profiles').insert([
                {
                    id: data.user.id, // ID único generado por Supabase
                    email: email,
                    // display_name: displayName,
                    // phone: phone,
                },
            ]);

            if (profileError) {
                Alert.alert('Error', 'No se pudo guardar información adicional: ' + profileError.message);
            } else {
                Alert.alert(
                    'Registro exitoso',
                    'Se ha enviado un correo de confirmación. Por favor, verifica tu correo electrónico para activar tu cuenta.'
                );
                navigation.navigate('LoginScreen'); // Redirige al inicio de sesión
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear Cuenta</Text>

            {/*<TextInput*/}
            {/*    style={styles.input}*/}
            {/*    placeholder="Nombre"*/}
            {/*    value={displayName}*/}
            {/*    onChangeText={setdisplayName}*/}
            {/*/>*/}

            {/*<TextInput*/}
            {/*    style={styles.input}*/}
            {/*    placeholder="Teléfono"*/}
            {/*    value={phone}*/}
            {/*    onChangeText={setPhone}*/}
            {/*/>*/}

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

            <TextInput
                style={styles.input}
                placeholder="Repite la Contraseña"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
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
});

export default RegisterScreen;
