import React from 'react'
import { Image, ImageIcon, Text, Title, WhyRubickBlockContainer } from './WhyRubikBlock'

export default function WhyRubikBlock(props) {
    return (
        <WhyRubickBlockContainer>
            <ImageIcon>

            </ImageIcon>
                <Image src={props.blogContent.url} alt="" />
            <Title>
                <p>{props.blogContent.title}</p>

            </Title>
            <Text>
                <p>{props.blogContent.text}</p>
            </Text>
        </WhyRubickBlockContainer>
    )
}
