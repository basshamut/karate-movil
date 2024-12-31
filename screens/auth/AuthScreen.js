import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {supabase} from '../../config/SupabaseClient';

const AuthScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false); // Controla si es registro o inicio de sesión

    const handleAuth = async () => {
        if (isRegister) {
            // Registro
            const {error} = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Registro exitoso', 'Revisa tu correo para confirmar tu cuenta.');
                setIsRegister(false); // Vuelve al flujo de inicio de sesión después del registro
            }
        } else {
            // Inicio de sesión
            const {error} = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Inicio de sesión exitoso', 'Bienvenido de nuevo.');
                navigation.navigate('HomeScreen'); // Redirige al HomeScreen después de iniciar sesión
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}</Text>

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

            {isRegister && (
                <TextInput
                    style={styles.input}
                    placeholder="Re-escriba Contraseña"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            )}

            <TouchableOpacity style={styles.button} onPress={handleAuth}>
                <Text style={styles.buttonText}>{isRegister ? 'Registrarse' : 'Iniciar Sesión'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => setIsRegister(!isRegister)}
                style={styles.linkContainer}
            >
                <Text style={styles.link}>
                    {isRegister
                        ? '¿Ya tienes una cuenta? Inicia sesión'
                        : '¿No tienes una cuenta? Regístrate aquí'}
                </Text>
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
    linkContainer: {
        marginTop: 20,
    },
    link: {
        color: '#4CAF50',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    backToLoginButton: {
        marginTop: 20,
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 8,
    },
    backToLoginButtonText: {
        color: '#000',
        fontSize: 14,
    },
    backButton: {
        marginTop: 30,
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 8,
    },
    backButtonText: {
        color: '#000',
        fontSize: 14,
    },
});

export default AuthScreen;
