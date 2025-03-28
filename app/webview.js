import React, { useState } from 'react';
import { View, ActivityIndicator, Button, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function WebViewScreen() {
    const [loading, setLoading] = useState(true);
    const webViewRef = React.useRef(null);

    const goBack = () => {
        if (webViewRef.current) webViewRef.current.goBack();
    };

    const goForward = () => {
        if (webViewRef.current) webViewRef.current.goForward();
    };

    return (
        <View style={styles.container}>
            <View style={styles.controls}>
                <Button title="Back" onPress={goBack} />
                <Button title="Forward" onPress={goForward} />
            </View>
            <WebView
                ref={webViewRef}
                source={{ uri: 'https://www.healthline.com/' }}
                onLoadEnd={() => setLoading(false)}
                startInLoadingState={true}
                style={styles.webview}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    webview: {
        flex: 1,
    },
});