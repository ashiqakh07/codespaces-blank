import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, useColorScheme, View } from 'react-native';

interface User {
    login: { uuid: string };
    picture: { large: string };
    name: { first: string; last: string };
    email: string;
}

const ProfileGallery = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const colorScheme = useColorScheme();

    useEffect(() => {
        fetch("https://randomuser.me/api/?results=10")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data.results);
                setLoading(false)
            })
            .catch((error) => {
                console.error(error);
                setLoading(false)
            });
    }, [])

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={'#fff'} />
            </View>
        )
    }

    return (
        <View
            style={[
                styles.container,
                colorScheme === "dark" ? styles.darkBg : styles.lightBg,
            ]}
        >
            <FlatList
                data={users}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.picture.large }} style={styles.avatar} />
                        <Text style={styles.name}>{item.name.first} {item.name.last}</Text>
                        <Text style={styles.email}>{item.email}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.login.uuid}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    )
}

export default ProfileGallery

const styles = StyleSheet.create({
    container: { flex: 1 },
    darkBg: { backgroundColor: "#121212" },
    lightBg: { backgroundColor: "#fff" },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
    },
    card: {
        backgroundColor: "#1e1e1e",
        margin: 10,
        borderRadius: 15,
        padding: 16,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: "600",
        color: "#fff",
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: "#bbb",
    },
});