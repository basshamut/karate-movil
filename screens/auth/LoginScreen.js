import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from "@react-navigation/native";

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }

        // Aquí podrías realizar la lógica de autenticación
        Alert.alert('Inicio de Sesión', `Bienvenido, ${email}`);
        navigation.navigate('HomeScreen'); // Ajusta el nombre del screen de inicio
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>

            {/* Campo de correo electrónico */}
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            {/* Campo de contraseña */}
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {/* Botón de inicio de sesión */}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>

            {/* Enlace a la pantalla de registro */}
            <TouchableOpacity
                onPress={() => navigation.navigate('RegisterScreen')}
                style={styles.linkContainer}
            >
                <Text style={styles.link}>¿No tienes cuenta? Regístrate aquí</Text>
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
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 10,
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
});

export default LoginScreen;
