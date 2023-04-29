import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Message = (props) => {
    return (
        <View style={styles(props).messageArea}>
            <View style={styles(props).messageStatus}>
                <Text style={styles(props).messageContent}>
                    {props.content}
                </Text>
                <View style={styles(props).status}>
                    <Text style={styles(props).time}>9:35 PM</Text>
                    {props.readReceipt && props.sender && (
                        <Image
                            style={styles(props).readIcon}
                            source={require("../../assets/icons/readReceipt.png")}
                        />
                    )}
                </View>
            </View>
        </View>
    );
};

export default Message;

const styles = (props) =>
    StyleSheet.create({
        messageArea: {
            width: "100%",
            flexDirection: "column",
            alignItems: props.sender ? "flex-end" : "flex-start",
        },
        messageStatus: {},
        messageContent: {
            backgroundColor: props.sender
                ? "darkGreen"
                : "white",
            color: props.sender
                ? "white"
                : "black",
            paddingVertical: 12,
            paddingHorizontal: 15,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderTopLeftRadius: props.sender ? 15 : 0,
            borderTopRightRadius: props.sender ? 0 : 15,
            fontFamily: AppStyles.font.poppinsRegular,
            fontSize: 14,
        },
        time: {
            color: "darkGrey",
            // fontFamily: AppStyles.font.poppinsRegular,
            fontSize: 12,
        },
        status: {
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 15,
            marginTop: 6,
        },
        readIcon: {
            height: 15,
            width: 18,
            resizeMode: "contain",
            marginLeft: 5,
            // display: "hidden",
        },
    });
