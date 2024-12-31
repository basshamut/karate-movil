import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../../config/SupabaseClient';

const HomeScreen = ({ navigation }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                Alert.alert('Error', 'No se pudo cargar la información del usuario.');
            } else {
                setUser(data.user);
            }
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            Alert.alert('Error', 'No se pudo cerrar la sesión.');
        } else {
            navigation.replace('AuthScreen'); // Vuelve a la pantalla de autenticación
        }
    };

    return (
        <View style={styles.container}>
            {user ? (
                <>
                    <Text style={styles.welcomeText}>¡Bienvenido, {user.email}!</Text>
                    <TouchableOpacity style={styles.button} onPress={handleLogout}>
                        <Text style={styles.buttonText}>Cerrar Sesión</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text style={styles.loadingText}>Cargando información del usuario...</Text>
            )}
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
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    loadingText: {
        fontSize: 16,
        color: '#666',
    },
    button: {
        backgroundColor: '#FF5733',
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

export default HomeScreen;
