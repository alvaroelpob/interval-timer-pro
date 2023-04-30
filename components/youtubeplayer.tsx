import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function YoutubePlayer({ videoID }: { videoID: string }) {
    const videoUrl = `https://www.youtube.com/embed/${videoID}`;
    if (videoID.length === 0) return <></>;

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: videoUrl }}
                allowsInlineMediaPlayback={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: '100%',
        marginVertical: 12,
    },
});