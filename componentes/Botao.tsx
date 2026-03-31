import { Pressable, Text } from "react-native";

export default (props) => {
    let title = props.title || "Título";
    let onPress = props.onPress;
    let color = props.color || '#73b05f';
    let textColor = props.textColor || '#000000';
    let style = props.style;

    return(
        <Pressable
            onPress={onPress}
            style={{
                backgroundColor: color,
                paddingVertical: 10,
                paddingHorizontal: 30,
                borderRadius: 18,
                ...style
            }}
        >
            <Text style={{color: textColor, ...style}}>{title}</Text>
        </Pressable>
    );

}