import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from './Button'

const COLORS = {
    like: '#00eda6',
    nope: '#ff006f',
    star: '#07a6ff'
}

const Footer = ({ handleChoice }) => {
    return (
        <View style={{
            position: 'absolute',
            bottom: 15,
            width: 240,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 999
        }}>
            <Button
                name='times'
                size={24}
                color={COLORS.nope}
                onPress={() => handleChoice(-1)}
            />
            <Button
                name='star'
                size={24}
                color={COLORS.star}
                style={{
                    height: 40,
                    width: 40
                }}
            />
            <Button
                name='heart'
                size={24}
                color={COLORS.like}
                onPress={() => handleChoice(1)}
            />
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({})