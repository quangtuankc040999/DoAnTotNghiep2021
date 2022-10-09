import React from 'react'
import {WhyRubikContainer, Text, Tit, BlockWhy, Te} from './WhyRubik.js'
import WhyRubikBlock from './WhyRubikBlock.jsx'

export default function WhyRubik() {
    const blogContent = [
        {
            url: "https://www.rubiksgift.com/wp-content/uploads/2019/12/playful.png",
            title: "Playful",
            text: "The desire to play and focus attention generates positive emotions, openness and the willingness to get involved.",
        },
        {
            url: "https://www.rubiksgift.com/wp-content/uploads/2019/12/used-by-top-brands.png",
            title: "Used by top brands",
            text: "Most of Fortune 500 use Rubik’s as a communication tool. Amazon, Google, Volkswagen and more.",
        },
        {
            url: "https://www.rubiksgift.com/wp-content/uploads/2019/12/multi-sensory.png",
            title: "Multi-sensory",
            text: "Touch, Hear, See. These mutually reinforcing perception channels increase the neural activity of the user’s brain by up to 1000%.",
        },
        {
            url: "https://www.rubiksgift.com/wp-content/uploads/2019/12/eco-friendly.png",
            title: "Eco",
            text: "For more than 20 years, we have been committed to producing responsibly and respectfully, following international social and environmental standards.",
        },
        {
            url: "https://www.rubiksgift.com/wp-content/uploads/2019/12/iconic.png",
            title: "Iconic",
            text: "Use the Original Rubik’s Cube. Rubik’s makes a strong statement, universally understood the world over, about smarts, creativity and perfect design",
        },
    ]
    return (
        <WhyRubikContainer>
            <Text>
                <Tit>Why Rubik’s ?</Tit>
                <Te>
                    The world’s most famous puzzle toy is both fun and mind-stretching, with
                    its enduring challenge and compulsive twist and turn action. Try to
                    incorporate a playful aspect that makes your product tactile and
                    irresistible.
                </Te>
            </Text>
            <BlockWhy>
                <WhyRubikBlock blogContent = {blogContent[0]}/>
                <WhyRubikBlock blogContent = {blogContent[1]}/>
                <WhyRubikBlock blogContent = {blogContent[2]}/>
                <WhyRubikBlock blogContent = {blogContent[3]}/>
                <WhyRubikBlock blogContent = {blogContent[4]}/>
            </BlockWhy>
        </WhyRubikContainer>
    )
}
